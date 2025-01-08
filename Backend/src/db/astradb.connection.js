import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

dotenv.config();

const connectAstraDB = async () => {
    const client = new DataAPIClient(process.env.ASTRADB_TOKEN);

    const db = client.db(process.env.ASTRADB_URL, {
        keyspace: "default_keyspace",
        token: process.env.ASTRADB_TOKEN,
    });

    collection = db.collection(process.env.ASTRADB_COLLECTION);

    console.log("Successfully connected to AstraDB");
};

export default connectAstraDB;
