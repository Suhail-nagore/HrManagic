import Employee from "../models/Employee.js";

/* CREATE EMPLOYEE */
export const createEmployee = async (req, res) => {
  try {
    const { fullName, email, department } = req.body;

    if (!fullName || !email || !department) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check duplicate email
    const existing = await Employee.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Employee with this email already exists",
      });
    }

    // find last employee
    const lastEmployee = await Employee.findOne()
      .sort({ createdAt: -1 });

    let newEmployeeId = "EMP001";

    if (lastEmployee) {
      const lastNumber = parseInt(
        lastEmployee.employeeId.replace("EMP", "")
      );

      const nextNumber = lastNumber + 1;

      newEmployeeId =
        "EMP" + String(nextNumber).padStart(3, "0");
    }

    const employee = await Employee.create({
      employeeId: newEmployeeId,
      fullName,
      email,
      department,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

/* GET ALL EMPLOYEES */

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({
      createdAt: -1,
    });

    res.json(employees);
  } catch {
    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }
};

/* DELETE EMPLOYEE */

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message: "Employee deleted",
    });
  } catch {
    res.status(500).json({
      message: "Failed to delete employee",
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {

    const { fullName, email, department } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        email,
        department
      },
      { new: true }
    );

    res.json(employee);

  } catch {

    res.status(500).json({
      message: "Failed to update employee"
    });

  }
};