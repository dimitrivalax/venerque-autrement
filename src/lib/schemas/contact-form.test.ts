import { describe, expect, it } from 'vitest'

import { buildContactMailtoUrl, contactFormSchema } from '@/lib/schemas/contact-form'

describe('contactFormSchema', () => {
  it('accepts a valid payload', () => {
    const result = contactFormSchema.safeParse({
      name: 'Alice Martin',
      email: 'alice@exemple.fr',
      phone: '0600000000',
      message: 'Bonjour'
    })

    expect(result.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = contactFormSchema.safeParse({
      name: 'Alice',
      email: 'pas-un-email',
      message: 'Bonjour'
    })

    expect(result.success).toBe(false)
  })
})

describe('buildContactMailtoUrl', () => {
  it('builds an encoded mailto URL', () => {
    const url = buildContactMailtoUrl(
      {
        name: 'Alice Martin',
        email: 'alice@exemple.fr',
        message: 'Bonjour le collectif'
      },
      'contact@exemple.fr'
    )

    expect(url).toContain('mailto:contact@exemple.fr?')
    expect(url).toContain(encodeURIComponent('Contact — Alice Martin'))
    expect(url).toContain(encodeURIComponent('alice@exemple.fr'))
  })
})
