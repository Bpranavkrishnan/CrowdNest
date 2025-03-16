import React from "react";
import { FaBolt, FaHeart, FaJar } from "react-icons/fa6"; // Updated icons from react-icons
import "./HomeScreenBand.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-item">
        <FaBolt className="icon" />
        <span>No fee to start fundraising</span>
      </div>

      <div className="separator">....................</div>

      <div className="banner-item">
        <FaHeart className="icon" />
        <span>1 donation made every second</span>
      </div>

      <div className="separator">....................</div>

      <div className="banner-item">
        <FaJar className="icon" />
        <span><strong>8K+</strong> fundraisers started daily</span>
      </div>
    </div>
  );
};

export default Banner;
