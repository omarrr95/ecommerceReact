import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function AdminAuth({ child }) {
  const { admin } = useSelector((state) => state.adminState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !admin &&
      document.cookie.split(";").find((el) => el.startsWith("admin="))
    ) {
      document.querySelector("#loaderContainer").classList.remove("hidden");
    }
  }, []);

  if (admin) {
    document.querySelector("#loaderContainer").classList.add("hidden");
    return child;
  }

  navigate("/admin/login", {
    state: { pathname: location.pathname },
    replace: true,
  });
  return;
}

export default AdminAuth;
