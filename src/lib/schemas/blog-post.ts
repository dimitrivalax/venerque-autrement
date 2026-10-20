import { z } from "zod";

import { blogPostCategorySchema } from "@/lib/blog-categories";

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
  category: blogPostCategorySchema,
  author: z.string().min(1),
  avatarUrl: z.string().min(1),
  readTime: z.number().int().positive(),
  featured: z.boolean(),
  pdfUrls: z.array(z.string().min(1)).min(1).optional(),
});

/**
 * Inferred type for a blog post metadata entry.
 */
export type BlogPost = z.infer<typeof blogPostSchema>;
