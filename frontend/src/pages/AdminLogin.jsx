import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state before new request

        try {
            const { data } = await axios.post("http://localhost:5000/api/admin/login", { email, password });
            localStorage.setItem("adminToken", data.token);
            navigate("/admin/dashboard"); // Redirect after successful login
        } catch (err) {
            console.error("Admin Login Error:", err);
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Login</h2>
            {error && <p style={styles.errorMessage}>{error}</p>}

            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#e9ecef',
        padding: '20px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#495057',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
    },
    input: {
        width: '100%',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        fontSize: '1rem',
    },
    button: {
        width: '100%',
        padding: '15px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#ffffff',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    errorMessage: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default AdminLogin;
