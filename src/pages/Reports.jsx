import { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { getEmployees } from "../services/employeeService";
import { getAllAttendance } from "../services/attendanceService";
import { getAllLeaves } from "../services/leaveService";

function Reports() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const [departmentFilter, setDepartmentFilter] = useState("");
    const [leaveStatusFilter, setLeaveStatusFilter] = useState("");

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
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

    const departments = useMemo(
        () => [...new Set(employees.map((e) => e.department).filter(Boolean))],
        [employees]
    );

    const filteredEmployees = useMemo(
        () =>
            departmentFilter
                ? employees.filter((e) => e.department === departmentFilter)
                : employees,
        [employees, departmentFilter]
    );

    const employeeStats = useMemo(() => {
        const active = filteredEmployees.filter((e) => e.status === "Active").length;
        const inactive = filteredEmployees.length - active;
        return { total: filteredEmployees.length, active, inactive };
    }, [filteredEmployees]);

    const attendanceStats = useMemo(() => {
        const scoped = departmentFilter
            ? attendance.filter((a) =>
                  filteredEmployees.some((e) => e.id === a.employeeId || e.uid === a.employeeId)
              )
            : attendance;

        const present = scoped.filter((a) => a.status === "Present").length;
        const absent = scoped.filter((a) => a.status === "Absent").length;
        const onLeave = scoped.filter((a) => a.status === "Leave").length;

        return { total: scoped.length, present, absent, onLeave };
    }, [attendance, filteredEmployees, departmentFilter]);

    const filteredLeaves = useMemo(
        () => (leaveStatusFilter ? leaves.filter((l) => l.status === leaveStatusFilter) : leaves),
        [leaves, leaveStatusFilter]
    );

    const leaveStats = useMemo(() => {
        const pending = leaves.filter((l) => l.status === "Pending").length;
        const approved = leaves.filter((l) => l.status === "Approved").length;
        const rejected = leaves.filter((l) => l.status === "Rejected").length;
        return { total: leaves.length, pending, approved, rejected };
    }, [leaves]);

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            <Sidebar />

            <div className="flex-1 min-w-0">
                <Navbar />

                <div className="space-y-8 p-8">
                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
                        <h1 className="text-3xl font-bold text-blue-400">Reports</h1>
                        <p className="mt-2 text-slate-400">
                            Employee, attendance, and leave statistics.
                        </p>
                    </div>

                    {loading ? (
                        <p className="text-slate-400">Loading report data...</p>
                    ) : (
                        <>
                            {/* Employee Statistics */}
                            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                                    <h2 className="text-xl font-semibold">Employee Statistics</h2>

                                    <select
                                        value={departmentFilter}
                                        onChange={(e) => setDepartmentFilter(e.target.value)}
                                        className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
                                    >
                                        <option value="">All Departments</option>
                                        {departments.map((d) => (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <StatBox label="Total" value={employeeStats.total} color="text-blue-400" />
                                    <StatBox label="Active" value={employeeStats.active} color="text-emerald-400" />
                                    <StatBox label="Inactive" value={employeeStats.inactive} color="text-red-400" />
                                </div>
                            </div>

                            {/* Attendance Report */}
                            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                                <h2 className="mb-4 text-xl font-semibold">Attendance Report</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                    <StatBox label="Total Records" value={attendanceStats.total} color="text-blue-400" />
                                    <StatBox label="Present" value={attendanceStats.present} color="text-emerald-400" />
                                    <StatBox label="Absent" value={attendanceStats.absent} color="text-red-400" />
                                    <StatBox label="On Leave" value={attendanceStats.onLeave} color="text-amber-400" />
                                </div>
                            </div>

                            {/* Leave Report */}
                            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                                    <h2 className="text-xl font-semibold">Leave Report</h2>

                                    <select
                                        value={leaveStatusFilter}
                                        onChange={(e) => setLeaveStatusFilter(e.target.value)}
                                        className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
                                    <StatBox label="Total" value={leaveStats.total} color="text-blue-400" />
                                    <StatBox label="Pending" value={leaveStats.pending} color="text-amber-400" />
                                    <StatBox label="Approved" value={leaveStats.approved} color="text-emerald-400" />
                                    <StatBox label="Rejected" value={leaveStats.rejected} color="text-red-400" />
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-700 text-left">
                                                <th className="p-3">Employee</th>
                                                <th className="p-3">Type</th>
                                                <th className="p-3">Dates</th>
                                                <th className="p-3">Days</th>
                                                <th className="p-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredLeaves.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="p-4 text-center text-slate-400">
                                                        No leave requests found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredLeaves.map((l) => (
                                                    <tr key={l.id} className="border-b border-slate-800">
                                                        <td className="p-3">{l.employeeName}</td>
                                                        <td className="p-3">{l.type}</td>
                                                        <td className="p-3">
                                                            {l.startDate} - {l.endDate}
                                                        </td>
                                                        <td className="p-3">{l.days}</td>
                                                        <td className="p-3">{l.status}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value, color }) {
    return (
        <div className="rounded-xl bg-slate-900 border border-slate-700 p-4">
            <p className="text-sm text-slate-400">{label}</p>
            <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
        </div>
    );
}

export default Reports;
