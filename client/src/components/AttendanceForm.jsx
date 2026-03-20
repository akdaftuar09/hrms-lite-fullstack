import { useState } from "react";
import api from "../services/api";
function AttendanceForm() {
 const [form, setForm] = useState({
   employee_id: "",
   date: "",
   status: "Present"
 });
 const handleSubmit = async (e) => {
   e.preventDefault();
   await api.post("/attendance/", form);
   setForm({
     employee_id: "",
     date: "",
     status: "Present"
   });
 };
 return (
<div className="bg-white rounded-2xl shadow-sm p-6 border">
<h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input
         placeholder="Employee ID"
         value={form.employee_id}
         onChange={(e) =>
           setForm({ ...form, employee_id: e.target.value })
         }
         className="w-full border rounded-lg p-3"
       />
<input
         type="date"
         value={form.date}
         onChange={(e) =>
           setForm({ ...form, date: e.target.value })
         }
         className="w-full border rounded-lg p-3"
       />
<select
         value={form.status}
         onChange={(e) =>
           setForm({ ...form, status: e.target.value })
         }
         className="w-full border rounded-lg p-3"
>
<option>Present</option>
<option>Absent</option>
</select>
<button className="w-full bg-blue-600 text-white rounded-lg p-3">
         Submit Attendance
</button>
</form>
</div>
 );
}
export default AttendanceForm;