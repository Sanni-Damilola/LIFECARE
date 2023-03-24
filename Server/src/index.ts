/** @format */

import express, { Application } from "express";
import { ApplicationCofig } from "./app";
import dbConfig from "./Config/dataBase";
const app: Application = express();
let port: number = 2001; // port number

ApplicationCofig(app);
dbConfig();

app.listen(port, () => {
  console.log("Done on port", port);
});
