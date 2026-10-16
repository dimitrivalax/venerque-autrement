/**
 * Edge Function that sends contact-form messages through Infomaniak SMTP.
 *
 * Infomaniak docs: https://faq.infomaniak.com/2427
 * Supabase blocks outbound SMTP on port 587; use 465 + SSL instead.
 *
 * Abuse controls: CORS allowlist, honeypot field, per-IP rate limit, max lengths.
 */

import nodemailer from 'npm:nodemailer@6.10.1'

import { corsHeaders, getAllowedOrigin } from './cors.ts'
import { checkRateLimit, getClientIp } from './rate-limit.ts'

/** Maximum length for the contact name field. */
const MAX_NAME_LENGTH = 100

/** Maximum length for the contact e-mail field. */
const MAX_EMAIL_LENGTH = 254

/** Maximum length for the optional phone field. */
const MAX_PHONE_LENGTH = 30

/** Maximum length for the message body. */
const MAX_MESSAGE_LENGTH = 5000

/**
 * Validated contact payload expected from the public form.
 */
type ContactPayload = {
  readonly name: string
  readonly email: string
  readonly phone?: string
  readonly message: string
}

/**
 * Parses and validates the JSON body of a contact request.
 *
 * @param body - Raw parsed JSON value
 * @returns Validated payload, a honeypot signal, or an error message
 */
function parseContactPayload(
  body: unknown
): ContactPayload | { honeypot: true } | { error: string } {
  if (body === null || typeof body !== 'object') {
    return { error: 'Corps de requête invalide.' }
  }

  const record = body as Record<string, unknown>

  // Honeypot: bots often fill hidden "company" fields. Fake success, skip SMTP.
  const company = typeof record.company === 'string' ? record.company.trim() : ''

  if (company) {
    return { honeypot: true }
  }

  const name = typeof record.name === 'string' ? record.name.trim() : ''
  const email = typeof record.email === 'string' ? record.email.trim() : ''
  const phoneRaw = typeof record.phone === 'string' ? record.phone.trim() : ''
  const message = typeof record.message === 'string' ? record.message.trim() : ''

  if (!name) {
    return { error: 'Le nom est obligatoire.' }
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { error: 'Le nom est trop long.' }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'L’e-mail n’est pas valide.' }
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    return { error: 'L’e-mail est trop long.' }
  }

  if (phoneRaw.length > MAX_PHONE_LENGTH) {
    return { error: 'Le numéro est trop long.' }
  }

  if (!message) {
    return { error: 'Le message est obligatoire.' }
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { error: 'Le message est trop long.' }
  }

  return {
    name,
    email,
    ...(phoneRaw ? { phone: phoneRaw } : {}),
    message
  }
}

/**
 * Strips characters that must not appear in an e-mail header value.
 *
 * @param value - Raw header fragment (e.g. subject name)
 * @returns Sanitized single-line string
 */
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n\0]/g, ' ').trim()
}

/**
 * Builds the plain-text e-mail body from a contact payload.
 *
 * @param payload - Validated contact form data
 * @returns Plain-text message body
 */
function buildEmailBody(payload: ContactPayload): string {
  const phoneLine = payload.phone ? `Téléphone : ${payload.phone}\n` : ''

  return `Nom : ${payload.name}\nE-mail : ${payload.email}\n${phoneLine}\n${payload.message}`
}

/**
 * Reads required SMTP environment variables.
 *
 * @returns Config object or an error message when a variable is missing
 */
function getSmtpConfig():
  | {
      hostname: string
      port: number
      secure: boolean
      username: string
      password: string
      from: string
      to: string
    }
  | { error: string } {
  const hostname = Deno.env.get('SMTP_HOSTNAME')
  const portRaw = Deno.env.get('SMTP_PORT')
  const secureRaw = Deno.env.get('SMTP_SECURE')
  const username = Deno.env.get('SMTP_USERNAME')
  const password = Deno.env.get('SMTP_PASSWORD')
  const from = Deno.env.get('SMTP_FROM')
  const to = Deno.env.get('CONTACT_TO')

  if (!hostname || !portRaw || !username || !password || !from || !to) {
    return { error: 'Configuration SMTP incomplète.' }
  }

  return {
    hostname,
    port: Number(portRaw),
    secure: secureRaw === 'true' || secureRaw === '1',
    username,
    password,
    from,
    to
  }
}

Deno.serve(async (req: Request): Promise<Response> => {
  const origin = getAllowedOrigin(req.headers.get('Origin'))
  const headers = origin ? corsHeaders(origin) : { 'Content-Type': 'application/json' }

  if (req.method === 'OPTIONS') {
    if (!origin) {
      return new Response(null, { status: 403 })
    }

    return new Response(null, { status: 204, headers })
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Méthode non autorisée.' }, { status: 405, headers })
  }

  if (!origin) {
    return Response.json({ error: 'Origine non autorisée.' }, { status: 403, headers })
  }

  const clientIp = getClientIp(req)
  const rate = checkRateLimit(clientIp)

  if (!rate.allowed) {
    return Response.json(
      { error: 'Trop de tentatives. Réessayez plus tard.' },
      {
        status: 429,
        headers: {
          ...headers,
          'Retry-After': String(rate.retryAfterSeconds)
        }
      }
    )
  }

  let json: unknown

  try {
    json = await req.json()
  } catch {
    return Response.json({ error: 'JSON invalide.' }, { status: 400, headers })
  }

  const parsed = parseContactPayload(json)

  if ('honeypot' in parsed) {
    return Response.json({ ok: true }, { status: 200, headers })
  }

  if ('error' in parsed) {
    return Response.json({ error: parsed.error }, { status: 400, headers })
  }

  const smtp = getSmtpConfig()

  if ('error' in smtp) {
    console.error(smtp.error)

    return Response.json({ error: 'Service d’envoi indisponible.' }, { status: 500, headers })
  }

  const transport = nodemailer.createTransport({
    host: smtp.hostname,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.username,
      pass: smtp.password
    }
  })

  const safeName = sanitizeHeaderValue(parsed.name)

  try {
    await transport.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: parsed.email,
      subject: `Contact — ${safeName}`,
      text: buildEmailBody(parsed)
    })
  } catch (error) {
    console.error('SMTP send failed', error)

    return Response.json({ error: 'Échec de l’envoi du message.' }, { status: 502, headers })
  }

  return Response.json({ ok: true }, { status: 200, headers })
})
