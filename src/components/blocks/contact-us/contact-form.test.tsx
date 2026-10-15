import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import ContactForm from '@/components/blocks/contact-us/contact-form'

describe('ContactForm', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: '' }
    })
  })

  it('shows a validation error when required fields are empty', async () => {
    const user = userEvent.setup()

    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /envoyer le message/i }))

    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expect(window.location.href).toBe('')
  })

  it('opens a mailto URL when the form is valid', async () => {
    const user = userEvent.setup()

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/nom et prénom/i), 'Alice Martin')
    await user.type(screen.getByLabelText(/^e-mail$/i), 'alice@exemple.fr')
    await user.type(screen.getByLabelText(/message/i), 'Bonjour')
    await user.click(screen.getByRole('button', { name: /envoyer le message/i }))

    expect(window.location.href).toMatch(/^mailto:/)
    expect(window.location.href).toContain(encodeURIComponent('alice@exemple.fr'))
  })
})
