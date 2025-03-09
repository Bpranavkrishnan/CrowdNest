import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await axios.get("http://localhost:5000/api/campaigns");
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  return (
    <>
      <HeroSection />
      <NavigationBar />
      
      <Container className="mt-5">
        <h3 className="text-center fw-bold mb-3">Featured Fundraisers</h3>

        {/* Search Bar */}
        <Form.Control
          type="text"
          placeholder="Search campaigns..."
          className="mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Row>
          {campaigns
            .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
            .map((campaign) => (
              <Col md={4} key={campaign._id} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Img variant="top" src={campaign.image} />
                  <Card.Body>
                    <Card.Title>{campaign.title}</Card.Title>
                    <Card.Text>{campaign.description}</Card.Text>
                    <Button variant="primary">Donate</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
