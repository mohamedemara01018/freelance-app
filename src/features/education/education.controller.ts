import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Education } from "./education.model.js";
import { appError } from "../../utils/appError.utils.js";
import asyncWrapper from "../../utils/asyncWrapper.utils.js";
import { statusText } from "../../utils/enums.utils.js";

// ==========================================
// 1. GET ALL EDUCATIONS (Optionally by Profile)
// ==========================================
export const getAllEducations = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const profileId = req.query.profileId as string | undefined;

        const filter = profileId ? { profile: profileId } : {};

        const educations = await Education.find(filter).populate("profile", "title user");

        res.status(StatusCodes.OK).json({
            message: "educations returned successfully",
            data: {
                educations,
            },
        });
    }
);

// ==========================================
// 2. CREATE EDUCATION
// ==========================================
export const createEducation = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            profile,
            school,
            degree,
            fieldOfStudy,
            startYear,
            endYear,
            description,
        } = req.body;

        if (!profile || !school) {
            return next(
                appError({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "profile and school fields are required",
                    statusText: statusText.FAIL,
                })
            );
        }

        const newEducation = await Education.create({
            profile,
            school,
            degree,
            fieldOfStudy,
            startYear,
            endYear,
            description,
        });

        res.status(StatusCodes.CREATED).json({
            message: "Education added successfully",
            data: {
                education: newEducation,
            },
        });
    }
);

// ==========================================
// 3. EDIT EDUCATION
// ==========================================
export const editEducation = asyncWrapper(
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

        const updatedEducation = await Education.findByIdAndUpdate(
            id,
            { $set: body },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedEducation) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Education entry not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            message: "Education updated successfully",
            data: {
                education: updatedEducation,
            },
        });
    }
);

// ==========================================
// 4. DELETE EDUCATION
// ==========================================
export const deleteEducation = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const deletedEducation = await Education.findByIdAndDelete(id);

        if (!deletedEducation) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Education entry not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            status: statusText.SUCCESS,
            message: "Education deleted successfully",
            data: null,
        });
    }
);