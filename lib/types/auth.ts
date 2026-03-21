import { string, z } from "zod";

export const signupTypes = z.object({
  name: string().max(30, "Name can't be more than 30 Char").min(3,"Name is too short"),
  email: string().email().max(50, "Email can't be more than 30 Char"),
  password: string()
    .max(12, "Password can't be more than 12 char")
    .min(4, "Minimum password should be 4 char"),
});

export const loginTypes = z.object({
  email: string().email(),
  password: string().min(4,"Minimum password should be more than 4 char"),
});

export type SignupType = z.infer<typeof signupTypes>;
export type loginType = z.infer<typeof loginTypes>;
