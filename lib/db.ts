import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing. Add it to .env.local.");
const globalForMongo = global as typeof globalThis & { mongoose?: Promise<typeof mongoose> };
export const db = globalForMongo.mongoose ||= mongoose.connect(uri);
