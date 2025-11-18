import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(200, { message: "Title must be less than 200 characters" }),
  description: z.string().trim().max(1000, { message: "Description must be less than 1000 characters" }).optional(),
});

export type TodoInput = z.infer<typeof todoSchema>;
