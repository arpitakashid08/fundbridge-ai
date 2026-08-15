import "./Landing.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate("/login", { replace: true }), 2800);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="brand">
          <span className="brand-symbol">⌁</span>
          <span>FUND BRIDGE AI</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#solutions">Solutions</a>
          <a href="#resources">Resources</a>
        </div>

        <button className="nav-button">
          Get started
        </button>
      </nav>

      <section className="hero" id="home">

        <div className="hero-content">

          <div className="hero-eyebrow">
            AI-POWERED FUNDING PLATFORM
          </div>

          <h1>
            Your funding.
            <br />
            <span>Intelligently</span>
            <br />
            matched.
          </h1>

          <p className="hero-description">
            FundBridge AI analyzes your business and connects you
            with grants, investors, loans, and government funding
            opportunities built around your potential.
          </p>

          <div className="hero-actions">
            <button className="primary-button">
              Explore funding
              <span>→</span>
            </button>

            <button className="secondary-button">
              See how it works
            </button>
          </div>

        </div>

        <div className="robot-container">

          <div className="robot-orbit orbit-one" />
          <div className="robot-orbit orbit-two" />
          <div className="robot-orbit orbit-three" />

          <div className="robot-glow" />

          <img
            src="/robot-head.png"
            alt="FundBridge AI"
            className="robot-head"
          />

          <div className="robot-label">
            <span className="status-dot" />
            FUNDING INTELLIGENCE ACTIVE
          </div>

        </div>

      </section>

      <section className="trust-section">
        <span>BUILT FOR</span>

        <div>
          STARTUPS
        </div>

        <div>
          SMALL BUSINESSES
        </div>

        <div>
          FOUNDERS
        </div>

        <div>
          GROWING TEAMS
        </div>
      </section>

    </div>
  );
}
