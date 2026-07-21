import "express";
import "multer";

declare global {
    namespace Express {
        interface Request {
            currentUser?: {
                email: string;
                role: string;
            };
            // Use Express.Multer.File instead of just Multer.File
            file?: Express.Multer.File,
            // files?: Express.Multer.File[];
        }
    }
}

export { };