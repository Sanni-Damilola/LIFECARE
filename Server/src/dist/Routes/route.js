"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_1 = require("../Controller/appointment");
const userController_1 = require("../Controller/userController");
// creating User Route
//  👇👇
const route = (0, express_1.Router)();
route.route("/postUser").post(userController_1.registerUser); // register User
route.route("/transfer/:senderId").patch(userController_1.sendToAnotherWallet); // sendToAnotherSpecialistWallet
route
    .route("/sendtospecialist/:senderId/:senderWalletId")
    .patch(userController_1.sendToAnotherSpecialistWallet); // sendToAnotherSpecialistWallet
route
    .route("/sendtohospital/:senderId/:senderWalletId")
    .patch(userController_1.sendToAnotherHospitalWallet); // sendToAnotherSpecialistWallet
// route.route("/fundWallet/:userId/:walletId").post(fundWalletFromBank); // funding wallet
// route.route("/fundWallet/").post(fundWalletFromBank); // funding wallet(pay ins)
route.route("/fundWallet/:userId").post(userController_1.fundWalletFromBank); // funding wallet(pay ins)
route.route("/login").post(userController_1.SignIn); // login User
route.route("/getoneuser/:id").get(userController_1.getOneUser); // geting one user
route.route("/getalluser").get(userController_1.getAllUser); // geting All user
route.route("/deleteallmodels").delete(userController_1.deleteAllModels); // delete all models
route.route("/bookAppointment/:userId/:specialistId").post(appointment_1.bookAppointment); // book-Appointment
route.route("/payout").post(userController_1.checkOutToBank); // book-Appointment
exports.default = route; // done
// route.route("/fundWalletTobank/:userId").post(checkPayment); // funding wallet to bank (pay out)
