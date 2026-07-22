import { Schema, model, Types } from "mongoose";

const savedJobSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        job: {
            type: Types.ObjectId,
            ref: "Job",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/**
 * Prevent a user from saving the same job more than once.
 */
savedJobSchema.index(
    {
        user: 1,
        job: 1,
    },
    {
        unique: true,
    }
);

/**
 * Retrieve a user's saved jobs in newest-first order.
 */
savedJobSchema.index({
    user: 1,
    createdAt: -1,
});

/**
 * Useful for counting users who saved a job.
 */
savedJobSchema.index({
    job: 1,
});

export const SavedJob = model("SavedJob", savedJobSchema);