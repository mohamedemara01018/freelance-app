import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/freelance-app');
        console.log(`📈 database has connected successfully`);
    } catch (error) {
        console.log(`❌ there is error when connect to DB`);
    }

}