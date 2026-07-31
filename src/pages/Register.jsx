import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// Public self-registration. Always creates an "employee" role — Admin/HR
// accounts are provisioned via the Add User Account screen (/add-user) by
// an existing Admin/HR, per the RBAC rules.
const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        department: "General",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            await register({ ...formData, role: "employee" });
            navigate("/employee-dashboard");
        } catch (err) {
            console.error(err);
            setError(
                err.code === "auth/email-already-in-use"
                    ? "An account with this email already exists."
                    : "Failed to create account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Create Account</h1>
                        <p className="text-gray-300 mt-2">Join SmartHR as an employee</p>
                    </div>

                    {error && (
                        <div className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password (min 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-300 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-300 hover:text-white font-medium">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
