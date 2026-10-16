import { z } from "zod";

/**
 * Schema for a published blog post metadata entry.
 */
export const blogPostSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  imageAlt: z.string().min(1),
  date: z.string().min(1),
  category: z.string().min(1),
  author: z.string().min(1),
  avatarUrl: z.string().min(1),
  readTime: z.number().int().positive(),
  featured: z.boolean(),
});

/**
 * Inferred type for a blog post metadata entry.
 */
export type BlogPost = z.infer<typeof blogPostSchema>;
