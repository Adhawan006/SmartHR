import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Sidebar from "../../components/Sidebar";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/employees"
            );

            setEmployees(res.data.employees);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteEmployee = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/employees/delete/${id}`
            );

            alert("Employee deleted successfully!");

            fetchEmployees();
        } catch (error) {
            console.log(error);
            alert("Failed to delete employee.");
        }
    };

    const filteredEmployees = employees.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">
                            Employees
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage all employees from one place.
                        </p>
                    </div>

                    {user?.role === "admin" && (
                        <Link
                            to="/add-employee"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
                        >
                            + Add Employee
                        </Link>
                    )}
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by employee name..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-4">
                                    Name
                                </th>
                                <th className="p-4">
                                    Email
                                </th>
                                <th className="p-4">
                                    Department
                                </th>
                                <th className="p-4">
                                    Designation
                                </th>
                                <th className="p-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredEmployees.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center p-8 text-gray-500"
                                    >
                                        No Employees Found
                                    </td>
                                </tr>
                            ) : (
                                filteredEmployees.map(
                                    (employee) => (
                                        <tr
                                            key={
                                                employee.id
                                            }
                                            className="border-b hover:bg-gray-50 text-center"
                                        >
                                            <td className="p-4">
                                                {
                                                    employee.firstName
                                                }{" "}
                                                {
                                                    employee.lastName
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    employee.email
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    employee.department
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    employee.designation
                                                }
                                            </td>

                                            <td className="p-4 space-x-2">
                                                <Link
                                                    to={`/employee/${employee.id}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                                                >
                                                    View
                                                </Link>

                                                {user?.role ===
                                                    "admin" && (
                                                    <>
                                                        <Link
                                                            to={`/edit-employee/${employee.id}`}
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                deleteEmployee(
                                                                    employee.id
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-6 text-gray-500">
                    Total Employees:{" "}
                    <span className="font-semibold">
                        {filteredEmployees.length}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Employees;