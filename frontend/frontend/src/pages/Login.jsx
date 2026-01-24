import { useState } from "react";
import api from "../api";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            const res = await api.post("/users/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            localStorage.setItem("token", res.data.access_token);

            navigate("/");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <form className="login-from" onSubmit={handleSubmit}>
                <h1 className="login-title">Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="login-input"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="btn">
                    <button type="submit" className="login-btn">Login</button>
                    <NavLink to ="/register" className="register-btn">
                       Register
                    </NavLink>
                </div>

            </form>
        </div>
    );
}

export default Login;
