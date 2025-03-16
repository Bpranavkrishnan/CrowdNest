import React from 'react';
import './DonationCard.css';

const DonationCard = () => {
  return (
    <div className="donation-card">
      {/* Left Section - Main Content */}
      <div className="donation-content">
        <h2>Donate For Them <span className="heart"></span></h2>
        <p className="subtitle">To Save Countless Lives</p>
        <p className="description">
        GEM, or ‘Give Every Month,’ is a life-changing monthly<br></br>donation program that ensures patients in India receive <br></br>timely, life-saving treatments without financial hurdles. <br></br>Your consistent support can make the difference between <br></br>hope and hardship, turning generosity into a lifeline.
        </p>
        {/* <button className="donate-button">
          <span className="heart">❤️</span> Give Every Month
        </button> */}
      </div>
      
      {/* Right Section - Benefits */}
      <div className="donation-benefits">
        <div className="benefit-item">
          <span className="icon"></span>
          <p>100% Transparency</p>
        </div>
        <div className="benefit-item">
          <span className="icon"></span>
          <p>80G Tax Benefits</p>
        </div>
        <div className="benefit-item">
          <span className="icon"></span>
          <p>Track Your Impact</p>
        </div>
        <div className="benefit-item">
          <span className="icon"></span>
          <p>Honour your donations for your loved ones</p>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
