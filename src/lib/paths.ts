/**
 * Deployment base path. Keep in sync with `basePath` in next.config.ts.
 * Empty on the custom domain; set via NEXT_PUBLIC_BASE_PATH / BASEPATH for project Pages.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/**
 * Prefix a site-root asset path with the deployment basePath.
 * Use for raw `<img>`, metadata, and manifest URLs.
 * For `next/image`, prefer plain `/…` paths — the custom loader applies the prefix.
 */
export function withBasePath(path: string): string {
  if (
    !path ||
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  if (!basePath) return normalized
  if (normalized === basePath || normalized.startsWith(`${basePath}/`)) {
    return normalized
  }

  return `${basePath}${normalized}`
}
