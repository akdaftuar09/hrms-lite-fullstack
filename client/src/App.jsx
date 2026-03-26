import { useState } from "react";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceTable from "./components/AttendanceTable";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div className="min-h-screen bg-[#0f1117] text-white font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] bg-sky-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10">
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6
                          bg-white/[0.04] border border-white/[0.08] rounded-2xl px-8 py-6
                          backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600
                              flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  HRMS Lite
                </h1>
                <p className="text-white/40 text-sm mt-0.5">Employee Management System — Ethara AI</p>
              </div>
            </div>
            <span className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20
                             text-emerald-400 text-sm px-4 py-2 rounded-full font-medium w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              System Operational
            </span>
          </div>
        </header>

        <Dashboard refreshKey={refreshKey} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          <EmployeeForm onEmployeeAdded={handleRefresh} />
          <AttendanceForm onAttendanceAdded={handleRefresh} />
        </div>

        <div className="mt-8">
          <EmployeeTable refreshKey={refreshKey} onEmployeeDeleted={handleRefresh} />
        </div>

        <div className="mt-8 mb-10">
          <AttendanceTable />
        </div>
      </div>
    </div>
  );
}

export default App;