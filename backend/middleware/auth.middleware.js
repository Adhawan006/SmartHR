import jwt from "jsonwebtoken";
import { db } from "../config/firebase.js";

// Verifies the JWT sent in the Authorization header (Bearer <token>)
// and attaches the authenticated user's id/email/role to req.user
export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, invalid or expired token" });
        }

        const userDoc = await db.collection("users").doc(decoded.id).get();

        if (!userDoc.exists) {
            return res.status(401).json({ message: "Not authorized, user no longer exists" });
        }

        const userData = userDoc.data();

        req.user = {
            id: userDoc.id,
            email: userData.email,
            role: userData.role,
        };

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Restricts a route to specific roles, e.g. router.post("/add", protect, authorize("admin", "hr"), addEmployee)
export const authorize = (...allowedRoles) => {
    const normalizedRoles = allowedRoles.map((role) => role.toLowerCase());

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (!normalizedRoles.includes(req.user.role?.toLowerCase())) {
            return res.status(403).json({ message: "Forbidden: insufficient role" });
        }

        next();
    };
};
