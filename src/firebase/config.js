// src/firebase/config.js
// Central Firebase initialization for the SmartHR frontend.
// Values are read from Vite environment variables (see .env.example).
// Never hardcode real credentials here — use a local .env file that is gitignored.

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Guard against re-initialization during Vite HMR
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * A secondary, isolated Firebase app instance.
 * Used only when an already-logged-in Admin/HR user needs to create a brand
 * new user account (Firebase Auth's createUserWithEmailAndPassword signs the
 * caller in as the new user on the *default* app, which would otherwise log
 * the admin out). Operating on a second app avoids touching the admin's
 * session on the default `auth` instance.
 */
export function getSecondaryAuth() {
    const secondaryApp =
        getApps().find((a) => a.name === "Secondary") ||
        initializeApp(firebaseConfig, "Secondary");

    return getAuth(secondaryApp);
}

export default app;
