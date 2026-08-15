import type { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { rankGrantMatches } from "../services/matching.service.js";

export async function getGrantMatches(
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

    const profile = await prisma.businessProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(400).json({
        message:
          "Please complete your business profile before viewing grants.",
      });
    }

    const opportunities =
      await prisma.fundingOpportunity.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    const grants = await rankGrantMatches(
      profile,
      opportunities
    );

    return res.status(200).json({
      grants,
      profile,
    });
  } catch (error) {
    console.error("GRANTS ERROR:", error);

    return res.status(500).json({
      message: "Unable to load personalized grants.",
    });
  }
}