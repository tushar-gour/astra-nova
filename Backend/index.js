import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import app from "./src/app.js";

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: "*", // Client origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Other middleware and routes come after
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});

// App error event handling
app.on("error", (error) => {
    console.log("App error:", error);
    throw error;
});
