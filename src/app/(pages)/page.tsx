import { blogPosts } from '@/assets/data/blog-posts'

import HeroSection from '@/components/blocks/hero-section/hero-section'
import Blog from '@/components/blocks/blog-component/blog-component'
import CTA from '@/components/blocks/cta-section/cta-section'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      name: 'Venerque Autrement',
      description:
        'Collectif citoyen et liste participative pour un Venerque plus solidaire, respectueux du vivant et démocratique.',
      url: baseUrl,
      inLanguage: 'fr-FR'
    }
  ]
}

const Home = () => {
  return (
    <div>
      <HeroSection blogData={blogPosts} />
      <Blog />
      <CTA />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}

export default Home
