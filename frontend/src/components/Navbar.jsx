import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleClick = () => {
        logout()
        navigate("/login")
    }
    return (
      <nav className="navbar navbar-dark bg-dark px-4 ">
        <span className="navbar-brand mb-0 h1">
          TaskFlow
        </span>
        <span className="navbar-brand ">
            <h5>Arif Rezaie</h5>
        </span>
        <span className="navbar-brand ">
            <button className="btn btn-danger" onClick={() => handleClick()}>Log out</button>
        </span>
      </nav>
    );
  };
  export default Navbar;