import multer from 'multer';
import * as mediaService from '../services/media.service.js';
import * as blogService from '../services/blog.service.js';
import { asyncHandler, AppError } from '../utils/errors.js';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed'));
    }
    return cb(null, true);
  },
});

export const serveMedia = asyncHandler(async (req, res) => {
  const asset = await mediaService.getMediaAsset(req.params.id);
  res.setHeader('Content-Type', asset.mime_type);
  res.setHeader('Content-Length', asset.byte_size);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${encodeURIComponent(asset.filename)}"`
  );
  res.send(asset.data);
});

export const uploadMedia = asyncHandler(async (req, res) => {
  const media = await mediaService.saveMediaFromUpload(req.file, {
    createdBy: req.admin?.id || null,
    altText: req.body?.altText || null,
  });
  res.status(201).json({ success: true, data: { media } });
});

export const uploadMediaFromUrl = asyncHandler(async (req, res) => {
  const media = await mediaService.saveMediaFromUrl(req.body.url, {
    createdBy: req.admin?.id || null,
    altText: req.body.altText || null,
  });
  res.status(201).json({ success: true, data: { media } });
});

export const listPublicPosts = asyncHandler(async (req, res) => {
  const posts = await blogService.listPublicPosts(req.validatedQuery || {});
  res.json({ success: true, data: { posts, count: posts.length } });
});

export const getPublicPost = asyncHandler(async (req, res) => {
  const post = await blogService.getPostByIdOrSlug(req.params.idOrSlug, {
    includeUnpublished: false,
  });
  res.json({ success: true, data: { post } });
});

export const listAdminPosts = asyncHandler(async (req, res) => {
  const posts = await blogService.listAdminPosts(req.validatedQuery || {});
  res.json({ success: true, data: { posts, count: posts.length } });
});

export const getAdminPost = asyncHandler(async (req, res) => {
  const post = await blogService.getPostByIdOrSlug(req.params.id, {
    includeUnpublished: true,
  });
  res.json({ success: true, data: { post } });
});

export const createPost = asyncHandler(async (req, res) => {
  const post = await blogService.createPost(req.body, { createdBy: req.admin.id });
  res.status(201).json({ success: true, data: { post } });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await blogService.updatePost(req.params.id, req.body, {
    createdBy: req.admin.id,
  });
  res.json({ success: true, data: { post } });
});

export const deletePost = asyncHandler(async (req, res) => {
  const result = await blogService.softDeletePost(req.params.id);
  res.json({ success: true, data: result });
});
