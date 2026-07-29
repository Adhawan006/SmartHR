import express from "express";

import {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

// Employee Routes
router.post("/add", addEmployee);

router.get("/", getAllEmployees);

router.get("/search", searchEmployee);

router.get("/:id", getEmployeeById);

router.put("/update/:id", updateEmployee);

router.delete("/delete/:id", deleteEmployee);
router.post("/add", addEmployee);


export default router;