import RequestTable from "./RequestTable";


function TeamRequests({
    requests,
    updateStatus
}) {


    return (

        <main className="leave-page">

            <section className="leave-shell">


                <header className="leave-header">

                    <div>

                        <p className="eyebrow">
                            SMART HR · MANAGER
                        </p>


                        <h1>
                            Team Leave Requests
                        </h1>


                        <p className="page-subtitle">
                            Review and manage employee leave applications.
                        </p>

                    </div>


                </header>





                <section className="content-card">


                    <div className="section-heading">

                        <div>

                            <h2>
                                Pending Requests
                            </h2>


                            <p>
                                Approve or reject employee requests.
                            </p>

                        </div>


                    </div>





                    <RequestTable

                        requests={requests}

                        updateStatus={updateStatus}

                        manager

                    />



                </section>


            </section>


        </main>

    );

}


export default TeamRequests;