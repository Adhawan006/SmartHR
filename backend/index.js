import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import employeeRoutes from "./routes/employee.route.js";

// Initialize Firebase (optional import if not used directly)
import "./config/firebase.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.send("SmartHR API is running...");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});