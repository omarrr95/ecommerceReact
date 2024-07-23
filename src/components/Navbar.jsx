import "./Navbar.css";

function Navbar() {
  return (
    <header className="TopHeader">
      <div className="right-section">
        <ul>
          <li>
            <a>
              <i className="fas fa-indent"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="left-section">
        <ul>
          <li className="dropdown">
            <button
              className="btn dropdown-toggle user-label"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="/assets/img/user.png" />
              <span>naser ElDin</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <li>
                <a className="dropdown-item" href="/Home/Logout">
                  <img src="assets/img/logout.png" />
                  تسجيل الخروج
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
