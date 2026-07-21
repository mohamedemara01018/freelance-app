import { NextFunction, Request, Response } from 'express'
import asyncWrapper from '../../utils/asyncWrapper.utils.js'
import { Profile } from './profile.model.js'
import { StatusCodes } from 'http-status-codes'
import { appError } from '../../utils/appError.utils.js'
import { statusText } from '../../utils/enums.utils.js'
import { IProfileInput } from '../../types/schemeTypes.js'


const getAllProfiles = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const profiles = await Profile.find().populate({
            path: 'user',
            select: 'firstName lastName email -_id'
        })

        res.status(StatusCodes.OK).json({
            message: 'profiles returned successfully',
            data: {
                profiles: profiles || []
            }
        })
    }
)

const getUserProfileById = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const userProfile = await Profile.findOne({ user: id })

        if (!userProfile) {
            return next(appError({
                statusCode: StatusCodes.NOT_FOUND,
                message: "profile doesn't exis, please Create it",
                statusText: statusText.FAIL
            }))
        }

        res.status(StatusCodes.OK)
            .json({ message: 'profile created successfully', data: { profile: userProfile } })
    }
)

const createNewProfile = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        if (!body.user.trim()) {
            return next(appError({
                statusCode: StatusCodes.NOT_FOUND,
                message: 'user not found',
                statusText: statusText.FAIL
            }))
        }

        const profile = await Profile.create(body)
        if (!profile) {
            return next(appError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: "profile doesn't created, something went wrong",
                statusText: statusText.FAIL
            }))
        }
        res.status(StatusCodes.CREATED)
            .json({ message: 'profile created successfully', data: { profile } })
    }
)

const editProfile = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const body: IProfileInput = req.body;
        const { id } = req.params;

        // 1. Check if req.body is actually empty
        if (!body || Object.keys(body).length === 0) {
            return next(
                appError({
                    statusCode: StatusCodes.BAD_REQUEST, // 400 Bad Request
                    message: "Request body cannot be empty",
                    statusText: statusText.FAIL,
                })
            );
        }

        // 2. Perform update with runValidators: true
        const editedProfile = await Profile.findOneAndUpdate(
            { user: id },
            { ...body }, // Use $set to safely update only passed fields
            {
                new: true,          // Return updated document
                runValidators: true // Enforce schema validations (enums, min/max)
            }
        );

        // 3. Handle document not found
        if (!editedProfile) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND, // 404 Not Found
                    message: "Profile not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        // 4. Send success response (200 OK)
        res.status(StatusCodes.OK).json({
            status: statusText.SUCCESS,
            message: "Profile updated successfully",
            data: {
                profile: editedProfile,
            },
        });
    }
);

export {
    getAllProfiles,
    getUserProfileById,
    createNewProfile,
    editProfile
}