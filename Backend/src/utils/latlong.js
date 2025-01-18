import asyncHandler from "express-async-handler";
import groqMain from "./groq.js";

const getLatLong = asyncHandler(async (birthCity) => {
    return await groqMain(birthCity);
})

export default getLatLong;