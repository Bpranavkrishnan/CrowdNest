import express from "express";
import Donation from "../models/DonationModel.js";
import Campaign from "../models/Campaign.js";
import { protect } from "../middleware/authMiddleware.js"; // Ensure only logged-in users can donate

const router = express.Router();

// ✅ Fetch all donations
router.get("/user-donations", protect, async (req, res) => {
    try {
        const donations = await Donation.find({ user: req.user._id }).populate("campaign", "title");
        res.json(donations);
    } catch (error) {
        console.error("Error fetching user donations:", error);
        res.status(500).json({ message: "Error fetching donations" });
    }
});

// ✅ Route to handle donations
router.post("/donate", protect, async (req, res) => {
    try {
        const { campaignId, amount } = req.body;
        const userId = req.user._id; // Retrieved from auth middleware

        // ✅ Validate inputs
        if (!campaignId || !amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Valid Campaign ID and donation amount are required." });
        }

        // ✅ Find the campaign
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found." });
        }

        // ✅ Prevent donations to completed campaigns
        if (campaign.raisedAmount >= campaign.goal) {
            return res.status(400).json({ message: "Goal amount reached, donations closed." });
        }

        // ✅ Simulate payment processing (dummy success)
        const donation = new Donation({
            userId,
            campaignId,
            amount,
            paymentStatus: "success",
        });

        // ✅ Save donation record
        await donation.save();

        // ✅ Update campaign's raised amount
        campaign.raisedAmount = parseFloat(campaign.raisedAmount) + parseFloat(amount);
        await campaign.save();

        res.status(200).json({ message: "Donation successful!", donation });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
