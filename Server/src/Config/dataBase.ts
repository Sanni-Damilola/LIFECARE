/** @format */

import mongoose from "mongoose";
import environmentVarabiles from "../environments/env";

const dbConfig = async () => {
  try {
    const connectUrl = await mongoose.connect(
      environmentVarabiles.mongodbLocalUrl,
    );
    console.log("Connected To DataBase");
    console.log("");
    console.log("You're Connected To Your", mongoose.connection.host);
  } catch (error) {
    console.log("An Error Occured In DataBase", error);
  }
};

export default dbConfig;
