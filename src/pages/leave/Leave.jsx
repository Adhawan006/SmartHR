import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import LeaveOverview from "./LeaveOverview";
import ApplyLeave from "./ApplyLeave";
import LeaveBalance from "./LeaveBalance";
import LeaveHistory from "./LeaveHistory";
import TeamRequests from "./TeamRequests";

import "../../styles/leave/leave.css";

import {
    getLeavesForEmployee,
    getAllLeaves,
    applyLeave,
    setLeaveStatus,
    cancelLeave,
} from "../../services/leaveService";

function Leave() {
    const { user } = useSelector((state) => state.auth);
    const role = user?.role?.toLowerCase();
    const isManager = role === "admin" || role === "hr";

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isManager]);

    const loadRequests = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const data = isManager
                ? await getAllLeaves()
                : await getLeavesForEmployee(user.uid);

            const mapped = data.map((r) => ({
                ...r,
                from: r.startDate,
                to: r.endDate,
                applied: r.createdAt?.toDate
                    ? r.createdAt.toDate().toLocaleDateString()
                    : "Just now",
            }));

            setRequests(mapped);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Bridges the Firestore-backed data to the existing child components,
    // which were originally written against local React state.
    const submitLeave = async (form, days) => {
        await applyLeave({
            employeeId: user.uid,
            employeeName: user.name || user.email,
            type: form.type,
            startDate: form.from,
            endDate: form.to,
            reason: form.reason,
            days,
        });
        await loadRequests();
    };

    const updateStatus = async (id, status) => {
        await setLeaveStatus(id, status, user.name || user.email);
        await loadRequests();
    };

    const cancelRequest = async (id) => {
        await cancelLeave(id);
        await loadRequests();
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-slate-950 text-white items-center justify-center">
                Loading leave data...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-950">
            <Sidebar />

            <div className="flex-1 min-w-0">
                <Navbar />

                <Routes>
                    <Route
                        index
                        element={
                            <LeaveOverview
                                requests={requests}
                                updateStatus={updateStatus}
                            />
                        }
                    />

                    <Route
                        path="apply"
                        element={<ApplyLeave onSubmit={submitLeave} />}
                    />

                    <Route path="balance" element={<LeaveBalance requests={requests} />} />

                    <Route
                        path="history"
                        element={
                            <LeaveHistory
                                requests={requests}
                                onCancel={cancelRequest}
                            />
                        }
                    />

                    <Route
                        path="requests"
                        element={
                            isManager ? (
                                <TeamRequests
                                    requests={requests}
                                    updateStatus={updateStatus}
                                />
                            ) : (
                                <Navigate to="/leave" replace />
                            )
                        }
                    />

                    <Route path="*" element={<Navigate to="/leave" replace />} />
                </Routes>
            </div>
        </div>
    );
}

export default Leave;
