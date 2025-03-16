import { useState } from "react";
import axios from "axios";
import "./CampaignForm.css"; // Ensure styles match the new layout
import campaignimage from "../assets/createcampaign.png";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trimStart() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/campaigns/create", formData);
      alert("Campaign Created Successfully!");
      console.log("Response:", res.data);
      setFormData({ title: "", description: "", goal: "", image: "" }); // Reset form
    } catch (error) {
      console.error("Error creating campaign:", error.response?.data || error.message);
    }
  };

  return (
    <div className="campaign-container">
      <div className="campaign-form-card">
       <center> <h2>Create a Campaign</h2></center>
        <form onSubmit={handleSubmit}>
          <label>Campaign Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter campaign title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe your campaign..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Funding Goal ($)</label>
          <input
            type="number"
            name="goal"
            placeholder="Enter goal amount"
            value={formData.goal}
            onChange={handleChange}
            required
            min="1"
          />

          <label>Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Paste image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <button type="submit" className="campaign-btn">Create Campaign</button>
        </form>

        
        
      </div>

      <div className="campaign-illustration">
        <img src={campaignimage} alt="Campaign Illustration" />
      </div>
    </div>
  );
};

export default CampaignForm;
