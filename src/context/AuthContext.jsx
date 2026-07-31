import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import { auth, db, getSecondaryAuth } from "../firebase/config";
import { setUser as setReduxUser, logout as reduxLogout } from "../redux/authSlice";

const AuthContext = createContext(null);

// Fetches (or lazily creates) the Firestore `users/{uid}` profile document
// that backs role-based access control.
async function loadUserProfile(firebaseUser, fallback = {}) {
    const ref = doc(db, "users", firebaseUser.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
        return { uid: firebaseUser.uid, ...snap.data() };
    }

    // No profile yet (e.g. first-ever login) — create a default "employee"
    // profile so the app never gets stuck with an undefined role.
    const profile = {
        uid: firebaseUser.uid,
        name: fallback.name || firebaseUser.displayName || firebaseUser.email,
        email: firebaseUser.email,
        role: fallback.role || "employee",
        department: fallback.department || "General",
        createdAt: serverTimestamp(),
    };

    await setDoc(ref, profile);

    return profile;
}

export function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                dispatch(reduxLogout());
                setInitializing(false);
                return;
            }

            try {
                const profile = await loadUserProfile(firebaseUser);
                setUser(profile);
                dispatch(setReduxUser(profile));
            } catch (err) {
                console.error("Failed to load user profile:", err);
                setUser(null);
                dispatch(reduxLogout());
            } finally {
                setInitializing(false);
            }
        });

        return unsubscribe;
    }, [dispatch]);

    // --- Auth actions -------------------------------------------------

    const register = async ({ name, email, password, role = "employee", department = "General" }) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        if (name) {
            await updateProfile(cred.user, { displayName: name });
        }

        const profile = {
            uid: cred.user.uid,
            name,
            email,
            role,
            department,
            createdAt: serverTimestamp(),
        };

        await setDoc(doc(db, "users", cred.user.uid), profile);

        setUser(profile);
        dispatch(setReduxUser(profile));

        return profile;
    };

    // Used by Admin/HR to create a login for someone else without being
    // logged out themselves. Runs on an isolated secondary Firebase app.
    const createUserAsAdmin = async ({ name, email, password, role, department = "General" }) => {
        const secondaryAuth = getSecondaryAuth();
        const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);

        if (name) {
            await updateProfile(cred.user, { displayName: name });
        }

        const profile = {
            uid: cred.user.uid,
            name,
            email,
            role,
            department,
            createdAt: serverTimestamp(),
        };

        await setDoc(doc(db, "users", cred.user.uid), profile);

        // Sign the secondary session out again; it never touches the admin's
        // real session on the default `auth` instance.
        await signOut(secondaryAuth);

        return profile;
    };

    const login = async (email, password) => {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const profile = await loadUserProfile(cred.user);

        setUser(profile);
        dispatch(setReduxUser(profile));

        return profile;
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        dispatch(reduxLogout());
    };

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const updateUserProfile = async (updates) => {
        if (!auth.currentUser) throw new Error("Not authenticated");

        if (updates.name) {
            await updateProfile(auth.currentUser, { displayName: updates.name });
        }

        const ref = doc(db, "users", auth.currentUser.uid);
        await setDoc(ref, updates, { merge: true });

        const profile = { ...user, ...updates };
        setUser(profile);
        dispatch(setReduxUser(profile));

        return profile;
    };

    const changePassword = async (currentPassword, newPassword) => {
        if (!auth.currentUser) throw new Error("Not authenticated");

        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        );

        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);
    };

    const value = {
        user,
        initializing,
        register,
        createUserAsAdmin,
        login,
        logout,
        resetPassword,
        updateUserProfile,
        changePassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
