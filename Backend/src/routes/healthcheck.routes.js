import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controller.js";

const healthRouter = Router();

// route to check connection status of server
healthRouter.route("/api").get(healthcheck);

export default healthRouter;
