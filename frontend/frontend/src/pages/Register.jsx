import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/register.css";
import { messageToast } from "../components/messageToast";

function Register(){
     const [name, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [email, setEmail] = useState("");
     const [nameError,setNameError] = useState(false);
     const [emailError,setEmailError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/users/",{
                name,
                password,
                email
            });
            console.log(res);
            if(res.status===201){
                messageToast("You have been registered","success");
            }
            navigate("/login");
        } catch (err) {
            const msg = err.response?.data?.detail;
            if(err.response?.status === 400
                 && msg === "Username already Exists"){
                    setNameError(true);
                    setEmailError(false);
                    messageToast(msg,"error");
                 }
            else if(err.response?.status === 400
                 && msg === 'Email already Exists'){
                    setNameError(false);
                    setEmailError(true);
                    messageToast(msg,"error");
                 }
            else{
                messageToast(err.message,"error");
                console.log(err.response.data.detail);
            }
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
                    style ={{borderColor: nameError?"red":"black"}}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="register-input"
                    style ={{borderColor: emailError?"red":"black"}}

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