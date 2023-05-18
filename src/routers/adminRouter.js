import { Router } from "express";
import AdminController from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/admin", AdminController.registerAdmin);

export default adminRouter;
