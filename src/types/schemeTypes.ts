import { Types, Document } from "mongoose";

export type ExperienceLevel = "entry" | "intermediate" | "expert";
export type Availability = "available" | "busy" | "not_available";
export type Visibility = "public" | "private" | "clients_only";
export type LanguageLevel = "basic" | "conversational" | "fluent" | "native";
export type EmploymentType = "full-time" | "part-time" | "freelance" | "internship" | "contract";

export interface ILanguage {
    name: string;
    level: LanguageLevel;
}

export interface IEducation {
    school: string;
    degree?: string;
    fieldOfStudy?: string;
    startYear?: number;
    endYear?: number;
    description?: string;
}

export interface IEmployment {
    company: string;
    position: string;
    employmentType?: EmploymentType;
    startDate?: Date;
    endDate?: Date;
    currentlyWorking?: boolean;
    description?: string;
}

export interface ICertification {
    name: string;
    issuer?: string;
    issueDate?: Date;
    expirationDate?: Date;
    credentialId?: string;
    credentialUrl?: string;
}

export interface ISocialLinks {
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    portfolio?: string;
}


export interface IProfileInput {
    user: Types.ObjectId;
    title?: string;
    bio?: string;
    overview?: string;
    hourlyRate: number;
    experienceLevel: ExperienceLevel;
    availability: Availability;
    responseTime: number;
    completedJobs: number;
    totalHours: number;
    totalEarnings: number;
    totalReviews: number;
    averageRating: number;
    successScore: number;
    socialLinks?: ISocialLinks;
    isProfileCompleted: boolean;
    profileViews: number;
    visibility: Visibility;
}