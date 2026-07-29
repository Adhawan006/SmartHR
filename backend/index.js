import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import employeeRoutes from "./routes/employee.route.js";
import connectDB from "./config/db.js";

connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});