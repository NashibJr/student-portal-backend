import { Router } from "express";
import MarkController from "../controllers/markController.js";

const markRouter = Router();

markRouter.post("/mark", MarkController.createMark);
markRouter.get("/mark", MarkController.getMarks);

export default markRouter;
