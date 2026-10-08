import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

function DashboardHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-800">Operational Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Active Emergencies</p>
          <p className="text-3xl font-bold text-red-600 mt-2">12</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Responders Online</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">28</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <p className="text-slate-500 text-sm">Avg. Response Time</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">6.4m</p>
        </div>
      </div>
    </div>
  );
}

function LiveDispatch() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Live Dispatch & Incident Map</h1>
      <p className="text-slate-500 mt-1">Real-time tracking of active requests and responders.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="dispatch" element={<LiveDispatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}