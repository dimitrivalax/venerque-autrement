"use client";

import { useEffect, useState } from "react";

/**
 * A heading entry in the table of contents.
 */
export type TocItem = {
  id: string;
  title: string;
  level: number;
  icon?: string;
};

/**
 * A main (H2) heading with its nested (H3) subtitles.
 */
export type TocGroup = {
  main: TocItem;
  subs: TocItem[];
};

/**
 * Return type for {@link useDynamicToc}.
 */
export type UseDynamicTocResult = {
  readonly tocItems: TocItem[];
  readonly activeId: string;
  readonly groupedItems: TocGroup[];
  readonly handleClick: (id: string) => void;
};

/**
 * Groups flat TOC items into H2 parents with following H3 children.
 *
 * @param tocItems - Flat list of heading items
 */
function groupTocItems(tocItems: TocItem[]): TocGroup[] {
  const groupedItems: TocGroup[] = [];
  let currentGroup: TocGroup | null = null;

  tocItems.forEach((item) => {
    if (item.level === 2) {
      if (currentGroup) {
        groupedItems.push(currentGroup);
      }

      currentGroup = { main: item, subs: [] };
    } else if (item.level === 3 && currentGroup) {
      currentGroup.subs.push(item);
    }
  });

  if (currentGroup) {
    groupedItems.push(currentGroup);
  }

  return groupedItems;
}

/**
 * Extracts headings from a content container, tracks the active section, and
 * scrolls to a heading on click.
 *
 * @param contentContainerId - DOM id of the content root (default `"content"`)
 */
export function useDynamicToc(
  contentContainerId = "content",
): UseDynamicTocResult {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const extractHeadings = () => {
      const container = document.getElementById(contentContainerId);

      if (!container) return [];

      const headings = container.querySelectorAll("h2, h3");
      const items: TocItem[] = [];

      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        const title = element.textContent?.trim();

        if (!title) return;

        let id = element.id;

        if (!id) {
          id = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
          element.id = id;
        }

        const level = element.tagName === "H2" ? 2 : 3;

        items.push({ id, title, level });
      });

      return items;
    };

    const timer = setTimeout(() => {
      const items = extractHeadings();

      setTocItems(items);

      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [contentContainerId]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    const container = document.getElementById(contentContainerId);

    if (container) {
      const headings = container.querySelectorAll("h2, h3");

      headings.forEach((heading) => observer.observe(heading));
    }

    return () => observer.disconnect();
  }, [contentContainerId, tocItems]);

  function handleClick(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }

  const groupedItems = groupTocItems(tocItems);

  return {
    tocItems,
    activeId,
    groupedItems,
    handleClick,
  };
}
