import { Card, CardContent } from '@/components/ui/card'

import ContactForm from '@/components/blocks/contact-us/contact-form'

const ContactUs = () => {
  return (
    <section className='from-primary/[0.03] to-background bg-gradient-to-b py-8 sm:py-16 lg:min-h-[calc(100dvh-4rem)] lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 space-y-4 text-center sm:mb-16'>
          <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Contact</h1>
          <p className='text-muted-foreground text-xl'>
            Une question sur le programme, une envie de participer ou simplement prendre contact avec le collectif : laissez-nous un message.
          </p>
        </div>

        <Card className='border-none shadow-none'>
          <CardContent className='grid gap-12 md:grid-cols-4'>
            <div className='md:col-span-2'>
              <ContactForm />
            </div>

            <div className='shadow-none md:col-span-2'>
              <img
                src='/images/logo-venerque-autrement.png'
                alt='Logo Venerque Autrement'
                className='size-full max-md:max-h-70 rounded-xl border object-contain object-center p-8'
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ContactUs
