import { Router } from "express";
import fetchAnalytics from "../controllers/langflow.controller.js";

const langFlowRoute = Router();

// route to hit langflow agent for analytics report
langFlowRoute.route("/:analytics").get(fetchAnalytics);

export default langFlowRoute;
