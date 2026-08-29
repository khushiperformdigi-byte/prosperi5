import { v4 as uuidv4 } from 'uuid';
import { query, withTransaction } from '../config/db.js';
import { AppError } from '../utils/errors.js';
import { slugify } from '../utils/jobHelpers.js';
import { mediaPublicUrl, saveMediaFromUrl } from './media.service.js';

function parseTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function parseFaqs(faqs) {
  if (!Array.isArray(faqs)) return [];
  return faqs
    .map((faq, index) => ({
      question: String(faq?.question || '').trim(),
      answer: String(faq?.answer || '').trim(),
      sortOrder: Number.isFinite(faq?.sortOrder) ? faq.sortOrder : index,
    }))
    .filter((faq) => faq.question && faq.answer);
}

function estimateReadTime(html) {
  const text = String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

function normalizePost(row, faqs = []) {
  if (!row) return null;

  let tags = [];
  if (Array.isArray(row.tags)) tags = row.tags;
  else if (typeof row.tags === 'string') {
    try {
      tags = JSON.parse(row.tags);
    } catch {
      tags = parseTags(row.tags);
    }
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content,
    excerpt: row.excerpt || '',
    metaTitle: row.meta_title || '',
    metaDescription: row.meta_description || '',
    category: row.category || '',
    tags,
    authorName: row.author_name,
    authorRole: row.author_role || '',
    authorBio: row.author_bio || '',
    readTimeMinutes: row.read_time_minutes,
    readTime: `${row.read_time_minutes || estimateReadTime(row.content)} min read`,
    featuredImageId: row.featured_image_id || null,
    featuredImageUrl: row.featured_image_id ? mediaPublicUrl(row.featured_image_id) : null,
    status: row.status,
    isPopular: Boolean(row.is_popular),
    allowComments: Boolean(row.allow_comments),
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    faqs: faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      sortOrder: f.sort_order,
    })),
  };
}

async function loadFaqs(postId) {
  return query(
    `SELECT id, question, answer, sort_order
     FROM blog_faqs
     WHERE post_id = :postId
     ORDER BY sort_order ASC, created_at ASC`,
    { postId }
  );
}

async function ensureUniqueSlug(baseSlug, excludeId = null) {
  let slug = baseSlug || `post-${Date.now()}`;
  let attempt = 0;
  while (attempt < 50) {
    const rows = await query(`SELECT id FROM blog_posts WHERE slug = :slug LIMIT 1`, { slug });
    if (!rows.length || (excludeId && rows[0].id === excludeId)) return slug;
    attempt += 1;
    slug = `${baseSlug}-${attempt + 1}`;
  }
  throw new AppError('Could not generate a unique slug', 500);
}

async function replaceFaqs(connection, postId, faqs) {
  await connection.execute(`DELETE FROM blog_faqs WHERE post_id = ?`, [postId]);
  for (const [index, faq] of faqs.entries()) {
    await connection.execute(
      `INSERT INTO blog_faqs (id, post_id, question, answer, sort_order)
       VALUES (?, ?, ?, ?, ?)`,
      [uuidv4(), postId, faq.question, faq.answer, faq.sortOrder ?? index]
    );
  }
}

export async function listPublicPosts(filters = {}) {
  try {
    const where = [`deleted_at IS NULL`, `status = 'published'`];
    const params = {};

    if (filters.category && filters.category !== 'All') {
      where.push('category = :category');
      params.category = filters.category;
    }
    if (filters.q) {
      where.push('(title LIKE :q OR excerpt LIKE :q OR category LIKE :q)');
      params.q = `%${filters.q}%`;
    }
    if (filters.popular === '1' || filters.popular === true) {
      where.push('is_popular = 1');
    }

    const rows = await query(
      `SELECT id, slug, title, excerpt, category, tags, author_name, author_role,
              read_time_minutes, featured_image_id, status, is_popular, allow_comments,
              published_at, created_at, updated_at, meta_title, meta_description, author_bio
       FROM blog_posts
       WHERE ${where.join(' AND ')}
       ORDER BY published_at DESC, created_at DESC`,
      params
    );

    return rows.map((row) => normalizePost(row, []));
  } catch (err) {
    console.error('listPublicPosts DB error:', err.message);
    return [];
  }
}

export async function listAdminPosts(filters = {}) {
  const where = ['deleted_at IS NULL'];
  const params = {};
  if (filters.status && filters.status !== 'all') {
    where.push('status = :status');
    params.status = filters.status;
  }
  if (filters.q) {
    where.push('(title LIKE :q OR excerpt LIKE :q OR category LIKE :q)');
    params.q = `%${filters.q}%`;
  }

  const rows = await query(
    `SELECT *
     FROM blog_posts
     WHERE ${where.join(' AND ')}
     ORDER BY updated_at DESC`,
    params
  );

  return rows.map((row) => normalizePost(row, []));
}

export async function getPostByIdOrSlug(idOrSlug, { includeUnpublished = false } = {}) {
  const rows = await query(
    `SELECT *
     FROM blog_posts
     WHERE deleted_at IS NULL
       AND (id = :idOrSlug OR slug = :idOrSlug)
     LIMIT 1`,
    { idOrSlug }
  );
  const row = rows[0];
  if (!row) throw new AppError('Post not found', 404);
  if (!includeUnpublished && row.status !== 'published') {
    throw new AppError('Post not found', 404);
  }
  const faqs = await loadFaqs(row.id);
  return normalizePost(row, faqs);
}

