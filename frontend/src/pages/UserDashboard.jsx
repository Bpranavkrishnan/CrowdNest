import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "../styles/UserDashboard.css";
import Profileimage from "../assets/profileimage.png";

const DashboardCard = ({ title, value }) => (
  <div className="card">
    <h3>{value}</h3>
    <p>{title}</p>
  </div>
);

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        console.log("Token:", token); // Debugging log

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Fetch donations
        const donationRes = await axios.get("http://localhost:5000/api/payments/user-donations", { headers });
        const userDonations = donationRes.data;
        console.log("Fetched Donations:", userDonations);

        // Fetch campaigns
        const campaignRes = await axios.get("http://localhost:5000/api/campaigns/user-campaigns", { headers });
        const userCampaigns = campaignRes.data;
        console.log("Fetched Campaigns:", userCampaigns);

        // Map campaign titles to donations
        const campaignsMap = userCampaigns.reduce((map, campaign) => {
          map[campaign._id] = campaign.title;
          return map;
        }, {});

        const donationsWithCampaignTitles = userDonations.map(donation => ({
          ...donation,
          campaign: {
            ...donation.campaign,
            title: campaignsMap[donation.campaign?._id] || "To A Campaign"
          }
        }));

        setDonations(donationsWithCampaignTitles);
        setCampaigns(userCampaigns);

      } catch (error) {
        console.error("Error fetching dashboard data:", error.response?.data || error.message);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      {/* User Profile Section */}
      <div className="profile-section">
        <img src={Profileimage} alt="Profile" className="profile-pic" />
        <div>
          <h2>{user?.name || "User Name"}</h2>
          <p>{user?.email || "user@example.com"}</p>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="dashboard-overview">
        <DashboardCard title="Total Donations" value={`₹${donations.reduce((acc, d) => acc + d.amount, 0)}`} />
        <DashboardCard title="My Campaigns" value={campaigns.length} />
      </div>

      {/* Donation History */}
      <div className="donation-history">
        <h3>Donation History</h3>
        {donations.length > 0 ? (
          <ul>
            {donations.map(({ _id, amount, campaign, createdAt }) => (
              <li key={_id}>
                Donated <b>₹{amount}</b> to <b>{campaign?.title || "Unknown Campaign"}</b> on {new Date(createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No donations yet.</p>
        )}
      </div>

      {/* My Campaigns */}
      <div className="my-campaigns">
        <h3>My Campaigns</h3>
        {campaigns.length > 0 ? (
          <ul>
            {campaigns.map(({ _id, title, status, raisedAmount }) => (
              <li key={_id}>
                <b>{title}</b> - 
                <span className={`status ${status?.toLowerCase?.() || "unknown"}`}>{status || "Unknown"}</span>
                <p>Raised: ₹{raisedAmount}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't started any campaigns yet.</p>
        )}
      </div>

      {/* Actions */}
      <div className="actions">
        <Link to="/create" className="start-campaign-btn">Start a Fundraiser</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
