import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as jobsController from '../controllers/jobs.controller.js';
import * as blogController from '../controllers/blog.controller.js';
import { requireAuth, requireActiveAdmin } from '../middleware/auth.js';
import { validateBody, validateQuery } from '../middleware/validate.js';
import {
  loginSchema,
  jobWriteSchema,
  jobUpdateSchema,
  publicJobsQuerySchema,
  adminJobsQuerySchema,
  applicationSchema,
} from '../validators/jobs.js';
import {
  blogWriteSchema,
  blogUpdateSchema,
  publicBlogQuerySchema,
  adminBlogQuerySchema,
  mediaUrlSchema,
} from '../validators/blog.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Try again later.' },
});

const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth
router.post('/auth/login', authLimiter, validateBody(loginSchema), jobsController.login);
router.get('/auth/me', requireAuth, requireActiveAdmin, jobsController.me);

// Media (public read — images stored forever in DB)
router.get('/media/:id', publicLimiter, blogController.serveMedia);

// Public careers
router.get('/jobs', publicLimiter, validateQuery(publicJobsQuerySchema), jobsController.listPublicJobs);
router.get('/jobs/:idOrSlug', publicLimiter, jobsController.getPublicJob);
router.post(
  '/applications',
  publicLimiter,
  validateBody(applicationSchema),
  jobsController.createApplication
);

// Public blog
router.get('/posts', publicLimiter, validateQuery(publicBlogQuerySchema), blogController.listPublicPosts);
router.get('/posts/:idOrSlug', publicLimiter, blogController.getPublicPost);

// Admin jobs
router.get(
  '/admin/jobs',
  requireAuth,
  requireActiveAdmin,
  validateQuery(adminJobsQuerySchema),
  jobsController.listAdminJobs
);
router.get('/admin/jobs/:id', requireAuth, requireActiveAdmin, jobsController.getAdminJob);
router.post(
  '/admin/jobs',
  requireAuth,
  requireActiveAdmin,
  validateBody(jobWriteSchema),
  jobsController.createJob
);
router.patch(
  '/admin/jobs/:id',
  requireAuth,
  requireActiveAdmin,
  validateBody(jobUpdateSchema),
  jobsController.updateJob
);
router.delete('/admin/jobs/:id', requireAuth, requireActiveAdmin, jobsController.deleteJob);

// Admin media uploads
router.post(
  '/admin/media',
  requireAuth,
  requireActiveAdmin,
  blogController.upload.single('file'),
  blogController.uploadMedia
);
router.post(
  '/admin/media/from-url',
  requireAuth,
  requireActiveAdmin,
  validateBody(mediaUrlSchema),
  blogController.uploadMediaFromUrl
);

// Admin blog
router.get(
  '/admin/posts',
  requireAuth,
  requireActiveAdmin,
  validateQuery(adminBlogQuerySchema),
  blogController.listAdminPosts
);
router.get('/admin/posts/:id', requireAuth, requireActiveAdmin, blogController.getAdminPost);
router.post(
  '/admin/posts',
  requireAuth,
  requireActiveAdmin,
  validateBody(blogWriteSchema),
  blogController.createPost
);
router.patch(
  '/admin/posts/:id',
  requireAuth,
  requireActiveAdmin,
  validateBody(blogUpdateSchema),
  blogController.updatePost
);
router.delete('/admin/posts/:id', requireAuth, requireActiveAdmin, blogController.deletePost);

export default router;
