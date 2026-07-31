function RequestTable({
    requests,
    setRequests,
    compact,
    manager,
    updateStatus
}) {


    const handleStatus = (id, status) => {

        if (updateStatus) {
            updateStatus(id, status);
            return;
        }


        setRequests?.((current) =>
            current.map((request) =>
                request.id === id
                    ? {
                        ...request,
                        status
                    }
                    : request
            )
        );

    };


    if (!requests.length) {

        return (
            <p className="empty-state">
                No leave requests found.
            </p>
        );

    }



    return (

        <div className="table-wrap">

            <table>


                <thead>

                    <tr>

                        {
                            manager &&
                            <th>
                                Employee
                            </th>
                        }


                        <th>
                            Leave Type
                        </th>


                        <th>
                            Dates
                        </th>


                        <th>
                            Days
                        </th>


                        {
                            !compact &&
                            <th>
                                Reason
                            </th>
                        }


                        <th>
                            Status
                        </th>


                        {
                            manager &&
                            <th>
                                Action
                            </th>
                        }


                    </tr>

                </thead>



                <tbody>


                {
                    requests.map((request)=>(


                        <tr key={request.id}>


                            {
                                manager &&
                                <td>

                                    <strong>
                                        {request.employeeName || "Unknown"}
                                    </strong>

                                </td>
                            }



                            <td>
                                {request.type}
                            </td>



                            <td>

                                {request.from}
                                {" - "}
                                {request.to}


                                <span className="table-muted">

                                    Applied {request.applied}

                                </span>

                            </td>



                            <td>
                                {request.days}
                            </td>



                            {
                                !compact &&
                                <td>
                                    {request.reason}
                                </td>
                            }



                            <td>

                                <span
                                className={`status ${request.status.toLowerCase()}`}
                                >

                                    {request.status}

                                </span>

                            </td>




                            {
                                manager &&

                                <td>

                                    {
                                        request.status === "Pending"
                                        ?

                                        <div className="request-actions">


                                            <button

                                            className="approve"

                                            onClick={() =>
                                                handleStatus(
                                                    request.id,
                                                    "Approved"
                                                )
                                            }

                                            >
                                                Approve
                                            </button>



                                            <button

                                            className="reject"

                                            onClick={() =>
                                                handleStatus(
                                                    request.id,
                                                    "Rejected"
                                                )
                                            }

                                            >
                                                Reject
                                            </button>


                                        </div>

                                        :

                                        "—"
                                    }


                                </td>
                            }



                        </tr>


                    ))
                }


                </tbody>


            </table>


        </div>

    );

}


export default RequestTable;