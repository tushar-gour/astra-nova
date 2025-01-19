import { Client } from 'cassandra-driver';
import bcrypt from 'bcrypt';

const client = new Client({
    contactPoints: ["0.0.0.0/0"], // Replace with your DataStax contact point
    localDataCenter: process.env.ASTRADB_DATA_CENTER, // Replace with your DataStax data center
});


const createUser = async (username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await client.execute(query, [username, email, hashedPassword], { prepare: true });
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("User creation failed");
    }
};

const checkUserExists = async (email) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const result = await client.execute(query, [email], { prepare: true });
        return result.rowLength > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Error checking user existence:", error);
        throw new Error("User existence check failed");
    }
};

const comparePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

export { createUser, checkUserExists, comparePassword };
