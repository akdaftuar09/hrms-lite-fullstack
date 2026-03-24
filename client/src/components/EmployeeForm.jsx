import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function EmployeeForm() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/employees/", form);
    toast.success("Employee saved successfully")

    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: ""
    });

    window.location.reload();
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 p-8">

      <div className="h-1 w-16 bg-slate-900 rounded-full mb-6"></div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Add Employee
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Register new employee details into the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-3 font-medium transition-all shadow-md">
          Save Employee
        </button>

      </form>
    </div>
  );
}

export default EmployeeForm;