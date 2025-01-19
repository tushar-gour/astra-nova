import express from "express";
import authRoutes from "./routes/auth.routes.js"; // Importing authentication routes
import connectAstraDB from "./db/astradb.connection.js";

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB (update with your connection string)
connectAstraDB().then(() => console.log("AstraDB connected"))
.catch(err => console.error("AstraDB connection error:", err));

// Use authentication routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});
export default app;