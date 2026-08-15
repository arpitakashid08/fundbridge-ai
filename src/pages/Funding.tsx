import FeaturePage from "../components/FeaturePage";

export default function Funding() {
  return (
    <FeaturePage
      eyebrow="FUNDING WORKSPACE"
      title="Your path to capital."
      description="Manage your funding strategy, shortlisted opportunities and active capital conversations from one place."
      stats={[
        {
          label: "Funding target",
          value: "₹1Cr",
        },
        {
          label: "Shortlisted",
          value: "07",
        },
        {
          label: "Active",
          value: "04",
        },
        {
          label: "Progress",
          value: "62%",
        },
      ]}
      opportunities={[
        {
          name: "Startup India Seed Fund",
          type: "Grant",
          amount: "₹20L",
          match: 95,
          description: "Currently shortlisted for your funding strategy.",
        },
        {
          name: "SIDBI Make in India",
          type: "Loan",
          amount: "₹5Cr",
          match: 90,
          description: "Potential debt financing for your next growth stage.",
        },
        {
          name: "Matrix Partners India",
          type: "Investor",
          amount: "₹5Cr",
          match: 88,
          description: "Potential equity partner for your growth plans.",
        },
      ]}
    />
  );
}