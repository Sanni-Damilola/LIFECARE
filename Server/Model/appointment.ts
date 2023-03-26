/** @format */

import mongoose from "mongoose";
import { bookAppointment} from "../interface/interface";

// creating History Model
//  👇👇
interface MainData extends bookAppointment, mongoose.Document {}

const appointment = new mongoose.Schema<bookAppointment>(
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
