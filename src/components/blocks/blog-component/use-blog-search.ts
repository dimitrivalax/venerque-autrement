"use client";

import { useState } from "react";

import type { BlogPost } from "@/lib/schemas/blog-post";

/**
 * Options for {@link useBlogSearch}.
 */
export type UseBlogSearchOptions = {

  /**
   * When true, also match the post category against the query.
   */
  readonly includeCategory?: boolean;
};

/**
 * Return type for {@link useBlogSearch}.
 */
export type UseBlogSearchResult = {
  readonly searchQuery: string;
  readonly setSearchQuery: (value: string) => void;
  readonly filteredPosts: BlogPost[];
};

/**
 * Returns whether a post matches the normalized search query.
 *
 * @param post - Blog post to test
 * @param normalizedQuery - Lowercased trimmed query (empty matches all)
 * @param includeCategory - Whether category is included in the match
 */
export function matchesBlogSearch(
  post: BlogPost,
  normalizedQuery: string,
  includeCategory = false,
): boolean {
  if (!normalizedQuery) return true;

  const matchesCore =
    post.title.toLowerCase().includes(normalizedQuery) ||
    post.description.toLowerCase().includes(normalizedQuery) ||
    post.author.toLowerCase().includes(normalizedQuery);

  if (matchesCore) return true;

  if (includeCategory) {
    return post.category.toLowerCase().includes(normalizedQuery);
  }

  return false;
}

/**
 * Client-side search state and filtered posts for blog listings.
 *
 * @param posts - Posts to filter (caller owns sorting)
 * @param options - Search options
 */
export function useBlogSearch(
  posts: BlogPost[],
  options: UseBlogSearchOptions = {},
): UseBlogSearchResult {
  const { includeCategory = false } = options;
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = posts.filter((post) =>
    matchesBlogSearch(post, normalizedQuery, includeCategory),
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredPosts,
  };
}
