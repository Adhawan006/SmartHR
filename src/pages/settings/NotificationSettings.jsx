import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserSettings, saveUserSettings } from "../../services/settingsService";


function NotificationSettings() {

    const { user } = useSelector((state) => state.auth);

    const [notifications, setNotifications] = useState({
        email: true,
        leave: true,
        attendance: true,
        announcements: false,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;

        getUserSettings(user.uid)
            .then((settings) => setNotifications(settings.notifications))
            .finally(() => setLoading(false));
    }, [user]);


    const toggleNotification = async (key) => {

        const updated = {

            ...notifications,

            [key]: !notifications[key],

        };

        setNotifications(updated);
        setSaving(true);

        try {
            await saveUserSettings(user.uid, { notifications: updated });
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }

    };


    if (loading) {
        return (
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-slate-400">
                Loading notification preferences...
            </div>
        );
    }


    return (

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">


            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                    Notification Settings
                </h2>
                {saving && <span className="text-xs text-slate-400">Saving...</span>}
            </div>



            <div className="space-y-5">



                <NotificationItem
                    title="Email Notifications"
                    description="Receive important updates through email"
                    checked={notifications.email}
                    onChange={() => toggleNotification("email")}
                />



                <NotificationItem
                    title="Leave Updates"
                    description="Get notified when leave requests are approved or rejected"
                    checked={notifications.leave}
                    onChange={() => toggleNotification("leave")}
                />



                <NotificationItem
                    title="Attendance Alerts"
                    description="Receive attendance related reminders"
                    checked={notifications.attendance}
                    onChange={() => toggleNotification("attendance")}
                />



                <NotificationItem
                    title="Company Announcements"
                    description="Receive company news and announcements"
                    checked={notifications.announcements}
                    onChange={() => toggleNotification("announcements")}
                />



            </div>


        </div>

    );

}



function NotificationItem({
    title,
    description,
    checked,
    onChange
}) {


    return (

        <div className="
            flex
            justify-between
            items-center
            bg-slate-800
            p-4
            rounded-lg
        ">


            <div>

                <h3 className="text-white font-semibold">
                    {title}
                </h3>


                <p className="text-sm text-slate-400">
                    {description}
                </p>

            </div>



            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-5 h-5"
            />


        </div>

    );

}


export default NotificationSettings;
