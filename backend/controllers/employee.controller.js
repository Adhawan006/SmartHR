import { db } from "../config/firebase.js";

// Add Employee
export const addEmployee = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const employee = {
            ...req.body,
            joiningDate: new Date().toISOString(),
        };

        await db
            .collection("employees")
            .doc(employee.employeeId)
            .set(employee);

        return res.status(201).json({
            success: true,
            message: "Employee added successfully",
            employee,
        });
    } catch (error) {
        console.log("ADD EMPLOYEE ERROR:", error);

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
        await db
            .collection("employees")
            .doc(req.params.id)
            .update(req.body);

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
    try {
        await db
            .collection("employees")
            .doc(req.params.id)
            .delete();

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Search Employee
export const searchEmployee = async (req, res) => {
    try {
        const { name } = req.query;

        const snapshot = await db
            .collection("employees")
            .get();

        const employees = snapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter((employee) => {
                const fullName =
                    `${employee.firstName} ${employee.lastName}`.toLowerCase();

                return fullName.includes(
                    name.toLowerCase()
                );
            });

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