import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

export async function register(req, res) {
    const { userName, email, password } = req.body;

    // Validate input
    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            userName,
            email,
            password: hashedPassword,
        });

        // Save user to the database
        const savedUser = await newUser.save();

        // Respond with success
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: savedUser._id,
                userName: savedUser.userName,
                email: savedUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
}




export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            "SecretKey", 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful!",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
}



