import type { ImageLoaderProps } from 'next/image'

import { withBasePath } from '@/lib/paths'

/** Required for static export under a GitHub Pages basePath. */
export default function imageLoader({ src }: ImageLoaderProps): string {
  return withBasePath(src)
}
