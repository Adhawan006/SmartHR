import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeQuickActions from "../components/EmployeeQuickActions";

const EmployeeDashboard = () => {
    const { user } = useSelector((state) => state.auth);

    const stats = [
        {
            title: "Attendance",
            value: "96%",
            color: "text-blue-400",
        },
        {
            title: "Leave Balance",
            value: "12 Days",
            color: "text-emerald-400",
        },
        {
            title: "Pending Tasks",
            value: "4",
            color: "text-amber-400",
        },
        {
            title: "Payroll Status",
            value: "Processed",
            color: "text-purple-400",
        },
    ];

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            <Sidebar />

            <div className="flex-1 min-w-0">
                <Navbar />

                <div className="space-y-8 p-8">
                    {/* Welcome section */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
                        <h1 className="text-3xl font-bold text-blue-400">
                            Employee Portal
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Welcome back,{" "}
                            {user?.name || user?.email || "Employee"}.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg"
                            >
                                <p className="text-sm text-slate-400">
                                    {stat.title}
                                </p>

                                <h2
                                    className={`mt-2 text-2xl font-bold ${stat.color}`}
                                >
                                    {stat.value}
                                </h2>
                            </div>
                        ))}
                    </div>

                    {/* Personal information */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                        <h2 className="mb-6 text-xl font-semibold">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                                <p className="text-xs text-slate-400">
                                    Full Name
                                </p>

                                <p className="mt-1">
                                    {user?.name || "N/A"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                                <p className="text-xs text-slate-400">
                                    Email Address
                                </p>

                                <p className="mt-1">
                                    {user?.email || "N/A"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                                <p className="text-xs text-slate-400">
                                    Role
                                </p>

                                <p className="mt-1 text-blue-400 uppercase">
                                    {user?.role || "employee"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                                <p className="text-xs text-slate-400">
                                    Status
                                </p>

                                <p className="mt-1 text-emerald-400">
                                    Active
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent activity */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-semibold">
                            Recent Activity
                        </h2>

                        <div className="space-y-3 text-slate-300">
                            <p>✓ Checked in at 09:05 AM</p>
                            <p>✓ Leave request submitted</p>
                            <p>✓ Payroll processed successfully</p>
                        </div>
                    </div>

                    {/* Quick actions */}
                    <EmployeeQuickActions />
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;