import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function InputField({ name, placeholder, value, onChange, type = "text", icon }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors">
        {icon}
      </div>
      <input
        name={name} type={type} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl
                   pl-11 pr-4 py-3.5 text-white placeholder-white/25 text-sm
                   focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08]
                   hover:border-white/[0.14] transition-all duration-200"
      />
    </div>
  );
}

function EmployeeForm({ onEmployeeAdded }) {
  const [form, setForm] = useState({ employee_id: "", full_name: "", email: "", department: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/employees/", form);
      toast.success("Employee saved successfully");
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      onEmployeeAdded();
    } catch (err) {
      const message = err.response?.data?.detail || "Failed to save employee"
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]
                    bg-white/[0.04] backdrop-blur-xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="flex items-center gap-3 mb-7">
        <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <div>
          <h2 className="text-white font-semibold text-base">Add Employee</h2>
          <p className="text-white/35 text-xs mt-0.5">Register new employee into the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <InputField name="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={handleChange}
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
        />
        <InputField name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange}
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
        />
        <InputField name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange}
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <InputField name="department" placeholder="Department" value={form.department} onChange={handleChange}
          icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
        <button type="submit" disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500
                     disabled:opacity-50 text-white rounded-xl py-3.5 text-sm font-semibold
                     shadow-lg shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center gap-2">
          {loading ? "Saving..." : "Save Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;