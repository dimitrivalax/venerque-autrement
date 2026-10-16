import { blogPosts, ELUS_CATEGORY } from "@/assets/data/blog-posts";
import type { BlogPost } from "@/lib/schemas/blog-post";

export { ELUS_CATEGORY };

/**
 * Returns whether a post belongs to the élu.e.s category.
 *
 * @param post - Blog post metadata entry
 */
export const isElusPost = (post: BlogPost): boolean =>
  post.category === ELUS_CATEGORY;

/**
 * Returns blog posts shown on the homepage articles section (excludes élu.e.s).
 */
export const getMainBlogPosts = (): BlogPost[] =>
  blogPosts.filter((post) => !isElusPost(post));

/**
 * Returns blog posts shown on the « Le coin des élu.e.s » page.
 */
export const getElusBlogPosts = (): BlogPost[] => blogPosts.filter(isElusPost);

/**
 * Returns the listing pool that matches a given post (élu.e.s or main).
 *
 * @param post - Reference post used to select the pool
 */
export const getBlogPostsPool = (post: BlogPost): BlogPost[] =>
  isElusPost(post) ? getElusBlogPosts() : getMainBlogPosts();
