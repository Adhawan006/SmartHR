import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <nav className="w-full bg-slate-800 border-b border-slate-700 px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-white">
            <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-blue-400">
                    SmartHR
                </span>

                {user?.role && (
                    <span className="text-xs uppercase bg-blue-900/60 text-blue-300 px-2.5 py-1 rounded-full border border-blue-700">
                        {user.role}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-slate-700 px-3 py-2 rounded-lg text-sm outline-none"
                />

                <button
                    onClick={() => navigate("/settings")}
                    className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg"
                >
                    Settings
                </button>

                <span className="text-sm text-gray-300">
                    {user?.name || user?.email}
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition duration-200"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;