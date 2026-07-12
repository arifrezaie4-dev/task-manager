import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";

export const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const tasksRef = useRef(null);
  const handleClick = () => {
    try {
      setLoading(true);
      logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="sidebarMenuLabel">Menu</h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <Sidebar />
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 d-none d-md-block">
            <Sidebar tasksRef={tasksRef} />
          </div>

          <div className="col-md-9 col-lg-10">
            <MainContent tasksRef={tasksRef} />
          </div>
        </div>
      </div>
    </>
  );
};
