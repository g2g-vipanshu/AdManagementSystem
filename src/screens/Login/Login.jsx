import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostData } from "../../Api";
import './css/login.css';

function LoginPage() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await PostData("/api/login", { name, password })
      console.log("first", response)
      localStorage.setItem("token", response.message);
      console.log(response)

      if (response?.is_success) {
        navigate("/dashboard");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Company name"
          className="auth-input"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-text">
          Don't have an account?
          <span className="auth-link" onClick={() => navigate("/first")}>
            {" "}Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
