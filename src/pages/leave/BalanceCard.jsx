function BalanceCard({ balance }) {

    const remaining = balance.total - balance.used;


    return (
        <div className={`balance-card ${balance.color}`}>

            <div className="balance-card-top">
                <span>
                    {balance.name}
                </span>

                <span className="balance-icon">
                    ◷
                </span>
            </div>


            <strong>
                {remaining}
                <small>
                    {" "}days left
                </small>
            </strong>


            <div className="balance-progress">

                <i
                    style={{
                        width: `${(balance.used / balance.total) * 100}%`
                    }}
                />

            </div>


            <p>
                {balance.used} used of {balance.total} days
            </p>


        </div>
    );
}


export default BalanceCard;