import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import CreateCampaign from "./pages/CreateCampaign";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/create" element={<CreateCampaign />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
