// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// function EmployeeTable() {
//   const [employees, setEmployees] = useState([]);

//   const fetchEmployees = async () => {
//     try {
//       const response = await api.get("/employees/");
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const deleteEmployee = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this employee?"
//     );
  
//     if (!confirmDelete) return;
  
//     try {
//       await api.delete(`/employees/${id}`);
//       toast.success("Employee deleted successfully");
//       fetchEmployees();
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   return (
//     <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 p-8">

//       <div className="h-1 w-16 bg-slate-900 rounded-full mb-6"></div>

//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold text-slate-900">
//           Employee Records
//         </h2>
//         <p className="text-slate-500 text-sm mt-1">
//           View and manage registered employees
//         </p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">

//           <thead>
//             <tr className="bg-slate-50 text-slate-600 border-b">
//               <th className="p-4 text-left">ID</th>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Department</th>
//               <th className="p-4 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {employees.length > 0 ? (
//               employees.map((emp) => (
//                 <tr
//                   key={emp.employee_id}
//                   className="border-b hover:bg-slate-50 transition"
//                 >
//                   <td className="p-4">{emp.employee_id}</td>
//                   <td className="p-4 font-medium text-slate-800">
//                     {emp.full_name}
//                   </td>
//                   <td className="p-4">{emp.department}</td>
//                   <td className="p-4">
//                     <button
//                       onClick={() => deleteEmployee(emp.employee_id)}
//                       className="text-red-500 hover:text-red-700 font-medium"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="p-4 text-center text-slate-400">
//                   No employees found
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }

// export default EmployeeTable;

import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-violet-600", "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600", "from-amber-500 to-orange-600", "from-sky-500 to-blue-600",
];

const DEPT_COLORS = {
  Engineering: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  Design: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  HR: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  Marketing: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  Finance: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  default: "bg-sky-500/15 text-sky-400 border-sky-500/20",
};

function getInitials(name) {
  return name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
}

function EmployeeTable({refreshKey, onEmployeeDeleted }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees/");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee deleted successfully");
      fetchEmployees();
      onEmployeeDeleted();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchEmployees(); }, [refreshKey]);

  const filtered = employees.filter((e) =>
    e.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    e.department?.toLowerCase().includes(search.toLowerCase()) ||
    e.employee_id?.toString().includes(search)
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]
                    bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold text-base">Employee Records</h2>
            <p className="text-white/35 text-xs mt-0.5">{employees.length} total employees</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5
                       text-white placeholder-white/25 text-sm w-56 focus:outline-none
                       focus:border-indigo-500/50 transition-all duration-200" />
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 space-y-3">
            {[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-white/[0.04] rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Employee", "ID", "Department", "Email", "Action"].map((h, i) => (
                  <th key={h} className={`px-6 py-3.5 text-white/30 text-xs font-semibold uppercase tracking-wider ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((emp, index) => (
                <tr key={emp.employee_id} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]}
                                      flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {getInitials(emp.full_name)}
                      </div>
                      <span className="text-white font-medium">{emp.full_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/50 font-mono text-xs">{emp.employee_id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border
                                     ${DEPT_COLORS[emp.department] || DEPT_COLORS.default}`}>
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/40 text-xs">{emp.email}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => deleteEmployee(emp.employee_id)}
                      className="bg-rose-500/10
                                 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20
                                 rounded-lg px-3 py-1.5 text-xs font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="px-6 py-16 text-center text-white/25 text-sm">No employees found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeeTable;