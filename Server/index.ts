/** @format */

import express, { Application } from "express";
import { ApplicationCofig } from "./app";
import dbConfig from "./Config/dataBase";
const app: Application = express();
let port: number = 2001; // port number

ApplicationCofig(app);
dbConfig();

process.on("uncaughtException", (error: Error) => {
  console.log("stop here: uncaughtException");
  console.log(error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("stop here: unhandledRejection");
  console.log(reason);
  process.exit(1);
});

app.listen(port, () => {
  console.log("Done on port", port);
});
