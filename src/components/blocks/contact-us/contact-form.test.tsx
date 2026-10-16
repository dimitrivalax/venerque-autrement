import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import ContactForm from '@/components/blocks/contact-us/contact-form'
import * as submitModule from '@/lib/submit-contact-form'

describe('ContactForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows a validation error when required fields are empty', async () => {
    const user = userEvent.setup()
    const submitSpy = vi.spyOn(submitModule, 'submitContactForm')

    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /envoyer le message/i }))

    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expect(submitSpy).not.toHaveBeenCalled()
  })

  it('submits validated values to the Edge Function', async () => {
    const user = userEvent.setup()

    vi.spyOn(submitModule, 'submitContactForm').mockResolvedValue({ ok: true })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/nom et prénom/i), 'Alice Martin')
    await user.type(screen.getByLabelText(/^e-mail$/i), 'alice@exemple.fr')
    await user.type(screen.getByLabelText(/message/i), 'Bonjour')
    await user.click(screen.getByRole('button', { name: /envoyer le message/i }))

    expect(await screen.findByRole('status')).toHaveTextContent(/bien été envoyé/i)
    expect(submitModule.submitContactForm).toHaveBeenCalledWith({
      name: 'Alice Martin',
      email: 'alice@exemple.fr',
      message: 'Bonjour',
      company: ''
    })
  })

  it('shows an error when submission fails', async () => {
    const user = userEvent.setup()

    vi.spyOn(submitModule, 'submitContactForm').mockResolvedValue({
      ok: false,
      error: 'Échec de l’envoi du message.'
    })

    render(<ContactForm />)

    await user.type(screen.getByLabelText(/nom et prénom/i), 'Alice Martin')
    await user.type(screen.getByLabelText(/^e-mail$/i), 'alice@exemple.fr')
    await user.type(screen.getByLabelText(/message/i), 'Bonjour')
    await user.click(screen.getByRole('button', { name: /envoyer le message/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/échec/i)
  })
})
