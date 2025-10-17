import { Request, Response } from "express";

import prisma from "../config/newdb";

export async function getABlog (req:Request,res:Response){
        try {
            const {id} = req.params;
            const Id = Number(id)
            // const post = await Blog.findById(id);
            const post = await prisma.post.findUnique({
                where:{
                    id:Id,
                }
            })
            if (!post){ res.status(400).json("Post not found!")}
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({message:error})
        }
}

export async function  getAllBlog(req:Request,res:Response){
    try {
        // const posts = await Blog.find();
        if(!req.user) return res.status(403).json({message:"No User Found"})
        const posts = await prisma.post.findMany({
            where:{
                authorId:req.user.id,
            }
        })
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
        // const newPosts = new Blog({title,
        //     content,
        //     category,
        //     tags,})

        // const savedPosts = await newPosts.save();
        if(!req.user) return res.status(403).json({message:"No User Found"})
        const newPosts = await prisma.post.create({
            data:{
                authorId:req.user.id,
                title:title,
                content:content,
                category:category,
                tags:tags,
            },
            select:{
                title:true,
                content:true,
                category:true,
                tags:true,
            }
        })
        return res.status(200).json(newPosts);
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
export async function updateABlog(req:Request,res:Response){
    try {
        const {id} = req.params;
        const Id = Number(id);
        const updatedData = req.body;
        // const updatedPost = await Blog.findByIdAndUpdate(id,updatedData,{new:true});
        const updatedPost = await prisma.post.update({
            where:{
                id:Id,
            },
            data:updatedData,
            select:{
                title:true,
                content:true,
                category:true,
                tags:true,
                updatedAt:true,
            }
        })
        if(!updatedPost) res.status(400).json("Post not found!");
        res.status(200).json(updatedPost)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
export async function deleateABlog(req:Request,res:Response){
    try {
        const {id} = req.params;
        const Id = Number(id);
        // const deletePosts = await Blog.findByIdAndDelete(id);
        const deletePosts = await prisma.post.delete({
            where:{
                id:Id,
            },
            select:{
                title:true,
                content:true,
                category:true,
                tags:true,
            }
        })
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

        // const searchRegex = new RegExp(String(term), 'i');
        const searchTerm = String(term);
        const filterbyPosts = await prisma.post.findMany({
            where:{
                OR:[
                    {title: { contains: searchTerm, mode: 'insensitive' }},
                    { content: { contains: searchTerm, mode: 'insensitive' } },
                    { category: { contains: searchTerm, mode: 'insensitive' } },
                    { tags: { has: searchTerm } }
                ]
            },
            select: {
                id: true,
                title: true,
                content: true,
                category: true,
                tags: true,
                createdAt: true
            }
        })
        // const filtedPosts = await Blog.find({
        //     $or: [
        //         { title: { $regex: searchRegex } },
        //         { content: { $regex: searchRegex } },
        //         { category: { $regex: searchRegex } },
        //         { tags: { $in: [searchRegex] } }
        //     ]
        // })
        return res.status(200).json(filterbyPosts)
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}