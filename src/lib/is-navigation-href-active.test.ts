import { describe, expect, it } from "vitest";

import { isNavigationHrefActive } from "@/lib/is-navigation-href-active";

describe("isNavigationHrefActive", () => {
  it("marks hash home links active only on the site root", () => {
    expect(isNavigationHrefActive("/#home", "/")).toBe(true);
    expect(isNavigationHrefActive("/#", "/")).toBe(true);
    expect(isNavigationHrefActive("/#home", "/articles")).toBe(false);
  });

  it("marks path links active on an exact match", () => {
    expect(isNavigationHrefActive("/articles", "/articles")).toBe(true);
    expect(isNavigationHrefActive("/contact", "/contact")).toBe(true);
    expect(isNavigationHrefActive("/articles", "/contact")).toBe(false);
  });

  it("marks path links active for nested routes", () => {
    expect(isNavigationHrefActive("/articles", "/articles/foo")).toBe(true);
    expect(
      isNavigationHrefActive("/le-coin-des-elus", "/le-coin-des-elus"),
    ).toBe(true);
  });

  it("does not treat a similar prefix as a match", () => {
    expect(isNavigationHrefActive("/articles", "/articles-archive")).toBe(
      false,
    );
  });
});
