import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getSupabaseProjectUrl,
  submitContactForm,
} from "@/lib/submit-contact-form";

describe("getSupabaseProjectUrl", () => {
  it("strips a /rest/v1 suffix", () => {
    expect(getSupabaseProjectUrl("https://example.supabase.co/rest/v1/")).toBe(
      "https://example.supabase.co",
    );
  });
});

describe("submitContactForm", () => {
  const values = {
    name: "Alice Martin",
    email: "alice@exemple.fr",
    message: "Bonjour",
  };

  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns ok when the Edge Function succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );

    const result = await submitContactForm(values);

    expect(result).toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/send-contact-email",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-anon-key",
          apikey: "test-anon-key",
        }),
      }),
    );
  });

  it("returns an error when the Edge Function fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Échec de l’envoi du message." }),
      }),
    );

    const result = await submitContactForm(values);

    expect(result).toEqual({
      ok: false,
      error: "Échec de l’envoi du message.",
    });
  });

  it("returns an error when env vars are missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");

    const result = await submitContactForm(values);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toMatch(/configuration/i);
    }
  });
});
