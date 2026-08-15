import type {
  BusinessProfile,
  FundingOpportunity,
} from "@prisma/client";

import prisma from "../config/prisma.js";

type Profile = BusinessProfile;
type Opportunity = FundingOpportunity;

export type RankedOpportunity = Opportunity & {
  matchScore: number;
  matchReason: string;
};

function normalize(
  value: string | null | undefined
): string {
  return (value || "").toLowerCase().trim();
}

function tokens(value: string): string[] {
  return normalize(value)
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 3);
}

const INDUSTRY_GROUPS: string[][] = [
  [
    "healthcare",
    "health",
    "healthtech",
    "medical",
    "medical device",
    "medical devices",
    "hospital",
    "hospitals",
    "clinical",
    "pharma",
    "pharmaceutical",
    "biotech",
    "biotechnology",
    "diagnostics",
    "digital health",
    "medtech",
  ],
  [
    "agriculture",
    "agri",
    "agritech",
    "farming",
    "farm",
    "farmer",
    "farmers",
    "agricultural",
    "foodtech",
    "precision agriculture",
    "agro",
  ],
  [
    "technology",
    "tech",
    "software",
    "saas",
    "information technology",
    "it",
    "ai",
    "artificial intelligence",
    "machine learning",
    "deeptech",
    "digital",
  ],
  [
    "fintech",
    "finance",
    "financial technology",
    "banking",
    "payments",
    "insurtech",
    "lending",
  ],
  [
    "education",
    "edtech",
    "e-learning",
    "learning",
    "training",
  ],
  [
    "energy",
    "cleantech",
    "clean energy",
    "renewable",
    "solar",
    "electric vehicle",
    "ev",
    "climate",
    "sustainability",
  ],
  [
    "manufacturing",
    "industrial",
    "machinery",
    "engineering",
    "hardware",
    "factory",
  ],
  [
    "retail",
    "ecommerce",
    "e-commerce",
    "consumer",
    "shopping",
    "commerce",
  ],
  [
    "logistics",
    "transportation",
    "mobility",
    "supply chain",
    "delivery",
  ],
];

function findIndustryGroup(
  industry: string
): string[] {
  const normalized = normalize(industry);

  if (!normalized) {
    return [];
  }

  for (const group of INDUSTRY_GROUPS) {
    const matched = group.some(
      (term) =>
        normalized === term ||
        normalized.includes(term) ||
        term.includes(normalized)
    );

    if (matched) {
      return group;
    }
  }

  return [normalized];
}

function getOpportunityText(
  opportunity: Opportunity
): string {
  return normalize(
    [
      opportunity.title,
      opportunity.type,
      opportunity.provider,
      opportunity.description,
      opportunity.location,
    ].join(" ")
  );
}

function isGrant(
  opportunity: Opportunity
): boolean {
  const text = normalize(
    `${opportunity.type} ${opportunity.title} ${opportunity.description}`
  );

  return (
    text.includes("grant") ||
    text.includes("government grant") ||
    text.includes("seed fund") ||
    text.includes("non-dilutive")
  );
}

function isLoan(
  opportunity: Opportunity
): boolean {
  const text = normalize(
    `${opportunity.type} ${opportunity.title} ${opportunity.description}`
  );

  return (
    text.includes("loan") ||
    text.includes("credit") ||
    text.includes("lending") ||
    text.includes("debt")
  );
}

function isInvestor(
  opportunity: Opportunity
): boolean {
  const text = normalize(
    `${opportunity.type} ${opportunity.title} ${opportunity.description}`
  );

  return (
    text.includes("investor") ||
    text.includes("investment") ||
    text.includes("venture capital") ||
    text.includes("venture") ||
    text.includes("equity") ||
    text.includes("angel investor") ||
    text.includes("angel")
  );
}

function isIndustryRelevant(
  profile: Profile,
  opportunity: Opportunity
): boolean {
  const industry = normalize(
    profile.industry
  );

  if (!industry) {
    return true;
  }

  const opportunityText =
    getOpportunityText(opportunity);

  const group =
    findIndustryGroup(industry);

  if (
    opportunityText.includes(industry)
  ) {
    return true;
  }

  if (
    group.some((term) =>
      opportunityText.includes(term)
    )
  ) {
    return true;
  }

  const allSectorTerms =
    INDUSTRY_GROUPS.flat();

  const mentionsAnotherSector =
    allSectorTerms.some(
      (term) =>
        !group.includes(term) &&
        opportunityText.includes(term)
    );

  if (mentionsAnotherSector) {
    return false;
  }

  const genericTerms = [
    "startup",
    "startups",
    "business",
    "entrepreneur",
    "entrepreneurship",
    "innovation",
    "seed",
    "government",
    "funding",
    "financial assistance",
    "growth",
    "small business",
    "msme",
  ];

  const hasGenericSignal =
    genericTerms.some((term) =>
      opportunityText.includes(term)
    );

  if (
    hasGenericSignal &&
    !mentionsAnotherSector
  ) {
    return true;
  }

  return false;
}

