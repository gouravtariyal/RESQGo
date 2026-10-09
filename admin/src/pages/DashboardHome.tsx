import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Clock,
  UserCheck,
  Ban,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import api from '../lib/api';
import UserOnboardingChart from '../components/UserOnboardingChart';

type Stats = {
  totalUsers: number;
  verifiedUsers: number;
  blockedUsers?: number;
  activeUsers?: number;
  recentUsers: number;
  activeEmergencies: number;
  respondersOnline: number;
  avgResponseTimeMinutes: number | null;
};

type RecentUser = {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  isBlocked?: boolean;
  createdAt: string;
};

type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtext?: string;
};

function StatCard({ label, value, icon, color, subtext }: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-xs border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
    </div>
  );
}

export default function DashboardHome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsersList, setRecentUsersList] = useState<RecentUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchDashboardData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          api.get<{ success: boolean; stats: Stats }>('/stats', { signal: controller.signal }),
          api.get<{ success: boolean; users: RecentUser[] }>('/users?limit=5', { signal: controller.signal }),
        ]);

        if (statsRes.data.success) {
          setStats(statsRes.data.stats);
        }
        if (usersRes.data.success) {
          setRecentUsersList(usersRes.data.users.slice(0, 5));
        }
      } catch (err: unknown) {
        if (err && typeof err === 'object' && 'name' in err && err.name !== 'CanceledError') {
          setError('Failed to load dashboard operational data.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();

    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operational Overview</h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time analytics, user onboarding trends, and emergency operational health.
          </p>
        </div>

        <Link
          to="/users"
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition shadow-xs w-fit"
        >
          <span>Manage Users & Access</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow-xs border border-slate-200 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
              <div className="h-8 bg-slate-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            label="Total Users"
            value={stats?.totalUsers ?? '—'}
            icon={<Users size={18} className="text-blue-600" />}
            color="bg-blue-50"
            subtext="All registrations"
          />
          <StatCard
            label="Active Users"
            value={stats?.activeUsers ?? (stats?.totalUsers ?? 0) - (stats?.blockedUsers ?? 0)}
            icon={<CheckCircle size={18} className="text-emerald-600" />}
            color="bg-emerald-50"
            subtext="Allowed app access"
          />
          <StatCard
            label="Blocked Users"
            value={stats?.blockedUsers ?? 0}
            icon={<Ban size={18} className="text-red-600" />}
            color="bg-red-50"
            subtext="Restricted from login"
          />
          <StatCard
            label="New (Last 7d)"
            value={stats?.recentUsers ?? '—'}
            icon={<Users size={18} className="text-violet-600" />}
            color="bg-violet-50"
            subtext="Recent signups"
          />
          <StatCard
            label="Verified Users"
            value={stats?.verifiedUsers ?? '—'}
            icon={<UserCheck size={18} className="text-teal-600" />}
            color="bg-teal-50"
            subtext="OTP / KYC passed"
          />
          <StatCard
            label="Avg. Response"
            value={stats?.avgResponseTimeMinutes != null ? `${stats.avgResponseTimeMinutes}m` : 'N/A'}
            icon={<Clock size={18} className="text-slate-600" />}
            color="bg-slate-100"
            subtext="Dispatch turnaround"
          />
        </div>
      )}

      {/* Onboarding Graph Section */}
      <div className="space-y-2">
        <UserOnboardingChart
          title="User Onboarding Analytics"
          description="Visual timeline tracking user registrations and platform adoption over time"
        />
      </div>

      {/* Recently Onboarded Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">Recently Onboarded Users</h3>
            <p className="text-xs text-slate-500">The latest mobile app users who joined the platform</p>
          </div>
          <Link
            to="/users"
            className="text-xs font-semibold text-red-600 hover:text-red-700 inline-flex items-center gap-1 transition"
          >
            <span>View & Block Users</span>
            <ExternalLink size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-2.5">User</th>
                <th className="px-4 py-2.5">Phone</th>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Verification</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Joined Date</th>
                <th className="px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : recentUsersList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-slate-400 text-xs">
                    No recent users recorded.
                  </td>
                </tr>
              ) : (
                recentUsersList.map(user => {
                  const isBlocked = user.isBlocked === true;

                  return (
                    <tr key={user._id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-semibold text-slate-800">{user.fullName}</td>
                      <td className="px-4 py-3 text-slate-600 font-mono text-xs">{user.phoneNumber}</td>
                      <td className="px-4 py-3 text-slate-500">{user.email || '—'}</td>
                      <td className="px-4 py-3">
                        {user.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-medium">
                            <UserCheck size={11} /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full text-xs font-medium">
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isBlocked ? (
                          <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-0.5 rounded-full text-xs font-semibold">
                            <Ban size={11} /> Blocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-medium">
                            <CheckCircle size={11} /> Active
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          to="/users"
                          className="text-xs font-semibold text-slate-600 hover:text-red-600 transition"
                        >
                          Manage →
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
