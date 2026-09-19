import express from "express"
import { CreatePorject, GetAllProject } from "../controller/project.controller.js";
export const projectRouter = express.Router();
projectRouter.post("/create",CreatePorject)
projectRouter.get("/get-projects",GetAllProject)
