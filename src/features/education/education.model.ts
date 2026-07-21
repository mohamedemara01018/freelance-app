import mongoose from 'mongoose'


const educationSchema = new mongoose.Schema(
    {
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        school: {
            type: String,
            required: true,
            trim: true,
        },
        degree: {
            type: String,
            trim: true,
        },
        fieldOfStudy: {
            type: String,
            trim: true,
        },
        startYear: Number,
        endYear: Number,
        description: String,
    },
);

export const Education = mongoose.model('Education', educationSchema)