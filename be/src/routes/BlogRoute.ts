import express from "express";
import { 
    getABlog,
    getAllBlog,
    createABlog,
    updateABlog,
    deleateABlog,
    filterbyTerm
} from "../controller/blogController";

const BlogRoute = express.Router();
BlogRoute.get("/search",filterbyTerm)
BlogRoute.get("/:id",getABlog);
BlogRoute.get("/",getAllBlog);
BlogRoute.post("/",createABlog);
BlogRoute.put("/:id",updateABlog);
BlogRoute.delete("/:id",deleateABlog);

export default BlogRoute;
