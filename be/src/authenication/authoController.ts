import prisma from "../config/newdb";
import { Request,Response } from "express";
import { CreatehashedPassword } from "./authoService";
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