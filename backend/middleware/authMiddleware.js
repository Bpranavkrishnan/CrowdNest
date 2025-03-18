import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Received Token:", token); // Debug

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded); // Debug

            // Ensure the decoded userId is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
                return res.status(401).json({ message: "Invalid User ID" });
            }

            req.user = await User.findById(decoded.userId).select("-password");
            console.log("User Found:", req.user); // Debug

            if (!req.user) {
                return res.status(401).json({ message: "User not found, authorization denied." });
            }

            next();
        } catch (error) {
            console.error("Auth Error:", error);
            res.status(401).json({ message: "Invalid token, authorization denied." });
        }
    } else {
        res.status(401).json({ message: "No token, authorization denied." });
    }
};