import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    userId: String,
    campaignId: String,
    amount: Number,
    paymentId: String
}, { timestamps: true });

const Donation = mongoose.model("Donation", DonationSchema);
export default Donation;
