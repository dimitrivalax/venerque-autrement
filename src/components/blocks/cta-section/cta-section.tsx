'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const CTA = () => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24' id='get-in-touch'>
      <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <Card className='shadow-none'>
          <CardContent>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              <div className='relative h-64 sm:h-80 lg:h-auto'>
                <img
                  src='/images/logo-venerque-autrement.png'
                  alt='Venerque Autrement'
                  className='h-full w-full rounded-lg object-contain object-center p-6'
                />
              </div>

              <Card className='bg-background/80 rounded-lg border-0 shadow-none'>
                <CardContent className='flex h-full flex-col justify-between gap-4'>
                  <h2 className='text-xl leading-tight font-semibold lg:text-2xl'>
                    Vous souhaitez échanger, proposer une idée ou rejoindre le collectif ?
                  </h2>
                  <div>
                    <p className='text-muted-foreground mb-4 text-base'>
                      Écrivez-nous : nous répondrons dans les meilleurs délais et pourrons vous orienter vers les
                      permanences ou les temps de dialogue prévus dans le projet « Venerque Autrement ».
                    </p>
                    <Button size='lg' className='text-base' asChild>
                      <Link href='/contact'>Accéder au formulaire de contact</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default CTA
