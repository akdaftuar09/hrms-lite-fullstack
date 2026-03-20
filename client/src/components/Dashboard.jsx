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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-gray-500">Total Employees</h3>
        <p className="text-3xl font-bold">{employeeCount}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-gray-500">Present Today</h3>
        <p className="text-3xl font-bold">{presentCount}</p>
      </div>

    </div>
  );
}

export default Dashboard;