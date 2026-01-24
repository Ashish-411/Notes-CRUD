import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

function ProtectedRoute() {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthorized(false);
                return;
            }

            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;
                if (decoded.exp < now) {
                    localStorage.removeItem("token");
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            } catch (err) {
                setIsAuthorized(false);
            }
        };

        auth();
    }, []);

    // Show loading while we are checking the token
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // If authorized, render children, else redirect to login
    return isAuthorized ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoute;
