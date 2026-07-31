import { useMemo, useState } from "react";
import { Link } from "react-router-dom";


const balances = [
    {
        name: "Casual Leave",
        used: 2,
        total: 12,
    },
    {
        name: "Sick Leave",
        used: 1,
        total: 10,
    },
    {
        name: "Earned Leave",
        used: 3,
        total: 18,
    },
];



function ApplyLeave({ onSubmit }) {


    const [form, setForm] = useState({
        type: "Casual Leave",
        from: "",
        to: "",
        reason: "",
    });



    const [notice, setNotice] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");



    const days = useMemo(() => {

        if (
            !form.from ||
            !form.to ||
            form.to < form.from
        ) {
            return 0;
        }


        return (
            Math.round(
                (
                    new Date(`${form.to}T00:00:00`) -
                    new Date(`${form.from}T00:00:00`)
                ) / 86400000
            ) + 1
        );


    }, [form]);





    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!days || !form.reason.trim()) {

            return;

        }

        setSubmitting(true);

        try {

            await onSubmit(form, days);

            setNotice(
                "Leave request submitted successfully."
            );

            setForm({

                type: "Casual Leave",

                from: "",

                to: "",

                reason: "",

            });

        } catch (err) {

            console.error(err);

            setError("Failed to submit leave request. Please try again.");

        } finally {

            setSubmitting(false);

        }

    };




    return (

        <main className="leave-page">

            <section className="leave-shell">


                <header className="leave-header">

                    <div>

                        <p className="eyebrow">
                            SMART HR · TIME OFF
                        </p>


                        <h1>
                            Apply Leave
                        </h1>


                        <p className="page-subtitle">
                            Submit your leave request.
                        </p>

                    </div>


                </header>





                <section className="form-layout">


                    <form
                        className="content-card leave-form"
                        onSubmit={handleSubmit}
                    >


                        <h2>
                            Request time off
                        </h2>



                        {
                            notice &&

                            <p className="success-notice">
                                ✓ {notice}
                            </p>

                        }

                        {
                            error &&

                            <p className="success-notice" style={{ color: "#f87171" }}>
                                {error}
                            </p>

                        }





                        <label>

                            Leave Type


                            <select

                                value={form.type}

                                onChange={(e)=>
                                    setForm({
                                        ...form,
                                        type:e.target.value
                                    })
                                }

                            >

                                {
                                    balances.map((b)=>(

                                        <option
                                            key={b.name}
                                        >

                                            {b.name}

                                        </option>

                                    ))
                                }

                            </select>


                        </label>





                        <div className="date-fields">


                            <label>

                                From

                                <input

                                    type="date"

                                    value={form.from}

                                    onChange={(e)=>
                                        setForm({
                                            ...form,
                                            from:e.target.value
                                        })
                                    }

                                    required

                                />


                            </label>





                            <label>

                                To

                                <input

                                    type="date"

                                    min={form.from}

                                    value={form.to}

                                    onChange={(e)=>
                                        setForm({
                                            ...form,
                                            to:e.target.value
                                        })
                                    }

                                    required

                                />


                            </label>


                        </div>





                        {
                            days > 0 &&

                            <p className="days-preview">

                                This request uses
                                {" "}
                                <strong>
                                    {days} days
                                </strong>

                            </p>

                        }





                        <label>

                            Reason


                            <textarea

                                rows="4"

                                placeholder="Reason for leave"

                                value={form.reason}

                                onChange={(e)=>
                                    setForm({
                                        ...form,
                                        reason:e.target.value
                                    })
                                }

                                required

                            />


                        </label>





                        <div className="form-actions">


                            <Link to="/leave">
                                Cancel
                            </Link>



                            <button
                                className="primary-button"
                                type="submit"
                                disabled={submitting}
                            >

                                {submitting ? "Submitting..." : "Submit Request"}

                            </button>


                        </div>


                    </form>



                </section>


            </section>


        </main>

    );

}


export default ApplyLeave;