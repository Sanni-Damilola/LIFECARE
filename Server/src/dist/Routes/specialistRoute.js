"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialistController_1 = require("../Controller/specialistController");
const specialistRoutes = (0, express_1.Router)();
specialistRoutes.route("/createspecialist").post(specialistController_1.createSpecialist); // register User
specialistRoutes.route("/loginspecialist").post(specialistController_1.SignInSpecialist); // signin User
specialistRoutes.route("/getonespecialist/:idspecialist").get(specialistController_1.getOneSpecialist); // get one specialist
specialistRoutes
    .route("/acceptOrDecline/:specialistId/:appointmentId")
    .patch(specialistController_1.acceptOrDeclineAppointment); // get one specialist
exports.default = specialistRoutes;
