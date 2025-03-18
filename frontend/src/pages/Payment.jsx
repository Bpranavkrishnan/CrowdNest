import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Payment.css";
import paypal from "../assets/paypal.jpg";

const Payment = () => {
    const navigate = useNavigate();
    const { id: campaignId } = useParams(); // Get campaign ID from URL
    const [amount, setAmount] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const token = localStorage.getItem("token"); // ✅ Retrieve token
    
            if (!token) {
                alert("Please log in to donate.");
                navigate("/login");
                return;
            }
    
            console.log("Token being sent:", token); // 🛠 Debugging
    
            const response = await axios.post(
                "http://localhost:5000/api/payments/donate", // ✅ Corrected route
                { campaignId, amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Ensure 'Bearer ' prefix
                        "Content-Type": "application/json",
                    },
                }
            );
    
            alert(response.data.message);
            navigate(`/campaign/${campaignId}`);
        } catch (error) {
            console.error("Payment Error:", error);
            alert(error.response?.data?.message || "Payment failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-card-left">
                    <h2>Complete Your Donation</h2>
                    <div className="payment-icons">
                   
                        <img src={paypal} alt="paypal" />
                       
                    </div>
                </div>
                <div className="payment-card-right">
                    <form onSubmit={handlePayment}>
                        <label>Amount</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />

                        <label>Card Number</label>
                        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength="16" required />

                        <label>Expiry Date (MM/YY)</label>
                        <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} maxLength="5" required />

                        <label>CVV</label>
                        <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength="3" required />

                        <button type="submit" disabled={loading}>{loading ? "Processing..." : "Pay Now"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;