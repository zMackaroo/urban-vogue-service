import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;
let attempts = 1;

const MONGODB_URI =
  process.env.MONGO_URL ||
  "mongodb+srv://zmackaroo:Sep09051997!!@urbanvogue.erin2.mongodb.net/fad-blog";

export async function connectToDatabase() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("Connected to MongoDB successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
    });
  } catch (error) {
    if (attempts <= 3) {
      console.log(
        `${attempts}/3 Failed to connect, attempting to re-connect...`
      );
      attempts++;
      setTimeout(() => connectToDatabase(), 2000);
    } else {
      console.error(`Failed to establish connection with MongoDB: ${error}`);
      throw error;
    }
  }
}

export async function ensureConnection() {
  if (!isConnected) {
    await connectToDatabase();
  }
  return isConnected;
}
