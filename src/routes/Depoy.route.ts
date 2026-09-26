import express from "express";
import { DeployAppliation, get_all_deployment_instaces } from "../controller/Deployemnt.controller.js";

export const deployemnetRouer = express.Router();
deployemnetRouer.get("/depoyed-web-server/:id",DeployAppliation)
deployemnetRouer.get("/get-all-deploy-instance/:id",get_all_deployment_instaces)
