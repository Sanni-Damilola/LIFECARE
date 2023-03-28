/** @format */

import mongoose from "mongoose";
import { IHistory } from "../Interface/interface";

// creating History Model
//  👇👇
interface MainData extends IHistory, mongoose.Document {}

const historySchema = new mongoose.Schema<IHistory>(
  {
    message: {
      type: String,
    },
    transactionRefrence: {
      type: String,
    },
    transactionType: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model<MainData>("histories", historySchema);
