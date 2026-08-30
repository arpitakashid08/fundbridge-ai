import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

interface ProfileForm {
  business: string;
  industry: string;
  location: string;
  stage: string;
  revenue: string;
  requirement: string;
  employees: string;
  description: string;
}

const emptyForm: ProfileForm = {
  business: "",
  industry: "",
  location: "",
  stage: "",
  revenue: "",
  requirement: "",
  employees: "",
  description: "",
};

export default function Profile() {
  const [form, setForm] = useState<ProfileForm>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("fundbridge_token");

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl("/api/profile"), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load profile.");
          return;
        }

        const user = data.user;
        const profile = data.profile;

        setForm({
          business: user?.company || "",
          industry: profile?.industry || "",
          location: profile?.location || "",
          stage: profile?.businessStage || "",
          revenue:
            profile?.revenue !== null &&
            profile?.revenue !== undefined
              ? String(profile.revenue)
              : "",
          requirement:
            profile?.fundingRequirement !== null &&
            profile?.fundingRequirement !== undefined
              ? String(profile.fundingRequirement)
              : "",
          employees:
            profile?.employees !== null &&
            profile?.employees !== undefined
              ? String(profile.employees)
              : "",
          description: profile?.description || "",
        });
      } catch (err) {
        console.error("PROFILE LOAD ERROR:", err);

        setError(
          "Unable to connect to FundBridge. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const update = (
    key: keyof ProfileForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
    setError("");
  };

  const handleSave = async () => {
    const token = localStorage.getItem("fundbridge_token");

    if (!token) {
      setError("You are not logged in.");
      return;
    }

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const response = await fetch(apiUrl("/api/profile"), {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          business: form.business.trim(),
          industry: form.industry.trim(),
          location: form.location.trim(),
          stage: form.stage,
          revenue: form.revenue,
          requirement: form.requirement,
          employees: form.employees,
          description: form.description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to save profile.");
        return;
      }

      setSaved(true);
    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);

      setError(
        "Unable to connect to FundBridge. Make sure the backend is running."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fb-page">
        <section className="fb-page-hero">
          <p className="fb-eyebrow">
            BUSINESS PROFILE
          </p>

          <h1 className="fb-title">
            Loading your
            <br />
            <em>profile...</em>
          </h1>
        </section>
      </div>
    );
  }

  return (
    <div className="fb-page">

      <section className="fb-page-hero">

        <div>

          <p className="fb-eyebrow">
            BUSINESS PROFILE
          </p>

          <h1 className="fb-title">
            Tell us about
            <br />
            <em>your business.</em>
          </h1>

          <p className="fb-description">
            Your profile powers funding matches,
            eligibility checks and AI recommendations.
          </p>

        </div>

      </section>

      <section className="fb-form-section">

        <div className="fb-form-group">

          <p className="fb-eyebrow">
            BUSINESS
          </p>

          <label>
            Business name

            <input
              type="text"
              value={form.business}
              placeholder="Your business name"
              onChange={(e) =>
                update("business", e.target.value)
              }
            />

          </label>

          <label>
            Industry

            <input
              type="text"
              value={form.industry}
              placeholder="Technology, Healthcare, Finance..."
              onChange={(e) =>
                update("industry", e.target.value)
              }
            />

          </label>

          <label>
            Location

            <input
              type="text"
              value={form.location}
              placeholder="Mumbai, Maharashtra"
              onChange={(e) =>
                update("location", e.target.value)
              }
            />

          </label>

          <label>
            Business stage

            <select
              value={form.stage}
              onChange={(e) =>
                update("stage", e.target.value)
              }
            >

              <option value="">
                Select business stage
              </option>

              <option value="Idea">
                Idea
              </option>

              <option value="Early Stage">
                Early Stage
              </option>

              <option value="Growth">
                Growth
              </option>

              <option value="Established">
                Established
              </option>

            </select>

          </label>

        </div>

        <div className="fb-form-group">

          <p className="fb-eyebrow">
            FINANCIAL POSITION
          </p>

          <label>
            Annual revenue

            <input
              type="number"
              value={form.revenue}
              placeholder="1800000"
              onChange={(e) =>
                update("revenue", e.target.value)
              }
            />

          </label>

          <label>
            Funding requirement

            <input
              type="number"
              value={form.requirement}
              placeholder="5000000"
              onChange={(e) =>
                update("requirement", e.target.value)
              }
            />

          </label>

          <label>
            Number of employees

            <input
              type="number"
              value={form.employees}
              placeholder="10"
              onChange={(e) =>
                update("employees", e.target.value)
              }
            />

          </label>

          <label>
            Business description

            <textarea
              value={form.description}
              placeholder="Tell us briefly about your business..."
              rows={5}
              onChange={(e) =>
                update("description", e.target.value)
              }
            />

          </label>

          {error && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 14px",
                border: "1px solid rgba(190, 75, 65, 0.35)",
                background: "rgba(190, 75, 65, 0.08)",
                color: "#e08a82",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="button"
            className="fb-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : saved
              ? "Profile saved"
              : "Save profile"}

            <span>
              {saving ? "..." : "→"}
            </span>

          </button>

        </div>

      </section>

    </div>
  );
}
