import BalanceCard from "./BalanceCard";

// Annual quota per leave type. Only the "used" figure is computed from
// real (approved) Firestore leave requests — total quotas are a policy
// constant, not attendance/leave data, so they stay configured here.
const QUOTAS = {
    "Casual Leave": { total: 12, color: "blue" },
    "Sick Leave": { total: 10, color: "purple" },
    "Earned Leave": { total: 18, color: "orange" },
};


function LeaveBalance({ requests = [] }) {

    const balances = Object.entries(QUOTAS).map(([name, config]) => {
        const used = requests
            .filter((r) => r.type === name && r.status === "Approved")
            .reduce((sum, r) => sum + (Number(r.days) || 0), 0);

        return { name, used, total: config.total, color: config.color };
    });


    return (

        <main className="leave-page">

            <section className="leave-shell">


                <header className="leave-header">

                    <div>

                        <p className="eyebrow">
                            SMART HR · TIME OFF
                        </p>


                        <h1>
                            Leave Balance
                        </h1>


                        <p className="page-subtitle">
                            Check your available leaves for the current year.
                        </p>

                    </div>


                </header>





                <section className="content-card">


                    <div className="section-heading">

                        <div>

                            <h2>
                                Your Leave Balance
                            </h2>


                            <p>
                                Available leave summary.
                            </p>

                        </div>

                    </div>




                    <div className="balance-detail-grid">


                        {
                            balances.map((balance)=>(

                                <BalanceCard

                                    key={balance.name}

                                    balance={balance}

                                />

                            ))
                        }


                    </div>



                </section>


            </section>

        </main>

    );

}


export default LeaveBalance;
