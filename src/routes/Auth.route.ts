import express from 'express'
import { getMyProfile, GitAuthPage, GithubCallback } from '../controller/auth.controller.js';
const AuthRoute = express.Router();
AuthRoute.get("/github",GitAuthPage)
AuthRoute.get("/github/callback",GithubCallback)
AuthRoute.get("/getMyprofile",getMyProfile)
export default AuthRoute;