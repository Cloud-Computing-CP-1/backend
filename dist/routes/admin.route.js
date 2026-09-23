import express from "express";
import { getAllCloude_Providers, is_stop_start_Providers } from "../controller/admin.controller.js";
export const adminRoute = express.Router();
adminRoute.get("/get_all_provider", getAllCloude_Providers);
adminRoute.post("/is_stop_start_Provider", is_stop_start_Providers);
//# sourceMappingURL=admin.route.js.map