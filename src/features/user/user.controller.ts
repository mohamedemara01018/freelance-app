import type { NextFunction, Request, Response } from "express";
import { User } from "./user.model.js";
import { appError } from "../../utils/appError.utils.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import asyncWrapper from "../../utils/asyncWrapper.utils.js";
import { statusText } from "../../utils/enums.utils.js";

const getAllUser = asyncWrapper(async (req: Request, res: Response) => {

    const pageNumber = Math.max(Number(req.query.pageNumber) || 1, 1);
    const pageSize = Math.max(Number(req.query.pageSize) || 10, 1);
    const skip = (pageNumber - 1) * pageSize;


    const totalUsers = await User.countDocuments();

    const users = await User.find()
        .select("-password -token -resetToken")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);

    res.status(200).json({
        message: "All users returned successfully",
        data: {
            users,
            pagination: {
                pageNumber,
                pageSize,
                totalUsers,
                totalPages: Math.ceil(totalUsers / pageSize),
            },
        },
    });
});


const getUserById = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        return next(appError({
            statusCode: 404,
            message: 'id not found',
            statusText: statusText.FAIL
        }))
    }

    const user = await User.findById(id);
    if (!user?.email) {
        return next(appError({
            statusCode: 404,
            message: 'user not found',
            statusText: statusText.FAIL
        }))
    }

    res.status(200).json({
        message: 'user founded',
        data: {
            user
        }
    })
})


const updateUser = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName } = req.body;

    if (!firstName?.trim()) {
        return next(
            appError({
                statusCode: 400,
                message: "First name is required.",
                statusText: statusText.FAIL,
            })
        );
    }

    if (!lastName?.trim()) {
        return next(
            appError({
                statusCode: 400,
                message: "Last name is required.",
                statusText: statusText.FAIL,
            })
        );
    }

    const updatedUser = await User.findOneAndUpdate(
        { email: String(req.currentUser?.email) },
        { firstName, lastName },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -token -resetToken");

    if (!updatedUser) {
        return next(
            appError({
                statusCode: 404,
                message: "User not found.",
                statusText: statusText.FAIL,
            })
        );
    }

    res.status(200).json({
        message: "Profile updated successfully.",
        data: updatedUser,
    });
});


const changePassword = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword?.trim()) {
        return next(
            appError({
                statusCode: 400,
                message: "Current password is required.",
                statusText: statusText.FAIL,
            })
        );
    }

    if (!newPassword?.trim()) {
        return next(
            appError({
                statusCode: 400,
                message: "New password is required.",
                statusText: statusText.FAIL,
            })
        );
    }

    const currentUser = await User.findOne({
        email: req.currentUser?.email as string,
    });

    if (!currentUser) {
        return next(
            appError({
                statusCode: 404,
                message: "User not found.",
                statusText: statusText.FAIL,
            })
        );
    }

    const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        currentUser.password
    );

    if (!isPasswordCorrect) {
        return next(
            appError({
                statusCode: 400,
                message: "Current password is incorrect.",
                statusText: statusText.FAIL,
            })
        );
    }

    const isSamePassword = await bcrypt.compare(
        newPassword,
        currentUser.password
    );

    if (isSamePassword) {
        return next(
            appError({
                statusCode: 400,
                message: "New password must be different from the current password.",
                statusText: statusText.FAIL,
            })
        );
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    currentUser.password = await bcrypt.hash(newPassword, salt);

    await currentUser.save();

    res.clearCookie("token");

    res.status(200).json({
        message: "Password changed successfully. Please log in again.",
    });
});


const me = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log(token)

    if (!token) {
        return next(appError({
            statusCode: 401,
            message: 'user not found',
            statusText: statusText.FAIL
        }))
    }

    const payload = jwt.verify(token, String(process.env.JWT_TOKEN_SECRET_KEY)) as { email: string }
    console.log(payload)

    const email = payload?.email
    const currentUser = await User.findOne({ email: String(email) });

    res.status(200).json({
        message: 'user founded',
        data: {
            user: currentUser
        }
    })


})


export {
    getAllUser,
    getUserById,
    updateUser,
    changePassword,
    me
}