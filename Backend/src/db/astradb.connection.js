import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

dotenv.config();

export let collection;

// function to connect to AstraDB
const connectAstraDB = async () => {
    try {
        const client = new DataAPIClient(process.env.ASTRADB_TOKEN);
        const db = client.db(process.env.ASTRADB_URL);
        collection = db.collection("main");
        console.log("Successfully connected to AstraDB");
    } catch (error) {
        console.error("AstraDB connection error:", error);
        throw new Error("Failed to connect to AstraDB");
    }
};

export default connectAstraDB;
