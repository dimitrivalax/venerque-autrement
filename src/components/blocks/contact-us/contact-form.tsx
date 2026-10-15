'use client'

import { useState, type FormEvent } from 'react'

import { UserIcon, MailIcon, PhoneIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { buildContactMailtoUrl, contactFormSchema } from '@/lib/schemas/contact-form'

const CONTACT_EMAIL = 'dimitre@free.fr'

/**
 * Public contact form with Zod validation and mailto submission (static export).
 */
const ContactForm = () => {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const parsed = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || undefined,
      message: formData.get('message')
    })

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Formulaire invalide.')

      return
    }

    setError(null)
    window.location.href = buildContactMailtoUrl(parsed.data, CONTACT_EMAIL)
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit} noValidate>
      <div className='space-y-2'>
        <Label htmlFor='name'>Nom et prénom</Label>
        <div className='relative'>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Votre nom'
            className='peer h-10 pr-9'
            required
            autoComplete='name'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <UserIcon className='size-4' />
            <span className='sr-only'>Nom</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>E-mail</Label>
        <div className='relative'>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='vous@exemple.fr'
            className='peer h-10 pr-9'
            required
            autoComplete='email'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <MailIcon className='size-4' />
            <span className='sr-only'>E-mail</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='phone'>Téléphone (facultatif)</Label>
        <div className='relative'>
          <Input
            id='phone'
            name='phone'
            type='tel'
            placeholder='Votre numéro'
            className='peer h-10 pr-9'
            autoComplete='tel'
          />
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <PhoneIcon className='size-4' />
            <span className='sr-only'>Téléphone</span>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message'>Message</Label>
        <Textarea
          id='message'
          name='message'
          className='h-28 resize-none'
          placeholder='Votre message…'
          required
        />
      </div>

      {error ? (
        <p className='text-destructive text-sm' role='alert'>
          {error}
        </p>
      ) : null}

      <Button type='submit' size='lg' className='w-full text-base'>
        Envoyer le message
      </Button>
      <p className='text-muted-foreground text-xs'>
        L’envoi ouvre votre client e-mail avec un message prérempli adressé à {CONTACT_EMAIL}.
      </p>
    </form>
  )
}

export default ContactForm
