import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login, resetPassword } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetNotice, setResetNotice] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const profile = await login(formData.email, formData.password);
            const role = profile.role?.toLowerCase();

            if (role === "admin") {
                navigate("/dashboard");
            } else if (role === "hr") {
                navigate("/hr-dashboard");
            } else {
                navigate("/employee-dashboard");
            }
        } catch (err) {
            console.error(err);
            setError(
                err.code === "auth/invalid-credential" ||
                    err.code === "auth/wrong-password" ||
                    err.code === "auth/user-not-found"
                    ? "Invalid email or password."
                    : "Failed to log in. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        setError("");
        setResetNotice("");

        if (!formData.email) {
            setError("Enter your email above first, then click Forgot Password.");
            return;
        }

        try {
            await resetPassword(formData.email);
            setResetNotice("Password reset email sent. Check your inbox.");
        } catch (err) {
            console.error(err);
            setError("Could not send reset email. Check the address and try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-3xl font-bold text-blue-600">
                                SH
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-white mt-5">
                            SmartHR
                        </h1>

                        <p className="text-gray-300 mt-2">
                            Employee Management System
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    {resetNotice && (
                        <div className="mb-5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm">
                            {resetNotice}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <label className="block text-gray-200 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-200 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Forgot password */}
                        <div className="flex justify-end text-sm text-gray-300">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="hover:text-white"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-300 text-sm">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-300 hover:text-white font-medium">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
