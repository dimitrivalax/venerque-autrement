import type { Metadata } from "next";

import Blog from "@/components/blocks/blog-component/blog-component";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles rédigés à partir des engagements de Venerque Autrement : valeurs, gouvernance locale et projet de territoire.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}#website`,
      name: "Venerque Autrement",
      description:
        "Articles et programme du collectif citoyen Venerque Autrement.",
      url: baseUrl,
      inLanguage: "fr-FR",
    },
  ],
};

/**
 * Dedicated listing page for main articles and programme content.
 */
const ArticlesPage = () => {
  return (
    <div>
      <Blog />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
};

export default ArticlesPage;
