import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Category } from "./category.model.js";
import { appError } from "../../utils/appError.utils.js";
import asyncWrapper from "../../utils/asyncWrapper.utils.js";
import { statusText } from "../../utils/enums.utils.js";

// ==========================================
// 1. GET ALL CATEGORIES (With Optional Search)
// ==========================================
export const getAllCategories = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const search = req.query.search as string | undefined;

        const filter = search ? { $text: { $search: search } } : {};

        const categories = await Category.find(filter);

        res.status(StatusCodes.OK).json({
            message: "Categories returned successfully",
            data: {
                categories,
            },
        });
    }
);

// ==========================================
// 2. GET SINGLE CATEGORY BY ID
// ==========================================
export const getCategoryById = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Category not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            message: "Category returned successfully",
            data: {
                category,
            },
        });
    }
);

// ==========================================
// 3. CREATE CATEGORY
// ==========================================
export const createCategory = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, description } = req.body;

        if (!name) {
            return next(
                appError({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "Category name is required",
                    statusText: statusText.FAIL,
                })
            );
        }

        // Check for existing category with the same name
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return next(
                appError({
                    statusCode: StatusCodes.CONFLICT,
                    message: "Category with this name already exists",
                    statusText: statusText.FAIL,
                })
            );
        }

        const newCategory = await Category.create({
            name,
            description,
        });

        res.status(StatusCodes.CREATED).json({
            message: "Category created successfully",
            data: {
                category: newCategory,
            },
        });
    }
);

// ==========================================
// 4. EDIT CATEGORY
// ==========================================
export const editCategory = asyncWrapper(
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

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $set: body },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedCategory) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Category not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            message: "Category updated successfully",
            data: {
                category: updatedCategory,
            },
        });
    }
);

// ==========================================
// 5. DELETE CATEGORY
// ==========================================
export const deleteCategory = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return next(
                appError({
                    statusCode: StatusCodes.NOT_FOUND,
                    message: "Category not found",
                    statusText: statusText.FAIL,
                })
            );
        }

        res.status(StatusCodes.OK).json({
            status: statusText.SUCCESS,
            message: "Category deleted successfully",
            data: null,
        });
    }
);