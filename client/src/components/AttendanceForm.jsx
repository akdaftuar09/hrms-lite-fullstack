import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AttendanceForm() {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/attendance/", form);
    toast.success("Attendance submitted successfully")

    setForm({
      employee_id: "",
      date: "",
      status: "Present"
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 p-8">

      <div className="h-1 w-16 bg-slate-900 rounded-full mb-6"></div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Mark Attendance
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Record daily employee attendance status
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
          className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
          className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <div className="pt-14 md:pt-16">
          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-3 font-medium transition-all shadow-md">
            Submit Attendance
          </button>
        </div>

      </form>
    </div>
  );
}

export default AttendanceForm;