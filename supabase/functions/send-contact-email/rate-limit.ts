/**
 * In-memory sliding-window rate limiter for the public contact Edge Function.
 *
 * Limits are per isolate: cold starts reset the map. This still blocks casual
 * SMTP abuse without an external store.
 */

/**
 * Rate-limit decision returned to the caller.
 */
export type RateLimitResult = {
  readonly allowed: boolean
  readonly retryAfterSeconds: number
}

/**
 * Tracks request counts inside a time window for a single client key.
 */
type RateLimitEntry = {
  count: number
  windowStartMs: number
}

const DEFAULT_MAX_REQUESTS = 5
const DEFAULT_WINDOW_MS = 15 * 60 * 1000

const hits = new Map<string, RateLimitEntry>()

/**
 * Reads the client IP from common proxy headers.
 *
 * @param req - Incoming HTTP request
 * @returns Best-effort client IP, or `"unknown"` when absent
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')

  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()

    if (first) {
      return first
    }
  }

  return (
    req.headers.get('cf-connecting-ip')?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    'unknown'
  )
}

/**
 * Checks and records a hit for the given client key.
 *
 * @param key - Client identifier (typically IP)
 * @param maxRequests - Maximum allowed hits per window
 * @param windowMs - Window length in milliseconds
 * @returns Whether the request is allowed and a Retry-After hint
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = DEFAULT_MAX_REQUESTS,
  windowMs: number = DEFAULT_WINDOW_MS
): RateLimitResult {
  const now = Date.now()
  const existing = hits.get(key)

  if (!existing || now - existing.windowStartMs >= windowMs) {
    hits.set(key, { count: 1, windowStartMs: now })

    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (existing.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((existing.windowStartMs + windowMs - now) / 1000)

    return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) }
  }

  existing.count += 1

  return { allowed: true, retryAfterSeconds: 0 }
}
