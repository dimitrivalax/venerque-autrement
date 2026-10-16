import type { ReactNode } from "react";

/**
 * A single navigation link entry.
 */
export type NavigationItem = {
  readonly title: string;
  readonly href: string;
};

/**
 * A navigation section that is either a direct link or a group of items.
 */
export type NavigationSection = {
  readonly title: string;
  readonly icon?: ReactNode;
} & (
  | {
      readonly items: NavigationItem[];
      readonly href?: never;
    }
  | {
      readonly items?: never;
      readonly href: string;
    }
);
