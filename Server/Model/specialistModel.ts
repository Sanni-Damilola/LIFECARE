/** @format */

import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import { ISpecialist } from "../Interface/interface";

// creating User specialist
//  👇👇
interface user extends ISpecialist, mongoose.Document {}

const specialistModel = new mongoose.Schema<ISpecialist>(
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
    lience: {
      type: String,
    },
    profession: {
      type: String,
      required: [true, "profession is Required"],
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
    appointment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<user>("specialist", specialistModel);
