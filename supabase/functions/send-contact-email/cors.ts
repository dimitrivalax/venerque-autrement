/**
 * Allowed browser origins for the public contact form.
 */
const ALLOWED_ORIGINS = new Set([
  'https://venerque-autrement.fr',
  'https://www.venerque-autrement.fr',
  'http://localhost:3000'
])

/**
 * Resolves the CORS `Access-Control-Allow-Origin` value for a request.
 *
 * @param requestOrigin - Value of the `Origin` request header
 * @returns The origin to echo back, or `null` when the origin is not allowed
 */
export function getAllowedOrigin(requestOrigin: string | null): string | null {
  if (!requestOrigin) {
    return null
  }

  return ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : null
}

/**
 * Builds CORS response headers for an allowed origin.
 *
 * @param origin - Allowed origin echoed to the client
 * @returns Headers suitable for OPTIONS and JSON responses
 */
export function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }
}
