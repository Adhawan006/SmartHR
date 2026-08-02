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

    // All requests (only for HR/Admin)
    const [requests, setRequests] = useState([]);

    // Logged-in user's requests
    const [myRequests, setMyRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadRequests();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const mapLeaves = (data) =>
        data.map((r) => ({
            ...r,
            from: r.startDate,
            to: r.endDate,
            applied: r.createdAt?.toDate
                ? r.createdAt.toDate().toLocaleDateString()
                : "Just now",
        }));

    const loadRequests = async () => {
        if (!user) return;

        setLoading(true);

        try {
            // Always fetch logged-in user's leaves
            const myLeaves = await getLeavesForEmployee(user.uid);
            const mappedMyLeaves = mapLeaves(myLeaves);

            setMyRequests(mappedMyLeaves);

            if (isManager) {
                // HR/Admin also fetch all leave requests
                const allLeaves = await getAllLeaves();
                setRequests(mapLeaves(allLeaves));
            } else {
                // Employee only has their own requests
                setRequests(mappedMyLeaves);
            }
        } catch (err) {
            console.error("Error loading leave data:", err);
        } finally {
            setLoading(false);
        }
    };

    const submitLeave = async (form, days) => {
        try {
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
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await setLeaveStatus(id, status, user.name || user.email);
            await loadRequests();
        } catch (err) {
            console.error(err);
        }
    };

    const cancelRequest = async (id) => {
        try {
            await cancelLeave(id);
            await loadRequests();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
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
                    {/* Dashboard / Overview - only logged-in user's leaves */}
                    <Route
                        index
                        element={
                            <LeaveOverview
                                requests={myRequests}
                                updateStatus={updateStatus}
                            />
                        }
                    />

                    {/* Apply Leave */}
                    <Route
                        path="apply"
                        element={
                            <ApplyLeave
                                onSubmit={submitLeave}
                            />
                        }
                    />

                    {/* My Leave Balance */}
                    <Route
                        path="balance"
                        element={
                            <LeaveBalance
                                requests={myRequests}
                            />
                        }
                    />

                    {/* My Leave History */}
                    <Route
                        path="history"
                        element={
                            <LeaveHistory
                                requests={myRequests}
                                onCancel={cancelRequest}
                            />
                        }
                    />

                    {/* HR/Admin Only */}
                    <Route
                        path="requests"
                        element={
                            isManager ? (
                                <TeamRequests
                                    requests={requests}
                                    updateStatus={updateStatus}
                                />
                            ) : (
                                <Navigate
                                    to="/leave"
                                    replace
                                />
                            )
                        }
                    />

                    <Route
                        path="*"
                        element={<Navigate to="/leave" replace />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default Leave;