import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/Login.css";
import Loginimage from "../assets/loginimage.png";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(email, password);
      
      if (success) {
        const userId = localStorage.getItem("userId"); // ✅ Fetch userId properly
  
        if (!userId) {
          console.error("❌ Debug - userId is missing in localStorage");
          alert("Login failed. Please try again.");
          return;
        }
  
        console.log("✅ Debug - Redirecting to /dashboard/" + userId);
  
        setShowConfetti(true);
        
        setTimeout(() => {
          navigate(`/dashboard/${userId}`);  // ✅ Redirect with valid userId
        }, 3000);
        
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="login-page">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="login-left">
        <h1>Welcome to CrowdNest</h1>
        <p>
          "Log in to access your account and manage your fundraising campaigns effortlessly.
          Stay connected, track donations, and engage with supporters in a secure and user-friendly environment.
          If you're new here, create an account and start your journey today!"
        </p>
        <div className="illustration">
          <img src={Loginimage} alt="Illustration" />
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h3>User Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-groups">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-groups">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="options">
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-button">LOGIN</button>
          </form>
          <p className="register-link">
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
