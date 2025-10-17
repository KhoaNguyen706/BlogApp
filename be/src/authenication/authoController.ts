import prisma from "../config/newdb";
import { json, Request,Response } from "express";
import { CreatehashedPassword,CheckPassword, GenerateToken } from "./authoService";
import { Role } from "../generated/prisma";
export async function SignUpService(req:Request,res:Response){
    try {
        const {name,email,password} = req.body;
        const hashedpassword = CreatehashedPassword(password);
        const isOldUser = await prisma.user.findMany({
            where:{
                email:email,
            }
        })
        if(isOldUser.length>0) {return res.status(403).json({message:"User already exits! Please Log In"})}
        const newUser = await prisma.user.create({
            data:{
                name:name,
                email:email,
                hashedPassword:hashedpassword,
            },
            select:{
                name:true,
                id:true
            }
        })
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function LogInService(req:Request,res:Response) {
        try {
            const {email,password} = req.body;

            const isUser = await prisma.user.findUnique({
                where:{
                    email:email
                }
            })
            if(!isUser) return res.status(403).json({message:"User not found"})
            const resPassword : string = isUser?.hashedPassword ?? '';
            if(resPassword=="") return res.status(403).json({message:"User not found"})
            const isPasswordCorrect = CheckPassword(resPassword,password);
            if(!isPasswordCorrect) return res.status(403).json({message:"Wrong Password! Please try again"})
            const payload = {
                id: isUser?.id,
                email: isUser?.email,
                role: isUser?.role
            }
            const token = GenerateToken(payload)
            return res.status(200).json(
                { message:"Login successfully",
                accessToken: token, // This is the JWT the client will use
                user: { 
                id:isUser.id,}
                });
        } catch (error) {
            return res.status(500).json(error)
        }
}