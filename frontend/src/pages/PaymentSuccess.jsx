import { Link } from "react-router-dom";

const PaymentSuccess = () => {
    return (
        <div>
            <h2>🎉 Payment Successful! 🎉</h2>
            <p>Thank you for your generous donation.</p>
            <Link to="/home">Go to Home</Link>
        </div>
    );
};

export default PaymentSuccess;

