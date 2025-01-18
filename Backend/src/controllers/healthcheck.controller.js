import asyncHandler from "express-async-handler";

// health check for server status
const healthcheck = asyncHandler(async (_, res) => {
    return res.status(200).json({ message: "OK" });
});

export { healthcheck };
