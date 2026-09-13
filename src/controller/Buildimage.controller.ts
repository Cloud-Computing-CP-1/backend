import { type Request, type Response } from "express"
import axiosInstance from "axios"
import { ErrorMessage, SucessMessage } from "../utils/Response.js";
import { WithRetry } from "../Statergy/WithRetry.js";
const api = axiosInstance.create({
    baseURL: "https://image-building-microservice-hanr.vercel.app",
})
export const imageBuildStatus = async (req: Request, res: Response) => {
    try {
        const response = await api.get("/api/builds/" + encodeURIComponent(String(req.params.id)), { timeout: 15000 });
        return SucessMessage(res, 200, "Build status fetched", response.data);
    } catch (error) {
        const status = axiosInstance.isAxiosError(error) && error.response?.status === 404 ? 404 : 503;
        return ErrorMessage(res, status, status === 404 ? "Build status not found" : "Unable to check build status");
    }
};
export const imageBuildingEngine = async (req: Request, res: Response) => {
    try {
        const { repo } = req.body;
        const data = await WithRetry(async () => {
            const response = await api.post("/api/builds", { repoUrl: repo })
            return response.data
        })
        return SucessMessage(res, 200, "Image BuildSucessFull", data)
    } catch (error) {
        console.log(error)
        return ErrorMessage(res, 503, "Service unAvailable")
    }
}
