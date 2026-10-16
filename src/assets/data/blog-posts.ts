import type { BlogPost } from "@/lib/schemas/blog-post";
import { withBasePath } from "@/lib/paths";

const author = "Collectif Venerque Autrement";
const logoUrl = withBasePath("/images/logo-venerque-autrement.png");
const avatarUrl = logoUrl;

/**
 * Category reserved for articles published by elected officials.
 * These posts appear only on `/le-coin-des-elus`, not on the homepage listing.
 */
export const ELUS_CATEGORY = "élu.e.s";

/**
 * Published blog post metadata used across listing and detail pages.
 */
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "bienvenue-venerque-autrement",
    title: "Bienvenue dans le collectif Venerque Autrement",
    description:
      "Liste participative et citoyenne : nos valeurs, notre méthode et nos principes d’action pour un autre Venerque.",
    imageUrl: logoUrl,
    imageAlt: "Logo Venerque Autrement",
    date: "15 mars 2026",
    category: "Valeurs",
    author,
    avatarUrl,
    readTime: 4,
    featured: false,
  },
  {
    id: 2,
    slug: "notre-programme",
    title: "Notre programme pour Venerque",
    description:
      "Village apaisé, protégé, solidaire, tourné vers demain, respectueux du vivant, entretenu et dynamique.",
    imageUrl: logoUrl,
    imageAlt: "Logo Venerque Autrement",
    date: "22 mars 2026",
    category: "Programme",
    author,
    avatarUrl,
    readTime: 7,
    featured: false,
  },
  {
    id: 3,
    slug: "raison-detre-collectif",
    title: "La raison d’être du collectif citoyen",
    description:
      "Constats, engagements et valeurs : pour une démocratie locale participative et transparente à Venerque.",
    imageUrl: logoUrl,
    imageAlt: "Logo Venerque Autrement",
    date: "28 mars 2026",
    category: "Valeurs",
    author,
    avatarUrl,
    readTime: 8,
    featured: false,
  },
  {
    id: 4,
    slug: "mairie-ecoute-transparence",
    title: "Une mairie à l’écoute, ouverte et transparente",
    description:
      "Communication, assemblées citoyennes, binômes d’élu·es et transparence des compte-rendus.",
    imageUrl: logoUrl,
    imageAlt: "Logo Venerque Autrement",
    date: "31 mars 2026",
    category: "Gouvernance",
    author,
    avatarUrl,
    readTime: 5,
    featured: false,
  },
  {
    id: 5,
    slug: "coin-des-elus-exemple",
    title: "Bienvenue dans le coin des élu.e.s",
    description:
      "Un espace où les élu·e·s du collectif partagent leurs regards, leurs travaux et leurs échanges avec les habitant·es.",
    imageUrl: logoUrl,
    imageAlt: "Logo Venerque Autrement",
    date: "5 avril 2026",
    category: ELUS_CATEGORY,
    author: "Élu·e Venerque Autrement",
    avatarUrl,
    readTime: 3,
    featured: false,
  },
];
