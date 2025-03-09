import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <Container>
        <p>© {new Date().getFullYear()} CrowdNest - All Rights Reserved</p>
      </Container>
    </footer>
  );
};

export default Footer;
