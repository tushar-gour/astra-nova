import express from "express";
import authRoutes from "./routes/auth.routes.js"; // Importing authentication routes
import connectAstraDB from "./db/db.connection.js";
import healthRouter from "./routes/healthcheck.routes.js";

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB (update with your connection string)
connectAstraDB().then(() => console.log("MongoDB connected #2"))
.catch(err => console.error("MongoDB connection error:", err));

// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api", healthRouter);

export default app;