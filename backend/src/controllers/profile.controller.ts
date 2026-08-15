import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export async function getProfile(req: Request, res: Response) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const profile = await prisma.businessProfile.findUnique({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
      },
      profile,
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Unable to load profile.",
    });
  }
}

export async function saveProfile(req: Request, res: Response) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const {
      business,
      industry,
      location,
      stage,
      revenue,
      requirement,
      employees,
      description,
    } = req.body;

    if (
      !business?.trim() ||
      !industry?.trim() ||
      !location?.trim() ||
      !stage?.trim()
    ) {
      return res.status(400).json({
        message: "Please complete the required business information.",
      });
    }

    const revenueNumber =
      revenue === "" ||
      revenue === undefined ||
      revenue === null
        ? null
        : Number(revenue);

    const requirementNumber =
      requirement === "" ||
      requirement === undefined ||
      requirement === null
        ? null
        : Number(requirement);

    const employeesNumber =
      employees === "" ||
      employees === undefined ||
      employees === null
        ? null
        : Number(employees);

    if (
      (revenueNumber !== null && !Number.isFinite(revenueNumber)) ||
      (requirementNumber !== null &&
        !Number.isFinite(requirementNumber)) ||
      (employeesNumber !== null &&
        !Number.isFinite(employeesNumber))
    ) {
      return res.status(400).json({
        message:
          "Revenue, funding requirement and employees must be valid numbers.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        company: business.trim(),
      },
    });

    const profile = await prisma.businessProfile.upsert({
      where: {
        userId: userId,
      },

      update: {
        industry: industry.trim(),
        location: location.trim(),
        businessStage: stage.trim(),
        revenue: revenueNumber,
        fundingRequirement: requirementNumber,
        employees: employeesNumber,
        description:
          typeof description === "string" &&
          description.trim()
            ? description.trim()
            : null,
      },

      create: {
        userId: userId,
        industry: industry.trim(),
        location: location.trim(),
        businessStage: stage.trim(),
        revenue: revenueNumber,
        fundingRequirement: requirementNumber,
        employees: employeesNumber,
        description:
          typeof description === "string" &&
          description.trim()
            ? description.trim()
            : null,
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return res.status(200).json({
      message: "Business profile saved successfully.",

      user: {
        id: updatedUser?.id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        company: updatedUser?.company,
      },

      profile,
    });
  } catch (error) {
    console.error("SAVE PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Unable to save profile.",
    });
  }
}
