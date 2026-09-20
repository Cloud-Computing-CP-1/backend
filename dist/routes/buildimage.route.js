import express from "express";
import { getAllIMages, imageBuildingEngine, imageBuildStatus } from "../controller/Buildimage.controller.js";
export const BuildRoute = express.Router();
BuildRoute.post("/image", imageBuildingEngine);
BuildRoute.get("/image/:id", imageBuildStatus);
BuildRoute.get("/image/project/:id", getAllIMages);
//# sourceMappingURL=buildimage.route.js.map