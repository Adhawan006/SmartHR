import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/employees"
            );

            setEmployees(res.data.employees);
        } catch (error) {
            console.log(error);
        }
    };

    // Get unique departments
    const departments = [
        ...new Set(
            employees.map((employee) => employee.department)
        ),
    ];

    return (
        <div className="flex">
            <Sidebar />

            <div className="p-10 w-full">
                <h1 className="text-3xl font-bold mb-8">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="border p-5 rounded shadow">
                        <h2 className="text-lg font-semibold">
                            Total Employees
                        </h2>

                        <p className="text-4xl mt-3">
                            {employees.length}
                        </p>
                    </div>

                    <div className="border p-5 rounded shadow">
                        <h2 className="text-lg font-semibold">
                            Departments
                        </h2>

                        <p className="text-4xl mt-3">
                            {departments.length}
                        </p>
                    </div>

                    <div className="border p-5 rounded shadow">
                        <h2 className="text-lg font-semibold">
                            Active Employees
                        </h2>

                        <p className="text-4xl mt-3">
                            {employees.length}
                        </p>
                    </div>
                </div>

                {/* Recent Employees */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4">
                        Recent Employees
                    </h2>

                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3">Name</th>
                                <th className="p-3">Department</th>
                                <th className="p-3">Designation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.slice(0, 5).map((emp) => (
                                <tr
                                    key={emp._id}
                                    className="text-center border-b"
                                >
                                    <td className="p-3">
                                        {emp.firstName}{" "}
                                        {emp.lastName}
                                    </td>

                                    <td className="p-3">
                                        {emp.department}
                                    </td>

                                    <td className="p-3">
                                        {emp.designation}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;