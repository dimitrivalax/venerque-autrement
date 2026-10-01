/**
 * GitHub Pages project path. Keep in sync with `basePath` in next.config.ts.
 * Use `||` (not `??`) so an empty env string still falls back.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/venerque-autrement'

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
