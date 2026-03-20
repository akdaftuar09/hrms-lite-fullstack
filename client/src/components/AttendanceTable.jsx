import { useState } from "react";
import api from "../services/api";

function AttendanceTable() {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    try {
      const response = await api.get(`/attendance/${employeeId}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border rounded-lg p-3 flex-1"
        />

        <button
          onClick={fetchAttendance}
          className="bg-blue-600 text-white rounded-lg px-4 py-3"
        >
          View Attendance
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-3 text-center text-gray-500">
                  No attendance records
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AttendanceTable;