import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb://localhost:27017/employee"
        );

        console.log("MongoDB Connected!");
    } catch (error) {
        console.log(error.message);
    }
};

export default connectDB;