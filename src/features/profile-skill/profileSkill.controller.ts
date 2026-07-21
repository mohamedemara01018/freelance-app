import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { appError } from "../../utils/appError.utils.js";
import asyncWrapper from "../../utils/asyncWrapper.utils.js";
import { statusText } from "../../utils/enums.utils.js";
import ProfileSkill from "./profileSkill.model.js";

// ==========================================
// 1. GET PROFILE SKILLS (By Profile ID or Skill ID)
// ==========================================
export const getProfileSkills = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { profileId, skillId, level, isPrimary } = req.query;

        const filter: Record<string, any> = {};

        if (profileId) filter.profile = profileId;
        if (skillId) filter.skill = skillId;
        if (level) filter.level = level;
        if (isPrimary !== undefined) filter.isPrimary = isPrimary === "true";

        const profileSkills = await ProfileSkill.find(filter)
            .populate("profile", "title user")
            .populate("skill", "name slug category icon");

        res.status(StatusCodes.OK).json({
            message: "Profile skills returned successfully",
            data: {
                profileSkills,
            },
        });
    }
);

// ==========================================
// 2. GET SINGLE PROFILE SKILL BY ID
// ==========================================
export const getProfileSkillById = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const profileSkill = await ProfileSkill.findById(id)
            .populate("profile", "title user")
            .populate("skill", "name slug category icon");

        if (!profileSkill) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Profile skill not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            message: "Profile skill returned successfully",
            data: {
                profileSkill,
            },
        });
    }
);

// ==========================================
// 3. ADD SKILL TO PROFILE
// ==========================================
export const createProfileSkill = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            profile,
            skill,
            level,
            yearsOfExperience,
            isPrimary,
            verified,
        } = req.body;

        if (!profile || !skill) {
            return next(
                appError({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "profile and skill fields are required",
                    statusText: statusText.FAIL,
                })
            );
        }

        // Check if the skill is already attached to this profile
        const existingProfileSkill = await ProfileSkill.findOne({ profile, skill });
        if (existingProfileSkill) {
            return next(
                appError({
                    statusCode: StatusCodes.CONFLICT,
                    message: "This skill is already added to the specified profile",
                    statusText: statusText.FAIL,
                })
            );
        }

        const newProfileSkill = await ProfileSkill.create({
            profile,
            skill,
            level,
            yearsOfExperience,
            isPrimary,
        });

        // Populate skill details in response for convenience
        await newProfileSkill.populate("skill", "name slug category icon");

        res.status(StatusCodes.CREATED).json({
            message: "Skill added to profile successfully",
            data: {
                profileSkill: newProfileSkill,
            },
        });
    }
);

// ==========================================
// 4. EDIT PROFILE SKILL
// ==========================================
export const editProfileSkill = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return next(
                appError({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "Request body cannot be empty",
                    statusText: statusText.FAIL,
                })
            );
        }

        const updatedProfileSkill = await ProfileSkill.findByIdAndUpdate(
            id,
            { $set: body },
            {
                new: true,
                runValidators: true,
            }
        ).populate("skill", "name slug category icon");

        if (!updatedProfileSkill) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Profile skill entry not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            message: "Profile skill updated successfully",
            data: {
                profileSkill: updatedProfileSkill,
            },
        });
    }
);

// ==========================================
// 5. REMOVE SKILL FROM PROFILE
// ==========================================
export const deleteProfileSkill = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const deletedProfileSkill = await ProfileSkill.findByIdAndDelete(id);

        if (!deletedProfileSkill) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Profile skill entry not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            status: statusText.SUCCESS,
            message: "Skill removed from profile successfully",
            data: null,
        });
    }
);