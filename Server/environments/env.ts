/** @format */

import dotenv from "dotenv";

dotenv.config();

const environmentVarabiles = {
  mongodbLocalUrl: process.env.mongodbLocalUrl as string,
  mongodbLifeUrl: process.env.mongodbLifeUrl as string,
};

export default environmentVarabiles;
