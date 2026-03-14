import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* Prevent duplicate attendance for same employee + date */

attendanceSchema.index(
  { employeeId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);