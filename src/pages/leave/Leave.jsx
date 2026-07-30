import { useState } from "react";
import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import LeaveOverview from "./LeaveOverview";
import ApplyLeave from "./ApplyLeave";
import LeaveBalance from "./LeaveBalance";
import LeaveHistory from "./LeaveHistory";
import TeamRequests from "./TeamRequests";

import "../../styles/leave/leave.css";


const initialRequests = [
    {
        id: 1,
        type: "Casual Leave",
        from: "2026-07-18",
        to: "2026-07-19",
        days: 2,
        reason: "Family function",
        status: "Approved",
        applied: "Jul 10, 2026",
    },
    {
        id: 2,
        type: "Sick Leave",
        from: "2026-07-28",
        to: "2026-07-28",
        days: 1,
        reason: "Medical appointment",
        status: "Pending",
        applied: "Jul 27, 2026",
    },
    {
        id: 3,
        type: "Earned Leave",
        from: "2026-06-10",
        to: "2026-06-12",
        days: 3,
        reason: "Personal travel",
        status: "Rejected",
        applied: "Jun 01, 2026",
    },
];


function Leave() {

    const [requests, setRequests] = useState(initialRequests);


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
                                setRequests={setRequests}
                            />
                        }
                    />


                    <Route
                        path="apply"
                        element={
                            <ApplyLeave
                                requests={requests}
                                setRequests={setRequests}
                            />
                        }
                    />


                    <Route
                        path="balance"
                        element={
                            <LeaveBalance />
                        }
                    />


                    <Route
                        path="history"
                        element={
                            <LeaveHistory
                                requests={requests}
                            />
                        }
                    />


                    <Route
                        path="requests"
                        element={
                            <TeamRequests
                                requests={requests}
                                setRequests={setRequests}
                            />
                        }
                    />


                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/leave"
                                replace
                            />
                        }
                    />


                </Routes>


            </div>

        </div>

    );
}


export default Leave;