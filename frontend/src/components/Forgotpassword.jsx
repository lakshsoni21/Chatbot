import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      // 🔗 Replace this with your API call
      axios
        .post(`${API}/forgot-password`, { email: email })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });

      setMessage("Password reset link sent to your email.");
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-card" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Enter your email and we’ll send you a reset link
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
