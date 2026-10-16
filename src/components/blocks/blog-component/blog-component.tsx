"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { SearchIcon, ArrowRightIcon, CalendarDaysIcon } from "lucide-react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getMainBlogPosts } from "@/lib/blog-posts";
import type { BlogPost } from "@/lib/schemas/blog-post";

export type { BlogPost };

const ALL_TAB = "Tous";

type BlogGridProps = {
  posts: BlogPost[];
  onCategoryClick?: (category: string) => void;
  emptyMessage?: string;
};

/**
 * Renders a responsive grid of blog post cards.
 *
 * @param posts - Posts to display
 * @param onCategoryClick - Optional callback when a category badge is selected
 * @param emptyMessage - Message shown when there are no posts
 */
export const BlogGrid = ({
  posts,
  onCategoryClick,
  emptyMessage = "Aucun article pour le moment.",
}: BlogGridProps) => {
  const router = useRouter();

  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground text-center text-lg">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="group bg-card/80 hover:border-primary/20 h-full overflow-hidden rounded-2xl border border-border/60 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card/60"
        >
          <CardContent className="space-y-3.5 p-5 sm:p-6">
            <Link
              href={`/blog-detail/${post.slug}`}
              className="bg-muted mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl sm:mb-6 sm:aspect-auto sm:h-52"
            >
              <img
                src={post.imageUrl}
                alt={post.imageAlt}
                className="max-h-full w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-muted-foreground flex items-center gap-1.5">
                <CalendarDaysIcon className="size-5" />
                <span>{post.date}</span>
              </div>
              <Badge
                className={`bg-primary/10 text-primary rounded-full border-0 text-sm ${onCategoryClick ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (!onCategoryClick) return;
                  onCategoryClick(post.category);
                  router.push(`/#category-${post.category}`);
                }}
              >
                {post.category}
              </Badge>
            </div>
            <h3 className="line-clamp-2 text-lg font-medium md:text-xl">
              <Link href={`/blog-detail/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="text-muted-foreground line-clamp-2">
              {post.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{post.author}</span>
              <Button
                size="icon"
                className="group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent"
                asChild
              >
                <Link href={`/blog-detail/${post.slug}`}>
                  <ArrowRightIcon className="size-4 -rotate-45" />
                  <span className="sr-only">Lire : {post.title}</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

/**
 * Blog listing section with category tabs and client-side search.
 */
const Blog = () => {
  const [selectedTab, setSelectedTab] = useState(ALL_TAB);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const sortedPosts = [...getMainBlogPosts()].sort((a, b) => b.id - a.id);

  const uniqueCategories = [
    ...new Set(sortedPosts.map((post) => post.category)),
  ];

  const categories = [ALL_TAB, ...uniqueCategories.sort()];

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesSearch = (post: BlogPost) => {
    if (!normalizedQuery) return true;

    return (
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery) ||
      post.category.toLowerCase().includes(normalizedQuery) ||
      post.author.toLowerCase().includes(normalizedQuery)
    );
  };

  const filteredPosts = sortedPosts.filter(matchesSearch);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);

    if (tab === ALL_TAB) {
      router.push("#categories");
    }
  };

  return (
    <section className="py-12 sm:py-20 lg:py-28" id="categories">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:space-y-14 lg:px-8">
        <div className="max-w-3xl space-y-4">
          {selectedTab === ALL_TAB && (
            <p className="section-eyebrow">Publications</p>
          )}
          {selectedTab !== ALL_TAB && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/#categories">Articles</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedTab}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <h2 className="section-title">
            Nos articles & le programme en détail
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
            Articles rédigés à partir de nos engagements : valeurs, gouvernance
            locale et projet de territoire.
          </p>
        </div>

        <Tabs
          defaultValue={ALL_TAB}
          value={selectedTab}
          onValueChange={handleTabChange}
          className="gap-8 lg:gap-12"
        >
          <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            <ScrollArea className="bg-muted/80 w-full rounded-xl border border-border/50 sm:w-auto">
              <TabsList className="h-auto gap-0.5 bg-transparent p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    id={`category-${category}`}
                    className="data-[state=active]:bg-background cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm data-[state=active]:shadow-sm"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="relative max-md:w-full md:min-w-[220px] lg:min-w-[280px]">
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
          </div>

          <TabsContent value={ALL_TAB}>
            <BlogGrid posts={filteredPosts} onCategoryClick={handleTabChange} />
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category} value={category}>
              <BlogGrid
                posts={filteredPosts.filter(
                  (post) => post.category === category,
                )}
                onCategoryClick={handleTabChange}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Blog;
