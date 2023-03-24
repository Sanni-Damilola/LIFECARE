/** @format */

import mongoose from "mongoose";
import { IHistory } from "../interface/interface";

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
  },
  { timestamps: true },
);

export default mongoose.model<MainData>("histories", historySchema);
