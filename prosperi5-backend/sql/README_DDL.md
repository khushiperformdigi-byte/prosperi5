-- ============================================================
-- PROSPERi5 — ALL DDL (run in phpMyAdmin on your database)
-- Order: admins/jobs first, then blog + media
-- Optional seed: also run 002_seed_jobs.sql separately
-- ============================================================

SOURCE is not supported in phpMyAdmin UI.
Instead run these files in order manually:

1) 001_schema.sql     — admins, jobs, job_applications
2) 003_blog_schema.sql — media_assets, blog_posts, blog_faqs

-- Or paste the contents of both files into the SQL tab one after another.
