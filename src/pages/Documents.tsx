import { useEffect, useMemo, useRef, useState } from "react";
import { getDocuments, uploadDocument, deleteDocument, type DocumentItem, type BusinessProfile } from "../services/funding";
import "./Documents.css";

type DocumentStatus =
  | "Verified"
  | "Under review"
  | "Action required"
  | "Missing";

const statusClass = (status: DocumentStatus) => {
  switch (status) {
    case "Verified":
      return "verified";
    case "Under review":
      return "review";
    case "Action required":
      return "action";
    case "Missing":
      return "missing";
  }
};

export default function Documents() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | DocumentStatus>("All");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const loadDocs = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data.documents);
      setProfile(data.profile);
    } catch (err: any) {
      console.error("DOCUMENTS LOAD ERROR:", err);
      setError(err.message || "Unable to load documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const verifiedCount = documents.filter(
    (doc) => doc.status === "Verified"
  ).length;

  const requiredCount = documents.filter((doc) => doc.required).length;

  const completedRequired = documents.filter(
    (doc) => doc.required && (doc.status === "Verified" || doc.status === "Under review")
  ).length;

  const readiness =
    requiredCount === 0
      ? 100
      : Math.round((completedRequired / requiredCount) * 100);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || doc.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [documents, search, filter]);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploaded = await uploadDocument(selectedFile);
      setDocuments((prev) => [uploaded, ...prev]);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      console.error("UPLOAD ERROR:", err);
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err: any) {
      console.error("DELETE ERROR:", err);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  return (
    <div className="documents-page">
      <section className="documents-hero">
        <div>
          <div className="eyebrow">SECURE DOCUMENT CENTER</div>

          <h1>
            Keep your documents
            <br />
            <span>funding-ready.</span>
          </h1>

          <p>
            Organize, verify and prepare every document required for grants, loans and investors personalized for your{" "}
            {profile?.industry ? `${profile.industry} (${profile.businessStage || "stage"})` : "business"}.
          </p>
        </div>

        <div className="hero-readiness">
          <div className="readiness-ring">
            <div className="readiness-inner">
              <strong>{readiness}%</strong>
              <span>READY</span>
            </div>
          </div>

          <div>
            <span className="small-label">FUNDING READINESS</span>

            <h3>
              {readiness >= 70
                ? "Almost funding-ready."
                : "A few documents remain."}
            </h3>

            <p>
              {completedRequired} of {requiredCount} required documents completed.
            </p>
          </div>
        </div>
      </section>

      {error && (
        <div style={{ padding: "12px 16px", margin: "16px 0", background: "rgba(190, 75, 65, 0.1)", border: "1px solid rgba(190, 75, 65, 0.3)", color: "#e08a82" }}>
          {error}
        </div>
      )}
      <section className="document-stats">
        <div className="stat">
          <span>Total documents</span>
          <strong>{loading ? "..." : documents.length}</strong>
        </div>

        <div className="stat">
          <span>Verified</span>
          <strong>{loading ? "..." : verifiedCount}</strong>
        </div>

        <div className="stat">
          <span>Under review</span>
          <strong>
            {documents.filter((doc) => doc.status === "Under review").length}
          </strong>
        </div>

        <div className="stat warning-stat">
          <span>Needs attention</span>
          <strong>
            {
              documents.filter(
                (doc) =>
                  doc.status === "Action required" ||
                  doc.status === "Missing"
              ).length
            }
          </strong>
        </div>
      </section>

      <section className="documents-toolbar">
        <div className="toolbar-left">
          <div className="document-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "All" | DocumentStatus)
            }
          >
            <option value="All">All documents</option>
            <option value="Verified">Verified</option>
            <option value="Under review">Under review</option>
            <option value="Action required">Action required</option>
            <option value="Missing">Missing</option>
          </select>
        </div>

        <div className="upload-area">
          {selectedFile && (
            <span className="selected-file">{selectedFile.name}</span>
          )}

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xlsx,.xls"
            onChange={handleFileSelect}
          />

          <button
            className="secondary-button"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose file
          </button>

          <button
            className="gold-button"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload document"}
            <span>→</span>
          </button>
        </div>
      </section>
      <section className="documents-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DOCUMENT INVENTORY</span>
            <h2>Your funding documents</h2>
          </div>

          <span className="document-count">
            {filteredDocuments.length} documents
          </span>
        </div>

        <div className="documents-table">
          <div className="table-header">
            <span>DOCUMENT</span>
            <span>CATEGORY</span>
            <span>STATUS</span>
            <span>UPDATED</span>
            <span></span>
          </div>

          {loading ? (
            <div style={{ padding: "40px 0", opacity: 0.7, textAlign: "center" }}>
              Loading documents...
            </div>
          ) : (
            filteredDocuments.map((document) => (
              <div className="document-row" key={String(document.id)}>
                <div className="document-name">
                  <div className="document-icon">
                    {document.name
                      .split(".")
                      .pop()
                      ?.toUpperCase()
                      .slice(0, 3) || "DOC"}
                  </div>

                  <div>
                    <strong>{document.name}</strong>

                    <span>
                      {document.size}
                      {document.required && " • Required"}
                    </span>
                  </div>
                </div>

                <span className="category">{document.category}</span>

                <span className={`status ${statusClass(document.status as DocumentStatus)}`}>
                  <i />
                  {document.status}
                </span>

                <span className="updated">{document.updated}</span>

                <button
                  className="row-action"
                  onClick={() =>
                    document.status === "Missing"
                      ? fileInputRef.current?.click()
                      : handleDelete(document.id)
                  }
                >
                  {document.status === "Missing" ? "Upload →" : "Remove"}
                </button>
              </div>
            ))
          )}

          {!loading && filteredDocuments.length === 0 && (
            <div className="empty-state">
              <div>⌕</div>
              <h3>No documents found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="requirements-section">
        <div>
          <span className="eyebrow">FUNDING REQUIREMENTS</span>

          <h2>
            Complete your document
            <br />
            checklist.
          </h2>

          <p>
            FundBridge uses your documents to improve funding matches for your{" "}
            {profile?.industry || "business"} venture.
          </p>
        </div>

        <div className="requirements-list">
          <div>
            <span>01</span>
            <p>Legal registration & identity compliance</p>
            <b>Required</b>
          </div>

          <div>
            <span>02</span>
            <p>Tax, GST and financial records</p>
            <b>Required</b>
          </div>

          <div>
            <span>03</span>
            <p>Pitch deck tailored for {profile?.industry || "your sector"}</p>
            <b>Recommended</b>
          </div>

          <div>
            <span>04</span>
            <p>12-Month milestone financial projections</p>
            <b>Required</b>
          </div>
        </div>
      </section>
    </div>
  );
}