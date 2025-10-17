import express from "express";
import { LogInService, SignUpService } from "./authoController";
const authRoute = express.Router()

authRoute.post("/signup",SignUpService);
authRoute.post("/login",LogInService)
export default authRoute