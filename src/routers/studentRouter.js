import { Router } from "express";
import StudentController from "../controllers/studentController.js";

const studentRouter = Router();

studentRouter.post("/students", StudentController.registerStudent);
studentRouter.post("/students/login", StudentController.login);
studentRouter.get("/students", StudentController.getStudents);

export default studentRouter;
