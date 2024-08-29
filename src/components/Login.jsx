import React, { useEffect, useState } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../redux/actions/actions";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const { admins } = useSelector((state) => state.adminsState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.state?.pathname || "/dashboard/department/index";

  useEffect(() => {
    if (document.cookie.split(";").find((el) => el.startsWith("admin="))) {
      document.querySelector("#loaderContainer").classList.remove("hidden");
    }
  }, []);

  useEffect(() => {
    let cookies = document.cookie.split(";");

    const admin =
      document.cookie &&
      JSON.parse(cookies?.find((el) => el.startsWith("admin"))?.split("=")[1]);
    if (
      !cookies?.find((el) => el.startsWith("admin=")) ||
      !admins?.find(
        ({ id, userName, superAdmin }) =>
          id === admin?.id &&
          userName === admin?.userName &&
          superAdmin === admin.superAdmin
      )
    ) {
      return;
    }

    dispatch(setAdmin(admins.find((ad) => ad.id === admin?.id)));
    navigate(pathname, { replace: true });
  }, [admins]);

  function handleAuth() {
    if (!userName || !password) {
      Swal.fire("ادخل البيانات", "", "error");
      return;
    }

    let admin = admins?.find((admin) => admin.userName === userName);
    const date = new Date();
    date.setDate(new Date().getDate() + 1);

    if (admin) {
      if (password === admin.password) {
        let { password, ...adminInfo } = admin;
        document.cookie = `admin=${JSON.stringify(
          adminInfo
        )}; expires=${date.toUTCString()}; path=/;`;
        dispatch(setAdmin(adminInfo));

        navigate(pathname, { replace: true });
        return;
      }
      Swal.fire("password is wrong", "", "error");
      setIsDisabled(false);
      return;
    }

    Swal.fire("username is wrong", "", "error");
    setIsDisabled(false);
  }

  return (
    <div className="loginPage d-flex  justify-content-center ">
      <div className="imageSide">
        <img
          src="https://almaalowla.com.sa/assets_admin/img/login.png"
          alt="identity image"
        />
      </div>
      <div className="formContainer">
        <div className="form">
          <img className="mb-4 img-fluid" src="/assets/img/logo.png" alt="" />
          <h2>Please Login</h2>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="UserIdentifier"
              autoComplete="off"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button onClick={handleAuth} disabled={isDisabled}>
            {!isDisabled ? "Login" : <span className="spinner-border"></span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
