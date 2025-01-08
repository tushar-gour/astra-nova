import express from "express";
import cors from "cors";
import healthRouter from "./routes/healthcheck.routes.js";
import langFlowRoute from "./routes/langflow.routes.js";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

// routes declaration
app.use(express.json()); // parses incoming requests with JSON
app.use("/api/v1", healthRouter); // health check route
app.use("/api/v1/:analytics", langFlowRoute); // langflow route to post chat and get analytics from langflow

export { app };
