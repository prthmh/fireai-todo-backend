import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI, {
      dbName: "fireai_todo",
    });
    if (connectionInstance) {
      console.log(`DB Connected succesfully`);
    }
  } catch (error) {
    console.log("MONOGODB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
