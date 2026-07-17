import type { Request, Response, NextFunction, RequestHandler } from "express";

const asyncWrapper = (fn: RequestHandler): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncWrapper;