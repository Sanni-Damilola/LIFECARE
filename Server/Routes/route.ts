/** @format */

import { Router } from "express";
import { bookAppointment } from "../Controller/appointment";
import {
  deleteAllModels,
  // checkPayment,
  fundWalletFromBank,
  getAllUser,
  getOneUser,
  payOutToBank,
  registerUser,
  sendToAnotherSpecialistWallet,
  sendToAnotherWallet,
  SignIn,
} from "../controller/userController";

// creating User Route
//  👇👇
const route = Router();

route.route("/postUser").post(registerUser); // register User
route.route("/transfer/:senderId").patch(sendToAnotherWallet); // sendToAnotherSpecialistWallet
route
  .route("/sendtospecialist/:senderId/:senderWalletId")
  .patch(sendToAnotherSpecialistWallet); // sendToAnotherSpecialistWallet
// route.route("/fundWallet/:userId/:walletId").post(fundWalletFromBank); // funding wallet
route.route("/fundWallet/:userId").post(fundWalletFromBank); // funding wallet(pay ins)
route.route("/login").post(SignIn); // login User
route.route("/getoneuser/:id").get(getOneUser); // geting one user
route.route("/getalluser").get(getAllUser); // geting All user
route.route("/payouttobank").post(payOutToBank); // pay out to Bank
route.route("/deleteallmodels").delete(deleteAllModels); // delete all models
route.route("/bookAppointment/:userId/:specialistId").post(bookAppointment); // delete all models

export default route;

// route.route("/fundWalletTobank/:userId").post(checkPayment); // funding wallet to bank (pay out)
