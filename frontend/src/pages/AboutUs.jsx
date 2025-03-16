import React from "react";
import "../styles/AboutUs.css";
import aboutImage from "../assets/Aboutus.gif"; // Add an appropriate image in assets

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About CrowdNest</h1>
        <p>Empowering dreams, funding hope, and making a difference.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            CrowdNest is a platform designed to bring communities together to support causes, fund projects, and make meaningful changes in people's lives. 
            Whether it's medical emergencies, education, creative projects, or social causes, we provide the tools to turn dreams into reality.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </div>

      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a seamless and trustworthy crowdfunding experience where generosity meets innovation. 
          We believe in the power of community-driven support and strive to make fundraising easy, transparent, and impactful.
        </p>
      </div>

      <div className="about-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Transparency</h3>
            <p>We ensure that every donation reaches its intended purpose with full transparency.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>Bringing people together to support and uplift each other.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Utilizing technology to simplify fundraising and increase impact.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
