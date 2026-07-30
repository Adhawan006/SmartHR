import { useState } from "react";


function Preferences() {


    const [preferences, setPreferences] = useState({

        language: "English",

        theme: "Dark Theme",

        timezone: "India Standard Time",

    });



    const handleChange = (key, value) => {

        setPreferences({

            ...preferences,

            [key]: value,

        });

    };



    return (

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">


            <h2 className="text-xl font-bold text-white mb-6">
                Preferences
            </h2>



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
                Save Preferences
            </button>



        </div>

    );

}


export default Preferences;