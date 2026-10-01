import createMDX from '@next/mdx'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: process.env.BASEPATH ?? '',
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // async redirects() {
  //   return [{ source: '/contact-us', destination: '/contact', permanent: true }]
  // }
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/
})

export default withMDX(nextConfig)
