"use client";

import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

import BlockNoteEditor from "./blocknote-editor";
import { useBlogEditorForm } from "./use-blog-editor-form";

const RECIPIENT_EMAIL = "dimitre@free.fr";

/**
 * Client form that validates article metadata and copies a publish-ready payload.
 */
export default function BlogEditorForm() {
  const {
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
  } = useBlogEditorForm();

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Titre de l’article"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (accroche)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Courte description affichée sur la carte de l’article"
          className="min-h-20 resize-y"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="theme">Thème</Label>
        <Select value={theme || undefined} onValueChange={setTheme}>
          <SelectTrigger id="theme" className="w-full">
            <SelectValue placeholder="Choisir un thème" />
          </SelectTrigger>
          <SelectContent position="popper">
            {BLOG_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="imageUrl">URL de la photo</Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://…"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="readTime">Temps de lecture (optionnel)</Label>
          <Input
            id="readTime"
            type="number"
            min={1}
            step={1}
            value={readTime}
            onChange={(event) => setReadTime(event.target.value)}
            placeholder="ex. 5 (sinon estimé)"
          />
        </div>
      </div>

      {showImagePreview ? (
        <div className="bg-muted flex justify-center rounded-md p-4">
          <img
            src={imageUrl}
            alt="Aperçu de la photo de l’article"
            className="max-h-48 w-full max-w-md object-contain"
          />
        </div>
      ) : null}

      <div className="relative left-1/2 w-[80vw] max-w-[80vw] -translate-x-1/2 space-y-2">
        <Label>Corps de l’article</Label>
        <BlockNoteEditor ref={editorRef} />
      </div>

      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg" className="sm:flex-1">
          {isCopied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
          {isCopied ? "Contenu copié" : "Copier pour publication"}
        </Button>
      </div>
    </form>
  );
}
