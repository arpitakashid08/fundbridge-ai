import { useEffect, useState } from "react";
import { formatAmount, formatDate, getGrantMatches, type Opportunity } from "../services/funding";

export default function Grants() {
  const [grants, setGrants] = useState<Opportunity[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getGrantMatches()
      .then(setGrants)
      .catch((reason: Error) => setError(reason.message));
  }, []);

  const grant = selected === null ? null : grants[selected];
  return <div className="fb-page">
    <section className="fb-page-hero"><div><p className="fb-eyebrow">NON-DILUTIVE CAPITAL</p><h1 className="fb-title">Grants that<br /><em>fit.</em></h1><p className="fb-description">Funding opportunities you don't have to repay, matched against your business profile.</p></div><div className="fb-stat-large"><strong>{grants.length}</strong><span>matched grants</span></div></section>
    <section className="fb-section"><div className="fb-section-header"><div><p className="fb-eyebrow">RECOMMENDED</p><h2>Highest probability matches.</h2></div></div>
      {error && <p className="fb-description">{error}</p>}
      <div className="fb-list">{grants.map((item, index) => <button className="fb-list-row" key={item.id} onClick={() => setSelected(index)}><div className="fb-index">{String(index + 1).padStart(2, "0")}</div><div className="fb-list-main"><div className="fb-meta"><span>GRANT</span><small>{item.provider}</small></div><h3>{item.title}</h3><p>{item.matchReason}</p></div><div className="fb-list-stats"><div><span>MATCH</span><strong>{item.matchScore}%</strong></div><div><span>AMOUNT</span><strong>{formatAmount(item.minAmount, item.maxAmount)}</strong></div><div><span>DEADLINE</span><strong>{formatDate(item.deadline)}</strong></div></div><span className="fb-arrow">→</span></button>)}</div>
    </section>
    {grant && <div className="fb-overlay" onClick={() => setSelected(null)}><aside className="fb-drawer" onClick={(e) => e.stopPropagation()}><button className="fb-close" onClick={() => setSelected(null)}>×</button><p className="fb-eyebrow">GRANT</p><h2>{grant.title}</h2><p className="fb-drawer-provider">{grant.provider}</p><div className="fb-details"><div><span>Maximum funding</span><strong>{formatAmount(grant.minAmount, grant.maxAmount)}</strong></div><div><span>AI match</span><strong>{grant.matchScore}%</strong></div><div><span>Deadline</span><strong>{formatDate(grant.deadline)}</strong></div></div>{grant.website && <a className="fb-primary" href={grant.website} target="_blank" rel="noreferrer">View opportunity <span>→</span></a>}</aside></div>}
  </div>;
}
