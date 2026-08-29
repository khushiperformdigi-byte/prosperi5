import { getAdminToken, clearAdminToken } from './careers';
import { API_BASE, resolveApiOrigin } from '../config/api.js';

async function request(path, options = {}) {
  const { auth = false, headers: customHeaders, body, ...fetchOptions } = options;

  const headers = { ...(customHeaders || {}) };
  if (!(body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (auth) {
    const token = getAdminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...fetchOptions,
    headers,
    body: body instanceof FormData || typeof body === 'string' ? body : body != null ? JSON.stringify(body) : undefined,
  });

  // Binary media responses are handled separately
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : {};

  if (!response.ok) {
    if (response.status === 401 && auth) clearAdminToken();
    const error = new Error(payload.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.details = payload.details;
    throw error;
  }

  return payload;
}

export function resolveMediaUrl(urlOrId) {
  if (!urlOrId) return '';
  if (String(urlOrId).startsWith('http') || String(urlOrId).startsWith('data:')) {
    return urlOrId;
  }
  if (String(urlOrId).startsWith('/api/')) {
    return `${resolveApiOrigin()}${urlOrId}`;
  }
  return `${API_BASE}/media/${urlOrId}`;
}

export async function fetchPublishedPosts(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  const query = search.toString();
  const payload = await request(`/posts${query ? `?${query}` : ''}`);
  return payload.data?.posts || [];
}

export async function fetchPublishedPost(idOrSlug) {
  const payload = await request(`/posts/${encodeURIComponent(idOrSlug)}`);
  return payload.data?.post;
}

export async function fetchAdminPosts(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  const query = search.toString();
  const payload = await request(`/admin/posts${query ? `?${query}` : ''}`, { auth: true });
  return payload.data?.posts || [];
}

export async function fetchAdminPost(id) {
  const payload = await request(`/admin/posts/${id}`, { auth: true });
  return payload.data?.post;
}

export async function createAdminPost(body) {
  const payload = await request('/admin/posts', { method: 'POST', auth: true, body });
  return payload.data?.post;
}

export async function updateAdminPost(id, body) {
  const payload = await request(`/admin/posts/${id}`, { method: 'PATCH', auth: true, body });
  return payload.data?.post;
}

export async function deleteAdminPost(id) {
  const payload = await request(`/admin/posts/${id}`, { method: 'DELETE', auth: true });
  return payload.data;
}

export async function uploadAdminMedia(file, altText = '') {
  const formData = new FormData();
  formData.append('file', file);
  if (altText) formData.append('altText', altText);
  const payload = await request('/admin/media', {
    method: 'POST',
    auth: true,
    body: formData,
  });
  return payload.data?.media;
}

export async function uploadAdminMediaFromUrl(url, altText = '') {
  const payload = await request('/admin/media/from-url', {
    method: 'POST',
    auth: true,
    body: { url, altText },
  });
  return payload.data?.media;
}

export { API_BASE };
