import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload;
    }
  }
}

export async function authoMiddleware(req:Request,res:Response,next:NextFunction) {
    console.log("Autho Midlleware call")
    
    const token = req.headers.authorization?.replace("Bearer ","");

    if (!token) return res.status(401).json({ message: 'No token provided' })
    try {
        const JWT_Key = process.env.JWT_Key
        if (!JWT_Key) {
            return res.status(500).json({ message: 'JWT secret key is not configured' });
        }
        const verify = jwt.verify(token, JWT_Key) as jwt.JwtPayload;
        if(!verify) return res.status(401).json({message:"Unauthorized"})
        
        req.user = verify
            
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    next();
}