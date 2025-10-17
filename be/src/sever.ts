import express   from "express";
import dotenv from "dotenv";

import BlogRoute from "./routes/BlogRoute";
import authRoute from "./authenication/authRoute";
import { authoMiddleware } from "./authenication/authoMiddleware";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(express.json())
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/posts",authoMiddleware,BlogRoute)


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${req.headers['user-agent']?.substring(0, 50)}...`);
  next();
});

app.listen(PORT,()=>{
    console.log(`Sever is running on ${PORT}`)
})