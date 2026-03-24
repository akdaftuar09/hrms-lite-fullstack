import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [presentCount, setPresentCount] = useState(0);

  useEffect(() => {
    fetchSummary();
  }, []);

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

        if (todayAttendance) {
          present++;
        }
      }

      setPresentCount(present);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
        <p className="text-sm font-medium text-slate-500 mb-2">
          Total Employees
        </p>
        <h2 className="text-4xl font-bold text-slate-900">
          {employeeCount}
        </h2>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
        <p className="text-sm font-medium text-slate-500 mb-2">
          Present Today
        </p>
        <h2 className="text-4xl font-bold text-slate-900">
          {presentCount}
        </h2>
      </div>

    </div>
  );
}

export default Dashboard;