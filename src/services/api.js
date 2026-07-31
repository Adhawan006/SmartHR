import axios from "axios";
import { store } from "../redux/store";

// Shared axios instance for the whole app. Any module can import this
// instead of calling axios directly with a hardcoded URL, and every
// request automatically carries the logged-in user's JWT.
const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
