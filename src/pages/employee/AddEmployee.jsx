import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { addEmployee } from "../../services/employeeService";

const AddEmployee = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        joiningDate: "",
        salary: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            await addEmployee(formData);
            navigate("/employees");
        } catch (err) {
            console.error(err);
            setError("Failed to add employee. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">
                    Add Employee
                </h1>

                <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl">
                    {error && (
                        <div className="mb-5 p-3 rounded-lg bg-red-100 text-red-700">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID (EMP001)"
                            value={formData.employeeId}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="date"
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border p-3 rounded-lg md:col-span-2"
                            rows="4"
                            required
                        />

                        <button
                            type="submit"
                            disabled={submitting}
                            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                        >
                            {submitting ? "Adding..." : "Add Employee"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
