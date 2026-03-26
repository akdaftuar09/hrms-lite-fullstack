// import { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// function AttendanceForm() {
//   const [form, setForm] = useState({
//     employee_id: "",
//     date: "",
//     status: "Present"
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await api.post("/attendance/", form);
//     toast.success("Attendance submitted successfully")

//     setForm({
//       employee_id: "",
//       date: "",
//       status: "Present"
//     });
//   };

//   return (
//     <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 p-8">

//       <div className="h-1 w-16 bg-slate-900 rounded-full mb-6"></div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold text-slate-900">
//           Mark Attendance
//         </h2>
//         <p className="text-slate-500 text-sm mt-1">
//           Record daily employee attendance status
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           placeholder="Employee ID"
//           value={form.employee_id}
//           onChange={(e) =>
//             setForm({ ...form, employee_id: e.target.value })
//           }
//           className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
//         />

//         <input
//           type="date"
//           value={form.date}
//           onChange={(e) =>
//             setForm({ ...form, date: e.target.value })
//           }
//           className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
//         />

//         <select
//           value={form.status}
//           onChange={(e) =>
//             setForm({ ...form, status: e.target.value })
//           }
//           className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
//         >
//           <option>Present</option>
//           <option>Absent</option>
//         </select>

//         <div className="pt-14 md:pt-16">
//           <button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-3 font-medium transition-all shadow-md">
//             Submit Attendance
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// }

// export default AttendanceForm;

import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AttendanceForm({onAttendanceAdded}) {
  const [form, setForm] = useState({ employee_id: "", date: "", status: "Present" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/attendance/", form);
      toast.success("Attendance submitted successfully");
      setForm({ employee_id: "", date: "", status: "Present" });
      onAttendanceAdded();
    } catch (err) {
      const message = err.response?.data?.detail || "Failed to submit attendance";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]
                    bg-white/[0.04] backdrop-blur-xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="flex items-center gap-3 mb-7">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <h2 className="text-white font-semibold text-base">Mark Attendance</h2>
          <p className="text-white/35 text-xs mt-0.5">Record daily employee attendance status</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
          </div>
          <input placeholder="Employee ID" value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
            className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5
                       text-white placeholder-white/25 text-sm focus:outline-none focus:border-emerald-500/60
                       focus:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-200" />
        </div>

        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <input type="date" value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5
                       text-white text-sm focus:outline-none focus:border-emerald-500/60
                       focus:bg-white/[0.08] hover:border-white/[0.14] transition-all [color-scheme:dark]" />
        </div>

        <div>
          <p className="text-white/35 text-xs font-medium uppercase tracking-wider mb-2.5 px-1">Status</p>
          <div className="grid grid-cols-2 gap-2.5">
            {["Present", "Absent"].map((s) => (
              <button key={s} type="button" onClick={() => setForm({ ...form, status: s })}
                className={`py-3 rounded-xl text-sm font-semibold border transition-all duration-200
                  ${form.status === s
                    ? s === "Present"
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                      : "bg-rose-500/20 border-rose-500/50 text-rose-400"
                    : "bg-white/[0.04] border-white/[0.08] text-white/40 hover:bg-white/[0.07]"
                  }`}>
                {s === "Present" ? "✓ Present" : "✗ Absent"}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500
                     disabled:opacity-50 text-white rounded-xl py-3.5 text-sm font-semibold
                     shadow-lg shadow-emerald-500/20 transition-all duration-200 flex items-center justify-center gap-2">
          {loading ? "Submitting..." : "Submit Attendance"}
        </button>
      </form>
    </div>
  );
}

export default AttendanceForm;