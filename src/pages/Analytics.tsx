import { useEffect, useState } from "react";
import { getFundingMatches, getProfile, formatAmount, opportunityCategory, type Opportunity, type BusinessProfile } from "../services/funding";

export default function Analytics() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [matches, setMatches] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFundingMatches(), getProfile()])
      .then(([fetchedMatches, fetchedProfile]) => {
        setMatches(fetchedMatches);
        setProfile(fetchedProfile);
      })
      .catch((err) => {
        console.error("ANALYTICS LOAD ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const fundingScore = matches.length
    ? Math.round(matches.reduce((sum, item) => sum + item.matchScore, 0) / matches.length)
    : 0;

  const capitalRequestedLabel = profile?.fundingRequirement != null
    ? formatAmount(profile.fundingRequirement, profile.fundingRequirement)
    : "₹50.0 L";

  const grantsCount = matches.filter((m) => opportunityCategory(m) === "grant").length;
  const loansCount = matches.filter((m) => opportunityCategory(m) === "loan").length;
  const investorsCount = matches.filter((m) => opportunityCategory(m) === "investor").length;
  const govCount = matches.filter((m) => m.type.toLowerCase().includes("government") || m.type.toLowerCase().includes("program")).length;

  const maxCategoryCount = Math.max(grantsCount, loansCount, investorsCount, govCount, 1);

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
    <div className="fb-page">
      <section className="fb-page-hero">
        <div>
          <p className="fb-eyebrow">FUNDING INTELLIGENCE</p>
          <h1 className="fb-title">
            Your capital
            <br />
            <em>position.</em>
          </h1>
          <p className="fb-description">
            A clear view of your funding readiness, applications and capital opportunities for your{" "}
            {profile?.industry ? profile.industry : "business"} profile.
          </p>
        </div>

        <div className="fb-score">
          <span>FUNDING SCORE</span>
          <strong>{loading ? "..." : fundingScore}</strong>
          <small>/ 100</small>
        </div>
      </section>

      <section className="fb-analytics-grid">
        <div className="fb-analytics-feature">
          <span>CAPITAL REQUESTED</span>
          <strong>{loading ? "..." : capitalRequestedLabel}</strong>
          <small>Target funding requirement</small>
        </div>

        <div className="fb-analytics-feature">
          <span>MATCHED OPPORTUNITIES</span>
          <strong>{loading ? "..." : matches.length}</strong>
          <small>Surfaced by AI matching</small>
        </div>

        <div className="fb-analytics-feature">
          <span>BUSINESS STAGE</span>
          <strong>{loading ? "..." : profile?.businessStage || "Idea"}</strong>
          <small>{profile?.industry || "Sector profile"}</small>
        </div>
      </section>

      <section className="fb-section">
        <p className="fb-eyebrow">OPPORTUNITY MIX</p>
        <div className="fb-bars">
          {[
            ["Grants", grantsCount],
            ["Loans", loansCount],
            ["Investors", investorsCount],
            ["Government programs", govCount],
          ].map(([label, value]) => {
            const count = Number(value);
            const percentage = Math.round((count / maxCategoryCount) * 100);
            return (
              <div className="fb-bar-row" key={String(label)}>
                <span>{label}</span>
                <div>
                  <i style={{ width: `${Math.max(percentage, 8)}%` }} />
                </div>
                <strong>{count}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <section className="fb-readiness">
        <div>
          <p className="fb-eyebrow">READINESS</p>
          <h2>{readinessPercent >= 70 ? "You're closer than you think." : "Strengthen your document readiness."}</h2>
        </div>

        <div className="fb-readiness-score">
          <strong>{readinessPercent}%</strong>
          <span>funding readiness</span>
        </div>
      </section>
    </div>
  );
}