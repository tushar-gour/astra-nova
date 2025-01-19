import { Client } from 'cassandra-driver';
import bcrypt from 'bcrypt';

const client = new Client({
    contactPoints: ["0.0.0.0/0"], // Replace with your DataStax contact point
    localDataCenter: process.env.ASTRADB_DATA_CENTER, // Replace with your DataStax data center
});

const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    await client.execute(query, [username, email, hashedPassword], { prepare: true });
};

const comparePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

export { createUser, comparePassword };
