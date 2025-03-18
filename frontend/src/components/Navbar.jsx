import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import logo from "../assets/Crowdnestlogo.png";

const NavigationBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar text-center py-2">
        <span>Be a savior for many. Donate  to help save invaluable lives in India.</span>
        {/* <Button variant="warning" className="donate-monthly-btn ms-2">Donate Monthly</Button> */}
      </div>

      {/* Navigation Bar */}
      <Navbar expand="lg" className={`custom-navbar ${scrolled ? "scrolled" : ""}`} fixed="top">
        <Container>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav" className="d-flex justify-content-between w-100">
            
            {/* Left Navigation Links */}
            <Nav className="left-nav d-flex align-items-center gap-3">
              <Nav.Link as={Link} to="/home" className="nav-item">Home</Nav.Link>
              <Nav.Link as={Link} to="/campaigns" className="nav-item">Campaigns</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-item">ContactUs</Nav.Link>
             
            </Nav>

            {/* Centered Logo */}
            <Navbar.Brand as={Link} to="/" className="logo-container">
              <img src={logo} alt="CrowdNest" className="logo" />
            </Navbar.Brand>

            {/* Right Navigation (Profile, Logout, etc.) */}
            <Nav className="right-nav d-flex align-items-center gap-3">
              <Nav.Link as={Link} to="/about" className="nav-item">About Us</Nav.Link>

              {user ? (
                <>
                  {/* Redirect Profile to Dashboard */}
                  <Nav.Link as={Link} to="/dashboard/{user.id}" className="nav-item">Profile</Nav.Link>
                  <Nav.Link onClick={handleLogout} className="nav-item" style={{ cursor: "pointer" }}>Logout</Nav.Link>
                  <Button as={Link} to="/create" className="Navbutton nav-btn">
                    Make a FundRaise
                  </Button>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" className="nav-item">Sign in</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer to prevent content from overlapping with navbar */}
      <div style={{ marginTop: "100px" }}></div>
    </>
  );
};

export default NavigationBar;
