import express from "express";
import {
    register,
    login,
    getAllUsers,
    resetPassword
} from "../controllers/auth.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);

// Only a logged-in Admin/HR can create new user accounts
router.post("/register", protect, authorize("admin", "hr"), register);

// Only a logged-in Admin/HR can view users / reset passwords on their behalf
router.get("/users", protect, authorize("admin", "hr"), getAllUsers);
router.put("/reset-password/:id", protect, authorize("admin", "hr"), resetPassword);

export default router;
