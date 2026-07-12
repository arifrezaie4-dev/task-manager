import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-dark bg-dark px-4 m-2 mb-3">
      <div className="d-flex align-items-center justify-content-between">
        <button
          className="btn btn-outline-light d-md-none me-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          <FaBars />
        </button>
        <span className="navbar-brand mb-0 h1">TaskFlow</span>
      </div>

      <span className="navbar-brand d-none d-md-block">
        <h5>Arif Rezaie</h5>
      </span>
      <span className="navbar-brand ">
        <button className="btn btn-danger" onClick={() => handleClick()}>
          Log out
        </button>
      </span>
    </nav>
  );
};
export default Navbar;
