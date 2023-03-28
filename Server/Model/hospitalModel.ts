/** @format */

import mongoose from "mongoose";
import { IHospital } from "../Interface/interface";
import isEmail from "validator/lib/isEmail";

// creating User Model
//  👇👇
interface user extends IHospital, mongoose.Document {}

const hospitalModel = new mongoose.Schema<IHospital>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please provide a valid  email"],
    },
    password: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      min: 10,
    },
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "histories",
      },
    ],
    wallet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wallets",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<user>("hospital", hospitalModel);
