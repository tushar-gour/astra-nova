import { Router } from "express";
import fetchAnalytics from "../controllers/langflow.controller.js";

const langFlowRoute = Router();

langFlowRoute.route("/:analytics").get(fetchAnalytics);

export default langFlowRoute;
