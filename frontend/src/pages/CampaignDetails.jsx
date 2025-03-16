import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, ProgressBar, Button } from "react-bootstrap";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
                setCampaign(res.data);
            } catch (error) {
                console.error("Error fetching campaign:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id]);

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (!campaign) return <p className="text-center mt-5">Campaign not found.</p>;

    const formattedDate = new Date(campaign.createdAt).toLocaleDateString();

    // Placeholder function for Donate button (No payment functionality for now)
    const handleDonateClick = () => {
        console.log("Donate button clicked! Add payment functionality later.");
    };

    return (
        <Container className="d-flex justify-content-center mt-5 p-3">
            <Card className="shadow p-4" style={{ width: "200%", maxWidth: "800px" }}>
                <Card.Img
                    variant="top"
                    src={campaign.image || "https://via.placeholder.com/300"}
                    style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
                />
                <Card.Body>
                    <h2 className="fw-bold">{campaign.title}</h2>
                    <p>{campaign.description}</p>

                    <p className="fw-bold">Goal: ₹{campaign.goal}</p>
                    <p>Raised: ₹{campaign.raisedAmount}</p>
                    <p>Created on: {formattedDate}</p>

                    {/* Progress Bar */}
                    <ProgressBar
                        now={(campaign.raisedAmount / campaign.goal) * 100}
                        label={`${Math.round((campaign.raisedAmount / campaign.goal) * 100)}%`}
                    />

                    {/* Share Buttons */}
                    <div className="d-flex justify-content-center mt-3">
                        <Button
                            variant="light"
                            className="me-2 rounded-pill"
                            onClick={() =>
                                window.open(
                                    `https://wa.me/?text=${encodeURIComponent(`Support this campaign: ${campaign.title} - ${window.location.href}`)}`,
                                    "_blank"
                                )
                            }
                        >
                            <FaWhatsapp color="green" size={18} /> Share
                        </Button>

                        <Button
                            variant="light"
                            className="rounded-pill"
                            onClick={() =>
                                window.open(
                                    `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                                    "_blank"
                                )
                            }
                        >
                            <FaFacebook color="blue" size={18} /> Share
                        </Button>
                    </div>

                    {/* Donate Button (No Functionality Yet) */}
                    <Button 
                        variant="primary" 
                        className="mt-3 w-100 rounded-pill"
                        onClick={handleDonateClick} // Placeholder function
                    >
                        Donate Now
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CampaignDetails;
