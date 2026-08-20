import express from 'express'
import { getMyProfile, getMyRepo, GitAuthPage, GithubCallback } from '../controller/auth.controller.js';
const AuthRoute = express.Router();
AuthRoute.get("/github",GitAuthPage)
AuthRoute.get("/github/callback",GithubCallback)
AuthRoute.get("/getMyprofile",getMyProfile)
AuthRoute.get("/getmyrepo",getMyRepo)
export default AuthRoute;