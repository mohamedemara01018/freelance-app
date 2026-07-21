import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 100,
        },
        
        description: {
            type: String,
            maxlength: 500,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Search Index
categorySchema.index({ name: "text" });

export const Category = mongoose.model("Category", categorySchema);