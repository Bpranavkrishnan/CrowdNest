import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"; // Import CSS
import Registrationimage from"../assets/registrationimage.png"; // Import image 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Registration successful");
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-left">
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="icon">&#128100;</span>
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="input-group">
              <span className="icon">&#9993;</span>
              <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <span className="icon">&#128274;</span>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {/* <div className="terms">
              <input type="checkbox" required />
              <span>I agree to the statements in <a href="#">Terms of service</a></span>
            </div> */}
            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
        <div className="register-right">
          <img src={Registrationimage} alt="Sign up illustration" />
          <p><a href="/login">I am already a member</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
