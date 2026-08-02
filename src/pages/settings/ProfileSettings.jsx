import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";

function ProfileSettings() {
    const { user } = useSelector((state) => state.auth);
    const { updateUserProfile } = useAuth();

    const [form, setForm] = useState({
        name: user?.name || "",
        department: user?.department || "",
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const handleSave = async () => {
        setSaving(true);
        setMessage("");

        try {
            await updateUserProfile(form);
            setMessage("Profile updated successfully.");
        } catch (err) {
            console.error(err);
            setMessage("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">


            <h2 className="text-xl font-bold mb-6 text-white">
                Profile Information
            </h2>

            {message && (
                <div className="mb-5 p-3 rounded-lg bg-blue-900 text-blue-200 text-sm">
                    {message}
                </div>
            )}


            <div className="grid md:grid-cols-2 gap-6">


                <div  className="gap-4 flex">

                    <label className="text-sm text-slate-400">
                        Full Name
                    </label>

                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="settings-input outline-1 rounded text-center"
                    />

                </div>



                <div className="gap-4 flex">

                    <label className="text-sm text-slate-400">
                        Email
                    </label>

                    <input
                        value={user?.email || ""}
                        readOnly
                        className="settings-input outline-1 rounded text-center "
                    />

                </div>



                <div  className="gap-4 flex">

                    <label className="text-sm text-slate-400">
                        Role
                    </label>

                    <input
                        value={user?.role || ""}
                        readOnly
                        className="settings-input outline-1 rounded text-center"
                    />

                </div>



                <div  className="gap-4 flex">

                    <label className="text-sm text-slate-400">
                        Department
                    </label>

                    <input
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="settings-input outline-1 rounded text-center"
                    />

                </div>


            </div>



            <button
                onClick={handleSave}
                disabled={saving}
                className="
                mt-6
                bg-blue-600
                hover:bg-blue-700
                px-5
                py-2
                rounded-lg
                text-white
                font-semibold
                disabled:opacity-50
                "
            >
                {saving ? "Saving..." : "Save Changes"}
            </button>


        </div>

    );

}


export default ProfileSettings;
