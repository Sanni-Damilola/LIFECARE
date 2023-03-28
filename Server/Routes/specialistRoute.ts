/** @format */

import { Router } from "express";
import {
  acceptOrDeclineAppointment,
  createSpecialist,
  getOneSpecialist,
  SignInSpecialist,
} from "../Controller/specialistController";

const specialistRoutes = Router();

specialistRoutes.route("/createspecialist").post(createSpecialist); // register User
specialistRoutes.route("/loginspecialist").post(SignInSpecialist); // signin User

specialistRoutes.route("/getonespecialist/:idspecialist").get(getOneSpecialist); // get one specialist
specialistRoutes
  .route("/acceptOrDecline/:specialistId/:appointmentId")
  .patch(acceptOrDeclineAppointment); // get one specialist

export default specialistRoutes;
