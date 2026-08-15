import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const API_URL = "http://127.0.0.1:5050";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [business, setBusiness] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !business) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          company: business.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create account.");
        return;
      }
      localStorage.setItem("fundbridge_token", data.token);
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
      console.error("SIGNUP ERROR:", error);

      setError(
        "Unable to connect to FundBridge. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <section className="auth-visual">

        <div className="auth-visual-top">

          <div className="brand-mark">
            ✦
          </div>

          <div className="brand-name">
            <span>FUNDBRIDGE</span>
            <span>AI</span>
          </div>

        </div>


        <div className="auth-visual-content">

          <div className="auth-eyebrow">
            START YOUR FUNDING JOURNEY
          </div>

          <h1>
            Your funding.
            <br />
            <span>Intelligently matched.</span>
          </h1>

          <p>
            Create your FundBridge profile and let AI identify
            funding opportunities aligned with your business.
          </p>

          <div className="auth-orbit">

            <div className="orbit orbit-one"></div>

            <div className="orbit orbit-two"></div>

            <div className="orbit orbit-three"></div>

            <div className="orbit-core">
              <span>FB</span>
            </div>

          </div>

        </div>


        <div className="auth-visual-footer">

          <span>INTELLIGENT FUNDING</span>

          <span>•</span>

          <span>SECURE</span>

          <span>•</span>

          <span>PRIVATE</span>

        </div>

      </section>

      <section className="auth-form-side">

        <div className="auth-form-container">

          <div className="mobile-brand">

            <div className="brand-mark">
              ✦
            </div>

            <div className="brand-name">
              <span>FUNDBRIDGE</span>
              <span>AI</span>
            </div>

          </div>

          <div className="auth-heading">

            <div className="auth-eyebrow">
              CREATE ACCOUNT
            </div>

            <h2>
              Build your
              <br />
              funding profile.
            </h2>

            <p>
              Tell us a little about yourself to get started.
            </p>

          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <div className="form-field">

              <label htmlFor="name">
                Your name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Arpita Kashid"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                autoComplete="name"
                disabled={loading}
              />

            </div>

            <div className="form-field">

              <label htmlFor="business">
                Business / startup name
              </label>

              <input
                id="business"
                type="text"
                placeholder="Your company name"
                value={business}
                onChange={(e) =>
                  setBusiness(e.target.value)
                }
                autoComplete="organization"
                disabled={loading}
              />

            </div>

            <div className="form-field">

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
                autoComplete="email"
                disabled={loading}
              />

            </div>

            <div className="form-field">

              <div className="field-header">

                <label htmlFor="password">
                  Create password
                </label>

              </div>


              <div className="password-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

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
                  ? "Creating account..."
                  : "Create account"}
              </span>

              {!loading && (
                <span className="submit-arrow">
                  →
                </span>
              )}

            </button>

          </form>

          <div className="auth-divider">

            <span></span>

            <p>OR</p>

            <span></span>

          </div>

          <div className="auth-switch">

            <span>
              Already have a FundBridge account?
            </span>

            <Link to="/login">
              Sign in
            </Link>

          </div>

          <div className="auth-security">

            <span className="security-icon">
              ◈
            </span>

            <div>

              <strong>
                Your information is secure.
              </strong>

              <p>
                Your business and financial information
                is protected with secure encryption.
              </p>

            </div>

          </div>


        </div>

      </section>

    </div>
  );
}