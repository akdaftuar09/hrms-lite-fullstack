// import { useEffect, useState } from "react";
// import api from "../services/api";

// function Dashboard() {
//   const [employeeCount, setEmployeeCount] = useState(0);
//   const [presentCount, setPresentCount] = useState(0);

//   useEffect(() => {
//     fetchSummary();
//   }, []);

//   const fetchSummary = async () => {
//     try {
//       const employees = await api.get("/employees");
//       setEmployeeCount(employees.data.length);

//       const today = new Date().toISOString().split("T")[0];
//       let present = 0;

//       for (let emp of employees.data) {
//         const attendance = await api.get(`/attendance/${emp.employee_id}`);

//         const todayAttendance = attendance.data.find(
//           (item) => item.date === today && item.status === "Present"
//         );

//         if (todayAttendance) {
//           present++;
//         }
//       }

//       setPresentCount(present);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//       <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
//         <p className="text-sm font-medium text-slate-500 mb-2">
//           Total Employees
//         </p>
//         <h2 className="text-4xl font-bold text-slate-900">
//           {employeeCount}
//         </h2>
//       </div>

//       <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
//         <p className="text-sm font-medium text-slate-500 mb-2">
//           Present Today
//         </p>
//         <h2 className="text-4xl font-bold text-slate-900">
//           {presentCount}
//         </h2>
//       </div>

//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import api from "../services/api";

function StatCard({ label, value, icon, gradient, glowColor, loading }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]
                    bg-white/[0.04] backdrop-blur-xl p-6
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                    hover:bg-white/[0.07] transition-all duration-300 group">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                       ${glowColor} blur-xl rounded-2xl`} />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-3">{label}</p>
          {loading ? (
            <div className="w-16 h-9 bg-white/10 rounded-lg animate-pulse" />
          ) : (
            <h2 className={`text-5xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
              {value}
            </h2>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient}
                         flex items-center justify-center opacity-80 flex-shrink-0 shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ refreshKey }) {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSummary(); }, [refreshKey]);

  const fetchSummary = async () => {
    try {
      const employees = await api.get("/employees");
      setEmployeeCount(employees.data.length);
      const today = new Date().toISOString().split("T")[0];
      let present = 0;
      for (let emp of employees.data) {
        const attendance = await api.get(`/attendance/${emp.employee_id}`);
        const todayAttendance = attendance.data.find(
          (item) => item.date === today && item.status === "Present"
        );
        if (todayAttendance) present++;
      }
      setPresentCount(present);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const attendanceRate = employeeCount > 0 ? Math.round((presentCount / employeeCount) * 100) : 0;
  const absentCount = employeeCount - presentCount;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-white/80 text-sm font-semibold uppercase tracking-widest">Overview</h2>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-white/30 text-xs">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Employees" value={employeeCount} loading={loading}
          gradient="from-indigo-400 to-violet-500" glowColor="bg-indigo-500/10"
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatCard label="Present Today" value={presentCount} loading={loading}
          gradient="from-emerald-400 to-teal-500" glowColor="bg-emerald-500/10"
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard label="Attendance Rate" value={`${attendanceRate}%`} loading={loading}
          gradient="from-sky-400 to-blue-500" glowColor="bg-sky-500/10"
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
        <StatCard label="Absent Today" value={absentCount} loading={loading}
          gradient="from-rose-400 to-pink-500" glowColor="bg-rose-500/10"
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>
    </div>
  );
}

export default Dashboard;