import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
        amount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ["success", "failed"], default: "success" },
    },
    { timestamps: true }
);

export default mongoose.model("Donation", DonationSchema);
