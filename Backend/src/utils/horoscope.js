import asyncHandler from "express-async-handler";
import langflowMain from "../services/langflowclient";

const getHoroscope = asyncHandler(async () => {
   return await langflowMain();
});

export default getHoroscope;
