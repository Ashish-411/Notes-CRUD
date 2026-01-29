import { NavLink } from "react-router-dom";
import "../styles/Error.css";
function Error(){
    const token = localStorage.getItem("token");
    return(
        <div className="error-container">
            <h1 className="error-code">ERROR 404 </h1>
            <h2 className="error-title">Page not found!</h2>
            <p className="error-text">
                Oops! The page you are looking for doesn't exist.
            </p>
            { token ? (
                <NavLink to="/" className="error-link">
                    <button className="error-btn">Go to Home page</button>
                </NavLink>
            ): (
                <NavLink to="/login" className="error-link">
                    <button className="error-btn">Go to Login page</button>
                </NavLink>
            )

            }
        </div>
    );
}
export default Error;