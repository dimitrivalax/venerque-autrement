import createMDX from '@next/mdx'

import type { NextConfig } from 'next'

// Custom domain (venerque-autrement.fr) → empty. Project Pages: BASEPATH=/venerque-autrement
const basePath = process.env.BASEPATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts'
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
})

export default withMDX(nextConfig)
