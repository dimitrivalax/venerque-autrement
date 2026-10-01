import type { Metadata } from 'next'

import BlogEditorFormDynamic from '@/components/blog-editor/blog-editor-form-dynamic'

export const metadata: Metadata = {
  title: 'Éditeur d’article',
  description: 'Rédiger un article et l’envoyer par e-mail en Markdown.',
  robots: {
    index: false,
    follow: false
  }
}

export default function EditeurArticlePage() {
  return (
    <section className='py-8 sm:pt-16 sm:pb-24'>
      <div className='mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8'>
        <div className='space-y-3'>
          <h1 className='text-foreground text-3xl font-semibold sm:text-4xl'>Écrire un article</h1>
          <p className='text-muted-foreground text-base sm:text-lg'>
            Rédigez votre billet ci-dessous, puis envoyez-le par e-mail en Markdown pour publication.
          </p>
        </div>

        <BlogEditorFormDynamic />
      </div>
    </section>
  )
}
