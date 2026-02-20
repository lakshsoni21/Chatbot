import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Handlelogin() {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post(`${API}/login`, user)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        alert(response.data.message);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.response.data.detail);
      });
  }

  return (
    <div className="page">
      <h1 className="title">Sign in</h1>
      <p className="subtitle">Welcome back</p>

      <div className="card">
        <div className="field">
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="forgot">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button
          className="btn"
          type="button"
          onClick={() => {
            Handlelogin();
          }}
        >
          Sign in
        </button>

        <p className="footer">
          Don&apos;t have an account? <Link to="/">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
