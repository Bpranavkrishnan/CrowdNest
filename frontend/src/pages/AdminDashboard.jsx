import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/all-campaigns", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                });

                // ✅ Ensure response contains campaigns and sort by createdAt
                const sortedCampaigns = (response.data.campaigns || []).sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setCampaigns(sortedCampaigns);
            } catch (error) {
                console.error("❌ Error fetching campaigns:", error);
                setCampaigns([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const updateCampaignStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.put(
                `http://localhost:5000/api/admin/update-status/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // ✅ Update campaign status in the UI
            if (response.data.success) {
                setCampaigns((prevCampaigns) =>
                    prevCampaigns.map((c) => (c._id === id ? { ...c, status } : c))
                );
            }
        } catch (error) {
            console.error("❌ Error updating campaign status:", error);
        }
    };

    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading campaigns...</p>;

    return (
        <div className="admin-dashboard" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Dashboard</h2>
            <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    display: "block",
                    margin: "0 auto 20px",
                    padding: "10px",
                    width: "80%",
                    maxWidth: "500px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
            <div className="campaign-list" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map((campaign) => (
                        <div
                            key={campaign._id}
                            className={`campaign-card ${campaign.status}`}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "40px",
                                width: "350px",
                                height: "auto",
                                margin: "0 auto",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#fff",
                            }}
                        >
                            <h3 style={{ margin: "0 0 10px" }}>{campaign.title || "Untitled Campaign"}</h3>
                            <p><b>Created by:</b> {campaign.userId ? `${campaign.userId.name} (${campaign.userId.email})` : "Unknown User"}</p>
                            <p><b>Goal:</b> ₹{campaign.goal ?? "N/A"} | <b>Raised:</b> ₹{campaign.raisedAmount ?? 0}</p>
                            <p><b>Status:</b> <span className={`status ${campaign.status}`} style={{ textTransform: "capitalize" }}>{campaign.status}</span></p>
                            <p><b>Created At:</b> {new Date(campaign.createdAt).toLocaleDateString()}</p>
                            {campaign.status === "pending" && (
                                <div className="admin-actions" style={{ marginTop: "10px" }}>
                                    <button
                                        className="approve"
                                        onClick={() => updateCampaignStatus(campaign._id, "approved")}
                                        style={{
                                            backgroundColor: "#4CAF50",
                                            color: "white",
                                            border: "none",
                                            padding: "10px 20px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="reject"
                                        onClick={() => updateCampaignStatus(campaign._id, "rejected")}
                                        style={{
                                            backgroundColor: "#f44336",
                                            color: "white",
                                            border: "none",
                                            padding: "10px 20px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No campaigns found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;