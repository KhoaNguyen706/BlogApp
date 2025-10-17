import express from "express";
import { 
    getABlog,
    getAllBlog,
    createABlog,
    updateABlog,
    deleateABlog,
    filterbyTerm
} from "../controller/blogController";
import { authoMiddleware } from "../authenication/authoMiddleware";
const BlogRoute = express.Router();
BlogRoute.get("/search",filterbyTerm)
BlogRoute.get("/:id",getABlog);
BlogRoute.get("/",getAllBlog);
BlogRoute.post("/",authoMiddleware,createABlog);
BlogRoute.put("/:id",updateABlog);
BlogRoute.delete("/:id",deleateABlog);

export default BlogRoute;
