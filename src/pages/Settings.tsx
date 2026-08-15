import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [recommendations, setRecommendations] = useState(true);

  return (
    <div className="fb-page">

      <section className="fb-page-hero">
        <div>
          <p className="fb-eyebrow">PREFERENCES</p>

          <h1 className="fb-title">
            Your
            <br />
            <em>settings.</em>
          </h1>

          <p className="fb-description">
            Control how FundBridge communicates with you
            and manages your funding preferences.
          </p>
        </div>
      </section>

      <section className="fb-settings">

        <div className="fb-setting-section">

          <p className="fb-eyebrow">NOTIFICATIONS</p>

          <div className="fb-setting-row">
            <div>
              <strong>Funding alerts</strong>
              <span>Get notified about new opportunities.</span>
            </div>

            <button
              className={`fb-toggle ${
                alerts ? "on" : ""
              }`}
              onClick={() => setAlerts(!alerts)}
            >
              <i />
            </button>
          </div>

          <div className="fb-setting-row">
            <div>
              <strong>Application reminders</strong>
              <span>Never miss an application deadline.</span>
            </div>

            <button
              className={`fb-toggle ${
                notifications ? "on" : ""
              }`}
              onClick={() =>
                setNotifications(!notifications)
              }
            >
              <i />
            </button>
          </div>

        </div>

        <div className="fb-setting-section">

          <p className="fb-eyebrow">AI</p>

          <div className="fb-setting-row">
            <div>
              <strong>AI recommendations</strong>
              <span>
                Receive personalised funding suggestions.
              </span>
            </div>

            <button
              className={`fb-toggle ${
                recommendations ? "on" : ""
              }`}
              onClick={() =>
                setRecommendations(!recommendations)
              }
            >
              <i />
            </button>
          </div>

        </div>

        <div className="fb-setting-section danger">

          <p className="fb-eyebrow">DANGER ZONE</p>

          <div className="fb-setting-row">
            <div>
              <strong>Delete account</strong>
              <span>
                Permanently remove your FundBridge account.
              </span>
            </div>

            <button
              className="fb-danger"
              onClick={() =>
                alert("Account deletion requires confirmation.")
              }
            >
              Delete
            </button>
          </div>

        </div>

      </section>
    </div>
  );
}