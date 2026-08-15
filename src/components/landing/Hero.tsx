import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      {/* Ambient background */}
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      {/* Navigation */}
      <nav className="hero-nav">
        <div className="brand">
          <div className="brand-mark">
            <span />
            <span />
            <span />
          </div>

          <span className="brand-name">FundBridge AI</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#solutions">Solutions</a>
          <a href="#resources">Resources</a>
        </div>

        <button className="nav-button">Get Started</button>
      </nav>

      {/* Main Hero */}
      <div className="hero-content">
        {/* LEFT SIDE */}
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            AI-POWERED FUNDING INTELLIGENCE
          </div>

          <h1>
            Welcome to
            <br />

            <span className="gold-text">FundBridge AI</span>
          </h1>

          <p className="hero-description">
            Your intelligent bridge to the capital that moves your business
            forward.
          </p>

          <p className="hero-subdescription">
            FundBridge AI analyzes your business, discovers funding you're
            eligible for, and helps you move from opportunity to application.
          </p>

          <div className="hero-actions">
            <button className="primary-button">
              Explore Funding
              <span className="arrow">↗</span>
            </button>

            <button className="secondary-button">
              See How It Works
              <span className="play-icon">▶</span>
            </button>
          </div>

          {/* Trust line */}
          <div className="trust-line">
            <div className="trust-avatars">
              <span>F</span>
              <span>S</span>
              <span>M</span>
              <span>+</span>
            </div>

            <div>
              <strong>Built for ambitious businesses</strong>
              <p>Startups • MSMEs • Growing businesses</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — ROBOT */}
        <div className="robot-section">
          {/* Orbit rings */}
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />

          {/* Gold light behind robot */}
          <div className="robot-light" />

          {/* Robot */}
          <div className="robot-wrapper">
            <img
              src="/robot/robot.png"
              alt="FundBridge AI"
              className="robot-image"
            />
          </div>

          {/* Floating information */}
          <div className="robot-stat stat-one">
            <span className="stat-line" />
            <div>
              <strong>04</strong>
              <small>Funding paths</small>
            </div>
          </div>

          <div className="robot-stat stat-two">
            <span className="stat-line" />
            <div>
              <strong>AI</strong>
              <small>Opportunity matching</small>
            </div>
          </div>

          <div className="robot-stat stat-three">
            <span className="stat-line" />
            <div>
              <strong>24/7</strong>
              <small>Funding intelligence</small>
            </div>
          </div>

          {/* Central AI indicator */}
          <div className="ai-indicator">
            <div className="indicator-ring">
              <span />
            </div>

            <div className="indicator-text">
              <span>FUNDING</span>
              <strong>INTELLIGENCE ACTIVE</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom funding journey */}
      <div className="funding-journey">
        <div className="journey-label">
          <span>YOUR FUNDING JOURNEY</span>
        </div>

        <div className="journey-line">
          <div className="journey-item active">
            <span className="journey-number">01</span>
            <div>
              <strong>Understand</strong>
              <small>Analyze your business</small>
            </div>
          </div>

          <div className="journey-connector" />

          <div className="journey-item">
            <span className="journey-number">02</span>
            <div>
              <strong>Match</strong>
              <small>Find eligible funding</small>
            </div>
          </div>

          <div className="journey-connector" />

          <div className="journey-item">
            <span className="journey-number">03</span>
            <div>
              <strong>Prepare</strong>
              <small>Build your application</small>
            </div>
          </div>

          <div className="journey-connector" />

          <div className="journey-item">
            <span className="journey-number">04</span>
            <div>
              <strong>Secure</strong>
              <small>Move towards capital</small>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="hero-bottom-fade" />

      <style>{`
        * {
          box-sizing: border-box;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 72% 48%,
              rgba(178, 137, 54, 0.08),
              transparent 28%
            ),
            #0b0d0c;
          color: #f1eee6;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* ---------------- NAV ---------------- */

        .hero-nav {
          position: relative;
          z-index: 20;

          height: 86px;
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 6vw;

          border-bottom: 1px solid rgba(255, 255, 255, 0.055);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-name {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .brand-mark {
          position: relative;
          width: 26px;
          height: 26px;
        }

        .brand-mark span {
          position: absolute;
          display: block;
          width: 2px;
          height: 25px;
          background: #c9a55b;
          transform: rotate(35deg);
          transform-origin: center;
        }

        .brand-mark span:nth-child(1) {
          left: 5px;
        }

        .brand-mark span:nth-child(2) {
          left: 12px;
          transform: rotate(-35deg);
        }

        .brand-mark span:nth-child(3) {
          left: 12px;
          top: 8px;
          width: 9px;
          height: 2px;
          transform: rotate(0deg);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 38px;
        }

        .nav-links a {
          color: rgba(241, 238, 230, 0.55);
          text-decoration: none;
          font-size: 12px;
          transition: color 0.25s ease;
        }

        .nav-links a:hover {
          color: #d6b66c;
        }

        .nav-button {
          border: 1px solid rgba(211, 173, 91, 0.45);
          background: #d2af60;
          color: #17140d;

          padding: 11px 22px;
          border-radius: 4px;

          font-size: 12px;
          font-weight: 600;

          cursor: pointer;
          transition: all 0.25s ease;
        }

        .nav-button:hover {
          background: #e0c27d;
          transform: translateY(-1px);
        }

        /* ---------------- CONTENT ---------------- */

        .hero-content {
          position: relative;
          z-index: 5;

          min-height: calc(100vh - 86px);

          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;

          padding: 40px 6vw 150px;
        }

        .hero-copy {
          position: relative;
          z-index: 10;
          max-width: 620px;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;

          color: rgba(225, 199, 132, 0.8);

          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;

          margin-bottom: 25px;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a55b;

          box-shadow: 0 0 12px rgba(201, 165, 91, 0.3);
        }

        .hero h1 {
          margin: 0;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(52px, 6vw, 88px);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.045em;
        }

        .gold-text {
          color: #c9a55b;
        }

        .hero-description {
          max-width: 510px;

          margin: 30px 0 12px;

          color: rgba(241, 238, 230, 0.8);

          font-size: 18px;
          line-height: 1.55;
          letter-spacing: -0.02em;
        }

        .hero-subdescription {
          max-width: 480px;

          margin: 0;

          color: rgba(241, 238, 230, 0.4);

          font-size: 13px;
          line-height: 1.7;
        }

        /* ---------------- BUTTONS ---------------- */

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;

          margin-top: 35px;
        }

        .primary-button,
        .secondary-button {
          display: flex;
          align-items: center;
          gap: 16px;

          cursor: pointer;

          font-size: 12px;
          font-weight: 600;

          transition: all 0.25s ease;
        }

        .primary-button {
          border: 0;
          background: #d0ad5d;
          color: #15130e;

          padding: 14px 20px;
          border-radius: 3px;
        }

        .primary-button:hover {
          background: #dfc47f;
          transform: translateY(-2px);
        }

        .arrow {
          font-size: 16px;
        }

        .secondary-button {
          padding: 13px 18px;

          border: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(255, 255, 255, 0.025);

          color: rgba(241, 238, 230, 0.7);
          border-radius: 3px;
        }

        .secondary-button:hover {
          border-color: rgba(201, 165, 91, 0.4);
          color: #e0c27d;
        }

        .play-icon {
          font-size: 8px;
          opacity: 0.7;
        }

        /* ---------------- TRUST ---------------- */

        .trust-line {
          display: flex;
          align-items: center;
          gap: 13px;

          margin-top: 48px;
        }

        .trust-avatars {
          display: flex;
        }

        .trust-avatars span {
          width: 27px;
          height: 27px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-left: -6px;

          border: 1px solid #0b0d0c;
          border-radius: 50%;

          background: #252721;
          color: #bfa96e;

          font-size: 8px;
        }

        .trust-avatars span:first-child {
          margin-left: 0;
        }

        .trust-line strong {
          display: block;

          font-size: 10px;
          font-weight: 500;

          color: rgba(241, 238, 230, 0.65);
        }

        .trust-line p {
          margin: 3px 0 0;

          font-size: 9px;
          color: rgba(241, 238, 230, 0.3);
        }

        /* ---------------- ROBOT ---------------- */

        .robot-section {
          position: relative;

          width: min(650px, 50vw);
          height: min(650px, 50vw);

          margin-left: auto;
        }

        .robot-light {
          position: absolute;

          width: 420px;
          height: 420px;

          left: 50%;
          top: 50%;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(196, 155, 70, 0.16) 0%,
            rgba(196, 155, 70, 0.055) 32%,
            transparent 70%
          );

          filter: blur(8px);
        }

        .robot-wrapper {
          position: absolute;

          width: 72%;
          height: 85%;

          left: 14%;
          top: 7%;

          display: flex;
          align-items: center;
          justify-content: center;

          perspective: 1200px;

          z-index: 5;
        }

        .robot-image {
          width: 100%;
          height: 100%;

          object-fit: contain;

          filter:
            drop-shadow(0 35px 45px rgba(0, 0, 0, 0.7))
            drop-shadow(0 0 25px rgba(196, 155, 70, 0.08));

          animation: robotRotate 10s ease-in-out infinite;

          transform-style: preserve-3d;

          user-select: none;
          pointer-events: none;
        }

        @keyframes robotRotate {
          0% {
            transform: rotateY(-12deg) rotateZ(0deg);
          }

          25% {
            transform: rotateY(4deg) rotateZ(-0.5deg);
          }

          50% {
            transform: rotateY(12deg) rotateZ(0deg);
          }

          75% {
            transform: rotateY(4deg) rotateZ(0.5deg);
          }

          100% {
            transform: rotateY(-12deg) rotateZ(0deg);
          }
        }

        /* ---------------- ORBITS ---------------- */

        .orbit {
          position: absolute;

          left: 50%;
          top: 50%;

          border: 1px solid rgba(201, 165, 91, 0.11);

          border-radius: 50%;

          transform: translate(-50%, -50%);
        }

        .orbit-one {
          width: 72%;
          height: 72%;

          animation: orbitSpin 18s linear infinite;
        }

        .orbit-two {
          width: 87%;
          height: 51%;

          transform: translate(-50%, -50%) rotate(-25deg);

          border-color: rgba(201, 165, 91, 0.08);

          animation: orbitSpinReverse 25s linear infinite;
        }

        .orbit-three {
          width: 53%;
          height: 90%;

          transform: translate(-50%, -50%) rotate(35deg);

          border-color: rgba(255, 255, 255, 0.035);

          animation: orbitSpin 30s linear infinite;
        }

        @keyframes orbitSpin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes orbitSpinReverse {
          from {
            transform: translate(-50%, -50%) rotate(-25deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(-385deg);
          }
        }

        /* ---------------- ROBOT STATS ---------------- */

        .robot-stat {
          position: absolute;

          display: flex;
          align-items: center;
          gap: 9px;

          z-index: 8;

          color: rgba(241, 238, 230, 0.5);
        }

        .robot-stat strong {
          display: block;

          color: #d5b76f;

          font-family: Georgia, serif;
          font-size: 18px;
          font-weight: 400;
        }

        .robot-stat small {
          display: block;

          margin-top: 2px;

          font-size: 8px;
          letter-spacing: 0.03em;
          color: rgba(241, 238, 230, 0.3);
        }

        .stat-line {
          width: 28px;
          height: 1px;

          background: rgba(201, 165, 91, 0.35);
        }

        .stat-one {
          right: 2%;
          top: 22%;
        }

        .stat-two {
          right: -1%;
          top: 48%;
        }

        .stat-three {
          right: 4%;
          bottom: 22%;
        }

        /* ---------------- AI INDICATOR ---------------- */

        .ai-indicator {
          position: absolute;

          left: 8%;
          bottom: 16%;

          z-index: 10;

          display: flex;
          align-items: center;
          gap: 10px;
        }

        .indicator-ring {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(201, 165, 91, 0.3);

          border-radius: 50%;
        }

        .indicator-ring span {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #c9a55b;
        }

        .indicator-text span {
          display: block;

          font-size: 7px;
          letter-spacing: 0.16em;

          color: rgba(241, 238, 230, 0.3);
        }

        .indicator-text strong {
          display: block;

          margin-top: 3px;

          font-size: 8px;
          letter-spacing: 0.08em;

          color: rgba(201, 165, 91, 0.75);
          font-weight: 500;
        }

        /* ---------------- FUNDING JOURNEY ---------------- */

        .funding-journey {
          position: absolute;

          left: 6vw;
          right: 6vw;
          bottom: 32px;

          z-index: 15;

          display: flex;
          align-items: center;

          border-top: 1px solid rgba(255, 255, 255, 0.07);

          padding-top: 17px;
        }

        .journey-label {
          width: 150px;
          flex-shrink: 0;
        }

        .journey-label span {
          font-size: 8px;
          letter-spacing: 0.16em;

          color: rgba(241, 238, 230, 0.25);
        }

        .journey-line {
          flex: 1;

          display: flex;
          align-items: center;
        }

        .journey-item {
          display: flex;
          align-items: center;
          gap: 9px;

          opacity: 0.38;
        }

        .journey-item.active {
          opacity: 1;
        }

        .journey-number {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 24px;
          height: 24px;

          border: 1px solid rgba(201, 165, 91, 0.25);

          border-radius: 50%;

          font-size: 8px;
          color: #c9a55b;
        }

        .journey-item strong {
          display: block;

          font-size: 9px;
          font-weight: 500;

          color: rgba(241, 238, 230, 0.7);
        }

        .journey-item small {
          display: block;

          margin-top: 2px;

          font-size: 7px;

          color: rgba(241, 238, 230, 0.25);
        }

        .journey-connector {
          flex: 1;

          height: 1px;

          margin: 0 18px;

          background: rgba(255, 255, 255, 0.08);
        }

        /* ---------------- BACKGROUND ---------------- */

        .hero-glow {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;
        }

        .hero-glow-one {
          width: 600px;
          height: 600px;

          top: -350px;
          right: -150px;

          background: rgba(179, 137, 49, 0.025);

          filter: blur(80px);
        }

        .hero-glow-two {
          width: 400px;
          height: 400px;

          bottom: -250px;
          left: 10%;

          background: rgba(255, 255, 255, 0.015);

          filter: blur(90px);
        }

        .hero-bottom-fade {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 100px;

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 0, 0, 0.25)
          );

          pointer-events: none;
        }

        /* ---------------- RESPONSIVE ---------------- */

        @media (max-width: 1000px) {
          .nav-links {
            display: none;
          }

          .hero-content {
            grid-template-columns: 1fr;
            padding-top: 70px;
          }

          .hero-copy {
            text-align: center;
            margin: auto;
          }

          .eyebrow,
          .hero-actions,
          .trust-line {
            justify-content: center;
          }

          .robot-section {
            width: 600px;
            height: 500px;
            max-width: 100%;
            margin: -30px auto 0;
          }

          .funding-journey {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .hero-nav {
            padding: 0 22px;
          }

          .nav-button {
            padding: 9px 14px;
            font-size: 10px;
          }

          .hero-content {
            padding: 60px 22px 30px;
          }

          .hero h1 {
            font-size: 50px;
          }

          .hero-description {
            font-size: 15px;
          }

          .hero-subdescription {
            font-size: 11px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
            justify-content: center;
          }

          .robot-section {
            height: 400px;
          }

          .robot-stat {
            display: none;
          }

          .ai-indicator {
            left: 3%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .robot-image,
          .orbit {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;