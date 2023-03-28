"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospitalController_1 = require("../Controller/hospitalController");
const hospitalRoutes = (0, express_1.Router)();
hospitalRoutes.route("/createhospital").post(hospitalController_1.createHospital); // register User
hospitalRoutes.route("/loginhospital").post(hospitalController_1.SignInHospital); // signin User
hospitalRoutes.route("/getonehospital/:hospitalId").get(hospitalController_1.getOneHospital); // get one specialist
hospitalRoutes.route("/searchUser").get(hospitalController_1.findUsers); // get one specialist
exports.default = hospitalRoutes;
