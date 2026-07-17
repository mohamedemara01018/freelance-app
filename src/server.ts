// src/server.ts

import dotenv from "dotenv";
dotenv.config();


import app from "./app";
import { connectDB } from "./config/database.config";


const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
    try {
        // Connect to MongoDB
        await connectDB();


        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

// Handle unexpected errors
process.on("unhandledRejection", (reason) => {
    console.error("❌ Unhandled Rejection:", reason);
    process.exit(1);
});

process.on("uncaughtException", (error) => {
    console.error("❌ Uncaught Exception:", error);
    process.exit(1);
});