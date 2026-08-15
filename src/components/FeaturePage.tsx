import React from "react";

interface Opportunity {
  name: string;
  type: string;
  amount: string;
  match: number;
  description: string;
}

interface FeaturePageProps {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  opportunities?: Opportunity[];
  stats?: {
    label: string;
    value: string;
    change?: string;
  }[];
  children?: React.ReactNode;
}

export default function FeaturePage({
  eyebrow,
  title,
  description,
  opportunities = [],
  stats = [],
  children,
}: FeaturePageProps) {
  return (
    <div className="feature-page">

      <section className="feature-intro">

        <div className="feature-eyebrow">
          {eyebrow}
        </div>

        <div className="feature-title-row">

          <h1>
            {title}
          </h1>

          <div className="feature-description">
            {description}
          </div>

        </div>

      </section>


      {stats.length > 0 && (
        <section className="feature-metrics">

          {stats.map((stat) => (
            <div
              className="metric-item"
              key={stat.label}
            >
              <span>{stat.label}</span>

              <strong>{stat.value}</strong>

              {stat.change && (
                <small>{stat.change}</small>
              )}
            </div>
          ))}

        </section>
      )}


      {children}


      {opportunities.length > 0 && (
        <section className="opportunity-section">

          <div className="section-heading">

            <div>
              <span className="small-label">
                MATCHED FOR YOU
              </span>

              <h2>
                Opportunities worth exploring
              </h2>
            </div>

            <button className="text-button">
              View all →
            </button>

          </div>


          <div className="opportunity-list">

            {opportunities.map((item, index) => (

              <div
                className="opportunity-row"
                key={item.name}
              >

                <div className="opportunity-index">
                  0{index + 1}
                </div>

                <div className="opportunity-main">

                  <span className="opportunity-type">
                    {item.type}
                  </span>

                  <h3>{item.name}</h3>

                  <p>
                    {item.description}
                  </p>

                </div>

                <div className="opportunity-amount">
                  {item.amount}
                  <span>AVAILABLE</span>
                </div>

                <div className="match-score">

                  <strong>
                    {item.match}%
                  </strong>

                  <span>MATCH</span>

                </div>

                <button className="arrow-button">
                  ↗
                </button>

              </div>

            ))}

          </div>

        </section>
      )}

    </div>
  );
}
