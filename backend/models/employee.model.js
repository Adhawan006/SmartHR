import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
        },

        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
        },

        department: {
            type: String,
            required: true,
            enum: [
                "HR",
                "IT",
                "Finance",
                "Marketing",
                "Operations",
            ],
        },

        designation: {
            type: String,
            required: true,
        },

        salary: {
            type: Number,
            required: true,
            min: 0,
        },

        joiningDate: {
            type: Date,
            default: Date.now,
        },

        address: {
            type: String,
            required: true,
        },

        profileImage: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },

        attendancePercentage: {
            type: Number,
            default: 100,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model(
    "Employee",
    employeeSchema
);

export default Employee;