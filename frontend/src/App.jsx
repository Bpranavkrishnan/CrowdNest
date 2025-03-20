import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import CampaignDetails from "./pages/CampaignDetails";
import CampaignForm from "./components/CampaignForm";
import CampaignsPage from "./pages/CampaignsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

import ContactUs from "./pages/ContactUs";
import Payment from "./pages/Payment"; // Import the payment page 

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<PrivateRoute><CampaignForm /></PrivateRoute>} />
          <Route path="/dashboard/:id" element={<UserDashboard />} />
         
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/payment/:id" element={<PrivateRoute><Payment /></PrivateRoute>} />{/* New Payment Page */}
            {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
