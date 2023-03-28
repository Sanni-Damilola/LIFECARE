/** @format */

import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import { Iuser } from "../Interface/interface";

// creating User Model
//  👇👇
interface user extends Iuser, mongoose.Document {}

const userModel = new mongoose.Schema<Iuser>(
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
    bloodGroup: {
      type: String,
    },
    genotype: {
      type: String,
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

export default mongoose.model<user>("userLifeCare", userModel);
