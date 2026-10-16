import { z } from 'zod'

/** Maximum length for the contact name field. */
export const CONTACT_NAME_MAX_LENGTH = 100

/** Maximum length for the contact e-mail field. */
export const CONTACT_EMAIL_MAX_LENGTH = 254

/** Maximum length for the optional phone field. */
export const CONTACT_PHONE_MAX_LENGTH = 30

/** Maximum length for the message body. */
export const CONTACT_MESSAGE_MAX_LENGTH = 5000

/**
 * Schema for the public contact form fields (including honeypot).
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Le nom est obligatoire.')
    .max(CONTACT_NAME_MAX_LENGTH, 'Le nom est trop long.'),
  email: z
    .string()
    .trim()
    .email('L’e-mail n’est pas valide.')
    .max(CONTACT_EMAIL_MAX_LENGTH, 'L’e-mail est trop long.'),
  phone: z
    .string()
    .trim()
    .max(CONTACT_PHONE_MAX_LENGTH, 'Le numéro est trop long.')
    .optional(),
  message: z
    .string()
    .trim()
    .min(1, 'Le message est obligatoire.')
    .max(CONTACT_MESSAGE_MAX_LENGTH, 'Le message est trop long.'),
  /**
   * Honeypot for bots. Must stay empty for real users.
   * Soft-checked client-side; the Edge Function fakes success when filled.
   */
  company: z.string().optional()
})

/**
 * Inferred type for validated contact form data sent to the Edge Function.
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>
