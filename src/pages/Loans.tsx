import { useEffect, useState } from "react";
import {
  formatAmount,
  formatDate,
  getLoanMatches,
  type Opportunity,
} from "../services/funding";

export default function Loans() {
  const [loans, setLoans] = useState<Opportunity[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLoans() {
      try {
        setLoading(true);
        setError("");

        const loanMatches = await getLoanMatches();
        setLoans(loanMatches);
      } catch (err) {
        console.error(
          "LOANS PAGE ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load personalized loans."
        );
      } finally {
        setLoading(false);
      }
    }

    loadLoans();
  }, []);

  const loan =
    selected === null
      ? null
      : loans[selected];

  return (
    <div className="fb-page">
      <section className="fb-page-hero">
        <div>
          <p className="fb-eyebrow">
            BUSINESS CAPITAL
          </p>

          <h1 className="fb-title">
            Loans that
            <br />
            <em>fit.</em>
          </h1>

          <p className="fb-description">
            Loan opportunities matched against
            your business profile, funding
            requirement, stage and location.
          </p>
        </div>

        <div className="fb-stat-large">
          <strong>
            {loading ? "—" : loans.length}
          </strong>

          <span>
            matched loans
          </span>
        </div>
      </section>

      
      <section className="fb-section">

        <div className="fb-section-header">
          <div>
            <p className="fb-eyebrow">
              RECOMMENDED
            </p>

            <h2>
              Financing aligned with your
              business.
            </h2>
          </div>
        </div>

        
        {loading && (
          <p className="fb-description">
            Finding loans for your business
            profile...
          </p>
        )}

        
        {!loading && error && (
          <div>
            <p className="fb-description">
              {error}
            </p>

            <button
              className="fb-primary"
              onClick={() =>
                window.location.reload()
              }
            >
              Retry →
            </button>
          </div>
        )}

        
        {!loading &&
          !error &&
          loans.length === 0 && (
            <div className="fb-empty">

              <p className="fb-eyebrow">
                NO DIRECT MATCHES
              </p>

              <h3>
                We couldn't find a strong
                loan match right now.
              </h3>

              <p className="fb-description">
                Your loan recommendations are
                personalized using your industry,
                location, business stage and
                funding requirement.
              </p>

            </div>
          )}

        
        {!loading &&
          !error &&
          loans.length > 0 && (
            <div className="fb-list">

              {loans.map(
                (item, index) => (
                  <button
                    className="fb-list-row"
                    key={item.id}
                    onClick={() =>
                      setSelected(index)
                    }
                  >

                    <div className="fb-index">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </div>

                    <div className="fb-list-main">

                      <div className="fb-meta">
                        <span>
                          LOAN
                        </span>

                        <small>
                          {item.provider}
                        </small>
                      </div>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.matchReason ||
                          "Personalized loan opportunity based on your business profile."}
                      </p>

                    </div>

                    <div className="fb-list-stats">

                      <div>
                        <span>
                          MATCH
                        </span>

                        <strong>
                          {item.matchScore ??
                            0}
                          %
                        </strong>
                      </div>

                      <div>
                        <span>
                          AMOUNT
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
                          DEADLINE
                        </span>

                        <strong>
                          {formatDate(
                            item.deadline
                          )}
                        </strong>
                      </div>

                    </div>

                    <span className="fb-arrow">
                      →
                    </span>

                  </button>
                )
              )}

            </div>
          )}

      </section>

      
      {loan && (
        <div
          className="fb-overlay"
          onClick={() =>
            setSelected(null)
          }
        >

          <aside
            className="fb-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="fb-close"
              onClick={() =>
                setSelected(null)
              }
            >
              ×
            </button>

            <p className="fb-eyebrow">
              BUSINESS LOAN
            </p>

            <h2>
              {loan.title}
            </h2>

            <p className="fb-drawer-provider">
              {loan.provider}
            </p>

            <p className="fb-description">
              {loan.description}
            </p>

            <div className="fb-details">

              <div>
                <span>
                  Funding range
                </span>

                <strong>
                  {formatAmount(
                    loan.minAmount,
                    loan.maxAmount
                  )}
                </strong>
              </div>

              <div>
                <span>
                  AI match
                </span>

                <strong>
                  {loan.matchScore ??
                    0}
                  %
                </strong>
              </div>

              <div>
                <span>
                  Deadline
                </span>

                <strong>
                  {formatDate(
                    loan.deadline
                  )}
                </strong>
              </div>

            </div>

            {loan.website && (
              <a
                className="fb-primary"
                href={loan.website}
                target="_blank"
                rel="noreferrer"
              >
                View opportunity{" "}
                <span>→</span>
              </a>
            )}

          </aside>

        </div>
      )}

    </div>
  );
}
