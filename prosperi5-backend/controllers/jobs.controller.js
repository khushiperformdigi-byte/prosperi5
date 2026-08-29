import * as authService from '../services/auth.service.js';
import * as jobsService from '../services/jobs.service.js';
import { asyncHandler } from '../utils/errors.js';

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginAdmin(req.body);
  res.json({
    success: true,
    data: result,
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: { admin: req.admin },
  });
});

export const listPublicJobs = asyncHandler(async (req, res) => {
  const jobs = await jobsService.listPublicJobs(req.validatedQuery || {});
  res.json({
    success: true,
    data: { jobs, count: jobs.length },
  });
});

export const getPublicJob = asyncHandler(async (req, res) => {
  const job = await jobsService.getJobByIdOrSlug(req.params.idOrSlug, {
    includeUnpublished: false,
  });
  res.json({ success: true, data: { job } });
});

export const listAdminJobs = asyncHandler(async (req, res) => {
  const jobs = await jobsService.listAdminJobs(req.validatedQuery || {});
  res.json({
    success: true,
    data: { jobs, count: jobs.length },
  });
});

export const getAdminJob = asyncHandler(async (req, res) => {
  const job = await jobsService.getJobByIdOrSlug(req.params.id, {
    includeUnpublished: true,
  });
  res.json({ success: true, data: { job } });
});

export const createJob = asyncHandler(async (req, res) => {
  const job = await jobsService.createJob(req.body);
  res.status(201).json({ success: true, data: { job } });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await jobsService.updateJob(req.params.id, req.body);
  res.json({ success: true, data: { job } });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const result = await jobsService.softDeleteJob(req.params.id);
  res.json({ success: true, data: result });
});

export const createApplication = asyncHandler(async (req, res) => {
  const result = await jobsService.createApplication(req.body);
  res.status(201).json({ success: true, data: result });
});
