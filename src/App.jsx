import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Leave from "./pages/leave/Leave";
import Attendance from "./pages/Attendance";
import Settings from "./pages/settings/Settings";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";
import ResetPassword from "./pages/ResetPassword";
import AddEmployee from "./pages/employee/AddEmployee";
import EditEmployee from "./pages/employee/EditEmployee";
import EmployeeDetails from "./pages/employee/EmployeeDetails";

import AdminRoute from "./components/AdminRoute";

function App() {

  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Role-specific landing pages (what Login.jsx redirects to after auth) */}
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

      {/* Shared pages - any logged-in role */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
            <Dashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
            <EmployeeDashboard />
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

      {/* Admin/HR only */}
      <Route
        path="/reports"
        element={
          <AdminRoute allowedRoles={["admin", "hr"]}>
            <Reports />
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
        path="/reset-password"
        element={
          <AdminRoute allowedRoles={["admin", "hr"]}>
            <ResetPassword />
          </AdminRoute>
        }
      />

      {/* Employee Management sub-routes — these existed as page components
          already but had no live route, since they previously only lived in
          the unused AppRoutes.jsx/EmployeeRoutes.jsx files. AppRoutes.jsx had
          add/edit-employee as admin-only; widened to admin+hr here to match
          the rest of the app's pattern (confirm with Employee Management
          module owner if admin-only was intentional). */}
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
        path="/employee/:id"
        element={
          <AdminRoute allowedRoles={["admin", "hr", "employee"]}>
            <EmployeeDetails />
          </AdminRoute>
        }
      />

    </Routes>
  );

}


export default App;
