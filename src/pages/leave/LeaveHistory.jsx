import { useState } from "react";
import RequestTable from "./RequestTable";


function LeaveHistory({ requests }) {


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



                </section>


            </section>


        </main>

    );

}


export default LeaveHistory;