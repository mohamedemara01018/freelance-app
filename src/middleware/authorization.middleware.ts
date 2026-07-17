import type { NextFunction, Request, Response } from "express";
import { appError } from "../utils/appError.utils.js";
import { statusText } from "../utils/enums.utils.js";

export const authorizationMiddleware = ([...allowTo]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (allowTo.includes(req.currentUser?.role)) {
            next();
        } else {
            return next(
                appError({
                    statusCode: 403,
                    message: 'you not authorize to do this action',
                    statusText: statusText.FAIL
                })
            )
        }
    }
}
