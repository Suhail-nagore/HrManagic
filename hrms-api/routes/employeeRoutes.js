import express from "express";
import {
  createEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.delete("/:id", deleteEmployee);
router.put("/:id", updateEmployee);

export default router;