import { Route } from "react-router-dom";

import EmployeeList from "../pages/employee/EmployeeList";
import AddEmployee from "../pages/employee/AddEmployee";
import EditEmployee from "../pages/employee/EditEmployee";
import EmployeeDetails from "../pages/employee/EmployeeDetails";

const EmployeeRoutes = () => (
    <>
        <Route path="/employees" element={<EmployeeList />} />

        <Route path="/employees/add" element={<AddEmployee />} />

        <Route
            path="/employees/:employeeId"
            element={<EmployeeDetails />}
        />

        <Route
            path="/employees/edit/:employeeId"
            element={<EditEmployee />}
        />
    </>
);

export default EmployeeRoutes;