import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Donation from "../models/DonationModel.js"; // Ensure this model exists

dotenv.config();
const router = express.Router();

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Route to Create an Order
router.post("/order", async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Convert amount to paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating Razorpay order");
    }
});

// Route to Verify Payment & Save Donation
router.post("/verify", async (req, res) => {
    try {
        const { userId, campaignId, amount, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify the Razorpay Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body).digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid Payment Signature" });
        }

        // Save payment details to MongoDB
        const donation = new Donation({ userId, campaignId, amount, paymentId: razorpay_payment_id });
        await donation.save();

        res.json({ message: "Payment Successful", donation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error verifying payment" });
    }
});

export default router; // ✅ Fix export issue
