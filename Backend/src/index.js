import dotenv from "dotenv";
import { app } from "././app.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server running at port : ${PORT}`);
});

// App error event handling
app.on("error", (error) => {
    console.log("App error: ", error);
    throw error;
});
