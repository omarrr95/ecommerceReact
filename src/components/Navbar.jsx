import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.adminState);
  const handleLogout = () => {
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/admin/login", { replace: true });
  };
  return (
    <header className="TopHeader">
      <div className="right-section">
        <ul>
          <li
            onClick={() => {
              document.querySelector(".Sidebar").classList.toggle("show");
            }}
          >
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
              <span>{admin.name}</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                <span className="dropdown-item">
                  <img src="/assets/img/logout.png" />
                  تسجيل الخروج
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
