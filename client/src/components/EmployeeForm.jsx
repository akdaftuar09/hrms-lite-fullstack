import { useState } from "react";
import api from "../services/api";

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

    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: ""
    });

    window.location.reload();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border">
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button className="w-full bg-blue-600 text-white rounded-lg p-3">
          Save Employee
        </button>

      </form>
    </div>
  );
}

export default EmployeeForm;