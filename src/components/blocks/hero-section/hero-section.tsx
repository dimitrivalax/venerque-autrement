'use client'
import { ArrowUpRightIcon, CalendarDaysIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
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
      className='from-primary/[0.06] via-background to-chart-2/[0.06] relative -mt-16 overflow-hidden bg-gradient-to-b pt-28 pb-14 sm:pt-32 sm:pb-18 lg:pb-28'
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]'
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.55 0.11 195 / 0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, oklch(0.72 0.17 125 / 0.12), transparent)'
        }}
      />
      <div className='relative mx-auto flex h-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:gap-20 lg:px-8'>
        <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16'>
          <div className='flex flex-col gap-6 text-center lg:items-start lg:text-left'>
            <p className='section-eyebrow text-balance'>Liste participative & citoyenne — Venerque</p>
            <h1 className='text-foreground text-4xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]'>
              Venerque Autrement
            </h1>
            <p className='text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0 lg:max-w-lg'>Pour une nouvelle démocratie locale et participative, transparente et respectueuse de l’humain et de l’environnement à Venerque</p>
            {/* <p className='text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0 lg:max-w-lg'>
              Tolérance, solidarité, respect de l’Humain et du Vivant : agissons localement pour recréer du lien et une
              action communale ouverte à toutes et tous.
            </p> */}
            <div className='flex flex-col gap-3 pt-1 max-sm:w-full sm:flex-row sm:justify-center lg:justify-start'>
              <Button size='lg' className='text-base max-sm:w-full' asChild>
                <Link href='/#categories'>Lire nos articles</Link>
              </Button>
              <Button size='lg' variant='outline' className='text-base max-sm:w-full' asChild>
                <Link href='/contact'>Nous contacter</Link>
              </Button>
            </div>
          </div>
          <div className='relative lg:pl-2'>
            <div className='bg-primary/[0.08] absolute -inset-1 -z-10 rounded-[1.35rem] blur-xl dark:bg-primary/15' />
            <Image
              src='/images/IMG_20200221_181209.jpg'
              alt='Vue de Venerque au coucher du soleil'
              width={1600}
              height={1200}
              className='ring-background h-auto w-full rounded-2xl shadow-lg ring-4'
              priority
              sizes='(max-width: 1024px) 100vw, 50vw'
            />
          </div>
        </div>

        {featuredPosts.length > 0 && (
          <p className='section-eyebrow text-center lg:text-left'>À lire en priorité</p>
        )}

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {featuredPosts.map((item, index) => (
            <Card
              key={`${item.author}-${index}`}
              className='group cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card/80 py-0 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-card/60'
              onClick={() => handleCardClick(item)}
            >
              <CardContent className='grid grid-cols-1 px-0 xl:grid-cols-2' onClick={() => handleCardClick(item)}>
                <div className='p-5 sm:p-6'>
                  <div className='bg-muted flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl sm:h-59.5 sm:aspect-auto'>
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className='max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                </div>
                <div className='flex flex-col justify-center gap-3 p-5 sm:p-6'>
                  <div className='flex items-center gap-1.5 py-1'>
                    <div className='text-muted-foreground flex grow items-center gap-1.5'>
                      <CalendarDaysIcon className='size-5' />
                      <p>{item.date}</p>
                    </div>
                    <span
                      role='button'
                      tabIndex={0}
                      className='bg-primary/10 text-primary inline-flex cursor-pointer rounded-full border border-transparent px-3 py-0.5 text-sm font-medium'
                      onClick={e => {
                        e.stopPropagation()
                        router.push(`/#category-${item.category}`)
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          e.stopPropagation()
                          router.push(`/#category-${item.category}`)
                        }
                      }}
                    >
                      {item.category}
                    </span>
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
