-- ============================================================
-- Seed existing careers jobs (optional)
-- Run AFTER 001_schema.sql
-- Admin user is created via: npm run seed:admin (see server/README.md)
-- ============================================================

SET NAMES utf8mb4;

INSERT INTO jobs (
  id, slug, title, location, department, experience, employment_type,
  description, about_role, responsibilities, requirements, benefits,
  status, sort_order, published_at
) VALUES
(
  'a1b2c3d4-e5f6-7890-ab12-000000000001',
  'relationship-manager',
  'Relationship Manager',
  'Delhi / Gurugram',
  'Sales & Business Development',
  '2 – 4 Years',
  'Full-time',
  'Build and maintain strong relationships with clients, understand their financial needs and provide tailored wealth solutions.',
  'As a Relationship Manager at PROSPERi5, you will be the trusted advisor to affluent and high-net-worth clients, helping them navigate personalized wealth management strategies and multi-asset investment opportunities.',
  JSON_ARRAY(
    'Cultivate and manage long-term advisory relationships with affluent and HNI clients.',
    'Assess client financial profiles, risk appetite, and goals to recommend tailored investment, insurance, and financing solutions.',
    'Drive business acquisition through active networking, corporate tie-ups, client referrals, and wealth seminars.',
    'Collaborate with research and advisory teams to deliver quarterly portfolio performance reviews and rebalancing strategies.'
  ),
  JSON_ARRAY(
    '2–4 years of experience in wealth management, private banking, or mutual fund distribution.',
    'Strong understanding of mutual funds, PMS, AIFs, life & health insurance, and structured financing solutions.',
    'Proven track record of client acquisition and long-term relationship nurturing.',
    'Excellent communication, interpersonal, and consultative presentation skills.',
    'NISM Series V-A (Mutual Fund Distributors) certification is preferred.'
  ),
  JSON_ARRAY(
    'Industry-leading competitive compensation package with high-upside quarterly performance incentives.',
    'Comprehensive medical insurance coverage for employee and family.',
    'Accelerated career progression and leadership mentoring in a fast-scaling wealth firm.'
  ),
  'published',
  10,
  UTC_TIMESTAMP()
),
(
  'a1b2c3d4-e5f6-7890-ab12-000000000002',
  'investment-advisor',
  'Investment Advisor',
  'Mumbai',
  'Wealth Advisory',
  '1 – 3 Years',
  'Full-time',
  'Guide clients in making informed investment decisions and help them achieve their financial goals.',
  'Provide expert advisory services to retail and affluent investors, crafting disciplined multi-asset investment portfolios designed for consistent long-term compounding.',
  JSON_ARRAY(
    'Conduct thorough client risk profiling and comprehensive financial health diagnostics.',
    'Recommend optimal asset allocation across equity mutual funds, debt instruments, sovereign gold bonds, and risk protection.',
    'Monitor client portfolios and execute timely, data-backed rebalancing recommendations.',
    'Stay updated with macroeconomic trends, regulatory shifts, and capital market movements to educate clients.'
  ),
  JSON_ARRAY(
    '1–3 years experience in financial advisory, investment consulting, or wealth advisory platforms.',
    'Solid grounding in financial planning concepts, tax-efficient investing, and asset allocation strategies.',
    'NISM Series X-A / X-B or CFA / CFP Level 1 is an added advantage.',
    'Customer-centric mindset with strong analytical and problem-solving skills.'
  ),
  JSON_ARRAY(
    'Competitive base compensation with performance-driven bonus structure.',
    'Access to proprietary institutional wealth tech tools and analytical dashboards.',
    'Full financial sponsorship for relevant certifications (CFP, CFA, NISM).'
  ),
  'published',
  20,
  UTC_TIMESTAMP()
),
(
  'a1b2c3d4-e5f6-7890-ab12-000000000003',
  'financial-planner',
  'Financial Planner',
  'Bengaluru',
  'Financial Planning',
  '2 – 5 Years',
  'Full-time',
  'Analyze financial data, create effective financial plans and help clients secure their future.',
  'Develop comprehensive, 360-degree financial roadmaps for clients to help them achieve retirement, children education, tax optimization, and wealth preservation milestones.',
  JSON_ARRAY(
    'Analyze client cash flows, assets, liabilities, tax exposure, and insurance protection gaps.',
    'Build customized financial blueprints covering retirement planning, estate planning, and risk management.',
    'Present data-driven financial plans to clients and provide end-to-end guidance on disciplined execution.',
    'Periodically review financial plans against inflation, tax changes, and key life milestones.'
  ),
  JSON_ARRAY(
    '2–5 years experience as a Financial Planner, Wealth Planner, or Investment Strategist.',
    'Certified Financial Planner (CFP) or equivalent qualification strongly preferred.',
    'Deep expertise in Indian personal finance taxation, retirement schemes (NPS, EPF, PPF), and estate planning.',
    'High attention to detail with exceptional analytical aptitude.'
  ),
  JSON_ARRAY(
    'Rewarding salary structure with annual performance incentives.',
    'Collaborative, inclusive work culture with flexible working options.',
    'Opportunity to shape the financial future of thousands of ambitious families.'
  ),
  'published',
  30,
  UTC_TIMESTAMP()
),
(
  'a1b2c3d4-e5f6-7890-ab12-000000000004',
  'digital-marketing-executive',
  'Digital Marketing Executive',
  'Delhi / Gurugram',
  'Marketing',
  '1 – 3 Years',
  'Full-time',
  'Plan and execute digital marketing campaigns to enhance brand awareness and lead generation.',
  'Drive PROSPERi5 brand awareness, organic search reach, and qualified inbound lead generation across multi-channel digital campaigns.',
  JSON_ARRAY(
    'Plan and execute performance marketing campaigns on Google Ads, Meta Ads, and LinkedIn.',
    'Optimize SEO strategies for the knowledge centre, calculators, and blog content to drive organic traffic.',
    'Manage email marketing workflows, newsletters, and lead nurturing funnels.',
    'Track CPA, ROAS, and conversion metrics using Google Analytics and search console.'
  ),
  JSON_ARRAY(
    '1–3 years experience in digital marketing or growth marketing, preferably in FinTech, BFSI, or B2C apps.',
    'Proficiency with Google Analytics 4, Meta Business Suite, SEMrush, and CRM platforms.',
    'Creative mindset with strong copywriting and A/B testing capabilities.',
    'Bachelor degree in Marketing, Mass Communication, or related field.'
  ),
  JSON_ARRAY(
    'Attractive base pay + performance bonuses tied to growth milestones.',
    'Autonomy to experiment with new growth channels and creative strategies.',
    'High-energy startup environment with fast decision-making.'
  ),
  'published',
  40,
  UTC_TIMESTAMP()
),
(
  'a1b2c3d4-e5f6-7890-ab12-000000000005',
  'software-developer',
  'Software Developer',
  'Bengaluru',
  'Technology',
  '2 – 4 Years',
  'Full-time',
  'Develop and maintain web applications and tools that drive our platform and customer experience.',
  'Architect, build, and optimize scalable web applications, interactive financial calculators, and wealth management tools that deliver delightful user experiences.',
  JSON_ARRAY(
    'Develop high-performance, responsive web interfaces using React, Next.js, and modern CSS frameworks.',
    'Integrate robust RESTful & GraphQL APIs with bank-grade security and authentication.',
    'Optimize web application speed, core web vitals, and accessibility across all screen sizes.',
    'Collaborate with product managers, UI/UX designers, and backend engineers to build frictionless wealth tools.'
  ),
  JSON_ARRAY(
    '2–4 years of production frontend or full-stack software development experience.',
    'Strong proficiency in JavaScript (ES6+), React.js, TypeScript, and modern state management.',
    'Familiarity with CI/CD workflows, Git version control, and performance optimization techniques.',
    'Passion for clean code, unit testing, and building intuitive financial products.'
  ),
  JSON_ARRAY(
    'Top-tier compensation package with performance incentives.',
    'Latest MacBook / developer hardware and modern tech stack.',
    'Comprehensive health insurance and flexible hybrid work environment.'
  ),
  'published',
  50,
  UTC_TIMESTAMP()
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  location = VALUES(location),
  department = VALUES(department),
  experience = VALUES(experience),
  description = VALUES(description),
  about_role = VALUES(about_role),
  responsibilities = VALUES(responsibilities),
  requirements = VALUES(requirements),
  benefits = VALUES(benefits),
  status = VALUES(status),
  sort_order = VALUES(sort_order);
