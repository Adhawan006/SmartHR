import express from "express";
import authRoutes from "./routes/auth.route.js";
import employeeRoutes from "./routes/employee.route.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});