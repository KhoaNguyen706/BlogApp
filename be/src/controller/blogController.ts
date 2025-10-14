import { Request, Response } from "express";
import Blog from "../model/blog";

export async function getABlog (req:Request,res:Response){
        try {
            const {id} = req.params;
            const post = await Blog.findById(id);
            if (!post){ res.status(400).json("Post not found!")}
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({message:error})
        }
}

export async function  getAllBlog(req:Request,res:Response){
    try {
        const posts = await Blog.find();
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export async function createABlog(req:Request,res:Response){
    try {
        const {
            title,
            content,
            category,
            tags,
        } = req.body;
        const newPosts = new Blog({title,
            content,
            category,
            tags,})

        const savedPosts = await newPosts.save();
        return res.status(200).json(savedPosts);
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
export async function updateABlog(req:Request,res:Response){
    try {
        const {id} = req.params;
        const updatedData = req.body;
        const updatedPost = await Blog.findByIdAndUpdate(id,updatedData,{new:true});
        if(!updatedPost) res.status(400).json("Post not found!");
        res.status(200).json(updatedPost)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
export async function deleateABlog(req:Request,res:Response){
    try {
        const {id} = req.params;
        const deletePosts = await Blog.findByIdAndDelete(id);
        if (!deletePosts) res.status(400).json({message:"Posts not found!"})
        res.status(200).json({message:"Posts deleted successfully"
    ,deletePosts})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export async function filterbyTerm(req:Request,res:Response) {
    try {
        const {term} = req.query;
        if (!term) {
            return res.status(400).json({ message: "Search term is required" });
        }

        const searchRegex = new RegExp(String(term), 'i');


        const filtedPosts = await Blog.find({
            $or: [
                { title: { $regex: searchRegex } },
                { content: { $regex: searchRegex } },
                { category: { $regex: searchRegex } },
                { tags: { $in: [searchRegex] } }
            ]
        })
        return res.status(200).json(filtedPosts)
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}