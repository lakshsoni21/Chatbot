import { useEffect, useState } from "react";
import "./style/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http://127.0.0.1:8000/signup", user)
      .then((response) => {
        alert(response.data.message)
        navigate("/login")
      })
      .catch((response) => {
        alert(response.response.data.detail);
      });
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-header">
          <h1>Create free account</h1>
          <p>You can create a free CotexAI account in 2 minutes</p>
        </div>

        <div className="signup-card">
          <form>
            <label>First & Last name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email to get started"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div className="terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to Postcraft’s <span>Terms of Service</span> and{" "}
                <span>Privacy Policy</span>
              </label>
            </div>

            <button type="button" onClick={() => {
              handleSubmit()
            }}>Create account</button>
          </form>

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
