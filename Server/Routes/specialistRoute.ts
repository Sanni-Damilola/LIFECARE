/** @format */

import { Router } from "express";
import {
  createSpecialist,
  getOneSpecialist,
  SignInSpecialist,
} from "../controller/specialistController";

const specialistRoutes = Router();

specialistRoutes.route("/createspecialist").post(createSpecialist); // register User
specialistRoutes.route("/loginspecialist").post(SignInSpecialist); // signin User

specialistRoutes.route("/getonespecialist/:idspecialist").get(getOneSpecialist); // get one specialist

export default specialistRoutes;
