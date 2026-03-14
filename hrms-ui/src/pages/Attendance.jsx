import AttendanceTable from "../components/AttendanceTable";

function Attendance() {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold text-gray-800">
        Attendance Management
      </h2>

      <AttendanceTable />

    </div>
  );
}

export default Attendance;