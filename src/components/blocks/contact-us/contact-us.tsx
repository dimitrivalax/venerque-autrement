import { Card, CardContent } from '@/components/ui/card'

import ContactForm from '@/components/blocks/contact-us/contact-form'
import { withBasePath } from '@/lib/paths'

const ContactUs = () => {
  return (
    <section className='from-primary/[0.05] via-background to-muted/30 relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-gradient-to-b py-12 sm:py-16 lg:py-24'>
      <div
        className='pointer-events-none absolute inset-0 opacity-30 dark:opacity-[0.15]'
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 45% at 0% 0%, oklch(0.55 0.11 195 / 0.2), transparent)'
        }}
      />
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 max-w-3xl space-y-4 sm:mb-14'>
          <p className='section-eyebrow'>Contact</p>
          <h1 className='text-foreground text-4xl font-semibold tracking-tight text-balance md:text-5xl'>
            Parlons ensemble de Venerque
          </h1>
          <p className='text-muted-foreground text-lg leading-relaxed md:text-xl'>
            Une question sur le programme, une envie de participer ou simplement prendre contact avec le collectif :
            laissez-nous un message.
          </p>
        </div>

        <Card className='overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-lg dark:bg-card/70'>
          <CardContent className='grid gap-0 md:grid-cols-2'>
            <div className='border-border/50 p-6 sm:p-8 md:border-r'>
              <ContactForm />
            </div>

            <div className='bg-muted/35 flex items-center justify-center p-8 sm:p-10'>
              <img
                src={withBasePath('/images/logo-venerque-autrement.png')}
                alt='Logo Venerque Autrement'
                className='max-h-72 w-full max-w-sm object-contain'
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ContactUs
