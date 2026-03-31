import Image from 'next/image'

import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Image
        src='/images/logo-venerque-autrement.png'
        alt='Venerque Autrement'
        width={40}
        height={40}
        className='size-10 shrink-0 rounded-full object-cover'
      />
      <span className='text-primary text-lg leading-tight font-semibold tracking-tight'>Venerque Autrement</span>
    </div>
  )
}

export default Logo
