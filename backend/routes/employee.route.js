import express from "express";

import {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
} from "../controllers/employee.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, authorize("admin", "hr"), addEmployee);

router.get("/", protect, getAllEmployees);

router.get("/search", protect, searchEmployee);

router.get("/:id", protect, getEmployeeById);

router.put("/update/:id", protect, authorize("admin", "hr"), updateEmployee);

router.delete("/delete/:id", protect, authorize("admin", "hr"), deleteEmployee);

export default router;
