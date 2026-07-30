import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    // 1. Clear Redux state & localStorage
    dispatch(logout());

    // 2. Redirect user back to login page
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center text-white">
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-blue-400">SmartHR</span>
        {user?.role && (
          <span className="text-xs uppercase bg-blue-900/60 text-blue-300 px-2.5 py-1 rounded-full border border-blue-700">
            {user.role}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
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