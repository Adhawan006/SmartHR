import User from "../models/user.model.js";

import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};export const login = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        console.log("User:", user);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user,
        });
    } catch (error) {
        console.log("LOGIN ERROR:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

export const addEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(
            req.body
        );

        res.status(201).json({
            success: true,
            employee,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};