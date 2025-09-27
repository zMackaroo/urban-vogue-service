import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Global connection state for serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const MONGODB_URI =
  process.env.MONGO_URL ||
  "mongodb+srv://zmackaroo:Sep09051997!!@urbanvogue.erin2.mongodb.net/fad-blog";

// Connection options optimized for serverless
const connectionOptions = {
  bufferCommands: false,
  maxPoolSize: 1, // Reduced for serverless
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxIdleTimeMS: 30000,
};

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      ...connectionOptions,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB connection error:", e);
    throw e;
  }

  return cached.conn;
}

export async function ensureConnection() {
  try {
    await connectToDatabase();
    return true;
  } catch (error) {
    console.error("Failed to ensure MongoDB connection:", error);
    return false;
  }
}

// Global type declaration for TypeScript
declare global {
  var mongoose: any;
}
