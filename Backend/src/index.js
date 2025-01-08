import dotenv from "dotenv";
import { app } from "././app.js";
import connectAstraDB from "./db/astradb.connection.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectAstraDB() // connect to AstraDB
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running at port : ${PORT}`);
        });

        // App error event handling
        app.on("error", (error) => {
            console.log("App error: ", error);
            throw error;
        });
    })
    .catch((error) => {
        console.log("AstraDB connection failed ", error);
    });
