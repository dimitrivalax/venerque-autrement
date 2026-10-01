'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { withBasePath } from '@/lib/paths'

const CTA = () => {
  return (
    <section
      className='from-muted/50 via-background to-primary/[0.04] relative border-t border-border/50 bg-gradient-to-b py-14 sm:py-20 lg:py-28'
      id='contact'
    >
      <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 space-y-3 text-center sm:mb-12'>
          <p className='section-eyebrow'>Restons en contact</p>
          <h2 className='section-title'>Prêt·e à construire ensemble le Venerque de demain ?</h2>
          <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
            Une question, une envie de participer ou un échange autour du programme : nous sommes à votre écoute.
          </p>
        </div>

        <Card className='overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-lg dark:bg-card/70'>
          <CardContent className='p-0'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div className='bg-muted/40 flex min-h-[240px] items-center justify-center p-10 lg:min-h-[320px]'>
                <img
                  src={withBasePath('/images/logo-venerque-autrement.png')}
                  alt='Venerque Autrement'
                  className='max-h-56 w-full max-w-xs object-contain lg:max-h-64'
                />
              </div>

              <div className='flex flex-col justify-center gap-6 p-8 sm:p-10'>
                <h3 className='text-xl font-semibold tracking-tight sm:text-2xl'>
                  Écrivez-nous ou passez par le formulaire
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  Nous répondrons dans les meilleurs délais et pourrons vous orienter vers les permanences ou les temps
                  de dialogue prévus avec le collectif.
                </p>
                <Button size='lg' className='w-fit text-base' asChild>
                  <Link href='/contact'>Accéder au formulaire</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default CTA
