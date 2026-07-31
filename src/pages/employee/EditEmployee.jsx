import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { getEmployeeById, updateEmployee } from "../../services/employeeService";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEmployee();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchEmployee = async () => {
        setLoading(true);

        try {
            const employee = await getEmployeeById(id);
            if (employee) setFormData(employee);
        } catch (err) {
            console.error(err);
            setError("Failed to load employee.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await updateEmployee(id, formData);
            navigate("/employees");
        } catch (err) {
            console.error(err);
            setError("Failed to update employee.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="w-full p-8">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar />

            <div className="w-full p-8">
                <h1 className="text-3xl font-bold mb-6">
                    Edit Employee
                </h1>

                {error && (
                    <div className="mb-5 p-3 rounded-lg bg-red-100 text-red-700">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName || ""}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName || ""}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        value={formData.department || ""}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={formData.designation || ""}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary || ""}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <select
                        name="status"
                        value={formData.status || "Active"}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-500 text-white p-3 rounded col-span-2 disabled:opacity-50"
                    >
                        {submitting ? "Updating..." : "Update Employee"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
