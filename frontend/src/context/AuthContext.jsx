import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Auto-login if user exists in localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(JSON.parse(storedUser));  // ✅ Parse & Set User
        }
        setLoading(false);
    }, []);

    // Login function with API request
    const login = async (email, password) => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log("✅ Debug - Server Response:", data);
    
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
    
          // ✅ Store userId separately for easy access
          localStorage.setItem("userId", data.user._id);
    
          setUser(data.user);
          return true;
        } else {
          console.error("❌ Debug - Login Failed:", data.message);
          return false;
        }
      } catch (error) {
        console.error("❌ Debug - Server Error:", error);
        return false;
      }
    };
    
    // Logout function to clear user & token
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
