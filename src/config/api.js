/** Production API URL (Hostinger DNS) */
export const SITE_API_ORIGIN = 'https://deeppink-worm-696612.hostingersite.com';

/**
 * Hostinger API Base URL DNS
 */
const envApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE = (
  envApiUrl && envApiUrl.trim() !== ''
    ? envApiUrl
    : `${SITE_API_ORIGIN}/api`
).replace(/\/$/, '');

/** Resolve image/media URLs from API responses */
export function resolveApiOrigin() {
  return API_BASE.startsWith('http') ? API_BASE.replace(/\/api$/, '') : SITE_API_ORIGIN;
}
