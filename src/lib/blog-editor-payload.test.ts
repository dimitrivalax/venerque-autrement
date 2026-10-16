import { describe, expect, it } from "vitest";

import {
  buildPublishPayload,
  estimateReadTime,
  slugify,
} from "@/lib/blog-editor-payload";
import { blogEditorFormSchema } from "@/lib/schemas/blog-editor";

describe("slugify", () => {
  it("normalizes accents and punctuation", () => {
    expect(slugify("Raison d’être du collectif")).toBe(
      "raison-d-etre-du-collectif",
    );
  });
});

describe("estimateReadTime", () => {
  it("returns at least one minute", () => {
    expect(estimateReadTime("court")).toBe(1);
  });
});

describe("blogEditorFormSchema + buildPublishPayload", () => {
  it("validates and builds a publish payload", () => {
    const parsed = blogEditorFormSchema.parse({
      title: "Titre test",
      description: "Description test",
      theme: "Valeurs",
      author: "Collectif",
      imageUrl: "https://exemple.fr/image.png",
      body: "## Intro\n\nContenu de test.",
    });

    const payload = buildPublishPayload(parsed);

    expect(payload).toContain("src/content/titre-test.mdx");
    expect(payload).toContain("slug: 'titre-test'");
    expect(payload).toContain("## Intro");
  });

  it("rejects a non-http image URL", () => {
    const result = blogEditorFormSchema.safeParse({
      title: "Titre",
      description: "Description",
      theme: "Valeurs",
      author: "Collectif",
      imageUrl: "ftp://exemple.fr/image.png",
      body: "Contenu",
    });

    expect(result.success).toBe(false);
  });
});
