import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );

}
export default Register;