import mongoose from "mongoose";
import "dotenv/config";

export const connect = async (): Promise<void> => {
  try {
    console.log("connected")
    await mongoose.connect(String(process.env.MONGO_DB));
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    console.log("disconnected")
    await mongoose.disconnect();
  } catch (error) {
    console.log("MongoDB disconnection error: ", error);
  }
};
