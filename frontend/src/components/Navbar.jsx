import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../assets/Crowdnestlogo.png";

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>
          Be a savior for many. Donate monthly to help save invaluable lives in India.
        </span>
        
        <Button variant="warning" className="donate-monthly-btn ms-2">
           Donate Monthly
        </Button>
      </div>

      {/* Navigation Bar */}
      <Navbar expand="lg" className={`custom-navbar ${scrolled ? "scrolled" : ""}`} fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="navbarNav" />

          <Navbar.Collapse id="navbarNav" className="d-flex justify-content-between w-100">
            {/* Left Side Navigation */}
            <Nav className="left-nav d-flex align-items-center">
              <Nav.Link as={Link} to="/search" className="nav-item">Search</Nav.Link>
              <NavDropdown title="Donate" id="donate-dropdown" className="nav-item">
                <NavDropdown.Item as={Link} to="/donate/medical">Medical</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/donate/emergency">Emergency</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/donate/education">Education</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Fundraise" id="fundraise-dropdown" className="nav-item">
                <NavDropdown.Item as={Link} to="/fundraise/how-it-works">How It Works</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/fundraise/categories">Categories</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Centered Logo */}
            <Navbar.Brand as={Link} to="/" className="logo-container">
              <img src={logo} alt="CrowdNest" className="logo" />
            </Navbar.Brand>

            {/* Right Side Navigation */}
            <Nav className="right-nav d-flex align-items-center">
              <NavDropdown title="About" id="about-dropdown" className="nav-item">
                <NavDropdown.Item as={Link} to="/about/team">Our Team</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/about/mission">Our Mission</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/login" className="nav-item">Sign in</Nav.Link>
              <Button as={Link} to="/start-fundraiser"  className="Navbutton ms-3 nav-btn">
                Start a GoFundMe
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add padding to prevent navbar overlap */}
      <div style={{ marginTop: "100px" }}></div>
    </>
  );
};

export default NavigationBar;
