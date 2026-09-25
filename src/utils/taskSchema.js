import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().trim().min(1, "Task title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  category: z.enum(["study", "work", "personal", "shopping", "other"]),
  dueDate: z.string().optional(),
})