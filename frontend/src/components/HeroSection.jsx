import { Container, Button, Row, Col } from "react-bootstrap";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          {/* Left Side - Text Content */}
          <Col lg={8} className="text-content">
            <h1 className="hero-title">
              <span className="highlight">Need Funds</span> For Your <br /> Medical Treatment?
            </h1>
            <p className="hero-subtitle">
              Don't worry, you've come to the right platform.
            </p>
            <hr className="divider" />
            <p className="hero-subtitle">
              With <strong className="zero-fee">0%*</strong> platform fee, you can raise funds too!
            </p>
            <Button onClick={() => alert('After Login Click On "Make a FundRise Button" To Proceed')} className="hero-button">Start A Free Fundraiser</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
