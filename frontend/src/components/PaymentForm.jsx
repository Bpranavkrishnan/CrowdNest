import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const PaymentForm = ({ campaignId }) => {
    const { user } = useContext(AuthContext);
    const [amount, setAmount] = useState("");

    const handlePayment = async () => {
        if (!user) {
            alert("Please log in to donate!");
            return;
        }

        const response = await fetch("http://localhost:5000/api/payment/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });

        const order = await response.json();
        
        const options = {
            key: "your_razorpay_key_id",
            amount: order.amount,
            currency: "INR",
            name: "CrowdNest",
            description: "Donate to a campaign",
            order_id: order.id,
            handler: async (response) => {
                await fetch("http://localhost:5000/api/payment/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user.id,
                        campaignId,
                        amount,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }),
                });

                alert("Payment successful!");
            },
            theme: { color: "#3399cc" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div>
            <h3>Donate to this campaign</h3>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
            <button onClick={handlePayment}>Donate</button>
        </div>
    );
};

export default PaymentForm;

