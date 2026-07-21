import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Certification } from "./certification.model.js";
import { appError } from "../../utils/appError.utils.js";
import asyncWrapper from "../../utils/asyncWrapper.utils.js";
import { statusText } from "../../utils/enums.utils.js";

// ==========================================
// 1. GET ALL CERTIFICATIONS (Optionally by Profile)
// ==========================================
export const getAllCertifications = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const profileId = req.query.profileId as string | undefined;

        const filter = profileId ? { profile: profileId } : {};

        const certifications = await Certification.find(filter).populate("profile", "title user");

        res.status(StatusCodes.OK).json({
            message: "certifications returned successfully",
            data: {
                certifications,
            },
        });
    }
);

// ==========================================
// 2. CREATE CERTIFICATION
// ==========================================
export const createCertification = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            profile,
            name,
            issuer,
            issueDate,
            expirationDate,
            credentialId,
            credentialUrl,
        } = req.body;

        if (!profile || !name) {
            return next(
                appError({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "profile and name fields are required",
                    statusText: statusText.FAIL,
                })
            );
        }

        const newCertification = await Certification.create({
            profile,
            name,
            issuer,
            issueDate,
            expirationDate,
            credentialId,
            credentialUrl,
        });

        res.status(StatusCodes.CREATED).json({
            message: "Certification added successfully",
            data: {
                certification: newCertification,
            },
        });
    }
);

// ==========================================
// 3. EDIT CERTIFICATION
// ==========================================
export const editCertification = asyncWrapper(
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

        const updatedCertification = await Certification.findByIdAndUpdate(
            id,
            { $set: body },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedCertification) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Certification entry not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            message: "Certification updated successfully",
            data: {
                certification: updatedCertification,
            },
        });
    }
);

// ==========================================
// 4. DELETE CERTIFICATION
// ==========================================
export const deleteCertification = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const deletedCertification = await Certification.findByIdAndDelete(id);

        if (!deletedCertification) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Certification entry not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            status: statusText.SUCCESS,
            message: "Certification deleted successfully",
            data: null,
        });
    }
);