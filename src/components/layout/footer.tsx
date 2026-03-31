import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

import Logo from '@/components/logo'

const Footer = () => {
  return (
    <footer className='border-border/60 bg-muted/25 border-t'>
      <div className='mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-12 md:py-14 lg:grid-cols-3 lg:px-8'>
        <div className='space-y-3'>
          <Link href='/' className='inline-block'>
            <Logo className='gap-3' />
          </Link>
          <p className='text-muted-foreground max-w-xs text-sm leading-relaxed'>
            Liste participative pour un Venerque plus solidaire, transparent et ouvert à toutes et tous.
          </p>
        </div>
        <div className='space-y-4'>
          <p className='text-foreground text-xs font-semibold uppercase tracking-wider'>Navigation</p>
          <nav className='flex flex-col gap-2.5 text-sm'>
            <Link href='/#home' className='text-muted-foreground hover:text-primary transition-colors'>
              Accueil
            </Link>
            <Link href='/#categories' className='text-muted-foreground hover:text-primary transition-colors'>
              Articles & programme
            </Link>
            <Link href='/contact' className='text-muted-foreground hover:text-primary transition-colors'>
              Contact
            </Link>
          </nav>
        </div>
        <div className='space-y-4 md:col-span-2 lg:col-span-1'>
          <p className='text-foreground text-xs font-semibold uppercase tracking-wider'>S’engager</p>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            Rejoignez le collectif ou proposez une idée pour la vie locale : chaque parcours compte.
          </p>
          <Link
            href='/contact'
            className='text-primary inline-flex text-sm font-medium hover:underline'
          >
            Nous écrire →
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
