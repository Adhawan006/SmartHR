import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Generic role-gated route guard. Despite the historical name, it now
// protects any route (not just "admin" ones) based on the caller-supplied
// `allowedRoles`. Role comes from Firestore via AuthContext (mirrored into
// Redux by src/context/AuthContext.jsx), not from a JWT payload.
const AdminRoute = ({ children, allowedRoles }) => {
    const { user, initializing } = useSelector((state) => state.auth);

    if (initializing) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = user.role?.toLowerCase();

        if (!allowedRoles.map((r) => r.toLowerCase()).includes(userRole)) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
};

export default AdminRoute;
