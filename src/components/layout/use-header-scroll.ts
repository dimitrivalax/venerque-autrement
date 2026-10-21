"use client";

import { useEffect, useState } from "react";

/**
 * Return type for {@link useHeaderScroll}.
 */
export type UseHeaderScrollResult = {
  readonly isScrolled: boolean;
};

/**
 * Tracks page scroll for sticky header styling.
 */
export function useHeaderScroll(): UseHeaderScrollResult {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return {
    isScrolled,
  };
}
