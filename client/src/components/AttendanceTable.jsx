import { useState } from "react";
import api from "../services/api";

function AttendanceTable() {
  const [employeeId, setEmployeeId] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchAttendance = async () => {
    try {
      const response = await api.get(`/attendance/${employeeId}`);
      let data = response.data;

      if (selectedDate) {
        data = data.filter((item) => item.date === selectedDate);
      }

      setRecords(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 p-8">

      <div className="h-1 w-16 bg-slate-900 rounded-full mb-6"></div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Attendance Records
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Track employee attendance history by employee ID and date
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <input
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-slate-300 rounded-2xl px-4 py-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <button
          onClick={fetchAttendance}
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-4 py-3 font-medium shadow-md transition-all"
        >
          View Attendance
        </button>

      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b">
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-4">{item.date}</td>
                  <td className="p-4 font-medium text-slate-800">
                    {item.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-4 text-center text-slate-400">
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