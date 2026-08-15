import { useState } from "react";

type Application = {
  name: string;
  amount: string;
  status: "In progress" | "Under review" | "Approved";
  progress: number;
};

const applications: Application[] = [
  {
    name: "Startup India Seed Fund",
    amount: "₹50L",
    status: "In progress",
    progress: 60,
  },
  {
    name: "MSME Growth Capital",
    amount: "₹20L",
    status: "Under review",
    progress: 82,
  },
  {
    name: "Technology Innovation Grant",
    amount: "₹15L",
    status: "Approved",
    progress: 100,
  },
];

export default function Applications() {
  const [selected, setSelected] = useState<Application | null>(null);

  return (
    <div className="fb-page">

      <section className="fb-page-hero">
        <div>
          <p className="fb-eyebrow">FUNDING PIPELINE</p>

          <h1 className="fb-title">
            Track every
            <br />
            <em>application.</em>
          </h1>

          <p className="fb-description">
            One place to monitor applications, documents and
            funding decisions.
          </p>
        </div>

        <div className="fb-stat-large">
          <strong>3</strong>
          <span>active applications</span>
        </div>
      </section>

      <section className="fb-section">

        <div className="fb-section-header">
          <div>
            <p className="fb-eyebrow">YOUR PIPELINE</p>
            <h2>Application status.</h2>
          </div>
        </div>

        <div className="fb-list">

          {applications.map((application, index) => (
            <button
              className="fb-list-row"
              key={application.name}
              onClick={() => setSelected(application)}
            >
              <div className="fb-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="fb-list-main">
                <div className="fb-meta">
                  <span>{application.status}</span>
                </div>

                <h3>{application.name}</h3>

                <div className="fb-progress">
                  <div
                    style={{
                      width: `${application.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="fb-list-stats">
                <div>
                  <span>AMOUNT</span>
                  <strong>{application.amount}</strong>
                </div>

                <div>
                  <span>PROGRESS</span>
                  <strong>{application.progress}%</strong>
                </div>
              </div>

              <span className="fb-arrow">→</span>
            </button>
          ))}

        </div>
      </section>

      {selected && (
        <div className="fb-overlay" onClick={() => setSelected(null)}>
          <aside
            className="fb-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fb-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <p className="fb-eyebrow">APPLICATION</p>

            <h2>{selected.name}</h2>

            <div className="fb-drawer-score">
              <span>PROGRESS</span>
              <strong>{selected.progress}%</strong>
            </div>

            <div className="fb-timeline">

              <div className="done">
                <span>01</span>
                <strong>Profile completed</strong>
              </div>

              <div className="done">
                <span>02</span>
                <strong>Documents uploaded</strong>
              </div>

              <div className={selected.progress >= 80 ? "done" : ""}>
                <span>03</span>
                <strong>Eligibility verified</strong>
              </div>

              <div>
                <span>04</span>
                <strong>Application review</strong>
              </div>

              <div>
                <span>05</span>
                <strong>Decision</strong>
              </div>

            </div>

            <button
              className="fb-primary"
              onClick={() => alert("Application opened")}
            >
              Continue application <span>→</span>
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}