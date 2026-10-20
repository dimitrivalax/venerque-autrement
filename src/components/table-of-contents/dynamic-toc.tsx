"use client";

import { useDynamicToc } from "./use-dynamic-toc";

type DynamicTocProps = {
  contentContainerId?: string;
};

/**
 * Sticky table of contents built from H2/H3 headings in the content container.
 *
 * @param contentContainerId - DOM id of the content root (default `"content"`)
 */
export const DynamicToc = ({
  contentContainerId = "content",
}: DynamicTocProps) => {
  const { tocItems, activeId, groupedItems, handleClick } =
    useDynamicToc(contentContainerId);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24">
      <h3 className="text-foreground mb-3.5 font-medium">Sur cette page</h3>
      <nav>
        <ul className="space-y-3">
          {groupedItems.map((group, groupIndex) => (
            <li key={`toc-group-${group.main.id}-${groupIndex}`}>
              <button
                onClick={() => handleClick(group.main.id)}
                className={`flex items-start gap-2 text-left transition-colors ${
                  activeId === group.main.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`mt-2.5 inline-block h-0.5 w-3 shrink-0 transition-colors ${
                    activeId === group.main.id ? "bg-primary" : "bg-primary/40"
                  }`}
                ></span>
                <span>{group.main.title}</span>
              </button>

              {group.subs.length > 0 && (
                <ul className="mt-3 ml-5 space-y-3">
                  {group.subs.map((subtitle, subIndex) => (
                    <li
                      key={`toc-sub-${subtitle.id}-${groupIndex}-${subIndex}`}
                    >
                      <button
                        onClick={() => handleClick(subtitle.id)}
                        className={`flex items-start gap-2 text-left transition-colors ${
                          activeId === subtitle.id
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`mt-2.5 inline-block h-0.5 w-3 shrink-0 transition-colors ${
                            activeId === subtitle.id
                              ? "bg-primary"
                              : "bg-primary/40"
                          }`}
                        ></span>
                        <span>{subtitle.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
