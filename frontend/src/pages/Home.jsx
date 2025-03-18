import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import NavigationBar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import DonationCard from "../components/DonationCard";
import HomeScreenBand from "../components/HomeScreenBand";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns/all");

        // Sort campaigns by latest createdAt date and get the latest 6 campaigns
        const sortedCampaigns = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setCampaigns(sortedCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <>
      <NavigationBar />
      <HeroSection />
      <DonationCard />
      <HomeScreenBand />

      <Container className="Searchbar mt-5">
        <h3 className="text-center fw-bold mb-3">Featured Fundraisers</h3>

        {/* Search Bar */}
        <Form.Control
          type="text"
          placeholder="Search campaigns..."
          className="custom-search-bar mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Row>
          {campaigns
            .filter((c) => c.title?.toLowerCase().includes(search.toLowerCase()))
            .map((campaign) => (
              <Col md={4} key={campaign._id} className="mb-4">
                <Link to={`/campaign/${campaign._id}`} className="text-decoration-none text-dark">
                  <Card className="shadow-sm campaign-card">
                    {/* Fixed Image Size */}
                    <Card.Img
                      variant="top"
                      src={campaign.image || "https://via.placeholder.com/300"}
                      alt={campaign.title || "Campaign Image"}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body style={{ minHeight: "150px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Card.Title>{campaign.title || "Untitled Campaign"}</Card.Title>
                      <p className="fw-bold">Goal: ₹{campaign.goal || "0"}</p>

                      {/* Progress Bar */}
                      <div className="progress" style={{ height: "20px", borderRadius: "10px", overflow: "hidden" }}>
                        <div 
                          className="progress-bar bg-success" 
                          role="progressbar"
                          style={{ width: `${(campaign.raisedAmount / campaign.goal) * 100 || 0}%`, transition: "width 0.5s ease-in-out" }}
                          aria-valuenow={campaign.raisedAmount || 0}
                          aria-valuemin="0"
                          aria-valuemax={campaign.goal || 0}
                        >
                          <span className="progress-bar-text" style={{ color: "white", fontWeight: "bold", padding: "0 5px" }}>
                            {`${Math.round((campaign.raisedAmount / campaign.goal) * 100) || 0}%`}
                          </span>
                        </div>
                      </div>

                      {/* Share Buttons */}
                      <div className="d-flex justify-content-center mt-2">
                        <Button
                          variant="light"
                          className="me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              `https://wa.me/?text=${encodeURIComponent(
                                `Check out this fundraiser: ${campaign.title} - ${window.location.href}`
                              )}`,
                              "_blank"
                            );
                          }}
                        >
                          <FaWhatsapp color="green" size={18} /> Share
                        </Button>

                        <Button
                          variant="light"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                              "_blank"
                            );
                          }}
                        >
                          <FaFacebook color="blue" size={18} /> Share
                        </Button>
                      </div>

                      <Link to={`/campaign/${campaign._id}`} className="text-decoration-none">
                        <Button variant="primary" className="mt-3 w-100">Donate</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;