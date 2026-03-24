import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 p-8">

      <div className="h-1 w-16 bg-slate-900 rounded-full mb-6"></div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Employee Records
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          View and manage registered employees
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr
                  key={emp.employee_id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-4">{emp.employee_id}</td>
                  <td className="p-4 font-medium text-slate-800">
                    {emp.full_name}
                  </td>
                  <td className="p-4">{emp.department}</td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteEmployee(emp.employee_id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-400">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;