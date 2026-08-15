import { useEffect, useState } from "react";
import { formatAmount, getProfile, getStrategy, type BusinessProfile, type Opportunity } from "../services/funding";

export default function AIStrategist() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [strategy, setStrategy] = useState("");
  const [matches, setMatches] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { getProfile().then(setProfile).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false)); }, []);

  const generate = async () => {
    setGenerating(true); setError("");
    try { const data = await getStrategy(); setProfile(data.profile); setStrategy(data.strategy); setMatches(data.matches); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to generate strategy."); }
    finally { setGenerating(false); }
  };

  const readiness = matches.length ? Math.round(matches.reduce((sum, item) => sum + item.matchScore, 0) / matches.length) : 0;
  return <div className="fb-page">
    <section className="fb-page-hero"><div><p className="fb-eyebrow">FUNDBRIDGE INTELLIGENCE</p><h1 className="fb-title">Your funding<br /><em>strategist.</em></h1><p className="fb-description">Turn your business profile into a clear capital strategy with AI-powered recommendations.</p></div><div className="fb-score"><span>FUNDING READINESS</span><strong>{readiness}</strong><small>/ 100</small></div></section>
    <section className="fb-ai-layout"><div className="fb-ai-main"><p className="fb-eyebrow">CURRENT POSITION</p><div className="fb-data-list"><div><span>Business stage</span><strong>{profile?.businessStage || "Not provided"}</strong></div><div><span>Industry</span><strong>{profile?.industry || "Not provided"}</strong></div><div><span>Annual revenue</span><strong>{profile?.revenue == null ? "Not provided" : formatAmount(profile.revenue, profile.revenue)}</strong></div><div><span>Funding required</span><strong>{profile?.fundingRequirement == null ? "Not provided" : formatAmount(profile.fundingRequirement, profile.fundingRequirement)}</strong></div></div><button className="fb-primary" onClick={generate} disabled={loading || generating}>{generating ? "Generating strategy" : strategy ? "Regenerate strategy" : "Generate strategy"}<span>→</span></button></div>
      <div className="fb-ai-result"><p className="fb-eyebrow">AI RECOMMENDATION</p>{!strategy ? <div className="fb-ai-placeholder"><span>✦</span><p>{error || "Generate your personalised funding strategy based on your current business position."}</p></div> : <><h2>Your strategy, based on your<br /><em>current business profile.</em></h2><p style={{ whiteSpace: "pre-wrap" }}>{strategy}</p><div className="fb-roadmap">{matches.slice(0, 3).map((item, index) => <div key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{item.matchReason}</small></div>)}</div></>}</div>
    </section>
  </div>;
}
