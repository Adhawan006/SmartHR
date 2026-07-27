// src/services/employeeService.js

const employees = [
  {
    employeeId: "EMP001",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul@gmail.com",
    department: "IT",
    designation: "Frontend Developer",
    status: "Active",
  },
  {
    employeeId: "EMP002",
    firstName: "Priya",
    lastName: "Singh",
    email: "priya@gmail.com",
    department: "HR",
    designation: "HR Executive",
    status: "Active",
  },
];

// Get all employees
export const getEmployees = () => {
  return employees;
};

// Get employee by ID
export const getEmployeeById = (id) => {
  return employees.find(
    (employee) => employee.employeeId === id
  );
};

// Add employee
export const addEmployee = (employeeData) => {
  console.log("Employee Added:", employeeData);
};

// Update employee
export const updateEmployee = (id, employeeData) => {
  console.log("Updated Employee:", id, employeeData);
};

// Deactivate employee
export const deactivateEmployee = (id) => {
  console.log("Employee Deactivated:", id);
};