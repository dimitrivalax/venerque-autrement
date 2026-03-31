'use client'
import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { BlogPost } from '@/components/blocks/blog-component/blog-component'

const HeroSection = ({ blogData }: { blogData: BlogPost[] }) => {
  const featuredPosts = blogData.filter(post => post.featured)
  const router = useRouter()

  const handleCardClick = (post: BlogPost) => {
    router.push(`/blog-detail/${post.slug}`)
  }

  return (
    <section
      id='home'
      className='from-primary/[0.04] via-background to-accent/30 -mt-16 bg-gradient-to-b pt-32 pb-12 sm:pb-16 lg:pb-24'
    >
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8'>
        <div className='flex max-w-4xl flex-col items-center gap-6 self-center text-center'>
          <div className='flex w-full flex-col items-center gap-4'>
            <Image
              src='/images/IMG_20200221_181209.jpg'
              alt='Vue de Venerque au coucher du soleil'
              width={1600}
              height={1200}
              className='h-auto w-full max-w-2xl rounded-lg shadow-md drop-shadow-sm md:max-w-3xl'
              priority
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 42rem, 48rem'
            />
            {/* <Image
              src='/images/IMG_9383.jpeg'
              alt='Photo de groupe — Venerque Autrement'
              width={1800}
              height={1200}
              className='h-auto w-full max-w-2xl rounded-lg shadow-md drop-shadow-sm md:max-w-3xl'
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 42rem, 48rem'
            /> */}
          </div>
          <Badge variant='outline' className='border-primary/25 text-foreground text-sm font-normal'>
            Liste participative & citoyenne — Venerque
          </Badge>
          <h1 className='text-3xl leading-[1.25] font-semibold text-balance sm:text-4xl lg:text-5xl'>
            Un autre Venerque, plus solidaire et plus vivant
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
            Tolérance, solidarité, respect de l’Humain et du Vivant : agissons localement pour recréer du lien et une
            action communale ouverte à toutes et tous.
          </p>
          <div className='flex flex-col gap-3 py-1 max-sm:w-full sm:flex-row sm:justify-center'>
            <Button size='lg' className='text-base max-sm:w-full' asChild>
              <Link href='/#categories'>Lire nos articles</Link>
            </Button>
            <Button size='lg' variant='outline' className='text-base max-sm:w-full' asChild>
              <Link href='/contact'>Nous contacter</Link>
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {featuredPosts.map((item, index) => (
            <Card
              key={`${item.author}-${index}`}
              className='group cursor-pointer py-0 shadow-none'
              onClick={() => handleCardClick(item)}
            >
              <CardContent className='grid grid-cols-1 px-0 xl:grid-cols-2' onClick={() => handleCardClick(item)}>
                <div className='p-6'>
                  <div className='bg-muted flex h-59.5 w-full items-center justify-center overflow-hidden rounded-lg'>
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className='max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                </div>
                <div className='flex flex-col justify-center gap-3 p-6'>
                  <div className='flex items-center gap-1.5 py-1'>
                    <div className='text-muted-foreground flex grow items-center gap-1.5'>
                      <CalendarDaysIcon className='size-5' />
                      <p>{item.date}</p>
                    </div>
                    <Badge
                      className='bg-primary/10 text-primary cursor-pointer border-0 text-sm'
                      onClick={e => {
                        e.stopPropagation()
                        router.push(`/#category-${item.category}`)
                      }}
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <Link href={`/blog-detail/${item.slug}`}>
                    <h3 className='text-xl font-medium'>{item.title}</h3>
                  </Link>

                  <p className='text-muted-foreground'>{item.description}</p>
                  <div className='flex w-full items-center justify-between gap-1 py-1'>
                    <span className='cursor-pointer text-sm font-medium'>{item.author}</span>
                    <Button
                      size='icon'
                      className='group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent'
                      asChild
                    >
                      <Link href={`/blog-detail/${item.slug}`}>
                        <ArrowUpRightIcon />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
