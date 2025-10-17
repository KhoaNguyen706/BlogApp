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
    
    
    const token = req.headers.authorization?.replace("Bearer ","");

    if (!token) return res.status(401).json({ message: 'No token provided' })
    try {
        const JWT_Key = process.env.JWT_Key
        if (!JWT_Key) {
            return res.status(500).json({ message: 'JWT secret key is not configured' });
        }
        const verifiedUser = jwt.verify(token, JWT_Key) as jwt.JwtPayload;
        if(!verifiedUser) return res.status(401).json({message:"Unauthorized"})
        
        req.user = verifiedUser  
        next();  
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    
}