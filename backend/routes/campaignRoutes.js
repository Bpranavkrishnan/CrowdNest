import express from "express";
import Campaign from "../models/Campaign.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ✅ Create a new campaign (Ensures `userId` is stored)
 */
router.post("/create", protect, async (req, res) => {
  try {
    const { title, description, goal, image } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, please log in" });
    }

    const newCampaign = new Campaign({
      title,
      description,
      goal,
      image,
      userId: req.user._id,
      raisedAmount: 0,
      status: "pending", // Default: Needs Admin Approval
    });

    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ message: "Error creating campaign", error: error.message });
  }
});

/**
 * ✅ Fetch campaigns created by the logged-in user
 */
router.get("/user-campaigns", protect, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching user campaigns:", error);
    res.status(500).json({ message: "Error fetching campaigns", error: error.message });
  }
});

/**
 * ✅ Fetch all approved campaigns (Public API)
 */
router.get("/all", async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: "approved" }) // Only show approved campaigns
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: "Error fetching campaigns", error: error.message });
  }
});

/**
 * ✅ Fetch a specific campaign by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Campaign ID" });
    }

    const campaign = await Campaign.findById(id).lean();

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json(campaign);
  } catch (error) {
    console.error("Error fetching campaign:", error);
    res.status(500).json({ message: "Error fetching campaign", error: error.message });
  }
});

/**
 * ✅ Admin: Fetch all campaigns (Includes user details)
 */
router.get("/admin/all", protect, adminProtect, async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate("userId", "name email") // Show campaign owner details
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error fetching all campaigns:", error);
    res.status(500).json({ message: "Error fetching campaigns", error: error.message });
  }
});

/**
 * ✅ Admin: Update campaign status (`pending` ➝ `approved` or `rejected`)
 */
router.put("/admin/update-status/:id", protect, adminProtect, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Campaign ID" });
    }

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    campaign.status = status;
    await campaign.save();

    res.status(200).json({ message: `Campaign ${status} successfully`, campaign });
  } catch (error) {
    console.error("Error updating campaign status:", error);
    res.status(500).json({ message: "Error updating campaign status", error: error.message });
  }
});

export default router;
