import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../config/api";

type Opportunity = {
  id: string;
  title: string;
  provider: string;
  type: string;
  minAmount: number | null;
  maxAmount: number | null;
  deadline: string | null;
  description: string;
  location: string | null;
  website: string | null;
  matchScore?: number;
  matchReason?: string;
};

export default function FundingDiscovery() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const [selected, setSelected] =
    useState<Opportunity | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFunding = async () => {
      const token =
        localStorage.getItem("fundbridge_token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          apiUrl("/api/funding"),
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Unable to load funding opportunities."
          );
          return;
        }

        setOpportunities(
          data.opportunities || data.matches || []
        );
      } catch (err) {
        console.error(
          "FUNDING LOAD ERROR:",
          err
        );

        setError(
          "Unable to connect to FundBridge. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadFunding();
  }, []);

  const formatAmount = (
    min: number | null,
    max: number | null
  ) => {
    if (!min && !max) {
      return "Amount varies";
    }

    const format = (value: number) => {
      if (value >= 10000000) {
        return `₹${(
          value / 10000000
        ).toFixed(1)} Cr`;
      }

      if (value >= 100000) {
        return `₹${(
          value / 100000
        ).toFixed(1)} L`;
      }

      return `₹${value.toLocaleString(
        "en-IN"
      )}`;
    };

    if (min && max) {
      return `${format(min)} – ${format(max)}`;
    }

    if (max) {
      return `Up to ${format(max)}`;
    }

    return `From ${format(min!)}`;
  };

  const normalizeType = (value: string) => {
    const lower = value.toLowerCase();

    if (
      lower.includes("grant") ||
      lower.includes("government")
    ) {
      return "Grant";
    }

    if (
      lower.includes("loan") ||
      lower.includes("assistance")
    ) {
      return "Loan";
    }

    if (
      lower.includes("investor") ||
      lower.includes("funding") ||
      lower.includes("capital")
    ) {
      return "Investor";
    }

    return "Other";
  };

  const filtered = useMemo(() => {
    return opportunities.filter((item) => {
      const search =
        query.toLowerCase().trim();

      const matchesQuery =
        !search ||
        item.title
          .toLowerCase()
          .includes(search) ||
        item.provider
          .toLowerCase()
          .includes(search) ||
        item.description
          .toLowerCase()
          .includes(search);

      const normalizedType =
        normalizeType(item.type);

      const matchesType =
        type === "All" ||
        normalizedType === type;

      return (
        matchesQuery &&
        matchesType
      );
    });
  }, [
    opportunities,
    query,
    type,
  ]);

  const profileScore = opportunities.length
    ? Math.round(opportunities.reduce((total, item) => total + (item.matchScore || 0), 0) / opportunities.length)
    : 0;

  if (loading) {
    return (
      <div className="funding-page">

        <section className="funding-hero">

          <div>
            <p className="eyebrow">
              AI-POWERED FUNDING DISCOVERY
            </p>

            <h1>
              Finding the right
              <br />
              <span>capital.</span>
            </h1>

            <p className="funding-intro">
              Loading funding opportunities
              for your business...
            </p>
          </div>

        </section>

      </div>
    );
  }

  return (
    <div className="funding-page">

      <section className="funding-hero">

        <div>

          <p className="eyebrow">
            AI-POWERED FUNDING DISCOVERY
          </p>

          <h1>
            Find the right
            <br />
            <span>capital.</span>
          </h1>

          <p className="funding-intro">
            FundBridge analyzes your business
            profile and surfaces funding
            opportunities matched to your
            stage, sector and potential.
          </p>

        </div>

        <div className="funding-score-mini">

          <span>
            Your match profile
          </span>

          <strong>
            {profileScore}
          </strong>

          <small>
            FUNDING SCORE
          </small>

        </div>

      </section>

      {error && (
        <section
          style={{
            margin: "24px 0",
            padding: "16px 20px",
            border:
              "1px solid rgba(190,75,65,0.35)",
            background:
              "rgba(190,75,65,0.08)",
            color: "#e08a82",
          }}
        >
          {error}
        </section>
      )}



      <section className="funding-search-section">

        <div className="funding-search">

          <span>
            ⌕
          </span>

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search grants, loans, investors..."
          />

        </div>

        <div className="funding-filters">

          {[
            "All",
            "Grant",
            "Loan",
            "Investor",
          ].map((item) => (

            <button
              key={item}
              className={
                type === item
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                setType(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </section>

      <section className="opportunity-section">

        <div className="section-heading-row">

          <div>

            <p className="eyebrow">
              MATCHED OPPORTUNITIES
            </p>

            <h2>
              Funding for your business.
            </h2>

          </div>

          <span className="result-count">
            {filtered.length} opportunities
          </span>

        </div>

        <div className="opportunity-list">

          {filtered.length === 0 ? (

            <div
              style={{
                padding: "40px 0",
                opacity: 0.7,
              }}
            >
              No funding opportunities
              match your search.
            </div>

          ) : (

            filtered.map(
              (item, index) => {

                const normalizedType =
                  normalizeType(item.type);

                return (
                  <article
                    className="opportunity-row"
                    key={item.id}
                    onClick={() =>
                      setSelected(item)
                    }
                  >

                    <div className="opportunity-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </div>

                    <div className="opportunity-main">

                      <div className="opportunity-topline">

                        <span
                          className={`type ${normalizedType.toLowerCase()}`}
                        >
                          {normalizedType}
                        </span>

                        <span>
                          {item.provider}
                        </span>

                      </div>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.matchReason || item.description}
                      </p>

                    </div>

                    <div className="opportunity-meta">

                      <div>

                        <span>
                          CAPITAL
                        </span>

                        <strong>
                          {formatAmount(
                            item.minAmount,
                            item.maxAmount
                          )}
                        </strong>

                      </div>

                      <div>

                        <span>
                          LOCATION
                        </span>

                        <strong>
                          {item.location ||
                            "India"}
                        </strong>

                      </div>

                      <div>

                        <span>
                          DEADLINE
                        </span>

                        <strong>
                          {item.deadline
                            ? new Date(
                                item.deadline
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month:
                                    "short",
                                  year:
                                    "numeric",
                                }
                              )
                            : "Rolling"}
                        </strong>

                      </div>

                    </div>

                    <div className="opportunity-arrow">
                      →
                    </div>

                  </article>
                );
              }
            )

          )}

        </div>

      </section>

      {selected && (

        <div
          className="funding-overlay"
          onClick={() =>
            setSelected(null)
          }
        >

          <div
            className="funding-drawer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="drawer-close"
              onClick={() =>
                setSelected(null)
              }
            >
              ×
            </button>

            <p className="eyebrow">
              {normalizeType(
                selected.type
              ).toUpperCase()}
            </p>

            <h2>
              {selected.title}
            </h2>

            <p className="drawer-provider">
              {selected.provider}
            </p>

            <div className="drawer-details">

              <div>

                <span>
                  Available capital
                </span>

                <strong>
                  {formatAmount(
                    selected.minAmount,
                    selected.maxAmount
                  )}
                </strong>

              </div>

              <div>

                <span>
                  Application deadline
                </span>

                <strong>
                  {selected.deadline
                    ? new Date(
                        selected.deadline
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "Rolling"}
                </strong>

              </div>

              <div>

                <span>
                  Location
                </span>

                <strong>
                  {selected.location ||
                    "India"}
                </strong>

              </div>

            </div>

            <p className="drawer-description">
              {selected.description}
            </p>

            {selected.website && (

              <a
                href={selected.website}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-action"
              >
                Visit official source
                <span>↗</span>
              </a>

            )}

          </div>

        </div>

      )}

    </div>
  );
}
