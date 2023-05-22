import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import adminRouter from "./src/routers/adminRouter.js";
import studentRouter from "./src/routers/studentRouter.js";
import markRouter from "./src/routers/markRouter.js";
import assessementRouter from "./src/routers/assessementRouter.js";
import Cors from "cors";

config();
const app = express();

const main = async () => {
  try {
    mongoose.connect(process.env.DATABASE_CONFIG).then(() => {
      app.use(Cors());
      app.use((req, resp, next) => {
        req.header("Access-Control-Allow-Origin", "*");
        next();
      });
      app.use(
        json(),
        urlencoded({ extended: false }),
        adminRouter,
        studentRouter,
        markRouter,
        assessementRouter
      );
      console.log("connected to the database");
    });
    app.listen(3000, () => console.log("connected to port 3000"));
  } catch (error) {
    console.log(error);
  }
};

main();
