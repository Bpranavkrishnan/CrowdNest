import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      {/* Contact Info Section */}
      <div className="contact-info">
        <p><strong>📍 Address:</strong> 123 Crowdfunding Street, Mumbai, India</p>
        <p><strong>📞 Phone:</strong> +91 98765 43210</p>
        <p><strong>📧 Email:</strong> support@crowdnest.com</p>
      </div>

      {/* Google Map Embed */}
      <div className="map-container">
        <iframe
          title="CrowdNest Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4821968254934!2d73.85674337519832!3d18.561522770380792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf65eebd5e9b%3A0xf3b6b21c6e26a7f4!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1642408236451!5m2!1sen!2sin"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h3>Send Us a Message</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button onClick={() => alert('Your Concern Request Send to our team they will replay you soon')}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
