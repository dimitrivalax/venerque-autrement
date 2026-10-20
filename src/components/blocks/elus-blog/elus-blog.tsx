"use client";

import { SearchIcon } from "lucide-react";

import { BlogGrid } from "@/components/blocks/blog-component/blog-component";
import { useBlogSearch } from "@/components/blocks/blog-component/use-blog-search";
import { Input } from "@/components/ui/input";
import { getElusBlogPosts } from "@/lib/blog-posts";

/**
 * Listing section for « Le coin des élu.e.s » with client-side search.
 */
const ElusBlog = () => {
  const sortedPosts = [...getElusBlogPosts()].sort((a, b) => b.id - a.id);

  const { searchQuery, setSearchQuery, filteredPosts } =
    useBlogSearch(sortedPosts);

  return (
    <section className="py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:space-y-14 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="section-eyebrow">Publications des élu·e·s</p>

          <h1 className="section-title">Le coin des élu.e.s</h1>

          <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
            Articles rédigés par les élu·e·s du collectif : regards de terrain,
            travaux en cours et échanges avec les habitant·es.
          </p>
        </div>

        <div className="relative max-w-md max-md:w-full">
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <SearchIcon className="size-4" />
            <span className="sr-only">Rechercher</span>
          </div>
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Rechercher un article…"
            aria-label="Rechercher un article"
            className="peer bg-background/80 h-11 rounded-xl border-border/60 px-9 shadow-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
          />
        </div>

        <BlogGrid
          posts={filteredPosts}
          emptyMessage="Aucun article des élu·e·s pour le moment."
        />
      </div>
    </section>
  );
};

export default ElusBlog;
