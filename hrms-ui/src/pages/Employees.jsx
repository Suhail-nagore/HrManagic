import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import API from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeAdded = (newEmployee) => {
    setEmployees((prev) => [newEmployee, ...prev]);
  };

  const handleEmployeeDeleted = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Employee Management
      </h2>
      <EmployeeList
        employees={employees}
        loading={loading}
        onEmployeeDeleted={handleEmployeeDeleted}
        onEmployeeAdded={handleEmployeeAdded}
      />
    </div>
  );
}

export default Employees;