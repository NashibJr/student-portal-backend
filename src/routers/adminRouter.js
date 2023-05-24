import { Router } from "express";
import AdminController from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/admin", AdminController.registerAdmin);
adminRouter.post("/admin/login", AdminController.login);
adminRouter.delete("/admin/:id", AdminController.delete);
adminRouter.put("/admin/:id", AdminController.updateAdmin);
adminRouter.get("/admin", AdminController.getAdmins);

export default adminRouter;
