/** @format */

import { Router } from "express";
import {
  fundWalletFromBank,
  getAllUser,
  getOneUser,
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
route.route("/fundWallet/:userId").post(fundWalletFromBank); // funding wallet
route.route("/login").post(SignIn); // login User
route.route("/getoneuser/:id").get(getOneUser); // geting one user
route.route("/getalluser").get(getAllUser); // geting All user

export default route;
