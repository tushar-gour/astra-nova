import { asyncHandler } from "../utils/asyncHandler.js";

// health check for server status
const healthcheck = asyncHandler(async (_, res) => {
    return res.status(200).json({ message: "OK" });
});

export { healthcheck };
