import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

export const protect = async (req, res, next) => {
    let token;

    // ✅ Check if Authorization header contains a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("🔹 Received Token:", token); // 🛠 Debugging message

            // ✅ Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("🔹 Decoded Token:", decoded); // 🛠 Debugging message

            // ✅ Ensure the decoded userId is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
                console.error("❌ Invalid User ID");
                return res.status(401).json({ message: "Invalid User ID" });
            }

            // ✅ Fetch the user and exclude password
            req.user = await User.findById(decoded.userId).select("-password");

            if (!req.user) {
                console.error("❌ User Not Found");
                return res.status(401).json({ message: "User not found, authorization denied." });
            }

            console.log("✅ Authorized User:", req.user.email); // 🛠 Debugging message
            next();

        } catch (error) {
            console.error("❌ Auth Error:", error.message);
            return res.status(401).json({ message: "Invalid token, authorization denied." });
        }
    } else {
        console.error("❌ No Token Provided");
        return res.status(401).json({ message: "No token, authorization denied." });
    }
};

// ✅ Middleware to check if the user is an Admin
export const adminProtect = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        console.error("❌ Admin Access Denied");
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    console.log("✅ Admin Access Granted:", req.user.email);
    next();
};
