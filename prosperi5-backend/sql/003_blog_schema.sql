-- ============================================================
-- PROSPERi5 Blog + Media library (Hostinger / phpMyAdmin)
-- Run AFTER 001_schema.sql (admins table already exists)
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ------------------------------------------------------------
-- Media assets — images stored forever as BLOBs in MySQL
-- Served via GET /api/media/:id
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- Blog posts
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- Blog FAQs (FAQPage schema on detail page)
-- ------------------------------------------------------------
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
