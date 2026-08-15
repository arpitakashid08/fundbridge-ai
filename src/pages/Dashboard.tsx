import { useEffect, useState } from "react";
import { getFundingMatches, getProfile, formatAmount, type Opportunity, type BusinessProfile } from "../services/funding";
import "./Dashboard.css";

export default function Dashboard() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [matches, setMatches] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("fundbridge_user");
  let userName = "there";

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userName = user.name || "there";
    } catch {
      userName = "there";
    }
  }

  useEffect(() => {
    Promise.all([getFundingMatches(), getProfile()])
      .then(([fetchedMatches, fetchedProfile]) => {
        setMatches(fetchedMatches);
        setProfile(fetchedProfile);
      })
      .catch((err) => {
        console.error("DASHBOARD DATA LOAD ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const fundingScore = matches.length
    ? Math.round(matches.reduce((sum, item) => sum + item.matchScore, 0) / matches.length)
    : 0;

  const top3 = matches.slice(0, 3);

  const estFundingLabel = profile?.fundingRequirement != null
    ? formatAmount(profile.fundingRequirement, profile.fundingRequirement)
    : matches.length > 0 && matches[0].maxAmount != null
    ? formatAmount(matches[0].maxAmount, matches[0].maxAmount)
    : "₹50.0 L";

  const readinessPercent = profile
    ? Math.round(
        (([
          profile.industry,
          profile.location,
          profile.businessStage,
          profile.fundingRequirement,
          profile.revenue,
          profile.description,
        ].filter(Boolean).length /
          6) *
          40) +
          (fundingScore * 0.6)
      )
    : 0;

  return (
    <div>
      <section className="dashboard-hero">
        <div className="hero-copy">
          <p className="dashboard-eyebrow">FUNDING INTELLIGENCE</p>
          <h1>Welcome, {userName}.</h1>
          <p className="dashboard-description">
            Your funding landscape, intelligently organized for your{" "}
            {profile?.industry ? `${profile.industry} (${profile.businessStage || "stage"})` : "business"} business.
          </p>
        </div>

        <div className="hero-action">
          <button
            type="button"
            className="primary-gold-button"
            onClick={() => {
              window.location.href = "/funding-discovery";
            }}
          >
            Discover funding
            <span>→</span>
          </button>
        </div>
      </section>
      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <p>FUNDING SCORE</p>
          <div className="funding-score">
            <span>{loading ? "..." : fundingScore}</span>
          </div>
          <small>
            {fundingScore >= 75 ? "High readiness" : fundingScore >= 50 ? "Good readiness" : "Building profile"}
          </small>
        </div>

        <div className="dashboard-stat-card">
          <p>OPPORTUNITIES</p>
          <strong>{loading ? "..." : matches.length}</strong>
          <small>Matches found</small>
        </div>

        <div className="dashboard-stat-card">
          <p>APPLICATIONS</p>
          <strong>3</strong>
          <small>In progress</small>
        </div>

        <div className="dashboard-stat-card">
          <p>EST. FUNDING</p>
          <strong>{loading ? "..." : estFundingLabel}</strong>
          <small>Target capital</small>
        </div>
      </section>
      <section className="dashboard-grid">
        <div className="dashboard-panel ai-assessment-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-eyebrow">AI ASSESSMENT</p>
              <h2>Your funding readiness</h2>
            </div>
            <span className="panel-symbol">✦</span>
          </div>

          <p className="panel-description">
            FundBridge AI has analyzed your saved {profile?.industry || "business"} profile, funding requirements and application readiness.
          </p>

          <div className="readiness-bar">
            <div
              className="readiness-bar-fill"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>

          <div className="readiness-meta">
            <span>Funding readiness</span>
            <strong>{readinessPercent}%</strong>
          </div>

          <div className="assessment-items">
            <div>
              <span>✓</span>
              <p>Business profile: {profile?.businessStage || "Complete"}</p>
            </div>

            <div>
              <span>✓</span>
              <p>Sector: {profile?.industry || "Updated"}</p>
            </div>

            <div>
              <span>!</span>
              <p>Upload latest financial & technical documents</p>
            </div>
          </div>
        </div>
        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-eyebrow">TOP MATCHES</p>
              <h2>Funding opportunities</h2>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => {
                window.location.href = "/funding-discovery";
              }}
            >
              View all →
            </button>
          </div>

          <div className="funding-match-list">
            {loading ? (
              <div style={{ padding: "20px 0", opacity: 0.7 }}>
                Loading top matches...
              </div>
            ) : top3.length === 0 ? (
              <div style={{ padding: "20px 0", opacity: 0.7 }}>
                No funding matches found yet.
              </div>
            ) : (
              top3.map((item) => (
                <div className="funding-match" key={item.id}>
                  <div className="match-icon">
                    {item.title.slice(0, 1).toUpperCase()}
                  </div>

                  <div className="match-content">
                    <strong>{item.title}</strong>
                    <span>{item.type} • {item.provider}</span>
                  </div>

                  <div className="match-score">{item.matchScore}%</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="quick-actions-section">
        <div className="section-heading">
          <div>
            <p className="panel-eyebrow">WORKSPACE</p>
            <h2>Continue building your funding profile</h2>
          </div>
        </div>

        <div className="quick-actions">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/documents";
            }}
          >
            <span>□</span>
            <div>
              <strong>Upload documents</strong>
              <small>Strengthen your funding profile</small>
            </div>
            <b>→</b>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/ai-strategist";
            }}
          >
            <span>✦</span>
            <div>
              <strong>Ask AI Strategist</strong>
              <small>Get personalized funding advice</small>
            </div>
            <b>→</b>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/applications";
            }}
          >
            <span>✓</span>
            <div>
              <strong>Track applications</strong>
              <small>Monitor your funding progress</small>
            </div>
            <b>→</b>
          </button>
        </div>
      </section>
    </div>
  );
}