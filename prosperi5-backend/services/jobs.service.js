import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/db.js';
import { AppError } from '../utils/errors.js';
import { normalizeJobRow, slugify } from '../utils/jobHelpers.js';

async function ensureUniqueSlug(baseSlug, excludeId = null) {
  let slug = baseSlug || `job-${Date.now()}`;
  let attempt = 0;

  while (attempt < 50) {
    const rows = await query(
      `SELECT id FROM jobs WHERE slug = :slug LIMIT 1`,
      { slug }
    );

    if (!rows.length || (excludeId && rows[0].id === excludeId)) {
      return slug;
    }

    attempt += 1;
    slug = `${baseSlug}-${attempt + 1}`;
  }

  throw new AppError('Could not generate a unique slug', 500);
}

function buildListFilters({ status, q, department, location, publicOnly }) {
  const where = ['deleted_at IS NULL'];
  const params = {};

  if (publicOnly) {
    where.push(`status = 'published'`);
  } else if (status && status !== 'all') {
    where.push('status = :status');
    params.status = status;
  }

  if (department) {
    where.push('department = :department');
    params.department = department;
  }

  if (location) {
    where.push('location LIKE :location');
    params.location = `%${location}%`;
  }

  if (q) {
    where.push(
      `(title LIKE :q OR department LIKE :q OR location LIKE :q OR description LIKE :q)`
    );
    params.q = `%${q}%`;
  }

  return { whereSql: where.join(' AND '), params };
}

export async function listPublicJobs(filters = {}) {
  try {
    const { whereSql, params } = buildListFilters({
      ...filters,
      publicOnly: true,
    });

    const rows = await query(
      `SELECT *
       FROM jobs
       WHERE ${whereSql}
       ORDER BY sort_order ASC, published_at DESC, created_at DESC`,
      params
    );

    return rows.map(normalizeJobRow);
  } catch (err) {
    console.error('listPublicJobs DB error:', err.message);
    return [];
  }
}

export async function listAdminJobs(filters = {}) {
  const { whereSql, params } = buildListFilters({
    ...filters,
    publicOnly: false,
  });

  const rows = await query(
    `SELECT *
     FROM jobs
     WHERE ${whereSql}
     ORDER BY sort_order ASC, updated_at DESC`,
    params
  );

  return rows.map(normalizeJobRow);
}

export async function getJobByIdOrSlug(idOrSlug, { includeUnpublished = false } = {}) {
  const rows = await query(
    `SELECT *
     FROM jobs
     WHERE deleted_at IS NULL
       AND (id = :idOrSlug OR slug = :idOrSlug)
     LIMIT 1`,
    { idOrSlug }
  );

  const job = normalizeJobRow(rows[0]);
  if (!job) {
    throw new AppError('Job not found', 404);
  }

  if (!includeUnpublished && job.status !== 'published') {
    throw new AppError('Job not found', 404);
  }

  return job;
}

export async function createJob(payload) {
  const id = uuidv4();
  const baseSlug = slugify(payload.slug || payload.title);
  const slug = await ensureUniqueSlug(baseSlug);
  const publishedAt = payload.status === 'published' ? new Date() : null;

  await query(
    `INSERT INTO jobs (
      id, slug, title, location, department, experience, employment_type,
      description, about_role, responsibilities, requirements, benefits,
      status, sort_order, published_at
    ) VALUES (
      :id, :slug, :title, :location, :department, :experience, :employmentType,
      :description, :aboutRole, :responsibilities, :requirements, :benefits,
      :status, :sortOrder, :publishedAt
    )`,
    {
      id,
      slug,
      title: payload.title,
      location: payload.location,
      department: payload.department,
      experience: payload.experience,
      employmentType: payload.employmentType || 'Full-time',
      description: payload.description,
      aboutRole: payload.aboutRole,
      responsibilities: JSON.stringify(payload.responsibilities),
      requirements: JSON.stringify(payload.requirements),
      benefits: JSON.stringify(payload.benefits),
      status: payload.status || 'draft',
      sortOrder: payload.sortOrder ?? 0,
      publishedAt,
    }
  );

  return getJobByIdOrSlug(id, { includeUnpublished: true });
}

export async function updateJob(id, payload) {
  const existing = await getJobByIdOrSlug(id, { includeUnpublished: true });

  const next = {
    title: payload.title ?? existing.title,
    location: payload.location ?? existing.location,
    department: payload.department ?? existing.department,
    experience: payload.experience ?? existing.experience,
    employmentType: payload.employmentType ?? existing.employmentType,
    description: payload.description ?? existing.description,
    aboutRole: payload.aboutRole ?? existing.aboutRole,
    responsibilities: payload.responsibilities ?? existing.responsibilities,
    requirements: payload.requirements ?? existing.requirements,
    benefits: payload.benefits ?? existing.benefits,
    status: payload.status ?? existing.status,
    sortOrder: payload.sortOrder ?? existing.sortOrder,
  };

  let slug = existing.slug;
  if (payload.slug !== undefined && payload.slug !== '') {
    slug = await ensureUniqueSlug(slugify(payload.slug), existing.id);
  } else if (payload.title && payload.title !== existing.title && !payload.slug) {
    // Keep existing slug when title changes unless slug explicitly provided
    slug = existing.slug;
  }

  let publishedAt = existing.publishedAt;
  if (next.status === 'published' && existing.status !== 'published') {
    publishedAt = new Date();
  }
  if (next.status !== 'published') {
    publishedAt = existing.status === 'published' ? existing.publishedAt : null;
  }

  await query(
    `UPDATE jobs SET
      slug = :slug,
      title = :title,
      location = :location,
      department = :department,
      experience = :experience,
      employment_type = :employmentType,
      description = :description,
      about_role = :aboutRole,
      responsibilities = :responsibilities,
      requirements = :requirements,
      benefits = :benefits,
      status = :status,
      sort_order = :sortOrder,
      published_at = :publishedAt
     WHERE id = :id AND deleted_at IS NULL`,
    {
      id: existing.id,
      slug,
      title: next.title,
      location: next.location,
      department: next.department,
      experience: next.experience,
      employmentType: next.employmentType,
      description: next.description,
      aboutRole: next.aboutRole,
      responsibilities: JSON.stringify(next.responsibilities),
      requirements: JSON.stringify(next.requirements),
      benefits: JSON.stringify(next.benefits),
      status: next.status,
      sortOrder: next.sortOrder,
      publishedAt,
    }
  );

  return getJobByIdOrSlug(existing.id, { includeUnpublished: true });
}

export async function softDeleteJob(id) {
  const existing = await getJobByIdOrSlug(id, { includeUnpublished: true });

  await query(
    `UPDATE jobs
     SET deleted_at = UTC_TIMESTAMP(), status = 'closed'
     WHERE id = :id`,
    { id: existing.id }
  );

  return { id: existing.id, deleted: true };
}

export async function createApplication(payload) {
  if (payload.jobId) {
    await getJobByIdOrSlug(payload.jobId, { includeUnpublished: false });
  }

  const id = uuidv4();

  await query(
    `INSERT INTO job_applications (
      id, job_id, full_name, email, phone, message, status, source
    ) VALUES (
      :id, :jobId, :fullName, :email, :phone, :message, 'new', :source
    )`,
    {
      id,
      jobId: payload.jobId || null,
      fullName: payload.fullName,
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      message: payload.message || null,
      source: payload.source || 'website',
    }
  );

  return { id, received: true };
}
