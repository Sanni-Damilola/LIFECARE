/** @format */

import mongoose from "mongoose";
import environmentVarabiles from "../environments/env";

const dbConfig = async () => {
  try {
    const connectUrl = await mongoose.connect(
      environmentVarabiles.mongodbLifeUrl,
    );
    console.log("Connected To DataBase");
    console.log("");
    if (mongoose.connection.host === "local host") {
      console.log("You're Connected to LocalHost");
    }
    console.log("You're Connected To Cloud Host");
  } catch (error) {
    console.log("An Error Occured In DataBase", error);
  }
};

export default dbConfig;
