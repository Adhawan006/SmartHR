import { useState, useEffect } from "react";
import api from "../services/api";

const ResetPassword = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/auth/users");
                setUsers(res.data.users || []);
            } catch (error) {
                setMessage({
                    type: "error",
                    text: error?.response?.data?.message || "Failed to load users",
                });
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUserId) {
            setMessage({ type: "error", text: "Please select a user" });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await api.put(`/auth/reset-password/${selectedUserId}`, {
                newPassword,
            });

            setMessage({ type: "success", text: "Password reset successfully" });
            setNewPassword("");
            setSelectedUserId("");
        } catch (error) {
            setMessage({
                type: "error",
                text: error?.response?.data?.message || "Failed to reset password",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-white">Reset User Password</h1>
                        <p className="text-gray-300 text-sm mt-2">
                            Admin/HR can set a new password for a user who&apos;s locked out.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-200 mb-2">Select User</label>

                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                required
                                className="w-full p-4 rounded-xl bg-white/20 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="" className="text-black">
                                    -- Select a user --
                                </option>

                                {users.map((user) => (
                                    <option key={user.id} value={user.id} className="text-black">
                                        {user.name ? `${user.name} (${user.email})` : user.email}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-200 mb-2">New Password</label>

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={6}
                                placeholder="••••••••"
                                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {message.text && (
                            <p
                                className={
                                    message.type === "success"
                                        ? "text-green-400 text-sm"
                                        : "text-red-400 text-sm"
                                }
                            >
                                {message.text}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
