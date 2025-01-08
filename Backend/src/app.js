import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import healthRouter from "./routes/healthcheck.routes.js";
import langFlowRoute from "./routes/langflow.routes.js";
import connectAstraDB from "./db/astradb.connection.js";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// routes declaration
app.use(express.json()); // parses incoming requests with JSON
app.use("/api", healthRouter); // health check route
// app.post("/api/v1/analytics", langFlowRoute);
app.use("/api/v1", langFlowRoute); // langflow route to post chat and get analytics from langflow

// connect to astra db
connectAstraDB().catch((error) => {
    console.log("AstraDB connection failed ", error);
});

// Middleware error handler
app.use((error, _, res, __) => {
    console.error(error.stack); // print detailed description of error
    res.status(500).send(`Middleware Error: ${error}`);
});

export { app };
