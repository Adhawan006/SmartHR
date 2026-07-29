import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Employees from "../pages/employee/Employees";
import AddEmployee from "../pages/employee/AddEmployee";
import EditEmployee from "../pages//employee/EditEmployee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";

import AdminRoute from "../components/AdminRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/employees"
                    element={<Employees />}
                />

                <Route
                    path="/add-employee"
                    element={
                        <AdminRoute>
                            <AddEmployee />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/edit-employee/:id"
                    element={
                        <AdminRoute>
                            <EditEmployee />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/employee/:id"
                    element={<EmployeeDetails />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;