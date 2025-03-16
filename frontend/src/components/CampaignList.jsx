import { useEffect, useState } from "react";
import axios from "axios";
import "./CampaignList.css"; // Import the CSS file

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track which descriptions are expanded

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns/all");
        setCampaigns(res.data || []);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="campaign-list-container">
      <h2>All Campaigns</h2>
      <div className="campaign-grid">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              <img
                src={campaign.image || "https://via.placeholder.com/300"} // Fallback image
                alt={campaign.title || "Campaign Image"} // Fallback alt text
                loading="lazy"
              />
              <h3>{campaign.title || "Untitled Campaign"}</h3>
              <p>
                {expanded[campaign._id]
                  ? campaign.description
                  : campaign.description.slice(0, 100) + "..."}
                {campaign.description.length > 100 && (
                  <button onClick={() => toggleReadMore(campaign._id)}>
                    {expanded[campaign._id] ? "Show Less" : "Read More"}
                  </button>
                )}
              </p>
              <p>
                <strong>Goal:</strong> ${campaign.goal || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p>No campaigns available.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignList;
