import express from "express";
import { createUser, checkUserExists , comparePassword} from "../models/user.model.js"; // Import the DataStax user model
import jwt from "jsonwebtoken"; // Importing JWT for token generation
import rateLimit from "express-rate-limit"; // Importing rate limiting middleware

const router = express.Router();

// Rate limiting middleware for signup and login
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
});

// Signup Route
router.post("/signup", limiter, async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const existingUser = await checkUserExists(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        await createUser(username, email, password);
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
        const user = await checkUserExists(email);
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
