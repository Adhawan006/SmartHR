import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsChart from "../components/AnalyticsChart";
import RecentActivities from "../components/RecentActivities";
import QuickActions from "../components/AdminQuickActions";

import { getEmployees } from "../services/employeeService";
import { getAllAttendance } from "../services/attendanceService";
import { getAllLeaves } from "../services/leaveService";

function todayStr() {
    return new Date().toISOString().slice(0, 10);
}

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);
        try {
            const [emp, att, lv] = await Promise.all([
                getEmployees(),
                getAllAttendance(),
                getAllLeaves(),
            ]);
            setEmployees(emp);
            setAttendance(att);
            setLeaves(lv);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const todayAttendance = attendance.filter((a) => a.date === todayStr());
    const presentToday = todayAttendance.filter((a) => a.status === "Present").length;
    const pendingLeaves = leaves.filter((l) => l.status === "Pending").length;

    const departmentCounts = employees.reduce((acc, emp) => {
        const dept = emp.department || "Unassigned";
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
    }, {});

    const handleDownloadReport = () => {
        const report = [
            ["Employee ID", "First Name", "Last Name", "Department", "Designation", "Status"],
            ...employees.map((e) => [
                e.employeeId || e.id,
                e.firstName || "",
                e.lastName || "",
                e.department || "",
                e.designation || "",
                e.status || "",
            ]),
        ];

        const csvContent = report.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "employee-report.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            <Sidebar />

            <div className="flex-1 min-w-0">
                <Navbar />

                <div className="space-y-8 p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-400">
                                Admin Dashboard
                            </h1>
                            <p className="mt-2 text-slate-400">
                                Company-wide overview.
                            </p>
                        </div>

                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownloadReport}
                        >
                            Download Report
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                            <p className="text-sm text-slate-400">Total Employees</p>
                            <h2 className="mt-2 text-2xl font-bold text-blue-400">
                                {loading ? "..." : employees.length}
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                            <p className="text-sm text-slate-400">Present Today</p>
                            <h2 className="mt-2 text-2xl font-bold text-emerald-400">
                                {loading ? "..." : `${presentToday}/${employees.length || 0}`}
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                            <p className="text-sm text-slate-400">Pending Leaves</p>
                            <h2 className="mt-2 text-2xl font-bold text-amber-400">
                                {loading ? "..." : pendingLeaves}
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                            <p className="text-sm text-slate-400">Departments</p>
                            <h2 className="mt-2 text-2xl font-bold text-purple-400">
                                {loading ? "..." : Object.keys(departmentCounts).length}
                            </h2>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                        <h2 className="mb-4 text-xl font-semibold">Employees by Department</h2>
                        <div className="flex flex-wrap gap-3">
                            {Object.entries(departmentCounts).map(([dept, count]) => (
                                <span
                                    key={dept}
                                    className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm"
                                >
                                    {dept}: <strong>{count}</strong>
                                </span>
                            ))}
                            {!loading && Object.keys(departmentCounts).length === 0 && (
                                <span className="text-slate-400 text-sm">No employees yet.</span>
                            )}
                        </div>
                    </div>

                    <Box className="text-slate-900">
                        <AnalyticsChart />
                    </Box>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <Box className="text-slate-900">
                            <RecentActivities />
                        </Box>
                        <Box className="text-slate-900">
                            <QuickActions />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
