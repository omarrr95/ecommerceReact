import "./Register.css";
import { useState } from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";
import { Navigate, useLocation } from "react-router-dom";

function Register() {
  const [signupState, setSignupState] = useState(true);

  // const location = useLocation();
  // let redirectPath = location.state?.path || "/profile";
  // if (user && auth.currentUser.emailVerified) {
  //   console.log("Redirect From Register");
  //   return <Navigate to={redirectPath} />;
  // }

  return (
    <div className="register">
      <div className={`container ${signupState && "right-active"}`}>
        <SignUp setSignupState={setSignupState} />
        <SignIn setSignupState={setSignupState} />
        <div className="overlay-container">
          <div className="overlay-left">
            <h1>Welcome Back</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button id="signIn" onClick={() => setSignupState(false)}>
              Sign in
            </button>
          </div>
          <div className="overlay-right">
            <h1>Hello Friend</h1>
            <p>Enter your personal details and start journey with us</p>
            <button id="signUp" onClick={() => setSignupState(true)}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
