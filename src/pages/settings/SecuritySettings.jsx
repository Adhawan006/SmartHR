import { useState } from "react";


function SecuritySettings() {

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });


    const [message, setMessage] = useState("");



    const handleSubmit = (e) => {

        e.preventDefault();


        if (
            form.newPassword !== form.confirmPassword
        ) {

            setMessage(
                "New passwords do not match"
            );

            return;
        }



        if(form.newPassword.length < 6){

            setMessage(
                "Password must be at least 6 characters"
            );

            return;

        }



        setMessage(
            "Password updated successfully"
        );


        setForm({
            currentPassword:"",
            newPassword:"",
            confirmPassword:"",
        });

    };



    return (

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">


            <h2 className="text-xl font-bold text-white mb-6">
                Security
            </h2>



            {
                message && (

                    <div className="
                        mb-5
                        bg-blue-900
                        text-blue-200
                        p-3
                        rounded-lg
                    ">

                        {message}

                    </div>

                )
            }



            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >



                <div>

                    <label className="text-sm text-slate-400">
                        Current Password
                    </label>


                    <input
                        type="password"
                        value={form.currentPassword}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                currentPassword:e.target.value
                            })
                        }
                        className="settings-input"
                    />

                </div>





                <div>

                    <label className="text-sm text-slate-400">
                        New Password
                    </label>


                    <input
                        type="password"
                        value={form.newPassword}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                newPassword:e.target.value
                            })
                        }
                        className="settings-input"
                    />

                </div>





                <div>

                    <label className="text-sm text-slate-400">
                        Confirm Password
                    </label>


                    <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                confirmPassword:e.target.value
                            })
                        }
                        className="settings-input"
                    />

                </div>





                <button
                    type="submit"
                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    px-5
                    py-2
                    rounded-lg
                    text-white
                    font-semibold
                    "
                >

                    Update Password

                </button>


            </form>


        </div>

    );

}


export default SecuritySettings;