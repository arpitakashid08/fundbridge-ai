import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const API_URL = "http://127.0.0.1:5050";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Server returned an invalid response (${response.status}).`
        );
      }

      if (!response.ok) {
        setError(
          data?.message || "Invalid email or password."
        );
        return;
      }
      localStorage.setItem(
        "fundbridge_token",
        data.token
      );

      localStorage.setItem(
        "fundbridge_user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "fundbridge_authenticated",
        "true"
      );

      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR →", error);

      if (error instanceof TypeError) {
        setError(
          "Cannot connect to FundBridge backend. Make sure the backend is running on port 5050."
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to login. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT */}

      <section className="auth-left">

        <div className="auth-brand">
          <span className="brand-symbol">
            ✦
          </span>

          <div>
            <strong>FUNDBRIDGE</strong>
            <span>AI</span>
          </div>
        </div>

        <div className="auth-intro">

          <p className="eyebrow">
            AI-POWERED FUNDING
          </p>

          <h1>
            Find the capital
            <br />
            <span>your business deserves.</span>
          </h1>

          <p className="auth-description">
            FundBridge AI analyzes your business and
            connects you with grants, loans, investors
            and government funding opportunities.
          </p>

        </div>

        <div className="auth-footer">
          Grants · Loans · Investors · Government Schemes
        </div>

      </section>

      <section className="auth-right">

        <div className="auth-form-wrapper login-wrapper">

          <p className="eyebrow">
            WELCOME BACK
          </p>

          <h2>
            Sign in to
            <br />
            your workspace.
          </h2>

          <p className="form-subtitle">
            Continue your funding journey with FundBridge AI.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
              autoComplete="email"
            />

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              disabled={loading}
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              style={{
                marginTop: "-15px",
                marginBottom: "20px",
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                color: "#d4af62",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "Signing in..."
                  : "Sign in"}
              </span>

              {!loading && (
                <span>→</span>
              )}
            </button>

          </form>

          <p className="auth-switch">
            Don't have a FundBridge account?{" "}
            <Link to="/signup">
              Create account
            </Link>
          </p>

        </div>

      </section>

    </div>
  );
}
