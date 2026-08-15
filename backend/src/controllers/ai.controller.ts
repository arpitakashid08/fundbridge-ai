import type { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { askAI } from "../services/ai.service.js";
import { getPersonalizedFundingData } from "../services/matching.service.js";

function safeOpportunityContext(matches: any[]) {
  return matches.map(
    ({
      id,
      title,
      provider,
      type,
      minAmount,
      maxAmount,
      deadline,
      website,
      description,
      location,
      matchScore,
      matchReason,
    }) => ({
      id,
      title,
      provider,
      type,
      minAmount,
      maxAmount,
      deadline,
      website,
      description,
      location,
      matchScore,
      matchReason,
    })
  );
}

function generateFallbackStrategy(profile: any, matches: any[]): string {
  const reqFormatted = profile.fundingRequirement
    ? `₹${(profile.fundingRequirement / 100000).toFixed(1)} Lakh`
    : "Not specified";
  const revFormatted = profile.revenue
    ? `₹${(profile.revenue / 100000).toFixed(1)} Lakh`
    : "₹0 (Idea/Pre-revenue)";
  const top3 = matches.slice(0, 3);
  const topNames = top3.map((m) => m.title).join(", ");

  return `### A. Current Funding Position
Your business operating in the ${profile.industry || "specified"} sector at ${profile.location || "India"} is currently in the **${profile.businessStage || "Idea"}** stage. Annual revenue is recorded at ${revFormatted} with an active funding requirement of **${reqFormatted}** across ${profile.employees || "small"} team members.

### B. Recommended Funding Route
For an **${profile.businessStage || "Idea"}** stage business in ${profile.industry || "this sector"}, non-dilutive government grants and early incubation seed programs represent the highest probability capital path. Debt financing should be deferred until consistent cash flows are established.

### C. Top Funding Options
${top3.map((m, i) => `${i + 1}. **${m.title}** (${m.type}) - Match Score: ${m.matchScore}%`).join("\n")}

### D. Why Each Option Fits
${top3.map((m) => `- **${m.title}**: ${m.matchReason}`).join("\n")}

### E. What the Business Should Prepare
- Detailed business plan emphasizing market validation in ${profile.location || "your target region"}.
- Financial projections matching your ${reqFormatted} capital ask.
- Product/service specification and team background.

### F. Recommended Documents
- Business Registration & PAN/Tax compliance documents.
- Pitch deck highlighting ${profile.industry} domain expertise.
- 12-month milestone execution budget.

### G. Suggested Funding Sequence
1. Apply first to non-dilutive grants (**${top3[0]?.title || "Government Grant"}**).
2. Complete incubator/accelerator proof-of-concept requirements.
3. Approach angel investors for growth capital once prototype milestones are reached.

### H. Risks / Gaps
- Stage mismatch if applying for commercial loans without revenue history.
- Ensure all technical documentation for ${profile.description || "the business concept"} is complete before submitting formal applications.

### I. Next 30 Days
1. Finalize pitch deck and financial projection models.
2. Submit applications for top matches (${topNames}).
3. Gather compliance and incorporation documents.

### J. What to Avoid
- Avoid taking on high-interest commercial debt at the ${profile.businessStage || "Idea"} stage.
- Do not apply for growth-stage equity funds until traction metrics are ready.`;
}

function generateFallbackAnswer(prompt: string, profile: any, matches: any[]): string {
  const topMatch = matches[0];
  const reqFormatted = profile.fundingRequirement
    ? `₹${(profile.fundingRequirement / 100000).toFixed(1)} Lakh`
    : "your requested amount";

  return `Based on your ${profile.industry || "business"} profile at the ${profile.businessStage || "current"} stage in ${profile.location || "India"}:

For your question ("${prompt}"), your top recommended funding opportunity is **${topMatch ? topMatch.title : "Startup India Seed Fund"}** (${topMatch ? topMatch.provider : "Government"}), matching ${topMatch ? topMatch.matchScore : 85}% with your ${reqFormatted} requirement.

${topMatch ? topMatch.matchReason : "Focus on grant programs and seed funds suitable for your business stage."}

We recommend preparing your core business plan and financial projections to initiate applications.`;
}

export async function askFundBridgeAI(
  req: Request,
  res: Response
) {
  try {
    const userId = req.userId;
    const { prompt } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        message: "Prompt is required.",
      });
    }

    const data =
      await getPersonalizedFundingData(userId);

    if (!data) {
      return res.status(400).json({
        message:
          "Please complete your business profile before using the AI assistant.",
      });
    }

    const context = safeOpportunityContext(
      data.matches.slice(0, 8)
    );

    let answer: string;
    try {
      answer = await askAI([
        {
          role: "system",
          content: `
You are FundBridge AI.

You provide personalized funding guidance.

You MUST base your answer on the user's actual business profile and the real funding opportunities supplied in the context.

Never invent:
- funding opportunities
- providers
- amounts
- deadlines
- URLs
- eligibility requirements
- government schemes
- investors
- financial terms

If something is unknown, say that it needs verification.

Use the user's:
- industry
- location
- business stage
- revenue
- funding requirement
- employees
- business description

to personalize the answer.

Be practical and concise.
`,
        },
        {
          role: "user",
          content: `
BUSINESS PROFILE:

${JSON.stringify(data.profile, null, 2)}

PERSONALIZED FUNDING MATCHES:

${JSON.stringify(context, null, 2)}

USER QUESTION:

${prompt}
`,
        },
      ]);
    } catch (aiErr) {
      console.log("Ollama call failed for AI Assistant chat — generating dynamic profile answer.");
      answer = generateFallbackAnswer(prompt, data.profile, data.matches);
    }

    return res.status(200).json({
      answer,
      profile: data.profile,
      matches: data.matches.slice(0, 8),
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return res.status(500).json({
      message: "Unable to process AI assistant request.",
    });
  }
}

export async function getFundingStrategy(
  req: Request,
  res: Response
) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const data =
      await getPersonalizedFundingData(userId);

    if (!data) {
      return res.status(400).json({
        message:
          "Please complete your business profile before generating a funding strategy.",
      });
    }

    const matches = data.matches.slice(0, 8);

    let strategy: string;
    try {
      strategy = await askAI([
        {
          role: "system",
          content: `
You are the FundBridge AI Funding Strategist.

Create a funding strategy specifically for THIS business.

Use only the supplied business profile and real funding opportunities.

Your response MUST change depending on:
- industry
- location
- business stage
- revenue
- funding requirement
- employees
- description
- actual opportunity matches

Do not give generic startup advice.
Do not invent opportunities.
Do not claim eligibility.

Structure the response:
1. Funding position
2. Recommended funding route
3. Best potential matches
4. Why they fit this business
5. Preparation required
6. Recommended sequence
7. Risks / gaps
8. Next 30 days
9. What to avoid

Be concise and practical.
`,
        },
        {
          role: "user",
          content: `
BUSINESS PROFILE:

${JSON.stringify(data.profile, null, 2)}

REAL PERSONALIZED FUNDING MATCHES:

${JSON.stringify(
  safeOpportunityContext(matches),
  null,
  2
)}
`,
        },
      ]);
    } catch (aiErr) {
      console.log("Ollama call failed for AI Strategy — generating dynamic profile strategy.");
      strategy = generateFallbackStrategy(data.profile, matches);
    }

    return res.status(200).json({
      strategy,
      profile: data.profile,
      matches,
    });
  } catch (error) {
    console.error(
      "AI STRATEGY ERROR:",
      error
    );

    return res.status(500).json({
      message: "Unable to generate funding strategy.",
    });
  }
}

