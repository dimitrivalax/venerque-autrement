import { z } from "zod";

/**
 * Fixed list of thematic categories for main blog posts.
 */
export const BLOG_CATEGORIES = [
  "Environnement / Transition + déchets + biodiversités",
  "Enfance jeunesse scolarité",
  "Mobilités/déplacements + Espace public Parc et jeux",
  "Vie démocratique du village",
  "Lien social + vie locale et économie / Attractivité / Fracture numérique",
  "La critique / le billet d’humeur",
] as const;

/**
 * Thematic category for a main blog post.
 */
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * Category reserved for articles published by elected officials.
 * These posts appear only on `/le-coin-des-elus`, not on the homepage listing.
 */
export const ELUS_CATEGORY = "élu.e.s" as const;

/**
 * Zod schema for a thematic blog category from the fixed list.
 */
export const blogCategorySchema = z.enum(BLOG_CATEGORIES, {
  error: "Choisissez un thème.",
});

/**
 * Zod schema for a published post category (thematic or élue.s).
 */
export const blogPostCategorySchema = z.union([
  blogCategorySchema,
  z.literal(ELUS_CATEGORY),
]);
