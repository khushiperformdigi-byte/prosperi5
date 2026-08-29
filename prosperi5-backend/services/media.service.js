import { v4 as uuidv4 } from 'uuid';
import env from '../config/env.js';
import { query } from '../config/db.js';
import { AppError } from '../utils/errors.js';

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
]);

const MAX_BYTES = 5 * 1024 * 1024;

export function mediaPublicUrl(id) {
  const base = String(env.APP_URL || '').replace(/\/$/, '');
  return `${base}/api/media/${id}`;
}

export async function saveMediaBuffer({
  buffer,
  filename,
  mimeType,
  altText = null,
  sourceUrl = null,
  createdBy = null,
}) {
  if (!buffer?.length) {
    throw new AppError('Empty file', 400);
  }
  if (buffer.length > MAX_BYTES) {
    throw new AppError('Image must be 5MB or smaller', 400);
  }
  if (!ALLOWED_MIME.has(mimeType)) {
    throw new AppError('Unsupported image type', 400);
  }

  const id = uuidv4();
  await query(
    `INSERT INTO media_assets (
      id, filename, mime_type, byte_size, data, alt_text, source_url, created_by
    ) VALUES (
      :id, :filename, :mimeType, :byteSize, :data, :altText, :sourceUrl, :createdBy
    )`,
    {
      id,
      filename: filename || `upload-${Date.now()}`,
      mimeType,
      byteSize: buffer.length,
      data: buffer,
      altText,
      sourceUrl,
      createdBy,
    }
  );

  return {
    id,
    filename: filename || `upload-${Date.now()}`,
    mimeType,
    byteSize: buffer.length,
    url: mediaPublicUrl(id),
  };
}

export async function saveMediaFromUpload(file, { createdBy = null, altText = null } = {}) {
  if (!file) throw new AppError('No file uploaded', 400);
  return saveMediaBuffer({
    buffer: file.buffer,
    filename: file.originalname,
    mimeType: file.mimetype,
    createdBy,
    altText,
  });
}

export async function saveMediaFromUrl(url, { createdBy = null, altText = null } = {}) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new AppError('Invalid image URL', 400);
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new AppError('Image URL must be http(s)', 400);
  }

  const response = await fetch(parsed.toString(), {
    redirect: 'follow',
    headers: { 'User-Agent': 'Prosperi5-MediaFetcher/1.0' },
  });

  if (!response.ok) {
    throw new AppError(`Failed to download image (${response.status})`, 400);
  }

  const mimeType = (response.headers.get('content-type') || '').split(';')[0].trim();
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = parsed.pathname.split('/').filter(Boolean).pop() || `remote-${Date.now()}.img`;

  return saveMediaBuffer({
    buffer,
    filename,
    mimeType: mimeType || 'image/jpeg',
    createdBy,
    altText,
    sourceUrl: parsed.toString(),
  });
}

export async function getMediaAsset(id) {
  const rows = await query(
    `SELECT id, filename, mime_type, byte_size, data, created_at
     FROM media_assets
     WHERE id = :id
     LIMIT 1`,
    { id }
  );
  if (!rows[0]) throw new AppError('Media not found', 404);
  return rows[0];
}
