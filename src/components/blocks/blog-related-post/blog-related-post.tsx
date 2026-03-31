'use client'

import { ArrowRightIcon, CalendarDaysIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { blogPosts as allBlogPosts } from '@/assets/data/blog-posts'

interface BlogProps {
  blogPosts?: typeof allBlogPosts
}

const Blog = ({ blogPosts = allBlogPosts.slice(0, 3) }: BlogProps) => {
  const router = useRouter()

  return (
    <section className='py-12 sm:py-20 lg:py-28'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-14 lg:px-8'>
        <div className='max-w-3xl space-y-4'>
          <p className='section-eyebrow'>À lire aussi</p>

          <h2 className='section-title'>Autres articles</h2>

          <p className='text-muted-foreground text-lg leading-relaxed md:text-xl'>
            Poursuivez la lecture avec d’autres articles du collectif.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.map(post => (
            <Card
              key={post.id}
              className='group bg-card/80 hover:border-primary/20 h-full cursor-pointer overflow-hidden rounded-2xl border border-border/60 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card/60'
              onClick={() => router.push(`/blog-detail/${post.slug}`)}
            >
              <CardContent className='space-y-3.5 p-5 sm:p-6'>
                <div className='bg-muted mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl sm:mb-6 sm:h-52 sm:aspect-auto'>
                  <Link href={`/blog-detail/${post.slug}`}>
                    <img
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      className='max-h-52 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                    />
                  </Link>
                </div>
                <div className='flex items-center justify-between gap-1.5'>
                  <div className='text-muted-foreground flex items-center gap-1.5'>
                    <CalendarDaysIcon className='size-5' />
                    <span>{post.date}</span>
                  </div>
                  <Badge
                    className='bg-primary/10 text-primary border-0 text-sm'
                    onClick={e => {
                      e.stopPropagation()
                      router.push(`/#category-${post.category}`)
                    }}
                  >
                    {post.category}
                  </Badge>
                </div>
                <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>
                  <Link href={`/blog-detail/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className='text-muted-foreground line-clamp-2'>{post.description}</p>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>{post.author}</span>
                  <Button
                    size='icon'
                    className='group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent'
                    asChild
                  >
                    <Link href={`/blog-detail/${post.slug}`}>
                      <ArrowRightIcon className='size-4 -rotate-45' />
                      <span className='sr-only'>Lire : {post.title}</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
