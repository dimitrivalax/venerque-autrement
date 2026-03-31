import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

import Logo from '@/components/logo'

const Footer = () => {
  return (
    <footer className='border-border/60 border-t'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8 lg:px-8'>
        <Link href='/'>
          <Logo className='gap-3' />
        </Link>
        <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2 whitespace-nowrap sm:gap-5'>
          <Link
            href='/#categories'
            className='text-muted-foreground hover:text-foreground opacity-80 transition-opacity duration-300 hover:opacity-100'
          >
            Articles & programme
          </Link>
          <Link
            href='/contact'
            className='text-muted-foreground hover:text-foreground opacity-80 transition-opacity duration-300 hover:opacity-100'
          >
            Contact
          </Link>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6 lg:px-8'>
        <p className='text-muted-foreground text-center text-sm text-balance'>
          © {new Date().getFullYear()}{' '}
          <Link href='/' className='text-foreground font-medium hover:underline'>
            Venerque Autrement
          </Link>
          {' — '}Collectif citoyen pour un Venerque solidaire et participatif.
        </p>
      </div>
    </footer>
  )
}

export default Footer
