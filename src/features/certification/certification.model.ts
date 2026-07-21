import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
    {
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        issuer: String,
        issueDate: Date,
        expirationDate: Date,
        credentialId: String,
        credentialUrl: String,
    },
);

export const Certification = mongoose.model('Certification', certificationSchema)