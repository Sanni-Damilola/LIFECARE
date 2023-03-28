/** @format */

import mongoose from "mongoose";
import { Iappointment } from "../Interface/interface";

// creating appointment Model
//  👇👇
interface MainData extends Iappointment, mongoose.Document {}

const appointment = new mongoose.Schema<Iappointment>(
  {
    email: {
      type: String,
    },
    date: {
      type: String,
    },
    confirm: {
      type: Boolean,
    },
    complaintBrief: {
      type: String,
    },
    specialist: {
      type: String,
    },
    specialistEmail: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<MainData>("appointment", appointment);
