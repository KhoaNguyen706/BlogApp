import { genSaltSync,hashSync,compareSync } from "bcrypt-ts";

export  function CreatehashedPassword(password:string):string{
    const salt = genSaltSync(10); // 100 takes too long
    const hashedpassword :string = hashSync(password,salt);
    return hashedpassword;
}

export function CheckPassword(hashedpassword:string,password:string):boolean{
    const result = compareSync(password,hashedpassword);
    return result;
}