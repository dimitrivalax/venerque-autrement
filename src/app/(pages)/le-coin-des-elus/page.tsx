import type { Metadata } from "next";

import ElusBlog from "@/components/blocks/elus-blog/elus-blog";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Le coin des élu.e.s",
  description:
    "Articles rédigés par les élu·e·s du collectif Venerque Autrement : regards de terrain et travaux en cours.",
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
        "Le coin des élu.e.s du collectif citoyen Venerque Autrement.",
      url: baseUrl,
      inLanguage: "fr-FR",
    },
  ],
};

/**
 * Dedicated listing page for articles written by elected officials.
 */
const ElusPage = () => {
  return (
    <div>
      <ElusBlog />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
};

export default ElusPage;
