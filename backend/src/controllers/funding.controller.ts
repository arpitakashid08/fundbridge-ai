import type { Request, Response } from "express";
import prisma from "../config/prisma.js";
import {
  rankFundingMatches,
} from "../services/matching.service.js";

export async function getFundingOpportunities(
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

    const profile =
      await prisma.businessProfile.findUnique({
        where: { userId },
      });

    if (!profile) {
      return res.status(400).json({
        message:
          "Please complete your business profile before discovering funding.",
      });
    }

    const opportunities =
      await prisma.fundingOpportunity.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    if (opportunities.length === 0) {
      return res.status(200).json({
        opportunities: [],
        matches: [],
        message:
          "No funding opportunities are currently available.",
      });
    }

    const matches =
      await rankFundingMatches(
        profile,
        opportunities
      );

    return res.status(200).json({
      opportunities: matches,
      matches,
      profile: {
        industry: profile.industry,
        location: profile.location,
        businessStage: profile.businessStage,
        revenue: profile.revenue,
        fundingRequirement:
          profile.fundingRequirement,
        employees: profile.employees,
        description: profile.description,
      },
    });
  } catch (error) {
    console.error(
      "FUNDING DISCOVERY ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to load personalized funding opportunities.",
    });
  }
}
