import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../Loader";

function SignIn({ setSignupState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      if (!email.match(/^\w+@gmail\.com$/)) {
        Swal.fire("email is not valid", "", "error");
        return;
      }

      if (password.length < 8) {
        Swal.fire("Password must be at least 8 characters", "", "error");
        return;
      }
      setLoading(true);
    } catch (error) {
      setLoading(false);
      let errorMessage = error.message;
      if (error.code === "auth/invalid-credential")
        errorMessage = "Wrong email or password";

      Swal.fire(errorMessage, "", "error");
    } finally {
      setDisable(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="sign-in">
        <form autoComplete="on">
          <h1>Sign in</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-group position-relative p-0 w-100">
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <i
              className={`fas  ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-eye`}
              onClick={() => setShowPassword(!showPassword)}
              id="togglePassword"
            ></i>
          </div>
          <button disabled={loading || disable} onClick={login}>
            {loading ? "Loading..." : "Sign in"}
          </button>

          <p className="route">
            create new account?{" "}
            <span className="sign-up-btn" onClick={() => setSignupState(true)}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignIn;
