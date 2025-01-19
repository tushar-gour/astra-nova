import express from "express";
import { createUser, checkUserExists, comparePassword } from "../models/user.model.js"; // Import the DataStax user model
import jwt from "jsonwebtoken"; // Importing JWT for token generation
import User from "../models/user.model.js"
const router = express.Router();
import bcrypt from "bcrypt"

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        await createUser(username, email, password);
        return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error during signup." });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const isPasswordSame = await bcrypt.compare(password,user.password);
        if (!isPasswordSame) {
            return res.status(401).json({ message: "Invalid credentials." });
            }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error during login." });
    }
});

export default router;
