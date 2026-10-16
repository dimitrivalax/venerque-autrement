import type { ContactFormValues } from "@/lib/schemas/contact-form";

/**
 * Successful response from the contact Edge Function.
 */
type ContactSubmitSuccess = {
  readonly ok: true;
};

/**
 * Error response from the contact Edge Function or the client helper.
 */
type ContactSubmitFailure = {
  readonly ok: false;
  readonly error: string;
};

/**
 * Result of submitting the public contact form.
 */
export type ContactSubmitResult = ContactSubmitSuccess | ContactSubmitFailure;

/**
 * Normalizes the Supabase project URL to its origin (no `/rest/v1` suffix).
 *
 * @param value - Raw `NEXT_PUBLIC_SUPABASE_URL` value
 * @returns Project origin suitable for Edge Function URLs
 */
export function getSupabaseProjectUrl(value: string): string {
  const trimmed = value.trim().replace(/\/$/, "");

  try {
    const url = new URL(trimmed);

    return url.origin;
  } catch {
    return trimmed.replace(/\/rest\/v1$/i, "");
  }
}

/**
 * Posts validated contact form values to the Supabase Edge Function.
 *
 * @param values - Validated contact form data
 * @returns Success or a user-facing error message
 */
export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactSubmitResult> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!baseUrl || !anonKey) {
    return {
      ok: false,
      error: "Configuration d’envoi manquante. Réessayez plus tard.",
    };
  }

  const endpoint = `${getSupabaseProjectUrl(baseUrl)}/functions/v1/send-contact-email`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
      },
      body: JSON.stringify(values),
    });

    const data = (await response.json().catch(() => null)) as {
      error?: string;
      ok?: boolean;
    } | null;

    if (!response.ok) {
      return {
        ok: false,
        error: data?.error ?? "Échec de l’envoi du message.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Impossible de joindre le service d’envoi. Vérifiez votre connexion.",
    };
  }
}
