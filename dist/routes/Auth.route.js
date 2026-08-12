import express from 'express';
import { GitAuthPage, GithubCallback } from '../controller/auth.controller.js';
const AuthRoute = express.Router();
AuthRoute.get("/github", GitAuthPage);
AuthRoute.get("/github/callback", GithubCallback);
export default AuthRoute;
//# sourceMappingURL=Auth.route.js.map