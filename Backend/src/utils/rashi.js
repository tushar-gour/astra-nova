import asyncHandler from "express-async-handler";
const getRashi = asyncHandler(async (dob, birthTime) => {
    return "ok";
});

export default getRashi;
