import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Employees from "./pages/employee/Employees";
import AddEmployee from "./pages/employee/AddEmployee";
import EditEmployee from "./pages/employee/EditEmployee";
import EmployeeDetails from "./pages/employee/EmployeeDetails";
import AddUser from "./pages/AddUser";
import Attendance from "./pages/Attendance";
import Leave from "./pages/leave/Leave";
import Settings from "./pages/settings/Settings";
import Reports from "./pages/Reports";

import AdminRoute from "./components/AdminRoute";

// Sends an already-logged-in user to the dashboard that matches their role.
function RoleHome() {
    const { user, initializing } = useSelector((state) => state.auth);

    if (initializing) return null;
    if (!user) return <Navigate to="/login" replace />;

    const role = user.role?.toLowerCase();
    if (role === "admin") return <Navigate to="/dashboard" replace />;
    if (role === "hr") return <Navigate to="/hr-dashboard" replace />;
    return <Navigate to="/employee-dashboard" replace />;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<RoleHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Role-specific dashboards */}
            <Route
                path="/dashboard"
                element={
                    <AdminRoute allowedRoles={["admin"]}>
                        <Dashboard />
                    </AdminRoute>
                }
            />

            <Route
                path="/hr-dashboard"
                element={
                    <AdminRoute allowedRoles={["admin", "hr"]}>
                        <HRDashboard />
                    </AdminRoute>
                }
            />

            <Route
                path="/employee-dashboard"
                element={
                    <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
                        <EmployeeDashboard />
                    </AdminRoute>
                }
            />

            {/* Shared modules — any authenticated role, content adapts internally */}
            <Route
                path="/employees"
                element={
                    <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
                        <Employees />
                    </AdminRoute>
                }
            />

            <Route
                path="/employee/:id"
                element={
                    <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
                        <EmployeeDetails />
                    </AdminRoute>
                }
            />

            <Route
                path="/add-employee"
                element={
                    <AdminRoute allowedRoles={["admin", "hr"]}>
                        <AddEmployee />
                    </AdminRoute>
                }
            />

            <Route
                path="/edit-employee/:id"
                element={
                    <AdminRoute allowedRoles={["admin", "hr"]}>
                        <EditEmployee />
                    </AdminRoute>
                }
            />

            <Route
                path="/add-user"
                element={
                    <AdminRoute allowedRoles={["admin", "hr"]}>
                        <AddUser />
                    </AdminRoute>
                }
            />

            <Route
                path="/attendance"
                element={
                    <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
                        <Attendance />
                    </AdminRoute>
                }
            />

            <Route
                path="/leave/*"
                element={
                    <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
                        <Leave />
                    </AdminRoute>
                }
            />

            <Route
                path="/settings/*"
                element={
                    <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
                        <Settings />
                    </AdminRoute>
                }
            />

            <Route
                path="/reports"
                element={
                    <AdminRoute allowedRoles={["admin", "hr"]}>
                        <Reports />
                    </AdminRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
