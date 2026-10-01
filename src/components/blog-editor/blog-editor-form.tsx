'use client'

import { useRef, useState } from 'react'
import { CheckIcon, CopyIcon, MailIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { withBasePath } from '@/lib/paths'

import BlockNoteEditor, { type BlockNoteEditorHandle } from './blocknote-editor'

const RECIPIENT_EMAIL = 'dimitre@free.fr'
const DEFAULT_AVATAR_URL = withBasePath('/images/logo-venerque-autrement.png')

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatFrenchDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

function escapeTsString(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function estimateReadTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function buildPublishPayload({
  title,
  description,
  theme,
  author,
  imageUrl,
  readTime,
  body
}: {
  title: string
  description: string
  theme: string
  author: string
  imageUrl: string
  readTime: string
  body: string
}) {
  const slug = slugify(title) || 'nouvel-article'
  const resolvedReadTime = readTime ? Number(readTime) : estimateReadTime(body)
  const date = formatFrenchDate(new Date())
  const imageAlt = `Illustration — ${title}`

  const mdxContent = body.trim()

  const blogPostEntry = `{
  id: /* prochain id */,
  slug: '${escapeTsString(slug)}',
  title: '${escapeTsString(title)}',
  description:
    '${escapeTsString(description)}',
  imageUrl: '${escapeTsString(imageUrl)}',
  imageAlt: '${escapeTsString(imageAlt)}',
  date: '${escapeTsString(date)}',
  category: '${escapeTsString(theme)}',
  author: '${escapeTsString(author)}',
  avatarUrl: '${DEFAULT_AVATAR_URL}',
  readTime: ${resolvedReadTime},
  featured: false
}`

  return [
    `Nouvel article : ${title}`,
    '',
    '========== 1. CONTENU MDX ==========',
    `Créer le fichier : src/content/${slug}.mdx`,
    'Coller exactement le contenu ci-dessous :',
    '',
    mdxContent,
    '',
    '========== 2. MÉTADONNÉES blog-posts.tsx ==========',
    'Coller cet objet dans le tableau blogPosts de src/assets/data/blog-posts.tsx',
    '(remplacer /* prochain id */ par le prochain id numérique) :',
    '',
    blogPostEntry
  ].join('\n')
}

export default function BlogEditorForm() {
  const editorRef = useRef<BlockNoteEditorHandle>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [theme, setTheme] = useState('')
  const [author, setAuthor] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [readTime, setReadTime] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const showImagePreview = isHttpUrl(imageUrl)

  function validateAndBuildPayload() {
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()
    const trimmedTheme = theme.trim()
    const trimmedAuthor = author.trim()
    const trimmedImageUrl = imageUrl.trim()
    const trimmedReadTime = readTime.trim()

    if (!trimmedTitle) {
      setError('Le titre est obligatoire.')
      return null
    }
    if (!trimmedDescription) {
      setError('La description est obligatoire.')
      return null
    }
    if (!trimmedTheme) {
      setError('Le thème est obligatoire.')
      return null
    }
    if (!trimmedAuthor) {
      setError('L’auteur est obligatoire.')
      return null
    }
    if (!trimmedImageUrl || !isHttpUrl(trimmedImageUrl)) {
      setError('L’URL de la photo doit être une adresse http(s) valide.')
      return null
    }
    if (trimmedReadTime && (Number.isNaN(Number(trimmedReadTime)) || Number(trimmedReadTime) <= 0)) {
      setError('Le temps de lecture doit être un nombre positif (minutes).')
      return null
    }
    if (!editorRef.current || editorRef.current.isEmpty()) {
      setError('Le corps de l’article est obligatoire.')
      return null
    }

    setError(null)

    return buildPublishPayload({
      title: trimmedTitle,
      description: trimmedDescription,
      theme: trimmedTheme,
      author: trimmedAuthor,
      imageUrl: trimmedImageUrl,
      readTime: trimmedReadTime,
      body: editorRef.current.getMarkdown()
    })
  }

  async function handleCopyMarkdown() {
    const payload = validateAndBuildPayload()
    if (!payload) return

    try {
      await navigator.clipboard.writeText(payload)
      setIsCopied(true)
      window.setTimeout(() => setIsCopied(false), 2000)
    } catch {
      setError('Impossible de copier dans le presse-papiers.')
    }
  }

  return (
    <form
      className='space-y-6'
      onSubmit={event => {
        event.preventDefault()
        handleCopyMarkdown()
      }}
    >
      <div className='space-y-2'>
        <Label htmlFor='title'>Titre</Label>
        <Input
          id='title'
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder='Titre de l’article'
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description (accroche)</Label>
        <Textarea
          id='description'
          value={description}
          onChange={event => setDescription(event.target.value)}
          placeholder='Courte description affichée sur la carte de l’article'
          className='min-h-20 resize-y'
          required
        />
      </div>

      <div className='grid gap-6 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='theme'>Thème</Label>
          <Input
            id='theme'
            value={theme}
            onChange={event => setTheme(event.target.value)}
            placeholder='ex. Valeurs, Programme…'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='author'>Auteur</Label>
          <Input
            id='author'
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='Nom de l’auteur'
            required
          />
        </div>
      </div>

      <div className='grid gap-6 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='imageUrl'>URL de la photo</Label>
          <Input
            id='imageUrl'
            type='url'
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
            placeholder='https://…'
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='readTime'>Temps de lecture (optionnel)</Label>
          <Input
            id='readTime'
            type='number'
            min={1}
            step={1}
            value={readTime}
            onChange={event => setReadTime(event.target.value)}
            placeholder='ex. 5 (sinon estimé)'
          />
        </div>
      </div>

      {showImagePreview ? (
        <div className='bg-muted flex justify-center rounded-md p-4'>
          <img
            src={imageUrl}
            alt='Aperçu de la photo de l’article'
            className='max-h-48 w-full max-w-md object-contain'
          />
        </div>
      ) : null}

      <div className='space-y-2'>
        <Label>Corps de l’article</Label>
        <BlockNoteEditor ref={editorRef} />
      </div>

      {error ? <p className='text-destructive text-sm'>{error}</p> : null}

      <div className='flex flex-col gap-3 sm:flex-row'>
        {/* <Button type='submit' size='lg' className='sm:flex-1'>
          <MailIcon className='size-4' />
          Envoyer par e-mail
        </Button> */}
        <Button type='submit' size='lg' className='sm:flex-1' onClick={handleCopyMarkdown}>
          {isCopied ? <CheckIcon className='size-4' /> : <CopyIcon className='size-4' />}
          {isCopied ? 'Contenu copié' : 'Copier pour publication'}
        </Button>
      </div>

      <p className='text-muted-foreground text-xs'>
        Le message contient deux blocs prêts à coller : le fichier MDX (`src/content/…`) et l’entrée TypeScript pour{' '}
        `blog-posts.tsx`. Destinataire : {RECIPIENT_EMAIL}.
      </p>
    </form>
  )
}
