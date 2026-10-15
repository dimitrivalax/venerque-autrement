import { z } from 'zod'

/**
 * Schema for the public contact form fields.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Le nom est obligatoire.'),
  email: z.string().trim().email('L’e-mail n’est pas valide.'),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, 'Le message est obligatoire.')
})

/**
 * Inferred type for validated contact form data.
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>

/**
 * Builds a `mailto:` URL from validated contact form values.
 *
 * @param values - Validated contact form data
 * @param recipient - Destination e-mail address
 * @returns A `mailto:` URL ready for navigation
 */
export function buildContactMailtoUrl(values: ContactFormValues, recipient: string): string {
  const subject = encodeURIComponent(`Contact — ${values.name}`)
  const phoneLine = values.phone ? `Téléphone : ${values.phone}\n` : ''

  const body = encodeURIComponent(
    `Nom : ${values.name}\nE-mail : ${values.email}\n${phoneLine}\n${values.message}`
  )

  return `mailto:${recipient}?subject=${subject}&body=${body}`
}
