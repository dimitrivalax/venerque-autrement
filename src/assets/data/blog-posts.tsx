import type { BlogPost } from '@/components/blocks/blog-component/blog-component'
import { withBasePath } from '@/lib/paths'

const author = 'Collectif Venerque Autrement'
const logoUrl = withBasePath('/images/logo-venerque-autrement.png')
const avatarUrl = logoUrl

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'bienvenue-venerque-autrement',
    title: 'Bienvenue dans le collectif Venerque Autrement',
    description:
      'Liste participative et citoyenne : nos valeurs, notre méthode et nos principes d’action pour un autre Venerque.',
    imageUrl: logoUrl,
    imageAlt: 'Logo Venerque Autrement',
    date: '15 mars 2026',
    category: 'Valeurs',
    author,
    avatarUrl,
    readTime: 4,
    featured: false
  },
  {
    id: 2,
    slug: 'notre-programme',
    title: 'Notre programme pour Venerque',
    description:
      'Village apaisé, protégé, solidaire, tourné vers demain, respectueux du vivant, entretenu et dynamique.',
    imageUrl: logoUrl,
    imageAlt: 'Logo Venerque Autrement',
    date: '22 mars 2026',
    category: 'Programme',
    author,
    avatarUrl,
    readTime: 7,
    featured: false
  },
  {
    id: 3,
    slug: 'raison-detre-collectif',
    title: 'La raison d’être du collectif citoyen',
    description:
      'Constats, engagements et valeurs : pour une démocratie locale participative et transparente à Venerque.',
    imageUrl: logoUrl,
    imageAlt: 'Logo Venerque Autrement',
    date: '28 mars 2026',
    category: 'Valeurs',
    author,
    avatarUrl,
    readTime: 8,
    featured: false
  },
  {
    id: 4,
    slug: 'mairie-ecoute-transparence',
    title: 'Une mairie à l’écoute, ouverte et transparente',
    description:
      'Communication, assemblées citoyennes, binômes d’élu·es et transparence des compte-rendus.',
    imageUrl: logoUrl,
    imageAlt: 'Logo Venerque Autrement',
    date: '31 mars 2026',
    category: 'Gouvernance',
    author,
    avatarUrl,
    readTime: 5,
    featured: false
  }
]
