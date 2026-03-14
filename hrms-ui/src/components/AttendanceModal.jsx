import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import Button from "./common/Button";

function AttendanceModal({ employee, onClose }) {

    const today = new Date();

    const [month] = useState(today.getMonth() + 1);
    const [year] = useState(today.getFullYear());

    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(true);

    const daysInMonth = new Date(year, month, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    useEffect(() => {

        const fetchAttendance = async () => {

            try {

                const res = await API.get(
                    `/attendance/employee/${employee._id}?month=${month}&year=${year}`
                );

                const map = {};

                res.data.forEach((rec) => {

                    const d = new Date(rec.date).getDate();

                    map[d] = rec.status;

                });

                setAttendance(map);

            } catch {
                toast.error("Failed to load attendance")
                console.error("Failed to load attendance");

            } finally {

                setLoading(false);

            }

        };

        fetchAttendance();

    }, [employee._id, month, year]);

    const toggleAttendance = (day) => {

        setAttendance((prev) => {

            const current = prev[day];

            let next;

            if (current === "Present") next = "Absent";
            else if (current === "Absent") next = "Present";
            else next = "Present";

            return {
                ...prev,
                [day]: next
            };

        });

    };

    const presentCount =
        Object.values(attendance).filter((v) => v === "Present").length;

    const absentCount =
        Object.values(attendance).filter((v) => v === "Absent").length;

    const totalDays = days.length;

    const percentage =
        totalDays ? Math.round((presentCount / totalDays) * 100) : 0;

    const handleSave = async () => {

    const payload = Object.entries(attendance).map(
        ([day, status]) => ({
            employeeId: employee._id,
            date: new Date(Date.UTC(year, month - 1, Number(day))),
            status
        })
    );

    try {

        await API.post("/attendance/bulk", payload);

        toast.success("Changes saved Successfully");

        onClose();

    } catch {

        toast.error("Failed to save changes");

    }

};

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow">
                    Loading attendance...
                </div>
            </div>
        );
    }

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">

                <div className="flex justify-between items-center mb-4">

                    <h3 className="text-lg font-semibold">

                        Attendance - {employee.fullName} ({employee.employeeId})

                    </h3>
                    

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>

                </div>
                <p className="mb-4">Please toggle on date to mark present or absent</p>

                <div className="grid grid-cols-7 gap-2">

                    {days.map((day) => {

                        const status = attendance[day];

                        let style =
                            "bg-gray-200 text-gray-700";

                        if (status === "Present")
                            style = "bg-green-500 text-white";

                        if (status === "Absent")
                            style = "bg-red-500 text-white";

                        return (

                            <div
                                key={day}
                                onClick={() => toggleAttendance(day)}
                                className={`cursor-pointer text-center p-2 rounded font-medium ${style}`}
                            >
                                {day}
                            </div>

                        );

                    })}

                </div>

                <div className="mt-6 text-sm text-gray-700 space-y-1">

                    <div>
                        Month: {month}/{year}
                    </div>

                    <div>
                        Total Days: {totalDays}
                    </div>

                    <div>
                        Present: {presentCount}
                    </div>

                    <div>
                        Absent: {absentCount}
                    </div>

                    <div>
                        Attendance Percentage: {percentage}%
                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>

                </div>

            </div>

        </div>

    );

}

export default AttendanceModal;