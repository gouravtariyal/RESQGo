import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, Truck, LayoutDashboard, LogOut } from 'lucide-react';

type NavItem = { to: string; icon: React.ReactNode; label: string; end?: boolean };

const navItems: NavItem[] = [
  { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
  { to: '/dispatch', icon: <ShieldAlert size={20} />, label: 'Live Dispatch' },
  { to: '/responders', icon: <Truck size={20} />, label: 'Responders' },
  { to: '/users', icon: <Users size={20} />, label: 'Users' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();

  const adminUser = (() => {
    try {
      const raw = localStorage.getItem('admin_user');
      return raw ? (JSON.parse(raw) as { name: string; email: string; role: string }) : null;
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-4">
        <div>
          <h2 className="text-xl font-bold tracking-wider text-red-500 mb-6">RESQGo Admin</h2>
          <nav className="space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2.5 rounded-lg transition text-sm font-medium ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User info + logout */}
        <div className="space-y-3">
          {adminUser && (
            <div className="px-2 py-2 border-t border-slate-700 pt-3">
              <p className="text-sm font-medium text-white truncate">{adminUser.name}</p>
              <p className="text-xs text-slate-400 truncate">{adminUser.email}</p>
              <span className="inline-block mt-1 text-xs text-red-400 capitalize">{adminUser.role}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-red-950 text-red-400 transition cursor-pointer text-sm font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}