async function resolveFeaturedImageId(payload, createdBy) {
  if (payload.featuredImageId) return payload.featuredImageId;
  if (payload.featuredImageUrl) {
    const media = await saveMediaFromUrl(payload.featuredImageUrl, { createdBy });
    return media.id;
  }
  if (payload.clearFeaturedImage) return null;
  return undefined;
}

export async function createPost(payload, { createdBy = null } = {}) {
  const id = uuidv4();
  const baseSlug = slugify(payload.slug || payload.title);
  const slug = await ensureUniqueSlug(baseSlug);
  const tags = parseTags(payload.tags);
  const faqs = parseFaqs(payload.faqs);
  const readTime =
    payload.readTimeMinutes != null && payload.readTimeMinutes !== ''
      ? Number(payload.readTimeMinutes)
      : estimateReadTime(payload.content);

  let featuredImageId = null;
  const resolved = await resolveFeaturedImageId(payload, createdBy);
  if (resolved !== undefined) featuredImageId = resolved;

  const status = payload.status || 'draft';
  const publishedAt =
    status === 'published'
      ? payload.publishedAt
        ? new Date(payload.publishedAt)
        : new Date()
      : payload.publishedAt
        ? new Date(payload.publishedAt)
        : null;

  await withTransaction(async (connection) => {
    await connection.execute(
      `INSERT INTO blog_posts (
        id, slug, title, content, excerpt, meta_title, meta_description,
        category, tags, author_name, author_role, author_bio, read_time_minutes,
        featured_image_id, status, is_popular, allow_comments, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        slug,
        payload.title,
        payload.content,
        payload.excerpt || null,
        payload.metaTitle || null,
        payload.metaDescription || null,
        payload.category || null,
        JSON.stringify(tags),
        payload.authorName || 'Admin',
        payload.authorRole || null,
        payload.authorBio || null,
        readTime,
        featuredImageId,
        status,
        payload.isPopular ? 1 : 0,
        payload.allowComments === false ? 0 : 1,
        publishedAt,
      ]
    );
    await replaceFaqs(connection, id, faqs);
  });

  return getPostByIdOrSlug(id, { includeUnpublished: true });
}

export async function updatePost(id, payload, { createdBy = null } = {}) {
  const existing = await getPostByIdOrSlug(id, { includeUnpublished: true });

  const next = {
    title: payload.title ?? existing.title,
    content: payload.content ?? existing.content,
    excerpt: payload.excerpt ?? existing.excerpt,
    metaTitle: payload.metaTitle ?? existing.metaTitle,
    metaDescription: payload.metaDescription ?? existing.metaDescription,
    category: payload.category ?? existing.category,
    tags: payload.tags !== undefined ? parseTags(payload.tags) : existing.tags,
    authorName: payload.authorName ?? existing.authorName,
    authorRole: payload.authorRole ?? existing.authorRole,
    authorBio: payload.authorBio ?? existing.authorBio,
    status: payload.status ?? existing.status,
    isPopular: payload.isPopular ?? existing.isPopular,
    allowComments: payload.allowComments ?? existing.allowComments,
  };

  let slug = existing.slug;
  if (payload.slug !== undefined && payload.slug !== '') {
    slug = await ensureUniqueSlug(slugify(payload.slug), existing.id);
  }

  const readTime =
    payload.readTimeMinutes != null && payload.readTimeMinutes !== ''
      ? Number(payload.readTimeMinutes)
      : existing.readTimeMinutes || estimateReadTime(next.content);

  let featuredImageId = existing.featuredImageId;
  const resolved = await resolveFeaturedImageId(payload, createdBy);
  if (resolved !== undefined) featuredImageId = resolved;

  let publishedAt = existing.publishedAt;
  if (payload.publishedAt) {
    publishedAt = new Date(payload.publishedAt);
  } else if (next.status === 'published' && existing.status !== 'published') {
    publishedAt = new Date();
  }

  const faqs = payload.faqs !== undefined ? parseFaqs(payload.faqs) : null;

  await withTransaction(async (connection) => {
    await connection.execute(
      `UPDATE blog_posts SET
        slug = ?, title = ?, content = ?, excerpt = ?, meta_title = ?, meta_description = ?,
        category = ?, tags = ?, author_name = ?, author_role = ?, author_bio = ?,
        read_time_minutes = ?, featured_image_id = ?, status = ?, is_popular = ?,
        allow_comments = ?, published_at = ?
       WHERE id = ? AND deleted_at IS NULL`,
      [
        slug,
        next.title,
        next.content,
        next.excerpt || null,
        next.metaTitle || null,
        next.metaDescription || null,
        next.category || null,
        JSON.stringify(next.tags),
        next.authorName || 'Admin',
        next.authorRole || null,
        next.authorBio || null,
        readTime,
        featuredImageId,
        next.status,
        next.isPopular ? 1 : 0,
        next.allowComments ? 1 : 0,
        publishedAt,
        existing.id,
      ]
    );

    if (faqs) {
      await replaceFaqs(connection, existing.id, faqs);
    }
  });

  return getPostByIdOrSlug(existing.id, { includeUnpublished: true });
}

export async function softDeletePost(id) {
  const existing = await getPostByIdOrSlug(id, { includeUnpublished: true });
  await query(
    `UPDATE blog_posts
     SET deleted_at = UTC_TIMESTAMP(), status = 'archived'
     WHERE id = :id`,
    { id: existing.id }
  );
  return { id: existing.id, deleted: true };
}
