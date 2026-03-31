import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import CTA from '@/components/blocks/cta-section/cta-section'
import Blog from '@/components/blocks/blog-related-post/blog-related-post'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { DynamicToc } from '@/components/table-of-contents/dynamic-toc'

import { blogPosts } from '@/assets/data/blog-posts'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      name: 'Venerque Autrement',
      description: 'Collectif citoyen et liste participative pour Venerque.',
      url: baseUrl,
      inLanguage: 'fr-FR'
    }
  ]
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug
  }))
}

const PostNavigation = ({ currentPost }: { currentPost: (typeof blogPosts)[0] }) => {
  const sortedPosts = [...blogPosts].sort((a, b) => a.id - b.id)
  const currentIndex = sortedPosts.findIndex(post => post.id === currentPost.id)

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null

  return (
    <div className='flex w-full justify-between gap-2'>
      {previousPost ? (
        <Link href={`/blog-detail/${previousPost.slug}`}>
          <Button className='rounded-[8px]' variant='outline'>
            <ChevronLeftIcon className='size-4' />
            Article précédent
          </Button>
        </Link>
      ) : (
        <Button className='rounded-[8px]' variant='outline' disabled>
          <ChevronLeftIcon className='size-4' />
          Article précédent
        </Button>
      )}

      {nextPost ? (
        <Link className='ml-auto' href={`/blog-detail/${nextPost.slug}`}>
          <Button
            className='rounded-[8px] bg-primary/10 text-primary hover:bg-primary/15 focus-visible:ring-primary/20'
            variant='outline'
          >
            Article suivant
            <ChevronRightIcon className='size-4' />
          </Button>
        </Link>
      ) : (
        <Button className='ml-auto rounded-[8px] bg-primary/10 text-primary' variant='outline' disabled>
          Article suivant
          <ChevronRightIcon className='size-4' />
        </Button>
      )}
    </div>
  )
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = blogPosts.find(p => p.slug === slug)

  const { default: Post } = await import(`@/content/${slug}.mdx`)

  if (!post || !Post) {
    notFound()
  }

  const sameCategoryPosts = blogPosts.filter(p => p.category === post.category && p.slug !== post.slug)
  const otherPosts = blogPosts.filter(p => p.category !== post.category && p.slug !== post.slug)

  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3)

  return (
    <div>
      <section className='py-8 sm:pt-16 sm:pb-24'>
        <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
          <div className='gap-16 md:grid md:grid-cols-5 lg:grid-cols-7'>
            <div className='hidden md:col-span-2 md:block lg:col-span-2'>
              <DynamicToc />
            </div>

            <div className='space-y-12 md:col-span-3 lg:col-span-5'>
              <div className='space-y-6'>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href='/'>Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href='/#categories'>Articles</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{post.category}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <h1 className='text-foreground text-4xl font-semibold'>{post.title}</h1>

                <p className='text-muted-foreground text-xl'>{post.description}</p>

                <Separator />

                <div className='flex flex-wrap justify-between gap-4'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <Avatar className='size-11.5'>
                      <AvatarImage src={post.avatarUrl} alt={post.author} />
                      <AvatarFallback className='text-xs'>
                        {post.author
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                      <span className='text-muted-foreground text-sm'>Rédigé par</span>
                      <span className='text-foreground text-sm font-medium'>{post.author}</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <span className='text-muted-foreground text-sm'>Temps de lecture</span>
                    <span className='text-foreground text-sm font-medium'>{post.readTime} min de lecture</span>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <span className='text-muted-foreground text-sm'>Publié le</span>
                    <span className='text-foreground text-sm font-medium'>{post.date}</span>
                  </div>
                </div>
              </div>

              <div className='bg-muted flex justify-center rounded-[8px] p-8'>
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  className='max-h-72 w-full max-w-md object-contain'
                />
              </div>

              <article id='content' className='space-y-12'>
                <Post />
              </article>

              <PostNavigation currentPost={post} />
            </div>
          </div>
        </div>
      </section>

      <Blog blogPosts={relatedPosts} />

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
