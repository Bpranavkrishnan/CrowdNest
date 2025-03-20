import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Campaign from "../models/Campaign.js";

export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({});
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email });

        if (!admin || !admin.isAdmin) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: admin._id, isAdmin: true }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, message: "Admin login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
