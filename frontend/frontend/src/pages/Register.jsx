import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/register.css";

function Register(){
     const [name, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/users/",{
                name,
                password,
                email
            });

            navigate("/login");
        } catch (err) {
            alert("Registration filed");
            console.log(err);
        }
    };

    return (
        <div className="register-container">
            <form className="register-from" onSubmit={handleSubmit}>
                <h1 className="register-title">Register</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={e => setUsername(e.target.value)}
                    className="register-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="register-input"
                    required
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="register-input"
                    required
                />
                <button type="submit" className="register1-btn">Register</button>
            </form>
        </div>
    );

}
export default Register;