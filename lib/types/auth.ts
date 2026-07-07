import { string, z } from "zod";

export const loginTypes = z.object({
  email: string().email(),
  password: string().min(4,"Minimum password should be more than 4 char"),
});

export type loginType = z.infer<typeof loginTypes>;
