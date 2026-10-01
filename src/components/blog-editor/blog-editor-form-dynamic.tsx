'use client'

import dynamic from 'next/dynamic'

const BlogEditorForm = dynamic(() => import('./blog-editor-form'), {
  ssr: false,
  loading: () => (
    <div className='border-input bg-muted/40 text-muted-foreground flex min-h-96 items-center justify-center rounded-md border text-sm'>
      Chargement de l’éditeur…
    </div>
  )
})

export default function BlogEditorFormDynamic() {
  return <BlogEditorForm />
}
