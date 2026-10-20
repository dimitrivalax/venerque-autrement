"use client";

import { useEffect, useState } from "react";

/**
 * Return type for {@link useHeaderScroll}.
 */
export type UseHeaderScrollResult = {
  readonly isScrolled: boolean;
  readonly activeSection: string;
};

/**
 * Tracks page scroll for sticky header styling and active section highlighting.
 */
export function useHeaderScroll(): UseHeaderScrollResult {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let nextSectionId = "";

      for (const section of sections) {
        const element = section as HTMLElement;
        const { offsetTop, offsetHeight } = element;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          nextSectionId = element.id;
          break;
        }
      }

      setActiveSection((previous) =>
        previous === nextSectionId ? previous : nextSectionId,
      );
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isScrolled,
    activeSection,
  };
}
