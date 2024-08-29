import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/UserAuthenticationReducer";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userAuthentication.currentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="navigation">
      <nav className="navbar">
        <ul className="nav-items">
          {!currentUser && (
            <>
              <li>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li>
                <NavLink 
                  to="/add" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  Add Shopping Item
                </NavLink>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;