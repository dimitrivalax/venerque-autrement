/**
 * Whether a navigation href should appear active for the current pathname.
 *
 * Hash home links (`/#`, `/#home`) match the site root. Other links match
 * exactly or as a parent of the current path (e.g. `/articles` for
 * `/articles/foo`).
 *
 * @param href - Navigation target, possibly including a hash
 * @param pathname - Current pathname from the router (no hash)
 */
export function isNavigationHrefActive(
  href: string,
  pathname: string,
): boolean {
  const pathOnly = href.split("#")[0] ?? "";
  const normalizedHref = pathOnly === "" ? "/" : pathOnly;
  const currentPath = pathname === "" ? "/" : pathname;

  if (normalizedHref === "/") {
    return currentPath === "/";
  }

  return (
    currentPath === normalizedHref ||
    currentPath.startsWith(`${normalizedHref}/`)
  );
}
