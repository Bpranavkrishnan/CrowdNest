import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import campaignRoutes from "./routes/campaignRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // ✅ Added Payment Routes

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/payment/order", paymentRoutes); // ✅ Integrated Payment Routes

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
