import { Router } from "express";
import AdminController from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/admin", AdminController.registerAdmin);
adminRouter.post("/admin", AdminController.registerAdmin);
adminRouter.delete("/admin/:id", AdminController.delete);
adminRouter.put("/admin/:id", AdminController.updateAdmin);

export default adminRouter;
