import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const createUser = async (username, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save(); // Save user to MongoDB
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("User creation failed");
    }
};

const checkUserExists = async (email) => {
    try {
        const user = await User.findOne({ email }); // Check if user exists
        return user;
    } catch (error) {
        console.error("Error checking user existence:", error);
        throw new Error("User existence check failed");
    }
};

const comparePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};

export { createUser, checkUserExists, comparePassword };
