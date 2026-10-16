import { describe, expect, it } from "vitest";

import { blogPostSchema } from "@/lib/schemas/blog-post";
import { blogPosts } from "@/assets/data/blog-posts";

describe("blogPostSchema", () => {
  it("accepts every published blog post entry", () => {
    for (const post of blogPosts) {
      expect(blogPostSchema.parse(post)).toEqual(post);
    }
  });

  it("rejects an incomplete post", () => {
    const result = blogPostSchema.safeParse({
      id: 1,
      slug: "test",
    });

    expect(result.success).toBe(false);
  });
});
