"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";

import { buildPublishPayload, isHttpUrl } from "@/lib/blog-editor-payload";
import { blogEditorFormSchema } from "@/lib/schemas/blog-editor";

import type { BlockNoteEditorHandle } from "./blocknote-editor";

/**
 * Return type for {@link useBlogEditorForm}.
 */
export type UseBlogEditorFormResult = {
  readonly editorRef: RefObject<BlockNoteEditorHandle | null>;
  readonly fields: {
    readonly title: string;
    readonly description: string;
    readonly theme: string;
    readonly imageUrl: string;
    readonly readTime: string;
  };
  readonly setTitle: (value: string) => void;
  readonly setDescription: (value: string) => void;
  readonly setTheme: (value: string) => void;
  readonly setImageUrl: (value: string) => void;
  readonly setReadTime: (value: string) => void;
  readonly error: string | null;
  readonly isCopied: boolean;
  readonly showImagePreview: boolean;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

/**
 * Manages blog editor form state, Zod validation, and clipboard publish payload.
 */
export function useBlogEditorForm(): UseBlogEditorFormResult {
  const editorRef = useRef<BlockNoteEditorHandle>(null);
  const copiedTimeoutRef = useRef<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [readTime, setReadTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const showImagePreview = isHttpUrl(imageUrl);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = blogEditorFormSchema.safeParse({
      title,
      description,
      theme,
      imageUrl,
      readTime: readTime.trim() || undefined,
      body: editorRef.current?.isEmpty()
        ? ""
        : (editorRef.current?.getMarkdown() ?? ""),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Formulaire invalide.");

      return;
    }

    setError(null);

    try {
      await navigator.clipboard.writeText(buildPublishPayload(parsed.data));
      setIsCopied(true);

      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      copiedTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
        copiedTimeoutRef.current = null;
      }, 2000);
    } catch {
      setError("Impossible de copier dans le presse-papiers.");
    }
  }

  return {
    editorRef,
    fields: { title, description, theme, imageUrl, readTime },
    setTitle,
    setDescription,
    setTheme,
    setImageUrl,
    setReadTime,
    error,
    isCopied,
    showImagePreview,
    handleSubmit,
  };
}
