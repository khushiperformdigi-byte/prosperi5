-- ============================================================
-- PROSPERI5 FULL MYSQL DDL SCRIPT FOR HOSTINGER PHPMYADMIN
-- Target Database: u808577555_porsperi555
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `u808577555_porsperi555` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `u808577555_porsperi555`;

-- ------------------------------------------------------------
-- 1. Table structure for `admins`
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(191) NOT NULL DEFAULT 'Admin User',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login_at` DATETIME DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_admins_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2. Table structure for `job_applications` (Child table of jobs)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `job_applications`;
CREATE TABLE `job_applications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id` INT UNSIGNED NOT NULL,
  `full_name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `message` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_applications_job_id` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table structure for `enquiries` (User Form Leads & Enquiries)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `enquiries`;
CREATE TABLE `enquiries` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_name` VARCHAR(255) NOT NULL DEFAULT 'Website Form',
  `form_path` VARCHAR(255) NOT NULL DEFAULT '/',
  `name` VARCHAR(191) DEFAULT NULL,
  `email` VARCHAR(191) DEFAULT NULL,
  `phone` VARCHAR(100) DEFAULT NULL,
  `city` VARCHAR(100) DEFAULT NULL,
  `service` VARCHAR(255) DEFAULT NULL,
  `message` LONGTEXT DEFAULT NULL,
  `extra_data` LONGTEXT DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'new',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_enquiries_path` (`form_path`),
  KEY `idx_enquiries_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3. Table structure for `jobs` (Parent table)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `type` VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  `experience` VARCHAR(100) NOT NULL DEFAULT '0-2 Years',
  `image_url` VARCHAR(1000) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `responsibilities` LONGTEXT DEFAULT NULL,
  `requirements` LONGTEXT DEFAULT NULL,
  `status` ENUM('published','draft') NOT NULL DEFAULT 'published',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_jobs_slug` (`slug`),
  KEY `idx_jobs_status` (`status`),
  KEY `idx_jobs_dept` (`department`),
  KEY `idx_jobs_loc` (`location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add foreign key constraint to job_applications after jobs creation
ALTER TABLE `job_applications`
  ADD CONSTRAINT `fk_applications_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

-- ------------------------------------------------------------
-- 4. Table structure for `blog_posts`
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `blog_posts`;
CREATE TABLE `blog_posts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'General',
  `excerpt` TEXT DEFAULT NULL,
  `content` LONGTEXT NOT NULL,
  `read_time` VARCHAR(50) NOT NULL DEFAULT '4 min read',
  `featured_image_url` VARCHAR(500) DEFAULT NULL,
  `status` ENUM('published','draft') NOT NULL DEFAULT 'published',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_blog_posts_slug` (`slug`),
  KEY `idx_blog_posts_status` (`status`),
  KEY `idx_blog_posts_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 5. Table structure for `media_assets`
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `media_assets`;
CREATE TABLE `media_assets` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL DEFAULT 'image/png',
  `data` LONGBLOB NOT NULL,
  `alt_text` VARCHAR(255) DEFAULT '',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- SEED DATA: Default Admin Accounts
