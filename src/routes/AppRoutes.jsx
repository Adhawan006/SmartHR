import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import HRDashboard from "../pages/HRDashboard";

import Employees from "../pages/employee/Employees";
import AddEmployee from "../pages/employee/AddEmployee";
import EditEmployee from "../pages/employee/EditEmployee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";
import AddUser from "../pages/AddUser"; // Import the component


import EmployeeDashboard from "../pages/EmployeeDashboard"; // Import component

// Inside AppRoutes.jsx <Routes>:

import AdminRoute from "../components/AdminRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                {/* Dashboards */}
                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/admin-dashboard"
                    element={
                        <AdminRoute allowedRoles={["admin"]}>
                            <Dashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/hr-dashboard"
                    element={
                        <AdminRoute allowedRoles={["hr"]}>
                            <HRDashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/employee-dash"
                    element={
                        <AdminRoute allowedRoles={["employee"]}>
                            <EmployeeDashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/add-user"
                    element={
                        <AdminRoute allowedRoles={["admin"]}>
                            <AddUser />
                        </AdminRoute>
                    }
                />

                {/* Employee Management (Accessible by Admin and HR) */}
                <Route path="/employees" element={<Employees />} />

                <Route
                    path="/add-employee"
                    element={
                        <AdminRoute allowedRoles={["admin"]}>
                            <AddEmployee />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/edit-employee/:id"
                    element={
                        <AdminRoute allowedRoles={["admin"]}>
                            <EditEmployee />
                        </AdminRoute>
                    }
                />

                <Route path="/employee/:id" element={<EmployeeDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;