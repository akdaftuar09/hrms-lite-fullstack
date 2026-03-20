import { useEffect, useState } from "react";
import api from "../services/api";
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
   try {
     await api.delete(`/employees/${id}`);
     fetchEmployees();
   } catch (error) {
     console.error("Error deleting employee:", error);
   }
 };
 useEffect(() => {
   fetchEmployees();
 }, []);
 return (
<div className="bg-white rounded-2xl shadow-sm p-6 border">
<h2 className="text-xl font-semibold mb-4">Employee Records</h2>
<div className="overflow-x-auto">
<table className="w-full">
<thead>
<tr className="text-left border-b">
<th className="p-3">ID</th>
<th className="p-3">Name</th>
<th className="p-3">Department</th>
<th className="p-3">Action</th>
</tr>
</thead>
<tbody>
           {employees.length > 0 ? (
             employees.map((emp) => (
<tr key={emp.employee_id} className="border-b">
<td className="p-3">{emp.employee_id}</td>
<td className="p-3">{emp.full_name}</td>
<td className="p-3">{emp.department}</td>
<td className="p-3">
<button
                     onClick={() => deleteEmployee(emp.employee_id)}
                     className="text-red-500"
>
                     Delete
</button>
</td>
</tr>
             ))
           ) : (
<tr>
<td colSpan="4" className="p-3 text-center text-gray-500">
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