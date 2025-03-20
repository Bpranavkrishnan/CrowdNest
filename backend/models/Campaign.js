import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ References the User model
    required: true, // ✅ Ensures a campaign must have a creator
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  image: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // ✅ Added status field
  createdAt: { type: Date, default: Date.now },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
