import { z } from "zod";

export const createLinkSchema = z.object({
  url: z
    .string()
    .url("Invalid URL format.")
    .regex(/^https?:\/\//, "URL must start with http:// or https://")
    .regex(/^[^\s]+$/, "URL must not contain spaces."),
  shortLink: z
    .string()
    .min(4, "Short link must be at least 4 characters.")
    .regex(/^[a-zA-Z0-9-_]+$/, "Short link can only contain letters, numbers, hyphens, and underscores.")
    .regex(/^[^\s]+$/, "Short link must not contain spaces."),
  description: z
    .string()
    .max(160, "Description must be at most 160 characters.")
    .optional()
    
})
