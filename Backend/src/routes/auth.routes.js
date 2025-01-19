import express from "express";
import { createUser } from "../models/user.model.js"; // Import the DataStax user model
import jwt from "jsonwebtoken"; // Importing JWT for token generation
import rateLimit from "express-rate-limit"; // Importing rate limiting middleware

const router = express.Router();

// Rate limiting middleware for signup and login
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
});

// Password strength validation function
const isPasswordStrong = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

// Signup Route
router.post("/signup", limiter, async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Validate password strength
    if (!isPasswordStrong(password)) {
        return res.status(400).json({ message: "Password must be at least 8 characters long, contain uppercase and lowercase letters, numbers, and special characters." });
    }

    try {
        // Check if user already exists (this logic needs to be implemented in DataStax)
        const existingUser = await checkUserExists(email); // Implement this function
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        await createUser(username, email, password); // Use DataStax to create the user
        return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Login Route
router.post("/login", limiter, async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await checkUserExists(email); // Implement this function
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
