import express from "express";
import {
  saveBulkAttendance,
  getAttendance,
  getEmployeeAttendance,
  getAttendanceByDate,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/bulk", saveBulkAttendance);
router.get("/", getAttendance);
router.get("/employee/:employeeId", getEmployeeAttendance);
router.get("/date", getAttendanceByDate);

export default router;