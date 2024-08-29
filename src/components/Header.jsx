import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { cart } = useSelector((state) => state.cartState);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 fst-italic" to="/">
          <img
            src="assets/img/logo.png"
            className="img-fluid"
            style={{ height: "40px" }}
          />
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
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
          </ul>
          <div className="buttons mt-3 mt-lg-0">
            <Link to="/cart" className="btn btn-outline-primary border-primary">
              <i className="fa fa-shopping-cart"></i> Cart ({cart.length})
            </Link>
            <button
              className="btn btn-outline-primary me-2 border-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
