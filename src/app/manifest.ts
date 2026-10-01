import type { MetadataRoute } from 'next'

import { withBasePath } from '@/lib/paths'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Venerque Autrement',
    short_name: 'Venerque Autrement',
    description:
      'Liste participative et citoyenne pour un Venerque plus solidaire, respectueux du vivant et démocratique.',
    start_url: withBasePath('/'),
    scope: withBasePath('/'),
    display: 'standalone',
    background_color: '#eaedf8',
    theme_color: '#111826',
    orientation: 'portrait-primary',
    categories: ['news', 'education'],
    icons: [
      {
        src: withBasePath('/favicon/android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: withBasePath('/favicon/android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: withBasePath('/favicon/apple-touch-icon.png'),
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: withBasePath('/favicon/favicon-32x32.png'),
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: withBasePath('/favicon/favicon-16x16.png'),
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    screenshots: [
      {
        src: withBasePath('/images/og-image.png'),
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide'
      }
    ],
    shortcuts: [
      {
        name: 'Home',
        short_name: 'Home',
        description: 'Go to homepage',
        url: withBasePath('/')
      }
    ]
  }
}
