import express   from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import BlogRoute from "./routes/BlogRoute";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(express.json())
app.use("/api/v1/posts",BlogRoute)


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${req.headers['user-agent']?.substring(0, 50)}...`);
  next();
});

app.listen(PORT,()=>{
    console.log(`Sever is running on ${PORT}`)
})