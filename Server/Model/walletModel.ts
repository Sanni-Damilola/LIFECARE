/** @format */

import mongoose from "mongoose";
import { IWallet } from "../Interface/interface";

// creating Wallet Model
//  👇👇
interface MainData extends IWallet, mongoose.Document {}

const walletSchema = new mongoose.Schema<IWallet>(
  {
    ownerName: {
      type: String,
    },
    balance: {
      type: Number,
    },
    credit: {
      type: Number,
    },
    debit: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model<MainData>("wallets", walletSchema);