function calculateBaseScore(
  profile: Profile,
  opportunity: Opportunity
): number {
  let score = 0;

  const industry =
    normalize(profile.industry);

  const location =
    normalize(profile.location);

  const stage =
    normalize(profile.businessStage);

  const description =
    normalize(profile.description);

  const opportunityText =
    getOpportunityText(opportunity);

  if (industry) {
    if (
      opportunityText.includes(industry)
    ) {
      score += 35;
    } else {
      const group =
        findIndustryGroup(industry);

      if (
        group.some((term) =>
          opportunityText.includes(term)
        )
      ) {
        score += 25;
      }
    }
  }

  if (
    profile.fundingRequirement != null
  ) {
    const requirement =
      profile.fundingRequirement;

    const min =
      opportunity.minAmount;

    const max =
      opportunity.maxAmount;

    if (
      min != null &&
      max != null &&
      requirement >= min &&
      requirement <= max
    ) {
      score += 25;
    } else if (
      max != null &&
      requirement <= max
    ) {
      score += 15;
    } else if (
      min != null &&
      requirement >= min
    ) {
      score += 10;
    }
  }

  if (stage) {
    const isIdea =
      stage.includes("idea") ||
      stage.includes("pre-seed");

    const isEarly =
      stage.includes("early") ||
      stage.includes("seed");

    const isGrowth =
      stage.includes("growth") ||
      stage.includes("scale") ||
      stage.includes("scaling");

    if (
      isIdea &&
      (
        opportunityText.includes(
          "idea"
        ) ||
        opportunityText.includes(
          "seed"
        ) ||
        opportunityText.includes(
          "early"
        ) ||
        opportunityText.includes(
          "startup"
        )
      )
    ) {
      score += 15;
    } else if (
      isEarly &&
      (
        opportunityText.includes(
          "early"
        ) ||
        opportunityText.includes(
          "seed"
        ) ||
        opportunityText.includes(
          "startup"
        )
      )
    ) {
      score += 15;
    } else if (
      isGrowth &&
      (
        opportunityText.includes(
          "growth"
        ) ||
        opportunityText.includes(
          "scale"
        ) ||
        opportunityText.includes(
          "scaling"
        )
      )
    ) {
      score += 15;
    } else if (
      opportunityText.includes(
        "startup"
      ) ||
      opportunityText.includes(
        "business"
      )
    ) {
      score += 5;
    }
  }

  if (
    location &&
    opportunity.location
  ) {
    const opportunityLocation =
      normalize(
        opportunity.location
      );

    if (
      opportunityLocation.includes(
        location
      ) ||
      location.includes(
        opportunityLocation
      )
    ) {
      score += 10;
    } else if (
      opportunityLocation.includes(
        "india"
      )
    ) {
      score += 10;
    }
  }

  if (description) {
    const descriptionTokens =
      tokens(description);

    const matchingTokens =
      descriptionTokens.filter(
        (token) =>
          opportunityText.includes(
            token
          )
      );

    if (
      matchingTokens.length >= 3
    ) {
      score += 10;
    } else if (
      matchingTokens.length >= 1
    ) {
      score += 5;
    }
  }

  return Math.min(score, 100);
}

function opportunityTextForStage(
  opportunity: Opportunity
): string {
  return normalize(
    [
      opportunity.title,
      opportunity.type,
      opportunity.description,
    ].join(" ")
  );
}

