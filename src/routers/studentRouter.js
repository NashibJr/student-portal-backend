import { Router } from "express";
import StudentController from "../controllers/studentController.js";

const studentRouter = Router();

studentRouter.post("/students", StudentController.registerStudent);

export default studentRouter;
