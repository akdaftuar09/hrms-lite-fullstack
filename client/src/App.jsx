import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceTable from "./components/AttendanceTable";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                HRMS Lite
              </h1>

              <p className="text-slate-500 mt-3 text-lg max-w-2xl">
                A modern employee management workspace designed for fast
                administration, attendance tracking, and workforce visibility.
              </p>
            </div>

            <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-md">
              <p className="text-sm text-slate-300">System Status</p>
              <p className="text-xl font-semibold">Operational</p>
            </div>

          </div>

        </div>

        <Dashboard />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8 items-stretch">
          <EmployeeForm />
          <AttendanceForm />
        </div>

        <div className="mt-10">
          <EmployeeTable />
        </div>

        <div className="mt-10">
          <AttendanceTable />
        </div>

      </div>
    </div>
  );
}

export default App;