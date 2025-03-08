import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
import authRoutes from './routes/authRoutes.js';
app.use("/api/auth", authRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
