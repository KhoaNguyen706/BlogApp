import express from "express";
import { SignUpService } from "./authoController";
const authRoute = express.Router()

authRoute.post("/signup",SignUpService);

export default authRoute