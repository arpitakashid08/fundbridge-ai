import "dotenv/config";
import prisma from "../src/config/prisma.js";

async function main() {
  await prisma.fundingOpportunity.deleteMany();

  await prisma.fundingOpportunity.createMany({
    data: [
      {
        title: "Startup India Seed Fund",
        type: "Government Grant",
        provider: "Government of India",
        description:
          "Financial assistance to early-stage startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
        location: "India",
        minAmount: 2000000,
        maxAmount: 5000000,
        website: "https://www.startupindia.gov.in/",
      },
      {
        title: "RKVY-RAFTAAR Agri-Startup Grant",
        type: "Government Grant",
        provider: "Ministry of Agriculture & Farmers Welfare",
        description:
          "Grant-in-aid and incubation support for agri-tech startups building innovative machinery, post-harvest tools, and farm tech solutions.",
        location: "India",
        minAmount: 500000,
        maxAmount: 2500000,
        website: "https://rkvy.nic.in/",
      },
      {
        title: "NABARD Agri-Business Incubation Fund",
        type: "Government Grant",
        provider: "NABARD",
        description:
          "Catalytic capital and grant assistance for rural, agriculture, and farm machinery initiatives focused on empowering smallholder farmers.",
        location: "India",
        minAmount: 1000000,
        maxAmount: 5000000,
        website: "https://www.nabard.org/",
      },
      {
        title: "Ayush & Healthcare Innovation Grant",
        type: "Grant",
        provider: "Ministry of Ayush & Health Tech Council",
        description:
          "Seed grants for healthcare diagnostics, medical devices, bio-tech prototypes, and digital health applications.",
        location: "India",
        minAmount: 1500000,
        maxAmount: 4000000,
        website: "https://www.ayush.gov.in/",
      },
      {
        title: "BIRAC SPARSH Social Innovation Grant",
        type: "Government Grant",
        provider: "Biotechnology Industry Research Assistance Council",
        description:
          "Grant funding for affordable health solutions, biotech inventions, and medical diagnostic platforms targeting underserved regions.",
        location: "India",
        minAmount: 2000000,
        maxAmount: 5000000,
        website: "https://birac.nic.in/",
      },
      {
        title: "SIDBI Startup Assistance Scheme",
        type: "Business Loan",
        provider: "Small Industries Development Bank of India",
        description:
          "Concessional term loans and debt capital for established or revenue-generating startups requiring expansion funding.",
        location: "India",
        minAmount: 2500000,
        maxAmount: 15000000,
        website: "https://www.sidbi.in/",
      },
      {
        title: "CGTMSE Credit Guarantee Scheme for MSME",
        type: "Business Loan",
        provider: "Ministry of MSME & SIDBI",
        description:
          "Collateral-free credit and working capital term loans for small and medium manufacturing enterprises with active operations.",
        location: "India",
        minAmount: 1000000,
        maxAmount: 20000000,
        website: "https://www.cgtmse.in/",
      },
      {
        title: "MeitY SAMRIDH Scheme",
        type: "Government Program",
        provider: "Ministry of Electronics & IT",
        description:
          "Accelerator startup funding and mentorship matching for software, deep-tech, and AI product companies with early validation.",
        location: "India",
        minAmount: 1500000,
        maxAmount: 4000000,
        website: "https://www.meity.gov.in/",
      },
      {
        title: "AgriTech Venture Fund",
        type: "Investor Funding",
        provider: "Bharat Innovation Fund",
        description:
          "Early-stage venture capital investment for hardware, smart farm machinery, and supply chain technologies in tier-2/3 India.",
        location: "India",
        minAmount: 5000000,
        maxAmount: 25000000,
        website: "https://bharatfund.in/",
      },
      {
        title: "HealthTech Angels & Seed Network",
        type: "Investor Funding",
        provider: "Indian Angel Network Healthcare Consortium",
        description:
          "Seed and Pre-Series A equity funding for validated healthcare AI, clinical devices, and digital therapeutics startups.",
        location: "India",
        minAmount: 3000000,
        maxAmount: 15000000,
        website: "https://www.indianangelnetwork.com/",
      },
      {
        title: "MSME Technology Upgradation Grant",
        type: "Government Grant",
        provider: "Ministry of Micro, Small & Medium Enterprises",
        description:
          "Capital subsidy and grant program for acquiring modern tools, testing equipment, and automation technology for manufacturing.",
        location: "India",
        minAmount: 1000000,
        maxAmount: 10000000,
        website: "https://msme.gov.in/",
      },
      {
        title: "Venture Growth & Expansion Capital",
        type: "Investor Funding",
        provider: "Sequoia Surge & Nexus Venture Partners",
        description:
          "Growth capital and Series A equity investments for high-scale technology, health, and clean energy startups with solid unit economics.",
        location: "India",
        minAmount: 10000000,
        maxAmount: 50000000,
        website: "https://www.surgeahead.com/",
      },
    ],
  });

  console.log("Funding opportunities seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });