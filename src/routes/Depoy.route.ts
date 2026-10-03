import express from "express";
import { DeployAppliation, get_all_deployment_instaces, get_all_deployment_instaces_history_, get_all_deployment_instaces_history_project } from "../controller/Deployemnt.controller.js";
import { get_deployment_history_by_project } from "../model/project.history.js";

export const deployemnetRouer = express.Router();
deployemnetRouer.get("/depoyed-web-server/:id",DeployAppliation)
deployemnetRouer.get("/get-all-deploy-instance/:id",get_all_deployment_instaces)
deployemnetRouer.get("/get-history-deployment",get_all_deployment_instaces_history_)
deployemnetRouer.get("/get-history-deployment-by-project/:id",get_all_deployment_instaces_history_project)
