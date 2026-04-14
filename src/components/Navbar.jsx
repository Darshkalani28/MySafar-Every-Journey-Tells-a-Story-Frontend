import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
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
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Profile
                </Link>
                <ul className="dropdown-menu">
                  {/* change profile route after creating profile page */}
                  <li><Link className="dropdown-item" to="/">View Profile</Link></li>
                  <li><Link className="dropdown-item" to="/">Another action</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" to="/">Logout</Link></li>
                </ul>
              </li>
            </ul>


            {/* <form className="d-flex" role="search">
              <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
              Search
              </button>
              </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
