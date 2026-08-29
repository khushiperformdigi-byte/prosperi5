import { z } from 'zod';

const faqSchema = z.object({
  question: z.string().trim().min(2).max(500),
  answer: z.string().trim().min(2).max(10000),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export const blogWriteSchema = z.object({
  title: z.string().trim().min(2).max(300),
  slug: z.union([z.literal(''), z.string().trim().max(200)]).optional(),
  content: z.string().min(1),
  excerpt: z.string().trim().max(5000).optional().default(''),
  metaTitle: z.string().trim().max(300).optional().default(''),
  metaDescription: z.string().trim().max(500).optional().default(''),
  category: z.string().trim().max(120).optional().default(''),
  tags: z.union([z.string(), z.array(z.string())]).optional().default([]),
  authorName: z.string().trim().max(120).optional().default('Admin'),
  authorRole: z.string().trim().max(150).optional().default(''),
  authorBio: z.string().trim().max(5000).optional().default(''),
  readTimeMinutes: z.union([z.coerce.number().int().min(1).max(120), z.literal(''), z.null()]).optional(),
  featuredImageId: z.string().uuid().nullable().optional(),
  featuredImageUrl: z.union([z.string().url(), z.literal('')]).optional(),
  clearFeaturedImage: z.boolean().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  isPopular: z.boolean().optional().default(false),
  allowComments: z.boolean().optional().default(true),
  publishedAt: z.string().optional().nullable(),
  faqs: z.array(faqSchema).optional().default([]),
});

export const blogUpdateSchema = blogWriteSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field is required' }
);

export const publicBlogQuerySchema = z.object({
  category: z.string().trim().max(120).optional(),
  q: z.string().trim().max(120).optional(),
  popular: z.string().optional(),
});

export const adminBlogQuerySchema = z.object({
  status: z.enum(['draft', 'published', 'archived', 'all']).default('all'),
  q: z.string().trim().max(120).optional(),
});

export const mediaUrlSchema = z.object({
  url: z.string().url(),
  altText: z.string().trim().max(255).optional(),
});
