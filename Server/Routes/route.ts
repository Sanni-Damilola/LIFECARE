/** @format */

import { Router } from "express";
import { bookAppointment } from "../Controller/appointment";

import {
  checkOutToBank,
  deleteAllModels,
  // checkPayment,
  fundWalletFromBank,
  getAllUser,
  getOneUser,
  registerUser,
  sendToAnotherHospitalWallet,
  sendToAnotherSpecialistWallet,
  sendToAnotherWallet,
  SignIn,
} from "../Controller/userController";

// creating User Route
//  👇👇
const route = Router();

route.route("/postUser").post(registerUser); // register User
route.route("/transfer/:senderId").patch(sendToAnotherWallet); // sendToAnotherSpecialistWallet
route
  .route("/sendtospecialist/:senderId/:senderWalletId")
  .patch(sendToAnotherSpecialistWallet); // sendToAnotherSpecialistWallet
route
  .route("/sendtohospital/:senderId/:senderWalletId")
  .patch(sendToAnotherHospitalWallet); // sendToAnotherSpecialistWallet
// route.route("/fundWallet/:userId/:walletId").post(fundWalletFromBank); // funding wallet
// route.route("/fundWallet/").post(fundWalletFromBank); // funding wallet(pay ins)
route.route("/fundWallet/:userId").post(fundWalletFromBank); // funding wallet(pay ins)
route.route("/login").post(SignIn); // login User
route.route("/getoneuser/:id").get(getOneUser); // geting one user
route.route("/getalluser").get(getAllUser); // geting All user
route.route("/deleteallmodels").delete(deleteAllModels); // delete all models
route.route("/bookAppointment/:userId/:specialistId").post(bookAppointment); // book-Appointment
route.route("/payout").post(checkOutToBank); // book-Appointment

export default route; // done

// route.route("/fundWalletTobank/:userId").post(checkPayment); // funding wallet to bank (pay out)
