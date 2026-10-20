"use client";

import { UserIcon, MailIcon, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_EMAIL_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_NAME_MAX_LENGTH,
  CONTACT_PHONE_MAX_LENGTH,
} from "@/lib/schemas/contact-form";

import { useContactForm } from "./use-contact-form";

/**
 * Public contact form with Zod validation and Supabase Edge Function submission.
 */
const ContactForm = () => {
  const { error, isSubmitting, isSuccess, handleSubmit } = useContactForm();

  return (
    <form className="relative space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: leave empty. Hidden from assistive tech and sighted users. */}
      <div
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="company">Entreprise</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nom et prénom</Label>
        <div className="relative">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Votre nom"
            className="peer h-10 pr-9"
            required
            maxLength={CONTACT_NAME_MAX_LENGTH}
            autoComplete="name"
            disabled={isSubmitting}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
            <UserIcon className="size-4" />
            <span className="sr-only">Nom</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="vous@exemple.fr"
            className="peer h-10 pr-9"
            required
            maxLength={CONTACT_EMAIL_MAX_LENGTH}
            autoComplete="email"
            disabled={isSubmitting}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
            <MailIcon className="size-4" />
            <span className="sr-only">E-mail</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone (facultatif)</Label>
        <div className="relative">
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Votre numéro"
            className="peer h-10 pr-9"
            maxLength={CONTACT_PHONE_MAX_LENGTH}
            autoComplete="tel"
            disabled={isSubmitting}
          />
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
            <PhoneIcon className="size-4" />
            <span className="sr-only">Téléphone</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          className="h-28 resize-none"
          placeholder="Votre message…"
          required
          maxLength={CONTACT_MESSAGE_MAX_LENGTH}
          disabled={isSubmitting}
        />
      </div>

      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}

      {isSuccess ? (
        <p className="text-sm text-green-700 dark:text-green-400" role="status">
          Votre message a bien été envoyé. Nous vous répondrons rapidement.
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full text-base"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
      <p className="text-muted-foreground text-xs">
        Votre message est transmis à contact@venerque-autrement.fr.
      </p>
    </form>
  );
};

export default ContactForm;
