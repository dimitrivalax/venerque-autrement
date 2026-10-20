"use client";

import { useState, type FormEvent } from "react";

import { contactFormSchema } from "@/lib/schemas/contact-form";
import { submitContactForm } from "@/lib/submit-contact-form";

/**
 * Return type for {@link useContactForm}.
 */
export type UseContactFormResult = {
  readonly error: string | null;
  readonly isSubmitting: boolean;
  readonly isSuccess: boolean;
  readonly handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

/**
 * Manages contact form validation, submission lifecycle, and success/error state.
 */
export function useContactForm(): UseContactFormResult {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const parsed = contactFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      message: formData.get("message"),
      company: formData.get("company") || "",
    });

    if (!parsed.success) {
      setIsSuccess(false);
      setError(parsed.error.issues[0]?.message ?? "Formulaire invalide.");

      return;
    }

    setError(null);
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(parsed.data);

      if (!result.ok) {
        setError(result.error);

        return;
      }

      setIsSuccess(true);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    error,
    isSubmitting,
    isSuccess,
    handleSubmit,
  };
}
