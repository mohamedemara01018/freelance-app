import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { appError } from "../utils/appError.utils.js";
import asyncWrapper from "../utils/asyncWrapper.utils.js";
import { statusText } from "../utils/enums.utils.js";




export const authenticationMiddleware = asyncWrapper((
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { token } = req.cookies;

    if (!token) {
        return next(
            appError({
                statusCode: 401,
                message: "Unauthorized. Please login first.",
                statusText: statusText.FAIL,
            })
        );
    }

    const decoded: { email: string, role: string } = jwt.verify(
        token,
        String(process.env.JWT_TOKEN_SECRET_KEY)
    ) as { email: string, role: string };

    if (decoded) {
        req.currentUser = {
            email: decoded.email,
            role: decoded.role,
        }

        next();
    }

});