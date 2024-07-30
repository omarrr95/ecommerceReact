import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 fst-italic" to="/">
          logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse w-100 navbar-collapse position-relative z-3 text-center bg-white"
          id="navbarSupportedContent"
        >
          <ul className="mx-auto navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
          <div className="buttons mt-3 mt-lg-0">
            <Link to="/cart" className="btn btn-outline-dark me-2">
              <i className="fa fa-shopping-cart"></i> Cart (3)
            </Link>
            <button>Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
