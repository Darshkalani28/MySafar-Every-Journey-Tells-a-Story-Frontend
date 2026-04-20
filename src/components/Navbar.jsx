import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
const Navbar = () => {
  const navigate = useNavigate();
  const [avatara, setAvatar] = useState();
  const userId = localStorage.getItem("userId");

  const users = async (params) => {
    const res = await API.get(`/user/current-user/${userId}`);
    setAvatar(res.data.data.avatar)
  }
  users();
  const profileImage = avatara || "travel.jpg";


  const handleLogout = async () => {
    await API.post("user/logOut");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    navigate("/login");
  }

  return (
    <div className="mb-5">
      <nav
        className="navbar navbar-expand-lg border-bottom bg-body-tertiary"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MySafar
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
            {/* <Link className="navbar-brand" to="/explore">Explore</Link> */}
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/explore"
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Destination">
                  Destination
                </Link>
              </li>
            </ul>


            <form className="d-flex" role="search">
              <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
              Search
              </button>
              </form>

        <div className="profile ms-3">
        <img
          src={profileImage}
          alt="profile"
          className="rounded-circle dropdown-toggle"
          width="40"
          height="40"
          style={{ cursor: "pointer", objectFit: "contain" }}
          data-bs-toggle="dropdown"
        />

        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <Link className="dropdown-item" to="/profile">
              👤 My Profile
            </Link>
          </li>
          <li>
            <button className="dropdown-item text-danger" onClick={handleLogout}>
              🚪 Logout
            </button>
          </li>
        </ul>
        </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
