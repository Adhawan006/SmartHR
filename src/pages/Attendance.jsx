import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    getAttendanceForEmployee,
    getAllAttendance,
    checkIn,
    checkOut,
    getTodayAttendance,
} from "../services/attendanceService";

const Attendance = () => {
    const { user } = useSelector((state) => state.auth);
    const role = user?.role?.toLowerCase();
    const isManager = role === "admin" || role === "hr";

    const [history, setHistory] = useState([]);
    const [today, setToday] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Manager-only filters
    const [employeeFilter, setEmployeeFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isManager]);

    const loadData = async () => {
        if (!user) return;
        setLoading(true);

        try {
            if (isManager) {
                const all = await getAllAttendance();
                setHistory(all);
            } else {
                const [own, todayRecord] = await Promise.all([
                    getAttendanceForEmployee(user.uid),
                    getTodayAttendance(user.uid),
                ]);
                setHistory(own);
                setToday(todayRecord);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        setActionLoading(true);
        try {
            const record = await checkIn(user.uid, user.name || user.email);
            setToday(record);
            await loadData();
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleCheckOut = async () => {
        if (!today) return;
        setActionLoading(true);
        try {
            await checkOut(today.id);
            await loadData();
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const filteredHistory = useMemo(() => {
        if (!isManager) return history;

        return history.filter((item) => {
            const matchesEmployee = employeeFilter
                ? item.employeeName?.toLowerCase().includes(employeeFilter.toLowerCase())
                : true;
            const matchesDate = dateFilter ? item.date === dateFilter : true;
            const matchesStatus = statusFilter ? item.status === statusFilter : true;
            return matchesEmployee && matchesDate && matchesStatus;
        });
    }, [history, employeeFilter, dateFilter, statusFilter, isManager]);

    const attendancePercent = useMemo(() => {
        if (!history.length) return "—";
        const present = history.filter((h) => h.status === "Present").length;
        return `${Math.round((present / history.length) * 100)}%`;
    }, [history]);

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            <Sidebar />

            <div className="flex-1 min-w-0">
                <Navbar />

                <div className="space-y-8 p-8">
                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
                        <h1 className="text-3xl font-bold text-blue-400">
                            Attendance
                        </h1>

                        <p className="mt-2 text-slate-400">
                            {isManager
                                ? "View attendance across the company."
                                : "Mark your attendance and view your history."}
                        </p>
                    </div>

                    {!isManager && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                                <p className="text-sm text-slate-400">Today's Status</p>
                                <h2 className="mt-2 text-2xl font-bold text-emerald-400">
                                    {today ? today.status : "Not marked"}
                                </h2>
                            </div>

                            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                                <p className="text-sm text-slate-400">Check-In</p>
                                <h2 className="mt-2 text-2xl font-bold text-blue-400">
                                    {today?.checkIn ? new Date(today.checkIn).toLocaleTimeString() : "—"}
                                </h2>
                            </div>

                            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                                <p className="text-sm text-slate-400">Check-Out</p>
                                <h2 className="mt-2 text-2xl font-bold text-amber-400">
                                    {today?.checkOut ? new Date(today.checkOut).toLocaleTimeString() : "—"}
                                </h2>
                            </div>

                            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                                <p className="text-sm text-slate-400">Attendance</p>
                                <h2 className="mt-2 text-2xl font-bold text-purple-400">
                                    {attendancePercent}
                                </h2>
                            </div>
                        </div>
                    )}

                    {!isManager && (
                        <div className="flex gap-4">
                            <button
                                onClick={handleCheckIn}
                                disabled={actionLoading || !!today}
                                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-6 py-3 font-semibold"
                            >
                                Check In
                            </button>

                            <button
                                onClick={handleCheckOut}
                                disabled={actionLoading || !today || today?.checkOut}
                                className="rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 px-6 py-3 font-semibold"
                            >
                                Check Out
                            </button>
                        </div>
                    )}

                    {isManager && (
                        <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-4">
                            <input
                                type="text"
                                placeholder="Filter by employee..."
                                value={employeeFilter}
                                onChange={(e) => setEmployeeFilter(e.target.value)}
                                className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
                            />

                            <input
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
                            />

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
                            >
                                <option value="">All Statuses</option>
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                                <option value="Leave">Leave</option>
                            </select>
                        </div>
                    )}

                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                        <h2 className="mb-6 text-xl font-semibold">
                            {isManager ? "All Attendance Records" : "Attendance History"}
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700 text-left">
                                        {isManager && <th className="p-4">Employee</th>}
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Check-In</th>
                                        <th className="p-4">Check-Out</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={isManager ? 5 : 4} className="p-6 text-center text-slate-400">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : filteredHistory.length === 0 ? (
                                        <tr>
                                            <td colSpan={isManager ? 5 : 4} className="p-6 text-center text-slate-400">
                                                No attendance records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredHistory.map((item) => (
                                            <tr key={item.id} className="border-b border-slate-800">
                                                {isManager && <td className="p-4">{item.employeeName}</td>}
                                                <td className="p-4">{item.date}</td>
                                                <td className="p-4">
                                                    {item.checkIn ? new Date(item.checkIn).toLocaleTimeString() : "—"}
                                                </td>
                                                <td className="p-4">
                                                    {item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : "—"}
                                                </td>
                                                <td className="p-4">{item.status}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
