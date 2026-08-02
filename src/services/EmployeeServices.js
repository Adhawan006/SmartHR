// src/services/employeeService.js

import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

// Get all employees
export const getEmployees = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.employees;
    } catch (error) {
        console.error("Get Employees Error:", error);
        throw error;
    }
};

// Get employee by ID
export const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.employee;
    } catch (error) {
        console.error("Get Employee Error:", error);
        throw error;
    }
};

// Add employee
export const addEmployee = async (employeeData) => {
    try {
        const response = await axios.post(
            `${API_URL}/add`,
            employeeData
        );

        return response.data;
    } catch (error) {
        console.error("Add Employee Error:", error);
        throw error;
    }
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await axios.put(
            `${API_URL}/update/${id}`,
            employeeData
        );

        return response.data;
    } catch (error) {
        console.error("Update Employee Error:", error);
        throw error;
    }
};

// Delete employee
export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(
            `${API_URL}/delete/${id}`
        );

        return response.data;
    } catch (error) {
        console.error("Delete Employee Error:", error);
        throw error;
    }
};