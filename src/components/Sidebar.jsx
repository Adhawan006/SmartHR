import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    };

    return (
        <div className="w-64 flex-shrink-0 min-h-screen bg-slate-900 text-white flex flex-col justify-between p-5 overflow-y-auto">
            <div>
                <h2 className="text-2xl font-bold mb-8 text-blue-400">
                    SmartHR
                </h2>

                <nav className="flex flex-col gap-3">
                    <Link
                        to="/dashboard"
                        className="hover:bg-slate-800 px-4 py-2 rounded transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/employees"
                        className="hover:bg-slate-800 px-4 py-2 rounded transition"
                    >
                        Employees
                    </Link>

                    <Link
                        to="/attendance"
                        className="hover:bg-slate-800 px-4 py-2 rounded transition"
                    >
                        Attendance
                    </Link>

                    <Link
                        to="/leave"
                        className="hover:bg-slate-800 px-4 py-2 rounded transition"
                    >
                        Leave
                    </Link>

                    <Link
                        to="/settings"
                        className="hover:bg-slate-800 px-4 py-2 rounded transition"
                    >
                        Settings
                    </Link>

                    <Link
                        to="/reports"
                        className="hover:bg-slate-800 px-4 py-2 rounded transition"
                    >
                        Reports
                    </Link>

                    <Link
                        to="/add-employee"
                        className="hover:bg-slate-800 px-4 py-2 rounded transition"
                    >
                        Add Employee
                    </Link>

                    {["admin", "hr"].includes(
                        user?.role?.toLowerCase()
                    ) && (
                        <button
                            onClick={() => navigate("/add-user")}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition text-left"
                        >
                            + Add User Account
                        </button>
                    )}
                </nav>
            </div>

            <div className="border-t border-slate-700 pt-4">
                {user && (
                    <div className="mb-3 px-1">
                        <p className="text-sm font-medium text-slate-200 truncate">
                            {user.name || user.email}
                        </p>

                        <p className="text-xs text-blue-400 uppercase font-semibold">
                            {user.role}
                        </p>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full text-left bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;