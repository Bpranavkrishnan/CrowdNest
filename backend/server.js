import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import campaignRoutes from "./routes/campaignRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoute.js"; // Ensure this matches the file name
import adminRoutes from "./routes/adminRoutes.js"; // ✅ Import adminRoutes

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/admin", adminRoutes);

// Connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Debugging log for incoming campaign ID requests
app.use("/api/campaigns/:id", (req, res, next) => {
  console.log("Requested Campaign ID:", req.params.id);
  next();
});

// Start the Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));