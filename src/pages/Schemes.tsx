import { useEffect, useMemo, useState } from "react";
import { formatAmount, getFundingMatches, type Opportunity } from "../services/funding";

const categories = ["All", "MSME", "Startup", "Technology", "Women-led"];

function categoryFor(opportunity: Opportunity) {
  const text = `${opportunity.title} ${opportunity.description} ${opportunity.provider}`.toLowerCase();
  if (text.includes("women")) return "Women-led";
  if (text.includes("msme") || text.includes("small business")) return "MSME";
  if (text.includes("technology") || text.includes("tech") || text.includes("digital")) return "Technology";
  return "Startup";
}

export default function Schemes() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [schemes, setSchemes] = useState<Opportunity[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getFundingMatches()
      .then((matches) => setSchemes(matches.filter((item) => /government|scheme|program/i.test(item.type))))
      .catch((reason: Error) => setError(reason.message));
  }, []);

  const filtered = useMemo(() => filter === "All"
    ? schemes
    : schemes.filter((scheme) => categoryFor(scheme) === filter), [filter, schemes]);

  return (
    <div className="fb-page">
      <section className="fb-page-hero">
        <div>
          <p className="fb-eyebrow">PUBLIC SUPPORT ECOSYSTEM</p>
          <h1 className="fb-title">Government<br /><em>support.</em></h1>
          <p className="fb-description">Discover government schemes, incentives and support programmes relevant to your business.</p>
        </div>
      </section>

      <section className="fb-section">
        <div className="fb-filter-row fb-scheme-filters">
          {categories.map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        {error && <p className="fb-description">{error}</p>}
        <div className="fb-list">
          {filtered.map((scheme, index) => (
            <button className="fb-list-row" key={scheme.id} onClick={() => setSelected(scheme)}>
              <div className="fb-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="fb-list-main"><div className="fb-meta"><span>{categoryFor(scheme)}</span></div><h3>{scheme.title}</h3><p>{scheme.matchReason}</p></div>
              <div className="fb-list-stats"><div><span>BENEFIT</span><strong>{formatAmount(scheme.minAmount, scheme.maxAmount)}</strong></div></div>
              <span className="fb-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div className="fb-overlay" onClick={() => setSelected(null)}>
          <aside className="fb-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="fb-close" onClick={() => setSelected(null)}>×</button>
            <p className="fb-eyebrow">GOVERNMENT SCHEME</p><h2>{selected.title}</h2>
            <div className="fb-details">
              <div><span>Category</span><strong>{categoryFor(selected)}</strong></div>
              <div><span>Eligibility</span><strong>{selected.matchReason}</strong></div>
              <div><span>Benefit</span><strong>{formatAmount(selected.minAmount, selected.maxAmount)}</strong></div>
            </div>
            {selected.website && <a className="fb-primary" href={selected.website} target="_blank" rel="noreferrer">View opportunity <span>→</span></a>}
          </aside>
        </div>
      )}
    </div>
  );
}
