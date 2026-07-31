import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { loginSuccess } from "../redux/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showForgotInfo, setShowForgotInfo] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await api.post("/auth/login", formData);

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
        <div
            className="min-h-screen bg-[#0B1E39] flex items-center justify-center px-4 py-10 relative overflow-hidden"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
            }}
        >
            {/* Ambient corner glow */}
            <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-[#B98B3E]/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 bg-[#1E3A5F]/40 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative">
                <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden border border-slate-200/80 relative">
                    {/* Faint texture for depth */}
                    <div
                        className="pointer-events-none absolute -top-10 -right-10 w-150 h-42 opacity-[0.06]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, #0f172a 1.5px, transparent 1.5px)",
                            backgroundSize: "14px 14px",
                        }}
                    />

                    <div className="p-8 sm:p-10 relative">
                        {/* Header */}
                        <div className="text-center mb-8">

                            <h1
                                className="text-4xl font-serif font-bold tracking-tight"
                                style={{ color: "#001f3f" }}
                            >
                                SmartHR
                            </h1>

                            {/*<p className="text-teal-700 text-xs font-semibold tracking-[0.15em] uppercase mt-2">
                                Employee Management System
                            </p>
                            */}
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-semibold tracking-wide text-teal-700 uppercase mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@mail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 border border-slate-300 shadow-sm hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-600/15 focus:border-teal-600 transition-all"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-semibold tracking-wide text-teal-700 uppercase mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 border border-slate-300 shadow-sm hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-600/15 focus:border-teal-600 transition-all"
                                />
                            </div>

                            {/* Remember Me */}
                            <div className="flex justify-between items-center text-sm text-slate-600 pt-1">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600/30"
                                    />
                                    Remember Me
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setShowForgotInfo((prev) => !prev)}
                                    className="text-teal-700 font-medium hover:text-teal-800 transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {showForgotInfo && (
                                <p className="text-slate-600 text-xs bg-teal-600/10 border border-teal-600/25 rounded-lg p-3">
                                    Password resets are handled by your Admin or HR team. Please reach
                                    out to them directly to get your password reset.
                                </p>
                            )}

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 transition-all duration-200 text-white font-semibold tracking-wide py-3.5 rounded-xl shadow-lg shadow-teal-900/20 hover:shadow-xl hover:shadow-teal-900/25 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
