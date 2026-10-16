import { withBasePath } from "@/lib/paths";
import type { BlogEditorFormValues } from "@/lib/schemas/blog-editor";

const DEFAULT_AVATAR_URL = withBasePath("/images/logo-venerque-autrement.png");

/**
 * Returns whether a string is an http(s) URL.
 *
 * @param value - Candidate URL string
 */
export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Converts a title into a URL-safe slug.
 *
 * @param value - Source title
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Formats a date in French long form.
 *
 * @param date - Date to format
 */
export function formatFrenchDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Escapes a string for embedding inside a single-quoted TypeScript literal.
 *
 * @param value - Raw string value
 */
export function escapeTsString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

/**
 * Estimates reading time in minutes from markdown body length.
 *
 * @param body - Article body text
 */
export function estimateReadTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Builds the clipboard payload used to publish a new blog post.
 *
 * @param values - Validated editor form values
 * @returns Multi-section text ready to paste into MDX + blog-posts data
 */
export function buildPublishPayload(values: BlogEditorFormValues): string {
  const slug = slugify(values.title) || "nouvel-article";

  const resolvedReadTime = values.readTime
    ? Number(values.readTime)
    : estimateReadTime(values.body);

  const date = formatFrenchDate(new Date());
  const imageAlt = `Illustration — ${values.title}`;
  const mdxContent = values.body.trim();

  const blogPostEntry = `{
  id: /* prochain id */,
  slug: '${escapeTsString(slug)}',
  title: '${escapeTsString(values.title)}',
  description:
    '${escapeTsString(values.description)}',
  imageUrl: '${escapeTsString(values.imageUrl)}',
  imageAlt: '${escapeTsString(imageAlt)}',
  date: '${escapeTsString(date)}',
  category: '${escapeTsString(values.theme)}',
  author: '${escapeTsString(values.author)}',
  avatarUrl: '${DEFAULT_AVATAR_URL}',
  readTime: ${resolvedReadTime},
  featured: false
}`;

  return [
    `Nouvel article : ${values.title}`,
    "",
    "========== 1. CONTENU MDX ==========",
    `Créer le fichier : src/content/${slug}.mdx`,
    "Coller exactement le contenu ci-dessous :",
    "",
    mdxContent,
    "",
    "========== 2. MÉTADONNÉES blog-posts.ts ==========",
    "Coller cet objet dans le tableau blogPosts de src/assets/data/blog-posts.ts",
    "(remplacer /* prochain id */ par le prochain id numérique) :",
    "",
    blogPostEntry,
  ].join("\n");
}
