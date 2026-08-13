import "dotenv/config"; // 1. Instantly loads your .env file safely
import express from "express";
import cors from "cors";
import AuthRoute from "./routes/Auth.route.js";
import testConnection from "./dbConnection/db.js";
import { AuthMiddleWare } from "./middleware/auth.middleware.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AuthMiddleWare);
const CorsOption = {
    origin: "*",
    optionsSuccessStatus: 200
};
app.use(cors(CorsOption));
app.get("/heath", (req, res) => {
    res.send('My Application is Working');
});
testConnection();
const PORT = process.env.PORT || 3000;
app.use("/api/auth", AuthRoute);
app.listen(PORT, () => {
    console.log(`Application Runing on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map