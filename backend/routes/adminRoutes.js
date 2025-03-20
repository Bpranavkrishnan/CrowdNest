import express from "express";
import Campaign from "../models/Campaign.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

/** 
 * ✅ Get all campaigns (Admin View)
 * Allows the admin to view all campaigns, including pending, approved, and rejected ones.
 */
router.get("/all-campaigns", protect, adminProtect, async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("userId", "name email");
    res.status(200).json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

/** 
 * ✅ Update Campaign Status (Approve / Reject)
 * Admin can approve or reject a campaign by updating its status.
 */
router.put("/update-status/:id", protect, adminProtect, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["approved", "rejected"];

    // Check if the provided status is valid
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    // Update the campaign status
    campaign.status = status;
    await campaign.save();

    res.json({ success: true, message: `Campaign ${status} successfully`, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

export default router;
