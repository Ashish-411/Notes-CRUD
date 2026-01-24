import { NavLink } from "react-router-dom";
import "../styles/Nav.css";
function Nav(){
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to ="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to ="/create-note">
                        Create Note
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;