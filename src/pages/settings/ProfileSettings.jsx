function ProfileSettings() {

    const user = {
        name: "Aditya Dhawan",
        email: "aditya@example.com",
        role: "Employee",
        department: "Engineering",
    };


    return (

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">


            <h2 className="text-xl font-bold mb-6 text-white">
                Profile Information
            </h2>



            <div className="grid md:grid-cols-2 gap-6">


                <div>

                    <label className="text-sm text-slate-400">
                        Full Name
                    </label>

                    <input
                        value={user.name}
                        readOnly
                        className="settings-input"
                    />

                </div>



                <div>

                    <label className="text-sm text-slate-400">
                        Email
                    </label>

                    <input
                        value={user.email}
                        readOnly
                        className="settings-input"
                    />

                </div>



                <div>

                    <label className="text-sm text-slate-400">
                        Role
                    </label>

                    <input
                        value={user.role}
                        readOnly
                        className="settings-input"
                    />

                </div>



                <div>

                    <label className="text-sm text-slate-400">
                        Department
                    </label>

                    <input
                        value={user.department}
                        readOnly
                        className="settings-input"
                    />

                </div>


            </div>



            <button
                className="
                mt-6
                bg-blue-600
                hover:bg-blue-700
                px-5
                py-2
                rounded-lg
                text-white
                font-semibold
                "
            >
                Save Changes
            </button>


        </div>

    );

}


export default ProfileSettings;