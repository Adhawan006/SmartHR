import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { addEmployee } from "../../services/employeeService";

const inputClass =
    "border border-slate-300 p-3 rounded-lg text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

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
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSubmitting(true);

        try {
            await addEmployee({
                ...formData,
                email: formData.email.trim().toLowerCase(),
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
            });

            navigate("/employees");
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                    "Failed to add employee. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 bg-gray-800 p-10">
                <h1 className="text-4xl  text-red-50 font-bold mb-8">
                    Add Employee
                </h1>

                <div className="bg-white/5 backdrop-blur-2xl  shadow-xl rounded-2xl p-8 max-w-5xl border border-slate-200">
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
                            className={inputClass}
                            required
                        />

                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                            maxLength={10}
                            required
                        />

                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />

                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />

                        <input
                            type="date"
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />

                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className={inputClass}
                            min="0"
                            required
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="4"
                            className={`${inputClass} md:col-span-2`}
                            required
                        />

                        <button
                            type="submit"
                            disabled={submitting}
                            className="
                                md:col-span-2
                                bg-blue-600
                                hover:bg-blue-700
                                hover:shadow-lg
                                text-white
                                py-3
                                rounded-lg
                                font-semibold
                                transition-all
                                duration-200
                                disabled:opacity-50
                            "
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