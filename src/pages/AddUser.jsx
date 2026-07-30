import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // Default role
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if (response.data.success) {
        setMessage({ type: "success", text: "User account created successfully!" });
        setFormData({ name: "", email: "", password: "", role: "employee" });
        
        // Optional: Redirect to employees list or dashboard after 1.5s
        setTimeout(() => {
          navigate("/hr-dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Failed to create user account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-2">Create User Account</h2>
          <p className="text-gray-400 text-sm mb-6">
            Register new login credentials for an Admin, HR, or Employee.
          </p>

          {message.text && (
            <div
              className={`p-4 mb-6 rounded-xl text-sm font-medium ${
                message.type === "success"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                  : "bg-red-500/20 text-red-300 border border-red-500/50"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                User Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 focus:outline-none focus:border-blue-500 capitalize"
              >
                <option value="employee">Employee</option>
                <option value="hr">HR Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;