/** @format */

import { Router } from "express";

import {
  createHospital,
  SignInHospital,
  getOneHospital,
  findUsers,
} from "../Controller/hospitalController";

const hospitalRoutes = Router();

hospitalRoutes.route("/createhospital").post(createHospital); // register User
hospitalRoutes.route("/loginhospital").post(SignInHospital); // signin User

hospitalRoutes.route("/getonehospital/:hospitalId").get(getOneHospital); // get one specialist
hospitalRoutes.route("/searchUser").get(findUsers); // get one specialist

export default hospitalRoutes;
