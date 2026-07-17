import type { Application, NextFunction, Request, Response } from "express"
import type { appErrorProbs } from "../utils/appError.utils.js"
import { statusText } from "../utils/enums.utils.js";


export const globalErrorHandler = (
    error: appErrorProbs,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(error.statusCode || 500).json({
        message: error.message || 'internal server error',
        statusText: error.statusText || statusText.ERROR,
    });
}

