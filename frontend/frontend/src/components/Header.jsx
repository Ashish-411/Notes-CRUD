import Nav from "./Nav";
import "../styles/Header.css";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    function Logout(){
        localStorage.clear();
        return navigate("/login");
    }
    return(
        <>
            <header>
                <h1>MyNotes</h1>
                <Nav/>
                <button type="button" onClick={Logout}>Logout</button>
            </header>
            <Outlet/>
        </>
    );
}
export default Header;