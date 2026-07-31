import { createSlice } from "@reduxjs/toolkit";

// Source of truth for auth is now Firebase (see src/context/AuthContext.jsx).
// This slice just mirrors the current Firebase user + Firestore profile so
// existing components (Sidebar, Navbar, AdminRoute, dashboards, ...) that
// already read `useSelector(state => state.auth)` keep working unchanged.
const initialState = {
    user: null, // { uid, name, email, role, department }
    initializing: true, // true until Firebase reports the initial auth state
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.initializing = false;
        },
        logout: (state) => {
            state.user = null;
            state.initializing = false;
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
