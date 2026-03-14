import Attendance from "../models/Attendance.js";

export const saveBulkAttendance = async (req, res) => {
    try {
        const records = req.body;

        if (!Array.isArray(records)) {
            return res.status(400).json({
                message: "Invalid attendance data",
            });
        }


        const operations = records.map(record => {

            const normalizedDate = new Date(record.date);
            normalizedDate.setHours(0, 0, 0, 0);

            return {
                updateOne: {
                    filter: {
                        employeeId: record.employeeId,
                        date: normalizedDate
                    },
                    update: {
                        $set: {
                            status: record.status
                        }
                    },
                    upsert: true
                }
            };

        });

        await Attendance.bulkWrite(operations);

        res.json({
            message: "Attendance saved successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to save attendance",
        });
    }
};

export const getAttendance = async (req, res) => {
    try {
        const records = await Attendance.find()
            .populate("employeeId", "employeeId fullName")
            .sort({ date: -1 });

        res.json(records);
    } catch {
        res.status(500).json({
            message: "Failed to fetch attendance",
        });
    }
};

export const getEmployeeAttendance = async (req, res) => {

    try {

        const { employeeId } = req.params;
        const { month, year } = req.query;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const records = await Attendance.find({
            employeeId,
            date: { $gte: startDate, $lte: endDate }
        });

        res.json(records);

    } catch {

        res.status(500).json({
            message: "Failed to fetch attendance"
        });

    }

};

export const getAttendanceByDate = async (req, res) => {
  try {

    const { date } = req.query;

    const start = new Date(date);
    start.setHours(0,0,0,0);

    const end = new Date(date);
    end.setHours(23,59,59,999);

    const records = await Attendance.find({
      date: { $gte: start, $lte: end }
    });

    res.json(records);

  } catch {

    res.status(500).json({
      message: "Failed to fetch attendance"
    });

  }
};