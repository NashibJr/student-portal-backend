import { Router } from "express";
import StudentController from "../controllers/studentController.js";
import authorization from "../middlewares/authentication.js";

const studentRouter = Router();

studentRouter.post("/students", StudentController.registerStudent);
studentRouter.post("/students/login", StudentController.login);
studentRouter.get("/students", StudentController.getStudents);
studentRouter.get(
  "/students/dashboard",
  authorization,
  StudentController.dashboard
);

export default studentRouter;
