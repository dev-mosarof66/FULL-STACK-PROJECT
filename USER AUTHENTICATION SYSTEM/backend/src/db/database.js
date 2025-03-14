import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `Monogdb connection successfull at host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`connection error in database connection ${error}`);
  }
};

export default connectDB;
