import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Attendance = () => {
    const [history] = useState([
        {
            id: 1,
            date: "30 Jul 2026",
            status: "Present",
        },
        {
            id: 2,
            date: "29 Jul 2026",
            status: "Present",
        },
        {
            id: 3,
            date: "28 Jul 2026",
            status: "Leave",
        },
    ]);

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
                            View your attendance information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                            <p className="text-sm text-slate-400">
                                Status
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-emerald-400">
                                Present
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                            <p className="text-sm text-slate-400">
                                Check-In
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-blue-400">
                                09:00 AM
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                            <p className="text-sm text-slate-400">
                                Check-Out
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-amber-400">
                                06:00 PM
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                            <p className="text-sm text-slate-400">
                                Attendance
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-purple-400">
                                96%
                            </h2>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
                        <h2 className="mb-6 text-xl font-semibold">
                            Attendance History
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-700 text-left">
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {history.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-slate-800"
                                        >
                                            <td className="p-4">
                                                {item.date}
                                            </td>

                                            <td className="p-4">
                                                {item.status}
                                            </td>
                                        </tr>
                                    ))}
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