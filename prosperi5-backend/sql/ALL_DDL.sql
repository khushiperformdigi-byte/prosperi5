-- ============================================================
-- PROSPERi5 — Combined DDL for phpMyAdmin
-- Select your database, then run this entire script once.
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS admins (
  id CHAR(36) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(120) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at DATETIME NULL DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admins_email (email),
  KEY idx_admins_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS jobs (
  id CHAR(36) NOT NULL,
  slug VARCHAR(180) NOT NULL,
  title VARCHAR(200) NOT NULL,
  location VARCHAR(120) NOT NULL,
  department VARCHAR(120) NOT NULL,
  experience VARCHAR(80) NOT NULL,
  employment_type VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  description TEXT NOT NULL,
  about_role TEXT NOT NULL,
  responsibilities JSON NOT NULL,
  requirements JSON NOT NULL,
  benefits JSON NOT NULL,
  status ENUM('draft', 'published', 'closed') NOT NULL DEFAULT 'draft',
  sort_order INT NOT NULL DEFAULT 0,
  published_at DATETIME NULL DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_jobs_slug (slug),
  KEY idx_jobs_public_list (status, deleted_at, sort_order, published_at),
  KEY idx_jobs_department (department),
  KEY idx_jobs_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS job_applications (
  id CHAR(36) NOT NULL,
  job_id CHAR(36) NULL DEFAULT NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  message TEXT NULL,
  resume_url VARCHAR(500) NULL DEFAULT NULL,
  status ENUM('new', 'reviewed', 'shortlisted', 'rejected', 'hired') NOT NULL DEFAULT 'new',
  source VARCHAR(50) NOT NULL DEFAULT 'website',
  meta JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_apps_job (job_id),
  KEY idx_apps_status (status, created_at),
  KEY idx_apps_email (email),
  CONSTRAINT fk_apps_job
    FOREIGN KEY (job_id) REFERENCES jobs (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_assets (
  id CHAR(36) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  byte_size INT UNSIGNED NOT NULL,
  data LONGBLOB NOT NULL,
  alt_text VARCHAR(255) NULL DEFAULT NULL,
  source_url VARCHAR(1000) NULL DEFAULT NULL,
  created_by CHAR(36) NULL DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_media_created (created_at),
  KEY idx_media_mime (mime_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
  id CHAR(36) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  title VARCHAR(300) NOT NULL,
  content LONGTEXT NOT NULL,
  excerpt TEXT NULL,
  meta_title VARCHAR(300) NULL DEFAULT NULL,
  meta_description VARCHAR(500) NULL DEFAULT NULL,
  category VARCHAR(120) NULL DEFAULT NULL,
  tags JSON NULL,
  author_name VARCHAR(120) NOT NULL DEFAULT 'Admin',
  author_role VARCHAR(150) NULL DEFAULT NULL,
  author_bio TEXT NULL,
  read_time_minutes INT UNSIGNED NULL DEFAULT NULL,
  featured_image_id CHAR(36) NULL DEFAULT NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  is_popular TINYINT(1) NOT NULL DEFAULT 0,
  allow_comments TINYINT(1) NOT NULL DEFAULT 1,
  published_at DATETIME NULL DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blog_slug (slug),
  KEY idx_blog_public (status, deleted_at, published_at),
  KEY idx_blog_category (category),
  KEY idx_blog_popular (is_popular, status),
  CONSTRAINT fk_blog_featured_image
    FOREIGN KEY (featured_image_id) REFERENCES media_assets (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_faqs (
  id CHAR(36) NOT NULL,
  post_id CHAR(36) NOT NULL,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_faq_post (post_id, sort_order),
  CONSTRAINT fk_faq_post
    FOREIGN KEY (post_id) REFERENCES blog_posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
