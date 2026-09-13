import express from "express";
import { imageBuildingEngine, imageBuildStatus } from "../controller/Buildimage.controller.js";
export const BuildRoute = express.Router();
BuildRoute.post("/image", imageBuildingEngine);
BuildRoute.get("/image/:id", imageBuildStatus);
//# sourceMappingURL=buildimage.route.js.map