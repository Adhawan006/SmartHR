import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { loginSuccess } from "../redux/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post(
            "http://localhost:5000/api/auth/login",
            formData
        );

        dispatch(
            loginSuccess({
                user: res.data.user,
                token: res.data.token,
            })
        );

        // Standardize role checking (handles potential "Admin" vs "admin" mismatch)
        const role = res.data.user.role?.toLowerCase();

        // Direct to the route defined in your AppRoutes.jsx
       if (role === "admin") {
    navigate("/admin-dashboard");
} else if (role === "hr") {
    navigate("/hr-dashboard"); // <--- Redirects HR users here
} else {
    navigate("/employee-dash");
}
    } catch (error) {
        console.log(error);

        alert(
            error?.response?.data?.message ||
            "Invalid Credentials"
        );
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

                        {/* Remember Me */}
                        <div className="flex justify-between text-sm text-gray-300">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" />
                                Remember Me
                            </label>

                            <button
                                type="button"
                                className="hover:text-white"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg"
                        >
                            Login
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-white/10 rounded-xl">
                        <p className="text-gray-300 text-sm text-center">
                            Demo Credentials
                        </p>

                        <p className="text-gray-400 text-xs mt-2 text-center">
                            Email:
                            {" "}
                            admin@gmail.com
                        </p>

                        <p className="text-gray-400 text-xs text-center">
                            Password: admin
                        </p>
                        <p className="text-gray-400 text-xs mt-2 text-center">
                            Email:
                            {" "}
                            hr@@gmail.com
                        </p>

                        <p className="text-gray-400 text-xs text-center">
                            Password: 12345678
                        </p>
                        <p className="text-gray-400 text-xs mt-2 text-center">
                            Email:
                            {" "}
                            employee@gmail.com
                        </p>

                        <p className="text-gray-400 text-xs text-center">
                            Password: employee
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-300 text-sm">
                            Welcome back! Manage your employees
                            efficiently.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;