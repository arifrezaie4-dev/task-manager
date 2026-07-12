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
  const tasksRef = useRef(null)
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

      <div className="d-flex">

        <Sidebar tasksRef = {tasksRef} />

        <MainContent tasksRef = {tasksRef} />

      </div>
    </>
  );
};
