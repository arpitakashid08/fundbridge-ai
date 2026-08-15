const API_URL = "http://127.0.0.1:5050";

export type Opportunity = {
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
  matchScore: number;
  matchReason: string;
  eligibilityStatus?: "potential match" | "not enough information";
};

export type BusinessProfile = {
  industry: string | null;
  location: string | null;
  businessStage: string | null;
  revenue: number | null;
  fundingRequirement: number | null;
  employees: number | null;
  description: string | null;
};

export type DocumentItem = {
  id: string | number;
  name: string;
  category: string;
  status: "Verified" | "Under review" | "Action required" | "Missing";
  size: string;
  updated: string;
  required: boolean;
  fileUrl?: string;
};

async function authenticatedFetch(path: string, init?: RequestInit) {
  const token = localStorage.getItem("fundbridge_token");
  if (!token) throw new Error("You are not logged in.");
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...init?.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to load personalized funding data.");
  return data;
}

export async function getFundingMatches(): Promise<Opportunity[]> {
  const data = await authenticatedFetch("/api/funding/matches");
  return data.matches || [];
}

export async function getLoanMatches(): Promise<Opportunity[]> {
  const data = await authenticatedFetch("/api/loans");
  return data.loans || [];
}

export async function getGrantMatches(): Promise<Opportunity[]> {
  const data = await authenticatedFetch("/api/grants");
  return data.grants || [];
}

export async function getInvestorMatches(): Promise<Opportunity[]> {
  const data = await authenticatedFetch("/api/investors");
  return data.investors || [];
}

export async function getProfile(): Promise<BusinessProfile> {
  const data = await authenticatedFetch("/api/profile");
  if (!data.profile) throw new Error("Please complete your business profile before viewing recommendations.");
  return data.profile;
}

export async function getStrategy() {
  return authenticatedFetch("/api/ai/strategy") as Promise<{
    strategy: string;
    profile: BusinessProfile;
    matches: Opportunity[];
  }>;
}

export async function getDocuments(): Promise<{ documents: DocumentItem[]; profile: BusinessProfile | null }> {
  const data = await authenticatedFetch("/api/documents");
  return { documents: data.documents || [], profile: data.profile || null };
}

export async function uploadDocument(file: File): Promise<DocumentItem> {
  const token = localStorage.getItem("fundbridge_token");
  if (!token) throw new Error("You are not logged in.");

  const formData = new FormData();
  formData.append("document", file);

  const response = await fetch(`${API_URL}/api/documents/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Upload failed");
  return data.document;
}

export async function deleteDocument(id: string | number): Promise<void> {
  await authenticatedFetch(`/api/documents/${id}`, { method: "DELETE" });
}

export function opportunityCategory(opportunity: Opportunity) {
  const value = `${opportunity.type} ${opportunity.title} ${opportunity.description}`.toLowerCase();
  if (value.includes("grant") || value.includes("government program")) return "grant";
  if (value.includes("loan") || value.includes("finance") || value.includes("credit")) return "loan";
  return "investor";
}

export function formatAmount(minAmount: number | null, maxAmount: number | null) {
  const format = (value: number) =>
    value >= 10000000
      ? `₹${(value / 10000000).toFixed(1)} Cr`
      : value >= 100000
      ? `₹${(value / 100000).toFixed(1)} L`
      : `₹${value.toLocaleString("en-IN")}`;
  if (minAmount != null && maxAmount != null) return `${format(minAmount)} – ${format(maxAmount)}`;
  if (maxAmount != null) return `Up to ${format(maxAmount)}`;
  if (minAmount != null) return `From ${format(minAmount)}`;
  return "Amount not listed";
}

export function formatDate(deadline: string | null) {
  return deadline ? new Date(deadline).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Not listed";
}
