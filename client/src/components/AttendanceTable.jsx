// import { useState } from "react";
// import api from "../services/api";

// function AttendanceTable() {
//   const [employeeId, setEmployeeId] = useState("");
//   const [records, setRecords] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");

//   const fetchAttendance = async () => {
//     try {
//       const response = await api.get(`/attendance/${employeeId}`);
//       let data = response.data;

//       if (selectedDate) {
//         data = data.filter((item) => item.date === selectedDate);
//       }

//       setRecords(data);
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//     }
//   };

//   return (
//     <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 p-8">

//       <div className="h-1 w-16 bg-slate-900 rounded-full mb-6"></div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold text-slate-900">
//           Attendance Records
//         </h2>
//         <p className="text-slate-500 text-sm mt-1">
//           Track employee attendance history by employee ID and date
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

//         <input
//           placeholder="Enter Employee ID"
//           value={employeeId}
//           onChange={(e) => setEmployeeId(e.target.value)}
//           className="border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
//         />

//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
//         />

//         <button
//           onClick={fetchAttendance}
//           className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-4 py-3 font-medium shadow-md transition-all"
//         >
//           View Attendance
//         </button>

//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">

//           <thead>
//             <tr className="bg-slate-50 text-slate-600 border-b">
//               <th className="p-4 text-left">Date</th>
//               <th className="p-4 text-left">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {records.length > 0 ? (
//               records.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="border-b hover:bg-slate-50 transition"
//                 >
//                   <td className="p-4">{item.date}</td>
//                   <td className="p-4 font-medium text-slate-800">
//                     {item.status}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2" className="p-4 text-center text-slate-400">
//                   No attendance records
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }

// export default AttendanceTable;

import { useState } from "react";
import api from "../services/api";

function AttendanceTable() {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchAttendance = async () => {
    if (!employeeId.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const response = await api.get(`/attendance/${employeeId}`);
      let data = response.data;
      if (selectedDate) data = data.filter((item) => item.date === selectedDate);
      setRecords(data);
    } catch (error) {
      console.error(error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]
                    bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold text-base">Attendance Records</h2>
            <p className="text-white/35 text-xs mt-0.5">Track employee attendance history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-sky-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
            </div>
            <input placeholder="Employee ID" value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchAttendance()}
              className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3
                         text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-500/60
                         focus:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-200" />
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-sky-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <input type="date" value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3
                         text-white text-sm focus:outline-none focus:border-sky-500/60
                         focus:bg-white/[0.08] hover:border-white/[0.14] transition-all [color-scheme:dark]" />
          </div>

          <button onClick={fetchAttendance} disabled={loading}
            className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500
                       disabled:opacity-50 text-white rounded-xl px-4 py-3 text-sm font-semibold
                       shadow-lg shadow-sky-500/20 transition-all duration-200 flex items-center justify-center gap-2">
            {loading ? "Loading..." : "View Attendance"}
          </button>
        </div>
      </div>

      {searched && records.length > 0 && (
        <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="text-white/30 text-xs">Summary:</span>
          <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{presentCount} Present
          </span>
          <span className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />{absentCount} Absent
          </span>
          <span className="text-white/20 text-xs ml-auto">{records.length} total records</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Date", "Day", "Status"].map((h) => (
                <th key={h} className="px-6 py-3.5 text-left text-white/30 text-xs font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? records.map((item, index) => {
              const isPresent = item.status === "Present";
              const dayName = new Date(item.date).toLocaleDateString("en-IN", { weekday: "short" });
              return (
                <tr key={index} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{item.date}</td>
                  <td className="px-6 py-4 text-white/40 text-xs">{dayName}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border
                      ${isPresent ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? "bg-emerald-400" : "bg-rose-400"}`} />
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="3" className="px-6 py-16 text-center text-white/25 text-sm">
                {searched ? "No records found" : "Enter an Employee ID to view records"}
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTable;