import { genSaltSync,hashSync,compareSync } from "bcrypt-ts";
import jwt from 'jsonwebtoken'
export  function CreatehashedPassword(password:string):string{
    const salt = genSaltSync(10); // 100 takes too long
    const hashedpassword :string = hashSync(password,salt);
    return hashedpassword;
}

export function CheckPassword(hashedpassword:string,password:string):boolean{
    const result = compareSync(password,hashedpassword);
    return result;
}

interface Payload{
    id: number,
    email: string,
    role: string,
}

export function GenerateToken(payload:Payload){
    const JWT_key = process.env.JWT_Key || "";
    const expireIn = '2 days'
    const token = jwt.sign(payload,JWT_key,{expiresIn: expireIn})
    return token;
}