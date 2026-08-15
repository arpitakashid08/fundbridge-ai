import { useEffect, useState } from "react";
import { formatAmount, getInvestorMatches, type Opportunity } from "../services/funding";

export default function Investors() {
  const [investors, setInvestors] = useState<Opportunity[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { getInvestorMatches().then(setInvestors).catch((reason: Error) => setError(reason.message)); }, []);
  const investor = selected === null ? null : investors[selected];
  return <div className="fb-page">
    <section className="fb-page-hero"><div><p className="fb-eyebrow">INVESTOR NETWORK</p><h1 className="fb-title">Find capital<br /><em>that fits.</em></h1><p className="fb-description">Connect with funding opportunities whose focus and available details align with your business.</p></div><div className="fb-stat-large"><strong>{investors.length}</strong><span>potential matches</span></div></section>
    <section className="fb-section"><div className="fb-section-header"><div><p className="fb-eyebrow">AI MATCHED</p><h2>Potential investors.</h2></div></div>{error && <p className="fb-description">{error}</p>}<div className="fb-list">{investors.map((item, index) => <button className="fb-list-row" key={item.id} onClick={() => setSelected(index)}><div className="fb-index">{String(index + 1).padStart(2, "0")}</div><div className="fb-list-main"><div className="fb-meta"><span>{item.type}</span><small>{item.provider}</small></div><h3>{item.title}</h3><p>{item.matchReason}</p></div><div className="fb-list-stats"><div><span>MATCH</span><strong>{item.matchScore}%</strong></div><div><span>RANGE</span><strong>{formatAmount(item.minAmount, item.maxAmount)}</strong></div></div><span className="fb-arrow">→</span></button>)}</div></section>
    {investor && <div className="fb-overlay" onClick={() => setSelected(null)}><aside className="fb-drawer" onClick={(e) => e.stopPropagation()}><button className="fb-close" onClick={() => setSelected(null)}>×</button><p className="fb-eyebrow">INVESTOR</p><h2>{investor.title}</h2><p className="fb-drawer-provider">{investor.provider}</p><div className="fb-details"><div><span>Funding type</span><strong>{investor.type}</strong></div><div><span>Investment range</span><strong>{formatAmount(investor.minAmount, investor.maxAmount)}</strong></div><div><span>AI match</span><strong>{investor.matchScore}%</strong></div></div>{investor.website && <a className="fb-primary" href={investor.website} target="_blank" rel="noreferrer">View opportunity <span>→</span></a>}</aside></div>}
  </div>;
}
