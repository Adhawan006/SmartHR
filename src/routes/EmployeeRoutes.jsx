import { Route } from "react-router-dom";

import EmployeeList from "../pages/employees/EmployeeList";
import AddEmployee from "../pages/employees/AddEmployee";
import EditEmployee from "../pages/employees/EditEmployee";
import EmployeeDetails from "../pages/employees/EmployeeDetails";

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