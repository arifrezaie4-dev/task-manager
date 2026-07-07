import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-light border-end p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h5>Menu</h5>

      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">
            Dashboard
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            Tasks
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="#">
            Teams
          </a>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="#">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
