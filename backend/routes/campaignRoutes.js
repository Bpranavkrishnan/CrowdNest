import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

// Create Campaign
router.post("/create", async (req, res) => {
  try {
    const { title, description, goal, image } = req.body;
    const newCampaign = new Campaign({ title, description, goal, image });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get All Campaigns
router.get("/all", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
// ✅ Fetch a campaign by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested Campaign ID:", id); // 🛠 Debugging message

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Invalid ID format received"); // 🛠 Debugging message
      return res.status(400).json({ message: "Invalid Campaign ID" });
    }

    const campaign = await Campaign.findById(id);
    
    if (!campaign) {
      console.log("Campaign not found in DB"); // 🛠 Debugging message
      return res.status(404).json({ message: "Campaign not found" });
    }

    console.log("Campaign found:", campaign); // 🛠 Debugging message
    res.json(campaign);

  } catch (error) {
    console.error("Error fetching campaign:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
