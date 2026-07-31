import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserSettings, saveUserSettings } from "../../services/settingsService";


function Preferences() {

    const { user } = useSelector((state) => state.auth);

    const [preferences, setPreferences] = useState({
        language: "English",
        theme: "Dark Theme",
        timezone: "India Standard Time",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user) return;

        getUserSettings(user.uid)
            .then((settings) =>
                setPreferences({
                    language: settings.language,
                    theme: settings.theme,
                    timezone: settings.timezone,
                })
            )
            .finally(() => setLoading(false));
    }, [user]);



    const handleChange = (key, value) => {

        setPreferences({

            ...preferences,

            [key]: value,

        });

    };


    const handleSave = async () => {
        setSaving(true);
        setMessage("");

        try {
            await saveUserSettings(user.uid, preferences);
            setMessage("Preferences saved.");
        } catch (err) {
            console.error(err);
            setMessage("Failed to save preferences.");
        } finally {
            setSaving(false);
        }
    };


    if (loading) {
        return (
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-slate-400">
                Loading preferences...
            </div>
        );
    }


    return (

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">


            <h2 className="text-xl font-bold text-white mb-6">
                Preferences
            </h2>

            {message && (
                <div className="mb-5 p-3 rounded-lg bg-blue-900 text-blue-200 text-sm">
                    {message}
                </div>
            )}


            <div className="space-y-5">



                <div>

                    <label className="text-sm text-slate-400">
                        Language
                    </label>


                    <select
                        className="settings-input"
                        value={preferences.language}
                        onChange={(e)=>
                            handleChange(
                                "language",
                                e.target.value
                            )
                        }
                    >

                        <option>
                            English
                        </option>


                        <option>
                            Hindi
                        </option>


                    </select>

                </div>





                <div>

                    <label className="text-sm text-slate-400">
                        Theme
                    </label>


                    <select
                        className="settings-input"
                        value={preferences.theme}
                        onChange={(e)=>
                            handleChange(
                                "theme",
                                e.target.value
                            )
                        }
                    >

                        <option>
                            Dark Theme
                        </option>


                        <option>
                            Light Theme
                        </option>


                    </select>


                </div>





                <div>

                    <label className="text-sm text-slate-400">
                        Timezone
                    </label>


                    <select
                        className="settings-input"
                        value={preferences.timezone}
                        onChange={(e)=>
                            handleChange(
                                "timezone",
                                e.target.value
                            )
                        }
                    >

                        <option>
                            India Standard Time
                        </option>


                        <option>
                            UTC
                        </option>


                        <option>
                            US Eastern Time
                        </option>


                    </select>


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
                {saving ? "Saving..." : "Save Preferences"}
            </button>



        </div>

    );

}


export default Preferences;
