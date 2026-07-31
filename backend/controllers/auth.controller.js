import { db } from "../config/firebase.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, password, role } = req.body;
    let { email } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Normalize email
    email = email.trim().toLowerCase();

    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserRef = await usersRef.add({
      name: name || "",
      email,
      password: hashedPassword,
      role: role || "employee",
      createdAt: new Date().toISOString(),
    });

    const user = {
      id: newUserRef.id,
      name,
      email,
      role: role || "employee",
    };

    const token = generateToken(user.id);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Normalize email to match registration logic
    email = email.trim().toLowerCase();

    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract user document data cleanly
    const doc = snapshot.docs[0];
    const userId = doc.id;
    const userData = doc.data();

    // Compare plain-text password with hashed password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Omit sensitive data from response
    delete userData.password;

    const token = generateToken(userId);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: { id: userId, ...userData },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get all users (Admin/HR only) — used to populate the reset-password screen
export const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();

    const users = snapshot.docs.map((doc) => {
      const { password, ...rest } = doc.data();
      return { id: doc.id, ...rest };
    });

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Reset a user's password on their behalf (Admin/HR only).
// There's no self-service "forgot password" email flow yet since the project
// doesn't use Firebase Auth's client SDK — this covers the SRS requirement
// in a way that fits the existing Express + Firestore auth setup.
export const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRef.update({ password: hashedPassword });

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};