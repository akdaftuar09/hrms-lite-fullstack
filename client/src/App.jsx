import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceTable from "./components/AttendanceTable";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          HRMS Lite Dashboard
        </h1>
        <p className="text-gray-500 mb-6">
           Manage employees and track attendance
        </p>
          <Dashboard />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmployeeForm />
          <AttendanceForm />
        </div>

        <div className="mt-8">
          <EmployeeTable />
        </div>

        <div className="mt-8">
          <AttendanceTable />
        </div>

      </div>
    </div>
  );
}

export default App;