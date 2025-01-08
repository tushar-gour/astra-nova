import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (_, res) => {
    return res.status(200).json({ message: "OK" });
});

export { healthcheck };
