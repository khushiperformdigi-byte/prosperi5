export function slugify(input) {
  return String(input || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160);
}

export function parseJsonArray(value, fieldName = 'field') {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // Fall through to newline / bullet parsing
    }

    return trimmed
      .split(/\r?\n|•|✦/)
      .map((item) => item.replace(/^[-*]\s*/, '').trim())
      .filter(Boolean);
  }

  throw new Error(`${fieldName} must be an array or multiline string`);
}

export function normalizeJobRow(row) {
  if (!row) return null;

  const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    department: row.department,
    experience: row.experience,
    employmentType: row.employment_type,
    description: row.description,
    aboutRole: row.about_role,
    responsibilities: toArray(row.responsibilities),
    requirements: toArray(row.requirements),
    benefits: toArray(row.benefits),
    status: row.status,
    sortOrder: row.sort_order,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
