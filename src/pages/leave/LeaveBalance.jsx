import BalanceCard from "./BalanceCard";


const balances = [
    {
        name: "Casual Leave",
        used: 2,
        total: 12,
        color: "blue",
    },
    {
        name: "Sick Leave",
        used: 1,
        total: 10,
        color: "purple",
    },
    {
        name: "Earned Leave",
        used: 3,
        total: 18,
        color: "orange",
    },
];



function LeaveBalance() {


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