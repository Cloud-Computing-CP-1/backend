import express from 'express'
import { getMyProfile, getMyRepo, GitAuthPage, GithubCallback, webhook } from '../controller/auth.controller.js';
const AuthRoute = express.Router();
AuthRoute.get("/github",GitAuthPage)
AuthRoute.get("/github/callback",GithubCallback)
AuthRoute.get("/getMyprofile",getMyProfile)
AuthRoute.get("/getmyrepo",getMyRepo)
AuthRoute.post("/github/webhook",webhook)
export default AuthRoute;