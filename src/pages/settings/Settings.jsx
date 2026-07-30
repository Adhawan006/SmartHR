import { Routes, Route, NavLink } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import Preferences from "./Preferences";


function Settings() {

    return (

        <div className="flex min-h-screen bg-slate-950">


            <Sidebar />


            <div className="flex-1 min-w-0">


                <Navbar />


                <main className="p-8 text-white">


                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-blue-400">
                            Settings
                        </h1>


                        <p className="text-slate-400 mt-2">
                            Manage your account and application preferences.
                        </p>

                    </div>



                    <div className="flex gap-6">


                        <aside className="w-64 bg-slate-900 rounded-xl p-4 h-fit">


                            <nav className="flex flex-col gap-2">


                                <NavLink
                                    to="/settings/profile"
                                    className="settings-link"
                                >
                                    Profile
                                </NavLink>



                                <NavLink
                                    to="/settings/security"
                                    className="settings-link"
                                >
                                    Security
                                </NavLink>



                                <NavLink
                                    to="/settings/notifications"
                                    className="settings-link"
                                >
                                    Notifications
                                </NavLink>



                                <NavLink
                                    to="/settings/preferences"
                                    className="settings-link"
                                >
                                    Preferences
                                </NavLink>


                            </nav>


                        </aside>





                        <section className="flex-1">


                            <Routes>


                                <Route
                                    index
                                    element={<ProfileSettings />}
                                />


                                <Route
                                    path="profile"
                                    element={<ProfileSettings />}
                                />


                                <Route
                                    path="security"
                                    element={<SecuritySettings />}
                                />


                                <Route
                                    path="notifications"
                                    element={<NotificationSettings />}
                                />


                                <Route
                                    path="preferences"
                                    element={<Preferences />}
                                />


                            </Routes>


                        </section>


                    </div>


                </main>


            </div>


        </div>


    );

}


export default Settings;