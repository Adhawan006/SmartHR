import { useState } from "react";
import RequestTable from "./RequestTable";


function LeaveHistory({ requests, onCancel }) {


    const [filter, setFilter] = useState("All");



    const filteredRequests =
        filter === "All"
            ? requests
            : requests.filter(
                (request) =>
                    request.status === filter
            );



    return (

        <main className="leave-page">

            <section className="leave-shell">


                <header className="leave-header">

                    <div>

                        <p className="eyebrow">
                            SMART HR · TIME OFF
                        </p>


                        <h1>
                            Leave History
                        </h1>


                        <p className="page-subtitle">
                            Review your previous leave requests.
                        </p>

                    </div>


                </header>





                <section className="content-card">


                    <div className="section-heading">


                        <div>

                            <h2>
                                Request History
                            </h2>


                            <p>
                                Track approval status of your leaves.
                            </p>

                        </div>





                        <select

                            className="filter-select"

                            value={filter}

                            onChange={(e)=>
                                setFilter(e.target.value)
                            }

                        >

                            <option>
                                All
                            </option>


                            <option>
                                Pending
                            </option>


                            <option>
                                Approved
                            </option>


                            <option>
                                Rejected
                            </option>


                        </select>


                    </div>





                    <RequestTable

                        requests={filteredRequests}

                    />

                    {
                        onCancel &&
                        filteredRequests.some((r) => r.status === "Pending") &&

                        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>

                            {
                                filteredRequests
                                    .filter((r) => r.status === "Pending")
                                    .map((r) => (
                                        <button
                                            key={r.id}
                                            className="reject"
                                            onClick={() => onCancel(r.id)}
                                        >
                                            Cancel "{r.type}" ({r.from} - {r.to})
                                        </button>
                                    ))
                            }

                        </div>
                    }



                </section>


            </section>


        </main>

    );

}


export default LeaveHistory;