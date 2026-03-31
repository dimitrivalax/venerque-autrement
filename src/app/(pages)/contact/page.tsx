import ContactUs from '@/components/blocks/contact-us/contact-us'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      name: 'Venerque Autrement',
      description: 'Contact du collectif citoyen Venerque Autrement.',
      url: baseUrl,
      inLanguage: 'fr-FR'
    }
  ]
}

const ContactPage = () => {
  return (
    <div>
      <ContactUs />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}

export default ContactPage
