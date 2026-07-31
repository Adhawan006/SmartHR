// src/services/settingsService.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const DEFAULT_SETTINGS = {
    theme: "Dark Theme",
    language: "English",
    timezone: "India Standard Time",
    notifications: {
        email: true,
        leave: true,
        attendance: true,
        announcements: false,
    },
};

export async function getUserSettings(uid) {
    const ref = doc(db, "userSettings", uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
        return { ...DEFAULT_SETTINGS, ...snap.data() };
    }

    await setDoc(ref, { uid, ...DEFAULT_SETTINGS });
    return { uid, ...DEFAULT_SETTINGS };
}

export async function saveUserSettings(uid, updates) {
    const ref = doc(db, "userSettings", uid);
    await setDoc(ref, { uid, ...updates }, { merge: true });
    return updates;
}
