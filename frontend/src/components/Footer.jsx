import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2>Join The Impact Community!</h2>
        <div className="subscribe">
        
          <button onClick={() => alert('Subscribed!')}>SUBSCRIBE NOW</button>
        </div>
      </div>
      <hr />
      <div className="footer-middle">
        <div className="footer-section">
          <h4>CONTACT US</h4>
          <p><a href="mailto:info@CrowdNest.com" style={{ color: 'white' }}>General Enquiry</a></p>
          <p><a href="mailto:info@CrowdNest.com" style={{ color: 'white' }}>Email: info@CrowdNest.com</a></p>
          <p><a href="tel:18008912903" style={{ color: 'white' }}>Phone: 18008912903</a></p>
          <button className="raise-concern"onClick={() => alert('Concerned Raised!')}>Raise A Concern</button>
          <div className="social-icons">
            <a href="https://facebook.com" style={{ color: 'white' }}><FaFacebookF /></a>
            <a href="https://twitter.com" style={{ color: 'white' }}><FaTwitter /></a>
            <a href="https://linkedin.com" style={{ color: 'white' }}><FaLinkedinIn /></a>
            <a href="https://youtube.com" style={{ color: 'white' }}><FaYoutube /></a>
            <a href="https://whatsapp.com" style={{ color: 'white' }}><FaWhatsapp /></a>
            <a href="https://instagram.com" style={{ color: 'white' }}><FaInstagram /></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>ABOUT US</h4>
          <p><a href="/about" style={{ color: 'white' }}>About Us</a></p>
          <p><a href="/about" style={{ color: 'white' }}>Team</a></p>
          <p><a href="/blog" style={{ color: 'white' }}>Blog</a></p>
          <p><a href="/resources" style={{ color: 'white' }}>Resources</a></p>
        </div>
        <div className="footer-section">
          <h4>LEARN</h4>
          <p><a href="https://en.wikipedia.org/wiki/Crowdfunding" style={{ color: 'white' }}>What is Crowdfunding?</a></p>
          <p><a href="https://www.crowdfunding.com/" style={{ color: 'white' }}>Fundraising Ideas</a></p>
          <p><a href="https://thelocalcrowd.com/faqs/" style={{ color: 'white' }}>Frequently Asked Questions</a></p>
          <p><a href="https://www.forbes.com/councils/forbesbusinesscouncil/2023/10/24/trust-and-safety-the-lock-and-key-of-crowdfunding-success/" style={{ color: 'white' }}>Trust & Safety</a></p>
        </div>
        <div className="footer-section">
          <h4>TOP CATEGORIES</h4>
          <p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10697184/" style={{ color: 'white' }}>Medical Crowdfunding</a></p>
          <p><a href="https://www.ketto.org/cause/transplant-crowdfunding" style={{ color: 'white' }}>Transplant Crowdfunding</a></p>
          <p><a href="https://pressroom.cancer.org/crowdfunding-ACS" style={{ color: 'white' }}>Cancer Crowdfunding</a></p>
          <p><a href="https://angelink.com/c/emergency-fundraising/" style={{ color: 'white' }}>Emergency Crowdfunding</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 CrowdNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
