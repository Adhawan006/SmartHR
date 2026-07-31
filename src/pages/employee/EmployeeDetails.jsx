import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import { getEmployeeById } from "../../services/employeeService";

const EmployeeDetails = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const role = user?.role?.toLowerCase();
    const canManage = role === "admin" || role === "hr";

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEmployee();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchEmployee = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getEmployeeById(id);
            setEmployee(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load employee.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="p-8 w-full">Loading...</div>
            </div>
        );
    }

    if (error || !employee) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="p-8 w-full text-red-600">{error || "Employee not found."}</div>
            </div>
        );
    }

    // Employees can only view their own record.
    if (!canManage && employee.uid && employee.uid !== user?.uid && employee.email !== user?.email) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="p-8 w-full text-red-600">
                    You are not authorized to view this employee's profile.
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar />

            <div className="p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">
                    Employee Details
                </h1>

                <div className="bg-white shadow-md rounded p-6">
                    <p>
                        <strong>Name:</strong>{" "}
                        {employee.firstName} {employee.lastName}
                    </p>

                    <p className="mt-3">
                        <strong>Email:</strong>{" "}
                        {employee.email}
                    </p>

                    <p className="mt-3">
                        <strong>Phone:</strong>{" "}
                        {employee.phone}
                    </p>

                    <p className="mt-3">
                        <strong>Department:</strong>{" "}
                        {employee.department}
                    </p>

                    <p className="mt-3">
                        <strong>Designation:</strong>{" "}
                        {employee.designation}
                    </p>

                    <p className="mt-3">
                        <strong>Salary:</strong>{" "}
                        ₹{employee.salary}
                    </p>

                    <p className="mt-3">
                        <strong>Address:</strong>{" "}
                        {employee.address}
                    </p>

                    <p className="mt-3">
                        <strong>Status:</strong>{" "}
                        {employee.status}
                    </p>

                    {employee.joiningDate && (
                        <p className="mt-3">
                            <strong>Joining Date:</strong>{" "}
                            {new Date(employee.joiningDate).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
