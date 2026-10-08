import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, Truck, LayoutDashboard, LogOut } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-4">
        <div>
          <h2 className="text-xl font-bold tracking-wider text-red-500 mb-6">RESQGo Admin</h2>
          <nav className="space-y-2">
            <Link to="/" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/dispatch" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition">
              <ShieldAlert size={20} /> Live Dispatch
            </Link>
            <Link to="/responders" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition">
              <Truck size={20} /> Responders
            </Link>
            <Link to="/users" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition">
              <Users size={20} /> Users
            </Link>
          </nav>
        </div>

        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 p-2 rounded hover:bg-red-950 text-red-400 transition cursor-pointer"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}