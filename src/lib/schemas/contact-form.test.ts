import { describe, expect, it } from 'vitest'

import {
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_NAME_MAX_LENGTH,
  contactFormSchema
} from '@/lib/schemas/contact-form'

describe('contactFormSchema', () => {
  it('accepts a valid payload', () => {
    const result = contactFormSchema.safeParse({
      name: 'Alice Martin',
      email: 'alice@exemple.fr',
      phone: '0600000000',
      message: 'Bonjour',
      company: ''
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

  it('rejects a name that exceeds the max length', () => {
    const result = contactFormSchema.safeParse({
      name: 'A'.repeat(CONTACT_NAME_MAX_LENGTH + 1),
      email: 'alice@exemple.fr',
      message: 'Bonjour'
    })

    expect(result.success).toBe(false)
  })

  it('rejects a message that exceeds the max length', () => {
    const result = contactFormSchema.safeParse({
      name: 'Alice',
      email: 'alice@exemple.fr',
      message: 'M'.repeat(CONTACT_MESSAGE_MAX_LENGTH + 1)
    })

    expect(result.success).toBe(false)
  })
})
