import "express";

declare global {
    namespace Express {
        interface Request {
            currentUser?: {
                email: string;
                role: string;
            };
        }
    }
}

export { };