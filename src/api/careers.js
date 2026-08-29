import { API_BASE } from '../config/api.js';

const TOKEN_KEY = 'prosperi5_admin_token';

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const { auth = false, headers: customHeaders, ...fetchOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...(customHeaders || {}),
  };

  if (auth) {
    const token = getAdminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...fetchOptions,
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearAdminToken();
    }
    const error = new Error(payload.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.details = payload.details;
    throw error;
  }

  return payload;
}

export async function fetchPublishedJobs(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });

  const query = search.toString();
  const payload = await request(`/jobs${query ? `?${query}` : ''}`);
  return payload.data?.jobs || [];
}

export async function submitJobApplication(body) {
  const payload = await request('/applications', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return payload.data;
}

export async function adminLogin({ email, password }) {
  const payload = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const token = payload.data?.token;
  if (token) setAdminToken(token);
  return payload.data;
}

export async function adminMe() {
  const payload = await request('/auth/me', { auth: true });
  return payload.data?.admin || null;
}

export async function fetchAdminJobs(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  const query = search.toString();
  const payload = await request(`/admin/jobs${query ? `?${query}` : ''}`, { auth: true });
  return Array.isArray(payload.data?.jobs) ? payload.data.jobs : [];
}

export async function fetchAdminJob(id) {
  const payload = await request(`/admin/jobs/${id}`, { auth: true });
  return payload.data?.job;
}

export async function createAdminJob(body) {
  const payload = await request('/admin/jobs', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(body),
  });
  return payload.data?.job;
}

export async function updateAdminJob(id, body) {
  const payload = await request(`/admin/jobs/${id}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(body),
  });
  return payload.data?.job;
}

export async function deleteAdminJob(id) {
  const payload = await request(`/admin/jobs/${id}`, {
    method: 'DELETE',
    auth: true,
  });
  return payload.data;
}

export async function fetchAdminEnquiries(params = {}) {
  const query = new URLSearchParams(params).toString();
  const payload = await request(`/admin/enquiries${query ? `?${query}` : ''}`, { auth: true });
  return Array.isArray(payload.data?.enquiries) ? payload.data.enquiries : [];
}

export async function deleteAdminEnquiry(id) {
  const payload = await request(`/admin/enquiries/${id}`, {
    method: 'DELETE',
    auth: true,
  });
  return payload.data;
}

export { API_BASE };
