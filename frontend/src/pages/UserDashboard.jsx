import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/UserDashboard.css";
import Profileimage from "../assets/profileimage.png"

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
        // TODO: Replace with actual API calls
        const donationData = [
          { id: 1, amount: 500, campaign: "Help John", date: "2024-03-15" },
          { id: 2, amount: 1000, campaign: "Medical Support", date: "2024-02-28" }
        ];
        const campaignData = [
          { id: 101, title: "Help John's Surgery", status: "Active", amountRaised: 15000 },
          { id: 102, title: "Education for Kids", status: "Completed", amountRaised: 30000 }
        ];

        setDonations(donationData);
        setCampaigns(campaignData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      
      {/* 🔹 User Profile Section */}
      <div className="profile-section">
        <img src={Profileimage} alt="Profile" className="profile-pic" />
        <div>
          <h2>{user?.name || "User Name"}</h2>
          <p>{user?.email || "user@example.com"}</p>
          <Link to="/profile" className="edit-profile-btn">Edit Profile</Link>
        </div>
      </div>

      {/* 🔹 Dashboard Overview */}
      <div className="dashboard-overview">
        <DashboardCard title="Total Donations" value={`₹${donations.reduce((acc, d) => acc + d.amount, 0)}`} />
        <DashboardCard title="My Campaigns" value={campaigns.length} />
      </div>

      {/* 🔹 Donation History */}
      <div className="donation-history">
        <h3>Donation History</h3>
        {donations.length > 0 ? (
          <ul>
            {donations.map(({ id, amount, campaign, date }) => (
              <li key={id}>
                Donated <b>₹{amount}</b> to <b>{campaign}</b> on {date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No donations yet.</p>
        )}
      </div>

      {/* 🔹 My Campaigns */}
      <div className="my-campaigns">
        <h3>My Campaigns</h3>
        {campaigns.length > 0 ? (
          <ul>
            {campaigns.map(({ id, title, status, amountRaised }) => (
              <li key={id}>
                <b>{title}</b> - <span className={`status ${status.toLowerCase()}`}>{status}</span>
                <p>Raised: ₹{amountRaised}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't started any campaigns yet.</p>
        )}
      </div>

      {/* 🔹 Actions */}
      <div className="actions">
        <Link to="/start-fundraiser" className="start-campaign-btn">Start a Fundraiser</Link>
        <Link to="/settings" className="settings-btn">Account Settings</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
