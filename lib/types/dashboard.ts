import z from "zod";

export const createProject = z.object({
  title: z.string(),
  description: z.string(),
});

export type createProject= z.infer<typeof createProject>