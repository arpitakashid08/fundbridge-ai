import type { Request, Response } from "express";

import {
  getPersonalizedFundingData,
} from "../services/matching.service.js";

export async function getFundingMatches(
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
          "Please complete your business profile before finding funding matches.",
      });
    }

    return res.status(200).json({
      matches: data.matches,
      profile: {
        industry: data.profile.industry,
        location: data.profile.location,
        businessStage:
          data.profile.businessStage,
        revenue: data.profile.revenue,
        fundingRequirement:
          data.profile.fundingRequirement,
        employees: data.profile.employees,
        description: data.profile.description,
      },
    });
  } catch (error) {
    console.error(
      "FUNDING MATCH ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to generate funding matches.",
    });
  }
}
