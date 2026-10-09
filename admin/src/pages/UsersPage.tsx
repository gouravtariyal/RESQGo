import { useEffect, useState, useMemo } from 'react';
import {
  Search,
  UserCheck,
  UserX,
  ShieldAlert,
  ShieldCheck,
  Ban,
  CheckCircle2,
  TrendingUp,
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import api from '../lib/api';
import UserOnboardingChart from '../components/UserOnboardingChart';

type User = {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  isBlocked?: boolean;
  blockedAt?: string | null;
  blockedReason?: string;
  createdAt: string;
};

type FilterStatus = 'all' | 'active' | 'blocked' | 'verified' | 'unverified';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [showChart, setShowChart] = useState(false);

  // Modal State for Block/Unblock
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [blockActionType, setBlockActionType] = useState<'block' | 'unblock'>('block');
  const [blockReason, setBlockReason] = useState('');
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await api.get<{ success: boolean; users: User[] }>('/users');
      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        setError('Failed to load user list.');
      }
    } catch {
      setError('Unable to fetch users from server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openBlockModal = (user: User, action: 'block' | 'unblock') => {
    setSelectedUser(user);
    setBlockActionType(action);
    setBlockReason(action === 'block' ? 'Terms of service violation' : '');
  };

  const closeBlockModal = () => {
    if (isSubmittingAction) return;
    setSelectedUser(null);
    setBlockReason('');
  };

  const handleConfirmToggleBlock = async () => {
    if (!selectedUser) return;
    setIsSubmittingAction(true);

    try {
      const targetBlocked = blockActionType === 'block';
      const res = await api.patch<{ success: boolean; message: string; user: User }>(
        `/users/${selectedUser._id}/block`,
        {
          isBlocked: targetBlocked,
          reason: targetBlocked ? blockReason : '',
        }
      );

      if (res.data.success) {
        // Update user in local state immediately
        setUsers(prev =>
          prev.map(u => (u._id === selectedUser._id ? { ...u, ...res.data.user } : u))
        );

        setNotification({
          type: 'success',
          message: targetBlocked
            ? `User "${selectedUser.fullName}" has been blocked.`
            : `User "${selectedUser.fullName}" has been unblocked.`,
        });

        closeBlockModal();
      } else {
        setNotification({
          type: 'error',
          message: res.data.message || 'Action failed.',
        });
      }
    } catch {
      setNotification({
        type: 'error',
        message: 'Network error occurred while updating user block status.',
      });
    } finally {
      setIsSubmittingAction(false);
    }
  };

  // Compute metrics
  const stats = useMemo(() => {
    const total = users.length;
    const blocked = users.filter(u => u.isBlocked === true).length;
    const active = total - blocked;
    const verified = users.filter(u => u.isVerified === true).length;
    return { total, blocked, active, verified };
  }, [users]);

  // Filtered users list
  const filtered = useMemo(() => {
    return users.filter(u => {
      // Status filter
      if (statusFilter === 'active' && u.isBlocked === true) return false;
      if (statusFilter === 'blocked' && u.isBlocked !== true) return false;
      if (statusFilter === 'verified' && !u.isVerified) return false;
      if (statusFilter === 'unverified' && u.isVerified) return false;

      // Text search
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.phoneNumber.includes(q) ||
        (u.email && u.email.toLowerCase().includes(q))
      );
    });
  }, [users, statusFilter, search]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Monitor registered users, track onboarding trends, and manage user access controls.
          </p>
        </div>

        <button
          onClick={() => setShowChart(prev => !prev)}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer border ${
            showChart
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <TrendingUp size={16} className={showChart ? 'text-red-600' : 'text-slate-500'} />
          <span>{showChart ? 'Hide Onboarding Graph' : 'Show Onboarding Graph'}</span>
          {showChart ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {/* Onboarding Graph (Toggleable / Expandable on Users page) */}
      {showChart && (
        <div className="animate-fadeIn">
          <UserOnboardingChart
            title="User Onboarding & Growth Velocity"
            description="Visual timeline of mobile app user signups and registration trends"
          />
        </div>
      )}

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`text-left p-4 rounded-xl border transition cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className={`text-xs block ${statusFilter === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
            Total Users
          </span>
          <span className="text-2xl font-bold mt-1 block">{stats.total}</span>
        </button>

        <button
          onClick={() => setStatusFilter('active')}
          className={`text-left p-4 rounded-xl border transition cursor-pointer ${
            statusFilter === 'active'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className={`text-xs block ${statusFilter === 'active' ? 'text-emerald-100' : 'text-slate-500'}`}>
            Active Users
          </span>
          <span className={`text-2xl font-bold mt-1 block ${statusFilter === 'active' ? 'text-white' : 'text-emerald-600'}`}>
            {stats.active}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('blocked')}
          className={`text-left p-4 rounded-xl border transition cursor-pointer ${
            statusFilter === 'blocked'
              ? 'bg-red-600 text-white border-red-600 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className={`text-xs block ${statusFilter === 'blocked' ? 'text-red-100' : 'text-slate-500'}`}>
            Blocked Users
          </span>
          <span className={`text-2xl font-bold mt-1 block ${statusFilter === 'blocked' ? 'text-white' : 'text-red-600'}`}>
            {stats.blocked}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('verified')}
          className={`text-left p-4 rounded-xl border transition cursor-pointer ${
            statusFilter === 'verified'
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className={`text-xs block ${statusFilter === 'verified' ? 'text-blue-100' : 'text-slate-500'}`}>
            Verified Users
          </span>
          <span className={`text-2xl font-bold mt-1 block ${statusFilter === 'verified' ? 'text-white' : 'text-blue-600'}`}>
            {stats.verified}
          </span>
        </button>
      </div>

      {/* Alerts / Feedback */}
      {notification && (
        <div
          className={`rounded-xl px-4 py-3 text-sm flex items-center justify-between border ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600" />
            ) : (
              <AlertTriangle size={16} className="text-red-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by user name, phone or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium overflow-x-auto">
          {(
            [
              { id: 'all', label: `All (${stats.total})` },
              { id: 'active', label: `Active (${stats.active})` },
              { id: 'blocked', label: `Blocked (${stats.blocked})` },
              { id: 'verified', label: `Verified (${stats.verified})` },
              { id: 'unverified', label: `Unverified (${stats.total - stats.verified})` },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Phone Number</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Verification</th>
                <th className="px-5 py-3.5">Access Status</th>
                <th className="px-5 py-3.5">Joined</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <UserX size={36} className="text-slate-300" />
                      <p className="text-sm font-medium">
                        {search || statusFilter !== 'all'
                          ? 'No users match your criteria.'
                          : 'No users registered in database yet.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(user => {
                  const isBlocked = user.isBlocked === true;

                  return (
                    <tr
                      key={user._id}
                      className={`hover:bg-slate-50/80 transition ${
                        isBlocked ? 'bg-red-50/30' : ''
                      }`}
                    >
                      {/* Name & Avatar */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                              isBlocked
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {user.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800 block">
                              {user.fullName}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ID: {user._id.slice(-6)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-3.5 text-slate-600 font-medium font-mono text-xs">
                        {user.phoneNumber}
                      </td>

                      {/* Email */}
                      <td className="px-5 py-3.5 text-slate-600">
                        {user.email || <span className="text-slate-400 italic">None</span>}
                      </td>

                      {/* Verification Status */}
                      <td className="px-5 py-3.5">
                        {user.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-100">
                            <UserCheck size={12} /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-medium">
                            <UserX size={12} /> Unverified
                          </span>
                        )}
                      </td>

                      {/* Account Block Status */}
                      <td className="px-5 py-3.5">
                        {isBlocked ? (
                          <div>
                            <span className="inline-flex items-center gap-1.5 text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-200">
                              <Ban size={12} /> Blocked
                            </span>
                            {user.blockedReason && (
                              <p className="text-[11px] text-red-500 mt-1 truncate max-w-44" title={user.blockedReason}>
                                {user.blockedReason}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-100">
                            <ShieldCheck size={12} /> Active
                          </span>
                        )}
                      </td>

                      {/* Onboarded / Joined Date */}
                      <td className="px-5 py-3.5 text-slate-500 text-xs">
                        {new Date(user.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Actions: Block / Unblock */}
                      <td className="px-5 py-3.5 text-right">
                        {isBlocked ? (
                          <button
                            onClick={() => openBlockModal(user, 'unblock')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
                          >
                            <ShieldCheck size={13} />
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => openBlockModal(user, 'block')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 transition cursor-pointer"
                          >
                            <Ban size={13} />
                            Block User
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Block / Unblock */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    blockActionType === 'block'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  {blockActionType === 'block' ? <Ban size={22} /> : <ShieldCheck size={22} />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    {blockActionType === 'block' ? 'Block User Account' : 'Unblock User Account'}
                  </h3>
                  <p className="text-xs text-slate-500">RESQGo Access Control</p>
                </div>
              </div>
              <button
                onClick={closeBlockModal}
                disabled={isSubmittingAction}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Target User Summary Card */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Full Name:</span>
                  <span className="font-bold text-slate-800">{selectedUser.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Phone:</span>
                  <span className="font-mono text-slate-700">{selectedUser.phoneNumber}</span>
                </div>
                {selectedUser.email && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Email:</span>
                    <span className="text-slate-700">{selectedUser.email}</span>
                  </div>
                )}
              </div>

              {blockActionType === 'block' ? (
                <>
                  <div className="flex items-start gap-2.5 text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <ShieldAlert size={16} className="shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      Blocking this user will instantly reject their mobile app logins and terminate
                      their active app sessions.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Reason for Blocking (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Terms violation, spam requests, abuse"
                      value={blockReason}
                      onChange={e => setBlockReason(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-start gap-2.5 text-xs text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-600" />
                  <span>
                    Unblocking will immediately restore the user&apos;s ability to sign in and request
                    emergency services through the RESQGo app.
                  </span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={closeBlockModal}
                disabled={isSubmittingAction}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg transition hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmToggleBlock}
                disabled={isSubmittingAction}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition disabled:opacity-50 cursor-pointer flex items-center gap-1.5 ${
                  blockActionType === 'block'
                    ? 'bg-red-600 hover:bg-red-700 shadow-xs'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-xs'
                }`}
              >
                {isSubmittingAction ? (
                  <span>Updating...</span>
                ) : blockActionType === 'block' ? (
                  <>
                    <Ban size={13} />
                    <span>Confirm Block User</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={13} />
                    <span>Confirm Unblock</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
