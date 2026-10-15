import { z } from 'zod'

/**
 * Schema for blog editor form fields before payload generation.
 */
export const blogEditorFormSchema = z.object({
  title: z.string().trim().min(1, 'Le titre est obligatoire.'),
  description: z.string().trim().min(1, 'La description est obligatoire.'),
  theme: z.string().trim().min(1, 'Le thème est obligatoire.'),
  author: z.string().trim().min(1, 'L’auteur est obligatoire.'),
  imageUrl: z
    .string()
    .trim()
    .url('L’URL de la photo doit être une adresse http(s) valide.')
    .refine(value => {
      try {
        const url = new URL(value)

        return url.protocol === 'http:' || url.protocol === 'https:'
      } catch {
        return false
      }
    }, 'L’URL de la photo doit être une adresse http(s) valide.'),
  readTime: z
    .string()
    .trim()
    .optional()
    .refine(
      value => !value || (!Number.isNaN(Number(value)) && Number(value) > 0),
      'Le temps de lecture doit être un nombre positif (minutes).'
    ),
  body: z.string().trim().min(1, 'Le corps de l’article est obligatoire.')
})

/**
 * Inferred type for validated blog editor form data.
 */
export type BlogEditorFormValues = z.infer<typeof blogEditorFormSchema>
