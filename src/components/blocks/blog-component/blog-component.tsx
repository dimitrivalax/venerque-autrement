'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { SearchIcon, ArrowRightIcon, CalendarDaysIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import { blogPosts } from '@/assets/data/blog-posts'

export type BlogPost = {
  id: number
  slug: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  date: string
  category: string
  author: string
  avatarUrl: string
  readTime: number
  featured: boolean
}

const getAvailableBlogPosts = () => {
  return blogPosts
}

const ALL_TAB = 'Tous'

const BlogGrid = ({ posts, onCategoryClick }: { posts: BlogPost[]; onCategoryClick: (category: string) => void }) => {
  const router = useRouter()

  const handleCardClick = (post: BlogPost) => {
    router.push(`/blog-detail/${post.slug}`)
  }

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => (
        <Card
          key={post.id}
          className='group bg-card/80 hover:border-primary/20 h-full cursor-pointer overflow-hidden rounded-2xl border border-border/60 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-card/60'
          onClick={() => handleCardClick(post)}
        >
          <CardContent className='space-y-3.5 p-5 sm:p-6'>
            <div className='bg-muted mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl sm:mb-6 sm:aspect-auto sm:h-52'>
              <img
                src={post.imageUrl}
                alt={post.imageAlt}
                className='max-h-full w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='flex items-center justify-between gap-1.5'>
              <div className='text-muted-foreground flex items-center gap-1.5'>
                <CalendarDaysIcon className='size-5' />
                <span>{post.date}</span>
              </div>
              <Badge
                className='bg-primary/10 text-primary rounded-full border-0 text-sm'
                onClick={e => {
                  e.stopPropagation()
                  onCategoryClick(post.category)
                  router.push(`/#category-${post.category}`)
                }}
              >
                {post.category}
              </Badge>
            </div>
            <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>{post.title}</h3>
            <p className='text-muted-foreground line-clamp-2'>{post.description}</p>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{post.author}</span>
              <Button
                size='icon'
                className='group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent'
              >
                <ArrowRightIcon className='size-4 -rotate-45' />
                <span className='sr-only'>Lire : {post.title}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const Blog = () => {
  const [selectedTab, setSelectedTab] = useState(ALL_TAB)
  const router = useRouter()

  const availableBlogPosts = getAvailableBlogPosts()

  const nonFeaturedPosts = availableBlogPosts.sort((a, b) => b.id - a.id)

  const uniqueCategories = [...new Set(nonFeaturedPosts.map(post => post.category))]
  const categories = [ALL_TAB, ...uniqueCategories.sort()]

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab)

    if (tab === ALL_TAB) {
      router.push('#categories')
    }
  }

  return (
    <section className='py-12 sm:py-20 lg:py-28' id='categories'>
      <div className='mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:space-y-14 lg:px-8'>
        <div className='max-w-3xl space-y-4'>
          {selectedTab === ALL_TAB && <p className='section-eyebrow'>Publications</p>}
          {selectedTab !== ALL_TAB && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/#categories'>Articles</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedTab}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <h2 className='section-title'>Nos articles & le programme en détail</h2>

          <p className='text-muted-foreground text-lg leading-relaxed md:text-xl'>
            Articles rédigés à partir de nos engagements : valeurs, gouvernance locale et projet de territoire.
          </p>
        </div>

        <Tabs defaultValue={ALL_TAB} value={selectedTab} onValueChange={handleTabChange} className='gap-8 lg:gap-12'>
          <div className='flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center'>
            <ScrollArea className='bg-muted/80 w-full rounded-xl border border-border/50 sm:w-auto'>
              <TabsList className='h-auto gap-0.5 bg-transparent p-1'>
                {categories.map(category => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    id={`category-${category}`}
                    className='data-[state=active]:bg-background cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm data-[state=active]:shadow-sm'
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            <div className='relative max-md:w-full md:min-w-[220px] lg:min-w-[280px]'>
              <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
                <SearchIcon className='size-4' />
                <span className='sr-only'>Rechercher</span>
              </div>
              <Input
                type='search'
                placeholder='Rechercher un article…'
                className='peer bg-background/80 h-11 rounded-xl border-border/60 px-9 shadow-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none'
              />
            </div>
          </div>

          <TabsContent value={ALL_TAB}>
            <BlogGrid posts={nonFeaturedPosts} onCategoryClick={handleTabChange} />
          </TabsContent>

          {categories.slice(1).map((category, index) => (
            <TabsContent key={index} value={category}>
              <BlogGrid
                posts={nonFeaturedPosts.filter(post => post.category === category)}
                onCategoryClick={handleTabChange}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default Blog
