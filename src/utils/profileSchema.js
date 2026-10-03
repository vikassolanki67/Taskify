import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  avatar: z.enum(["Male", "Female", "Neutral"]),
 
})