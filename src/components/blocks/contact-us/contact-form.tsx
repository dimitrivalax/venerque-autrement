'use client'

import { UserIcon, MailIcon, PhoneIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const ContactForm = () => {
  return (
    <form className='space-y-6' onSubmit={e => e.preventDefault()}>
      <div className='space-y-2'>
        <Label htmlFor='username'>Nom et prénom</Label>
        <div className='relative'>
          <Input id='username' type='text' placeholder='Votre nom' className='peer h-10 pr-9' />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <UserIcon className='size-4' />
            <span className='sr-only'>Nom</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>E-mail</Label>
        <div className='relative'>
          <Input id='email' type='email' placeholder='vous@exemple.fr' className='peer h-10 pr-9' />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <MailIcon className='size-4' />
            <span className='sr-only'>E-mail</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phone'>Téléphone (facultatif)</Label>
        <div className='relative'>
          <Input id='phone' type='tel' placeholder='Votre numéro' className='peer h-10 pr-9' />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <PhoneIcon className='size-4' />
            <span className='sr-only'>Téléphone</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message'>Message</Label>
        <Textarea id='message' className='h-28 resize-none' placeholder='Votre message…' />
      </div>

      <Button type='submit' size='lg' className='w-full text-base'>
        Envoyer le message
      </Button>
      <p className='text-muted-foreground text-xs'>
        Ce formulaire est une démonstration : branchez votre propre envoi d’e-mails ou un service (Formspree, etc.) pour la mise en production.
      </p>
    </form>
  )
}

export default ContactForm
