import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import SearchInput from "./common/SearchInput";
import Button from "./common/Button";

function AttendanceTable() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [attendance, setAttendance] = useState({});
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadData = async (selectedDate) => {
        try {
            setLoading(true);

            const [empRes, attRes] = await Promise.all([
                API.get("/employees"),
                API.get(`/attendance/date?date=${selectedDate}`)
            ]);

            const employeesData = empRes.data;
            const attendanceRecords = attRes.data;

            setEmployees(employeesData);

            const map = {};

            employeesData.forEach((emp) => {
                map[emp._id] = "Present";
            });

            attendanceRecords.forEach((rec) => {
                map[rec.employeeId] = rec.status;
            });

            setAttendance(map);

        } catch {
            toast.error("Failed to load attendance");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(date);
    }, [date]);

    const handleStatusChange = (employeeId, status) => {
        setAttendance((prev) => ({
            ...prev,
            [employeeId]: status,
        }));
    };

    const handleSave = async () => {
        const payload = employees.map((emp) => ({
            employeeId: emp._id,
            date,
            status: attendance[emp._id],
        }));

        try {
            setSaving(true);

            await API.post("/attendance/bulk", payload);

            toast.success("Attendance saved successfully");

        } catch {
            toast.error("Failed to save attendance");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow flex flex-col h-[700px]">
                Loading employees...
            </div>
        );
    }

    const filteredEmployees = employees.filter((emp) => {
        const input = search.toLowerCase();
        return (
            emp.fullName.toLowerCase().includes(input) || emp.employeeId.toLowerCase().includes(input)
        );
    })

    if (employees.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow flex flex-col h-[700px]">
                No employees available to mark attendance.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow flex flex-col h-[700px]">
            <div className="flex items-center justify-between p-4 border-b">
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or ID"
                />
                <div className="flex items-center gap-4 text-sm text-gray-600">

                    <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                        Present
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                        Absent
                    </div>

                </div>
                <div className="flex items-center gap-3">

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border rounded-md px-3 py-1"
                    />

                    <Button  disabled ={saving} variant="primary" onClick={handleSave}>
                        Save
                    </Button>

                </div>

            </div>
            <div className="flex-1 overflow-y-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">

                        <tr>
                            <th className="p-3 text-left">Employee ID</th>
                            <th className="p-3 text-left">Employee Name</th>
                            <th className="p-3 text-center">Present</th>
                            <th className="p-3 text-center">Absent</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredEmployees.length === 0 ? (

                            <tr>
                                <td colSpan="4" className="text-center p-6 text-gray-500">
                                    No matched results.
                                </td>
                            </tr>

                        ) : (

                            filteredEmployees.map((emp) => {

                                const status = attendance[emp._id];

                                return (

                                    <tr
                                        key={emp._id}
                                        className={`border-t transition-colors hover:bg-gray-100
                                                 ${status === "Absent"
                                                ? "bg-red-50"
                                                : status === "Present"
                                                    ? "bg-green-50"
                                                    : ""
                                            }
                                        `}
                                    >

                                        <td className="p-3 font-medium text-gray-700">

                                            <div className="flex items-center gap-2">

                                                <span
                                                    className={`w-2.5 h-2.5 rounded-full
                                                             ${status === "Present"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                        }
                                                `}
                                                ></span>

                                                {emp.employeeId}

                                            </div>

                                        </td>

                                        <td className="p-3 font-medium text-gray-700">
                                            {emp.fullName}
                                        </td>

                                        <td className="p-3 text-center">
                                            <input
                                                type="radio"
                                                name={emp._id}
                                                checked={status === "Present"}
                                                onChange={() =>
                                                    handleStatusChange(emp._id, "Present")
                                                }
                                            />
                                        </td>

                                        <td className="p-3 text-center">
                                            <input
                                                type="radio"
                                                name={emp._id}
                                                checked={status === "Absent"}
                                                onChange={() =>
                                                    handleStatusChange(emp._id, "Absent")
                                                }
                                            />
                                        </td>

                                    </tr>

                                );

                            })

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AttendanceTable;