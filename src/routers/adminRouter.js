import { Router } from "express";
import AdminController from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/admin", AdminController.registerAdmin);
adminRouter.post("/admin/login", AdminController.login);

export default adminRouter;
