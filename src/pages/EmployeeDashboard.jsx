import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const EmployeeDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl mb-6">
          <h1 className="text-3xl font-bold text-blue-400">Employee Portal</h1>
          <p className="text-gray-400 mt-1">
            Welcome, {user?.name || user?.email}!
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">
            My Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <span className="text-gray-400 block text-xs">Full Name</span>
              <span className="text-base font-medium text-white">
                {user?.name || "N/A"}
              </span>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <span className="text-gray-400 block text-xs">Email Address</span>
              <span className="text-base font-medium text-white">
                {user?.email}
              </span>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <span className="text-gray-400 block text-xs">Role</span>
              <span className="text-base font-medium text-blue-400 uppercase">
                {user?.role || "employee"}
              </span>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              <span className="text-gray-400 block text-xs">Account Status</span>
              <span className="text-base font-medium text-emerald-400">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;