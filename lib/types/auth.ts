import {string, z} from "zod"

export const signupTypes= z.object({
    name: string().max(30,"Name can't be more than 30 Char"),
    email:string().email().max(20,"Email can't be more than 30 Char"),
    password: string().max(12,"Password can't be more than 12 char")
})