-- Email 1: admin@prosperi5.com / AdminSecretPassword123!
-- Email 2: prosperi@mail.com / Prosperi5$2026
-- ------------------------------------------------------------
INSERT INTO `admins` (`id`, `email`, `password_hash`, `name`, `is_active`, `created_at`, `updated_at`)
VALUES 
(1, 'admin@prosperi5.com', '$2y$10$89vY3Fw1.O0Q6iO8V9Hk1.9uK.4wWkEaVqK7gB6v8N3a2s1d0e9f8', 'Prosperi5 Admin', 1, NOW(), NOW()),
(2, 'prosperi@mail.com', '$2y$10$99vY3Fw1.O0Q6iO8V9Hk1.9uK.4wWkEaVqK7gB6v8N3a2s1d0e9f9', 'Prosperi Admin', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ------------------------------------------------------------
-- SEED DATA: 6 Open Jobs
-- ------------------------------------------------------------
INSERT INTO `jobs` (`id`, `title`, `slug`, `department`, `location`, `type`, `experience`, `description`, `responsibilities`, `requirements`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Social Media Executive', 'social-media-executive', 'Marketing & Creative', 'Delhi NCR / Hybrid', 'Full-time', '1-3 Years', 'Lead Prosperi5 brand presence across Instagram, LinkedIn, YouTube, and X. Create engaging financial content, short reels, and performance campaigns.', '["Develop daily social media calendar and visual posts", "Create reels and infographics explaining wealth concepts", "Manage audience engagement and brand growth metrics"]', '["1-3 years experience in fintech or agency social media", "Strong graphic design & video editing skills (Canva, Premier Pro)", "Deep understanding of Indian financial market trends"]', 'published', NOW(), NOW()),
(2, 'Wealth Manager', 'wealth-manager', 'Sales & Wealth Management', 'Mumbai / Hybrid', 'Full-time', '3-6 Years', 'Manage high-net-worth client portfolios and deliver personalized financial planning, mutual fund allocation, and wealth solutions.', '["Advise HNI clients on multi-asset allocation strategies", "Onboard new investors and expand portfolio size", "Conduct quarterly portfolio review and rebalancing"]', '["3+ years experience in wealth management or private banking", "NISM Series V-A or CFP Certification preferred", "Proven track record in HNI client acquisition"]', 'published', NOW(), NOW()),
(3, 'Sales Executive', 'sales-executive', 'Sales & Growth', 'Bengaluru / On-site', 'Full-time', '1-3 Years', 'Drive partner acquisition and investor onboarding for Prosperi5 products including LAS, Mutual Funds, and Insurance.', '["Identify prospective financial distributors and partners", "Conduct product walkthroughs and client presentations", "Achieve monthly sales targets and partner onboarding goals"]', '["1-3 years in financial services or SaaS sales", "Excellent communication and negotiation skills", "Result-driven approach with strong client relationship skills"]', 'published', NOW(), NOW()),
(4, 'B2B Partner Growth Lead', 'b2b-partner-growth-lead', 'Partner Ecosystem (B2B)', 'Delhi NCR / Remote', 'Full-time', '2-5 Years', 'Expand Prosperi5 partner ecosystem by onboarding mutual fund distributors, insurance advisors, and financial planners.', '["Onboard sub-brokers and distributors", "Build institutional distribution partnerships", "Train partners on Prosperi5 digital suite"]', '["Strong network of financial advisors", "2+ years experience in B2B financial sales", "Excellent presentation skills"]', 'published', NOW(), NOW()),
(5, 'Full Stack Software Engineer (React / Node)', 'full-stack-software-engineer-react-node', 'Technology & Product', 'Bengaluru / Remote', 'Full-time', '2-4 Years', 'Build robust, scalable web applications and microservices powering the Prosperi5 financial platform.', '["Design and maintain high-speed web apps", "Integrate secure REST APIs", "Optimize database query performance"]', '["Proficient in React, Node.js, and SQL", "Experience with AWS or cloud deployments", "Passion for fintech product development"]', 'published', NOW(), NOW()),
(6, 'Senior Wealth Relationship Manager', 'senior-wealth-relationship-manager', 'Sales & Wealth Management', 'Mumbai / Hybrid', 'Full-time', '3-6 Years', 'Drive HNWI portfolio advisory and deliver structured wealth solutions using Prosperi5 multi-asset framework.', '["Manage HNI and corporate client portfolios", "Advise on asset allocation across mutual funds and LAS", "Exceed quarterly AUM growth benchmarks"]', '["MBA or NISM Certified Wealth Professional", "Proven track record in HNI client acquisition", "In-depth understanding of Indian equity and debt markets"]', 'published', NOW(), NOW());

-- ------------------------------------------------------------
-- SEED DATA: 9 Featured Blog Posts
-- ------------------------------------------------------------
INSERT INTO `blog_posts` (`id`, `title`, `slug`, `category`, `excerpt`, `content`, `read_time`, `featured_image_url`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Mastering Asset Allocation in 2026: A Complete Guide to Wealth Preservation', 'mastering-asset-allocation-2026', 'Wealth Strategy', 'Discover how structured multi-asset planning shields your portfolio from inflation while compounding long-term returns.', '<h2>Why Asset Allocation Matters Today</h2><p>In volatile global markets, relying on a single asset class increases capital risk. Modern portfolio strategy requires balancing equity, fixed income, and collateralized liquidity options like Loan Against Securities (LAS).</p>', '5 min read', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW()),
(2, 'How Loan Against Securities (LAS) Unlocks Liquidity Without Selling Equity', 'loan-against-securities-liquidity-guide', 'Liquidity & LAS', 'Learn how to leverage your existing stock and mutual fund investments to access immediate cash without triggering capital gains taxes.', '<h2>Pledge Stocks, Retain Growth</h2><p>Selling your equities for emergency funds means losing out on compounding wealth and paying high capital gains tax. A Loan Against Securities (LAS) allows you to pledge your mutual funds or shares at attractive interest rates while keeping ownership and dividend benefits intact.</p>', '6 min read', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW()),
(3, 'SIP vs Lumpsum Investment: Which Strategy Yields Higher Returns in 2026?', 'sip-vs-lumpsum-investment-strategy', 'Investment Strategy', 'An in-depth comparative analysis of Systematic Investment Plans versus lump sum investing across different market cycles.', '<h2>Rupay Cost Averaging vs Market Timing</h2><p>Systematic Investment Plans (SIPs) reduce the impact of market volatility through Rupee Cost Averaging, making them ideal for salaried investors. Conversely, lump-sum investments excel after sharp market corrections. We break down historical 10-year returns.</p>', '4 min read', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW()),
(4, 'Tax Planning Strategies for High Net Worth Individuals in India', 'tax-planning-strategies-hni-india', 'Tax Optimization', 'Optimize your tax liability across capital gains, debt instruments, and corporate structures with expert strategies.', '<h2>Legitimate Tax Savings Methods</h2><p>High net worth individuals face up to 39% peak tax brackets. Utilizing Section 80C exemptions, tax-loss harvesting, and holding securities through family trusts can legally optimize annual tax exposure.</p>', '7 min read', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW()),
(5, 'Understanding Term Insurance: How Much Cover Do You Really Need?', 'understanding-term-insurance-coverage-guide', 'Protection & Insurance', 'Calculate your financial human life value (HLV) to ensure complete security for your family with adequate term insurance.', '<h2>Human Life Value Formula</h2><p>A simple thumb rule is 15x to 20x your annual income. We outline how term insurance with critical illness riders guarantees peace of mind while securing outstanding home loans and children education goals.</p>', '5 min read', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW()),
(6, 'The Power of Compounding: Building a 10 Crore Portfolio Starting Early', 'power-of-compounding-10-crore-portfolio', 'Personal Finance', 'See the math behind compounding interest and how starting 5 years earlier cuts required monthly investment in half.', '<h2>Albert Einstein Eighth Wonder</h2><p>Compounding transforms small monthly investments into substantial fortunes. Starting a ₹20,000 monthly SIP at age 25 at 12% CAGR yields over ₹10 Crore by age 60, compared to less than ₹5 Crore if starting at age 30.</p>', '4 min read', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW()),
(7, 'Navigating Interest Rates & Fixed Income Securities in Market Volatility', 'navigating-fixed-income-interest-rates', 'Fixed Income', 'Discover how corporate bonds, NCDs, and government securities provide capital stability during stock market drawdowns.', '<h2>Shielding Capital with Fixed Yields</h2><p>Fixed income securities offer steady yields during stock market corrections. By diversifying 20-30% of your portfolio into sovereign gold bonds and AAA-rated corporate fixed deposits, you secure consistent passive income.</p>', '5 min read', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW()),
(8, 'Evaluating Mutual Fund Categories: Large Cap, Mid Cap, and Flexi Cap', 'evaluating-mutual-fund-categories-guide', 'Mutual Funds', 'A complete comparison guide to mutual fund categories, risk-reward ratios, and optimal allocation for long-term growth.', '<h2>Choosing the Right Fund Mix</h2><p>Large-cap funds offer steady growth with lower volatility, mid-cap funds provide aggressive expansion opportunity, and flexi-cap funds allow fund managers dynamic sector rotation. Combine them based on your risk profile.</p>', '6 min read', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW()),
(9, 'Smart Debt Management: Optimizing Loans and EMI Payoffs for Financial Freedom', 'smart-debt-management-emi-optimization', 'Financial Planning', 'Strategies for prepayment, interest reduction, and consolidating high-cost credit debt into low-interest secured loans.', '<h2>Debt Snowball vs Debt Avalanche</h2><p>Not all debt is equal. Replacing high-interest credit card debt or personal loans with low-cost Loan Against Securities (LAS) lowers monthly EMI burdens by up to 50%, freeing cash flow for high-yield investments.</p>', '5 min read', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop', 'published', NOW(), NOW());

SET FOREIGN_KEY_CHECKS = 1;
