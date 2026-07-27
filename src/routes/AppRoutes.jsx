import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeRoutes from "./EmployeeRoutes";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Dashboard Layout */}
                <Route path="/" element={<DashboardLayout />}>

                    {/* Employee Routes */}
                    {EmployeeRoutes()}

                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;