function localReason(
  profile: Profile,
  opportunity: Opportunity,
  score: number
): string {
  const industry =
    profile.industry ||
    "your industry";

  const stage =
    profile.businessStage ||
    "your current stage";

  const requirement =
    profile.fundingRequirement;

  const amountText =
    requirement != null
      ? `₹${requirement.toLocaleString(
          "en-IN"
        )}`
      : "your requested amount";

  const reasons: string[] = [];

  if (
    isIndustryRelevant(
      profile,
      opportunity
    )
  ) {
    reasons.push(
      `relevant to ${industry}`
    );
  }

  if (
    requirement != null &&
    opportunity.minAmount != null &&
    opportunity.maxAmount != null &&
    requirement >=
      opportunity.minAmount &&
    requirement <=
      opportunity.maxAmount
  ) {
    reasons.push(
      `your ${amountText} requirement fits the stated funding range`
    );
  }

  if (
    profile.location &&
    opportunity.location
  ) {
    const profileLocation =
      normalize(profile.location);

    const opportunityLocation =
      normalize(
        opportunity.location
      );

    if (
      opportunityLocation.includes(
        profileLocation
      ) ||
      profileLocation.includes(
        opportunityLocation
      )
    ) {
      reasons.push(
        `the location aligns with ${profile.location}`
      );
    } else if (
      opportunityLocation.includes(
        "india"
      )
    ) {
      reasons.push(
        "the opportunity is available in India"
      );
    }
  }

  if (
    stage.includes("idea") ||
    stage.includes("pre-seed") ||
    stage.includes("early")
  ) {
    const stageText =
      opportunityTextForStage(
        opportunity
      );

    if (
      stageText.includes("grant") ||
      stageText.includes("seed") ||
      stageText.includes("startup") ||
      stageText.includes("early")
    ) {
      reasons.push(
        "the opportunity can support an early-stage business"
      );
    }
  }

  if (reasons.length === 0) {
    return "Potential match based on the available business profile information.";
  }

  if (score >= 75) {
    return `Strong match: ${reasons.join(
      "; "
    )}.`;
  }

  if (score >= 50) {
    return `Good potential match: ${reasons.join(
      "; "
    )}.`;
  }

  return `Lower-priority match: ${reasons.join(
    "; "
  )}.`;
}

export async function rankFundingMatches(
  profile: Profile,
  opportunities: Opportunity[]
): Promise<RankedOpportunity[]> {
  const ranked: RankedOpportunity[] = [];

  for (const opportunity of opportunities) {
    if (
      !isIndustryRelevant(
        profile,
        opportunity
      )
    ) {
      continue;
    }

    const score =
      calculateBaseScore(
        profile,
        opportunity
      );

    const matchReason =
      localReason(
        profile,
        opportunity,
        score
      );

    ranked.push({
      ...opportunity,
      matchScore: score,
      matchReason,
    });
  }

  ranked.sort(
    (a, b) =>
      b.matchScore -
      a.matchScore
  );

  return ranked;
}

export async function rankGrantMatches(
  profile: Profile,
  opportunities: Opportunity[]
): Promise<RankedOpportunity[]> {
  const grants =
    opportunities.filter(
      (opportunity) =>
        isGrant(opportunity)
    );

  return rankFundingMatches(
    profile,
    grants
  );
}

export async function rankLoanMatches(
  profile: Profile,
  opportunities: Opportunity[]
): Promise<RankedOpportunity[]> {
  // Loans remain ranked even when they are not a sector-perfect match.
  const loans = opportunities.filter(
    (opportunity) => isLoan(opportunity)
  );

  if (loans.length === 0) {
    return [];
  }

  const ranked: RankedOpportunity[] = loans.map(
    (opportunity) => {
      const score = calculateBaseScore(
        profile,
        opportunity
      );

      return {
        ...opportunity,
        matchScore: score,
        matchReason: localReason(
          profile,
          opportunity,
          score
        ),
      };
    }
  );

  ranked.sort(
    (a, b) =>
      b.matchScore - a.matchScore
  );

  return ranked;
}
     

export async function rankInvestorMatches(
  profile: Profile,
  opportunities: Opportunity[]
): Promise<RankedOpportunity[]> {
  const investors =
    opportunities.filter(
      (opportunity) =>
        isInvestor(opportunity)
    );

  return rankFundingMatches(
    profile,
    investors
  );
}

export async function getPersonalizedFundingData(
  userId: string
) {
  const profile =
    await prisma.businessProfile.findUnique({
      where: {
        userId,
      },
    });

  if (!profile) {
    throw new Error(
      "Business profile not found. Please complete your business profile first."
    );
  }

  const opportunities =
    await prisma.fundingOpportunity.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  const matches =
    await rankFundingMatches(
      profile,
      opportunities
    );

  const grants =
    matches.filter(
      (item) =>
        isGrant(item)
    );

  const loans = await rankLoanMatches(
  profile,
  opportunities
);

  const investors =
    matches.filter(
      (item) =>
        isInvestor(item)
    );

  return {
    profile,
    matches,
    grants,
    loans,
    investors,
  };
}

