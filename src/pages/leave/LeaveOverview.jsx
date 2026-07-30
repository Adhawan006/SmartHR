import { Link } from "react-router-dom";
import BalanceCard from "./BalanceCard";
import RequestTable from "./RequestTable";


const balances = [
    {
        name:"Casual Leave",
        used:2,
        total:12,
        color:"blue"
    },
    {
        name:"Sick Leave",
        used:1,
        total:10,
        color:"purple"
    },
    {
        name:"Earned Leave",
        used:3,
        total:18,
        color:"orange"
    }
];


function LeaveOverview({requests,setRequests}){

    const pending = requests.filter(
        item => item.status === "Pending"
    ).length;


    return (

        <main className="leave-page">

            <section className="leave-shell">


                <header className="leave-header">

                    <div>

                        <p className="eyebrow">
                            SMART HR · TIME OFF
                        </p>

                        <h1>
                            Leave Management
                        </h1>

                        <p className="page-subtitle">
                            Manage employee leave requests easily.
                        </p>

                    </div>


                    <Link
                    className="primary-button"
                    to="/leave/apply"
                    >
                        + Apply Leave
                    </Link>

                </header>



                <div className="balance-grid">

                    {
                        balances.map(balance => (
                            <BalanceCard
                            key={balance.name}
                            balance={balance}
                            />
                        ))
                    }

                </div>



                <section className="content-card">


                    <div className="section-heading">

                        <div>

                            <h2>
                                Recent Requests
                            </h2>

                            <p>
                                Track your leave applications.
                            </p>

                        </div>


                        <Link
                        to="/leave/history"
                        className="text-link"
                        >
                            View History →
                        </Link>

                    </div>



                    <RequestTable
                    requests={requests.slice(0,3)}
                    setRequests={setRequests}
                    compact
                    />


                </section>



                <section className="leave-tip">

                    <strong>
                        {pending} pending request
                    </strong>

                </section>


            </section>

        </main>

    );

}


export default LeaveOverview;