import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
