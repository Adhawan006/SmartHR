import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import HRDashboard from "../pages/HRDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import Employees from "../pages/employee/Employees";
import AddEmployee from "../pages/employee/AddEmployee";
import EditEmployee from "../pages/employee/EditEmployee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";
import AddUser from "../pages/AddUser";
import Leave from "../pages/leave/Leave";
import Attendance from "../pages/Attendance";
import Settings from "../pages/Settings";
import Reports from "../pages/Reports";

import AdminRoute from "../components/AdminRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />

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

            <Route path="/employees" element={<Employees />} />

            <Route
                path="/add-user"
                element={
                    <AdminRoute allowedRoles={["admin"]}>
                        <AddUser />
                    </AdminRoute>
                }
            />

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

            <Route
                path="/employee/:id"
                element={<EmployeeDetails />}
            />
        </Routes>
    );
};

export default AppRoutes;