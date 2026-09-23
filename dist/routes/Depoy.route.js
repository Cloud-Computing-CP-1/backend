import express from "express";
import { DeployAppliation } from "../controller/Deployemnt.controller.js";
export const deployemnetRouer = express.Router();
deployemnetRouer.get("/depoyed-web-server/:id", DeployAppliation);
//# sourceMappingURL=Depoy.route.js.map