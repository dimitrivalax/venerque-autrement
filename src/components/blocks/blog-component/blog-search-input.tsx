"use client";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

type BlogSearchInputProps = {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly ariaLabel?: string;
};

/**
 * Controlled search field for blog listing pages.
 *
 * @param value - Current search query
 * @param onChange - Called when the query changes
 * @param placeholder - Input placeholder text
 * @param ariaLabel - Accessible label for the input
 */
export const BlogSearchInput = ({
  value,
  onChange,
  placeholder = "Rechercher un article…",
  ariaLabel = "Rechercher un article",
}: BlogSearchInputProps) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
        <SearchIcon className="size-4" />
        <span className="sr-only">Rechercher</span>
      </div>
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="peer bg-background/80 h-11 rounded-xl border-border/60 px-9 shadow-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
      />
    </div>
  );
};
