import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import paypal from "../assets/paypal.jpg";

const Payment = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert("Payment Successful!");
            navigate("/success");
        }, 2000);
    };

    return (
        <div className="payment-container">
            <h2>Complete Your Donation</h2>
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
    );
};

export default Payment;
