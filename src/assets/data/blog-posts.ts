import { ELUS_CATEGORY } from "@/lib/blog-categories";
import type { BlogPost } from "@/lib/schemas/blog-post";
import { withBasePath } from "@/lib/paths";

export { ELUS_CATEGORY };

const author = "Collectif Venerque Autrement";
const logoUrl = withBasePath("/images/logo-venerque-autrement.png");
const avatarUrl = logoUrl;

const DEMOCRATIC_LIFE_CATEGORY = "Vie démocratique du village" as const;

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
    category: DEMOCRATIC_LIFE_CATEGORY,
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
    category: DEMOCRATIC_LIFE_CATEGORY,
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
    category: DEMOCRATIC_LIFE_CATEGORY,
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
    category: DEMOCRATIC_LIFE_CATEGORY,
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
  {
    id: 6,
    slug: "elus-conseil-municipal",
    title: "Les élu·es Venerque Autrement au conseil municipal",
    description:
      "Commissions, répartition des votes, permanences et engagements de nos élu·es au conseil municipal.",
    imageUrl: withBasePath("/images/nos-conseillers-municipaux.jpeg"),
    imageAlt:
      "Les conseiller·ère·s municipaux Venerque Autrement devant la mairie",
    date: "14 octobre 2026",
    category: ELUS_CATEGORY,
    author: "Élu·e Venerque Autrement",
    avatarUrl,
    readTime: 5,
    featured: false,
    pdfUrl: withBasePath("/pdf/VA-Bulletin_2026_A4_1410.pdf"),
  },
];
