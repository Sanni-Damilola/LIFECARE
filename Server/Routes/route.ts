/** @format */

import { Router } from "express";
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
route.route("/transfer/:senderId/:senderWalletId").patch(sendToAnotherWallet); // sendToAnotherSpecialistWallet
route
  .route("/sendtospecialist/:senderId/:senderWalletId")
  .patch(sendToAnotherSpecialistWallet); // sendToAnotherSpecialistWallet
// route.route("/fundWallet/:userId/:walletId").post(fundWalletFromBank); // funding wallet
route.route("/fundWallet/:userId").post(fundWalletFromBank); // funding wallet(pay ins)
route.route("/login").post(SignIn); // login User
route.route("/getoneuser/:id").get(getOneUser); // geting one user
route.route("/getalluser").get(getAllUser); // geting All user
route.route("/payouttobank").post(payOutToBank); // pay out to Bank
route.route("/deleteallmodels").delete(deleteAllModels); // pay out to Bank

export default route;

// route.route("/fundWalletTobank/:userId").post(checkPayment); // funding wallet to bank (pay out)
