import { z } from 'zod';

const stringList = z
  .union([z.array(z.string()), z.string()])
  .transform((value) => {
    if (Array.isArray(value)) {
      return value.map((item) => item.trim()).filter(Boolean);
    }
    return value
      .split(/\r?\n/)
      .map((item) => item.replace(/^[-*•✦]\s*/, '').trim())
      .filter(Boolean);
  })
  .refine((arr) => arr.length > 0, { message: 'At least one item is required' });

export const loginSchema = z.object({
  email: z.string().email().max(190),
  password: z.string().min(8).max(128),
});

export const jobWriteSchema = z.object({
  title: z.string().trim().min(2).max(200),
  location: z.string().trim().min(2).max(120),
  department: z.string().trim().min(2).max(120),
  experience: z.string().trim().min(1).max(80),
  employmentType: z.string().trim().min(2).max(50).default('Full-time'),
  description: z.string().trim().min(10).max(5000),
  aboutRole: z.string().trim().min(10).max(10000),
  responsibilities: stringList,
  requirements: stringList,
  benefits: stringList,
  status: z.enum(['draft', 'published', 'closed']).default('draft'),
  sortOrder: z.coerce.number().int().min(0).max(999999).default(0),
  slug: z
    .union([
      z.literal(''),
      z
        .string()
        .trim()
        .max(180)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case'),
    ])
    .optional(),
});

export const jobUpdateSchema = jobWriteSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field is required' }
);

export const publicJobsQuerySchema = z.object({
  department: z.string().trim().max(120).optional(),
  location: z.string().trim().max(120).optional(),
  q: z.string().trim().max(120).optional(),
});

export const adminJobsQuerySchema = z.object({
  status: z.enum(['draft', 'published', 'closed', 'all']).default('all'),
  q: z.string().trim().max(120).optional(),
});

export const applicationSchema = z.object({
  jobId: z
    .union([z.string().uuid(), z.null(), z.literal('')])
    .optional()
    .transform((value) => (value ? value : null)),
  fullName: z.string().trim().min(2).max(150),
  email: z.string().email().max(190),
  phone: z.string().trim().min(7).max(30),
  message: z.string().trim().max(5000).optional().default(''),
  source: z.string().trim().max(50).optional().default('website'),
});
