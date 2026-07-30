import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children, allowedRoles = ["admin"] }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const userRole = user.role?.toLowerCase();

  // Check if current user's role is permitted
  if (!allowedRoles.map((r) => r.toLowerCase()).includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;