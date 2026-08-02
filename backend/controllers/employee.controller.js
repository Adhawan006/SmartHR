import { db } from "../config/firebase.js";

// Add Employee
export const addEmployee = async (req, res) => {
    try {
        const {
            employeeId,
            firstName,
            lastName,
            email,
            department,
        } = req.body;

        if (
            !employeeId ||
            !firstName ||
            !lastName ||
            !email ||
            !department
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
        }

        const existingEmployee = await db
            .collection("employees")
            .doc(employeeId)
            .get();

        if (existingEmployee.exists) {
            return res.status(400).json({
                success: false,
                message: "Employee ID already exists.",
            });
        }

        const employee = {
            ...req.body,
            joiningDate: new Date().toISOString(),
        };

        await db
            .collection("employees")
            .doc(employeeId)
            .set(employee);

        return res.status(201).json({
            success: true,
            message: "Employee added successfully",
            employee,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Employees
export const getAllEmployees = async (req, res) => {
    try {
        const snapshot = await db
            .collection("employees")
            .get();

        const employees = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json({
            success: true,
            count: employees.length,
            employees,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Employee By ID
export const getEmployeeById = async (req, res) => {
    try {
        const doc = await db
            .collection("employees")
            .doc(req.params.id)
            .get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            employee: {
                id: doc.id,
                ...doc.data(),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Employee
export const updateEmployee = async (req, res) => {
    try {
        const doc = await db
            .collection("employees")
            .doc(req.params.id)
            .get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        await db
            .collection("employees")
            .doc(req.params.id)
            .update(req.body);

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
    try {
        const doc = await db
            .collection("employees")
            .doc(req.params.id)
            .get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        await db
            .collection("employees")
            .doc(req.params.id)
            .delete();

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Search Employee
export const searchEmployee = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name query parameter is required.",
            });
        }

        const snapshot = await db.collection("employees").get();

        const employees = snapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter((employee) => {
                const fullName = `${employee.firstName || ""} ${
                    employee.lastName || ""
                }`.toLowerCase();

                return fullName.includes(name.toLowerCase());
            });

        return res.status(200).json({
            success: true,
            count: employees.length,
            employees,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};