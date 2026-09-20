import express from "express"
import { CreatePorject, GetAllProject, getCurrentRuingImage } from "../controller/project.controller.js";
import { CreateEnv, getPorject_env } from "../controller/env.controller.js";
export const projectRouter = express.Router();
projectRouter.post("/create",CreatePorject)
projectRouter.get("/get-projects",GetAllProject)
projectRouter.get("/get-current-ruining-image/:id",getCurrentRuingImage)
projectRouter.post("/Addenv",CreateEnv)
projectRouter.get("/getenv/:id",getPorject_env)
