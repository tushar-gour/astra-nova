import express from "express";
import authRoutes from "./routes/auth.routes.js"; // Importing authentication routes
import connectAstraDB from "./db/db.connection.js";
import healthRouter from "./routes/healthcheck.routes.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies

app.use(cors({
    origin: "*", // Client origin
    credentials: true
}));

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
});

// Connect to MongoDB (update with your connection string)
connectAstraDB()
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the application if the database connection fails
    });

// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api", healthRouter);

export default app;
