import React, { useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

function SignUp({ setSignupState }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState(null);
  const [labelText, setLabelText] = useState("Upload Profile Image");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageInput = (e) => {
    setImage(e.target.files[0]);
    setLabelText(e.target.files[0].name);
  };

  const register = (e) => {
    e.preventDefault();

    let inputs = {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      gender,
      phone,
      level,
      department,
      password,
      image,
    };

    let inputOfProblem = null;

    let NotValid = Object.keys(inputs).some((el) => {
      let input = inputs[el];
      inputOfProblem = el;
      if (typeof input === "string") {
        input = input.trim();
      }
      return [null, "", " "].includes(input);
    });

    if (NotValid) {
      Swal.fire({
        title: `Please, Fill ${inputOfProblem ? inputOfProblem : "Inputs"}`,
        icon: "error",
      });
      return;
    }

    if (!phone.match(/^01[0125]\d{8}$/)) {
      Swal.fire("Phone number is not valid", "", "error");
      return;
    }

    if (!email.match(/^\w+@gmail\.com$/)) {
      Swal.fire("Gmail is not valid", "", "error");
      return;
    }

    if (password.length < 8) {
      Swal.fire("Password must be at least 8 characters", "", "error");
      return;
    }

    // uploadData(inputs);
  };

  return (
    <>
      {loading && <Loader />}

      <div className="sign-up">
        <form action="#">
          <h1>Create Account</h1>
          <div className="row w-100">
            <div className="col-sm-6 p-1">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col-sm-6 p-1">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="col-sm-6 p-1">
              <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="col-sm-6 p-1">
              <select
                name="gender"
                className="form-select col-sm-6"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* <div className="col-sm-6 p-1">
              <select
                name="level"
                className="form-select col-sm-6"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">Level</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
              </select>
            </div>
            <div className="col-sm-6 p-1">
              <select
                name="department"
                className="form-select col-sm-6"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Department</option>
                <option value="none">None</option>
                <option value="AI">AI</option>
                <option value="CS">CS</option>
                <option value="IS">IS</option>
                <option value="SC">SC</option>
              </select>
            </div> */}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-group position-relative p-0">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
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

            <label htmlFor="profileImg" className="form-control c-grey">
              {labelText}
            </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className="form-control"
              placeholder="profile image"
              hidden
              id="profileImg"
              onChange={handleImageInput}
            />
          </div>

          <button onClick={register} disabled={loading}>
            {loading ? "Loading..." : "Sign up"}
          </button>
          <p className="route">
            have an account?
            <span className="sign-in-btn" onClick={() => setSignupState(false)}>
              Sign in
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
