import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import app from "./src/app.js";

const PORT = process.env.PORT || 8000;

// Use CORS middleware in your app
app.use(cors({ origin: "*" })); // Allow requests from all origins

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});

// App error event handling
app.on("error", (error) => {
    console.log("App error:", error);
    throw error;
});
