import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function CareersPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // Job object or 'General'
  const [expandedJobId, setExpandedJobId] = useState(null); // ID of currently expanded job
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [talkAdvisorModal, setTalkAdvisorModal] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || selectedJob || showThankYouModal || talkAdvisorModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, selectedJob, showThankYouModal, talkAdvisorModal]);

  const openPositions = [
    {
      id: 'job-sm',
      title: 'Social Media Executive',
      location: 'Delhi NCR / Hybrid',
      department: 'Marketing & Creative',
      experience: '1 – 3 Years',
      description: 'Lead Prosperi5 brand presence across Instagram, LinkedIn, YouTube, and X. Create engaging financial content, short reels, and performance campaigns.',
      aboutRole: 'As a Social Media Executive at PROSPERi5, you will conceptualize, design, and publish engaging financial content, infographics, and short-form video reels that educate investors and strengthen brand presence.',
      responsibilities: [
        'Develop and execute daily social media content calendars across Instagram, LinkedIn, YouTube, and X.',
        'Create high-converting video reels, carousels, and visual posts explaining wealth, mutual funds, and insurance concepts.',
        'Track engagement analytics, conversion rates, and optimize performance marketing campaigns.'
      ],
      requirements: [
        '1–3 years experience in fintech, agency, or financial services social media marketing.',
        'Proficiency with Canva, Adobe Premiere Pro/After Effects, and Figma.',
        'Strong grasp of Indian retail financial markets and trending content formats.'
      ],
      benefits: [
        'Competitive salary with performance bonuses.',
        'Flexible working model with hybrid workspace option.',
        'Growth opportunities in a fast-paced fintech environment.'
      ]
    },
    {
      id: 'job-wm',
      title: 'Wealth Manager',
      location: 'Mumbai / Hybrid',
      department: 'Sales & Wealth Management',
      experience: '3 – 6 Years',
      description: 'Manage high-net-worth client portfolios and deliver personalized financial planning, mutual fund allocation, and wealth solutions.',
      aboutRole: 'As a Wealth Manager at PROSPERi5, you will manage HNI client portfolios, providing structured asset allocation and customized wealth solutions.',
      responsibilities: [
        'Manage high-net-worth individual (HNI) client relationships and portfolio advisory.',
        'Provide multi-asset strategies across Mutual Funds, LAS, fixed income, and insurance.',
        'Grow AUM through proactive client acquisition and quarterly review sessions.'
      ],
      requirements: [
        '3–6 years of experience in wealth management or private banking.',
        'Mandatory NISM Series V-A or CFP certification.',
        'In-depth knowledge of Indian wealth products and asset allocation.'
      ],
      benefits: [
        'Attractive fixed package + high uncapped performance incentives.',
        'Executive wellness and family medical coverage.'
      ]
    },
    {
      id: 'job-se',
      title: 'Sales Executive',
      location: 'Bengaluru / On-site',
      department: 'Sales & Growth',
      experience: '1 – 3 Years',
      description: 'Drive partner acquisition and investor onboarding for Prosperi5 products including LAS, Mutual Funds, and Insurance.',
      aboutRole: 'Drive distribution expansion by onboarding financial advisors, sub-brokers, and investors onto the Prosperi5 ecosystem.',
      responsibilities: [
        'Onboard financial distributors, mutual fund advisors, and sub-brokers.',
        'Deliver product walkthroughs and sales presentations.',
        'Exceed monthly partner onboarding and AUM acquisition targets.'
      ],
      requirements: [
        '1–3 years in B2B/B2C financial services or SaaS sales.',
        'Strong communication and relationship-building skills.'
      ],
      benefits: [
        'Competitive base salary + monthly commission structure.',
        'Fast-track career advancement path.'
      ]
    },
    {
      id: 'job-1',
      title: 'Relationship Manager',
      location: 'Delhi / Gurugram',
      department: 'Sales & Business Development',
      experience: '2 – 4 Years',
      description: 'Build and maintain strong relationships with clients, understand their financial needs and provide tailored wealth solutions.',
      aboutRole: 'As a Relationship Manager at PROSPERi5, you will be the trusted advisor to affluent and high-net-worth clients, helping them navigate personalized wealth management strategies and multi-asset investment opportunities.',
      responsibilities: [
        'Cultivate and manage long-term advisory relationships with affluent and HNI clients.',
        'Assess client financial profiles, risk appetite, and goals to recommend tailored investment, insurance, and financing solutions.',
        'Drive business acquisition through active networking, corporate tie-ups, client referrals, and wealth seminars.',
        'Collaborate with research and advisory teams to deliver quarterly portfolio performance reviews and rebalancing strategies.'
      ],
      requirements: [
        '2–4 years of experience in wealth management, private banking, or mutual fund distribution.',
        'Strong understanding of mutual funds, PMS, AIFs, life & health insurance, and structured financing solutions.',
        'Proven track record of client acquisition and long-term relationship nurturing.',
        'Excellent communication, interpersonal, and consultative presentation skills.',
        'NISM Series V-A (Mutual Fund Distributors) certification is preferred.'
      ],
      benefits: [
        'Industry-leading competitive compensation package with high-upside quarterly performance incentives.',
        'Comprehensive medical insurance coverage for employee and family.',
        'Accelerated career progression and leadership mentoring in a fast-scaling wealth firm.'
      ]
    },
    {
      id: 'job-2',
      title: 'Investment Advisor',
      location: 'Mumbai',
      department: 'Wealth Advisory',
      experience: '1 – 3 Years',
      description: 'Guide clients in making informed investment decisions and help them achieve their financial goals.',
      aboutRole: 'Provide expert advisory services to retail and affluent investors, crafting disciplined multi-asset investment portfolios designed for consistent long-term compounding.',
      responsibilities: [
        'Conduct thorough client risk profiling and comprehensive financial health diagnostics.',
        'Recommend optimal asset allocation across equity mutual funds, debt instruments, sovereign gold bonds, and risk protection.',
        'Monitor client portfolios and execute timely, data-backed rebalancing recommendations.',
        'Stay updated with macroeconomic trends, regulatory shifts, and capital market movements to educate clients.'
      ],
      requirements: [
        '1–3 years experience in financial advisory, investment consulting, or wealth advisory platforms.',
        'Solid grounding in financial planning concepts, tax-efficient investing, and asset allocation strategies.',
        'NISM Series X-A / X-B or CFA / CFP Level 1 is an added advantage.',
        'Customer-centric mindset with strong analytical and problem-solving skills.'
      ],
      benefits: [
        'Competitive base compensation with performance-driven bonus structure.',
        'Access to proprietary institutional wealth tech tools and analytical dashboards.',
        'Full financial sponsorship for relevant certifications (CFP, CFA, NISM).'
      ]
    },
    {
      id: 'job-3',
      title: 'Financial Planner',
      location: 'Bengaluru',
      department: 'Financial Planning',
      experience: '2 – 5 Years',
      description: 'Analyze financial data, create effective financial plans and help clients secure their future.',
      aboutRole: 'Develop comprehensive, 360-degree financial roadmaps for clients to help them achieve retirement, children education, tax optimization, and wealth preservation milestones.',
      responsibilities: [
        'Analyze client cash flows, assets, liabilities, tax exposure, and insurance protection gaps.',
        'Build customized financial blueprints covering retirement planning, estate planning, and risk management.',
        'Present data-driven financial plans to clients and provide end-to-end guidance on disciplined execution.',
        'Periodically review financial plans against inflation, tax changes, and key life milestones.'
      ],
      requirements: [
        '2–5 years experience as a Financial Planner, Wealth Planner, or Investment Strategist.',
        'Certified Financial Planner (CFP) or equivalent qualification strongly preferred.',
        'Deep expertise in Indian personal finance taxation, retirement schemes (NPS, EPF, PPF), and estate planning.',
        'High attention to detail with exceptional analytical aptitude.'
      ],
      benefits: [
        'Rewarding salary structure with annual performance incentives.',
        'Collaborative, inclusive work culture with flexible working options.',
        'Opportunity to shape the financial future of thousands of ambitious families.'
      ]
    },
    {
      id: 'job-4',
      title: 'Digital Marketing Executive',
      location: 'Delhi / Gurugram',
      department: 'Marketing',
      experience: '1 – 3 Years',
      description: 'Plan and execute digital marketing campaigns to enhance brand awareness and lead generation.',
      aboutRole: 'Drive PROSPERi5 brand awareness, organic search reach, and qualified inbound lead generation across multi-channel digital campaigns.',
      responsibilities: [
        'Plan and execute performance marketing campaigns on Google Ads, Meta Ads, and LinkedIn.',
        'Optimize SEO strategies for the knowledge centre, calculators, and blog content to drive organic traffic.',
        'Manage email marketing workflows, newsletters, and lead nurturing funnels.',
        'Track CPA, ROAS, and conversion metrics using Google Analytics and search console.'
      ],
      requirements: [
        '1–3 years experience in digital marketing or growth marketing, preferably in FinTech, BFSI, or B2C apps.',
        'Proficiency with Google Analytics 4, Meta Business Suite, SEMrush, and CRM platforms.',
        'Creative mindset with strong copywriting and A/B testing capabilities.',
        'Bachelor degree in Marketing, Mass Communication, or related field.'
      ],
      benefits: [
        'Attractive base pay + performance bonuses tied to growth milestones.',
        'Autonomy to experiment with new growth channels and creative strategies.',
        'High-energy startup environment with fast decision-making.'
      ]
    },
    {
      id: 'job-5',
      title: 'Software Developer',
      location: 'Bengaluru',
      department: 'Technology',
      experience: '2 – 4 Years',
      description: 'Develop and maintain web applications and tools that drive our platform and customer experience.',
      aboutRole: 'Architect, build, and optimize scalable web applications, interactive financial calculators, and wealth management tools that deliver delightful user experiences.',
      responsibilities: [
        'Develop high-performance, responsive web interfaces using React, Next.js, and modern CSS frameworks.',
        'Integrate robust RESTful & GraphQL APIs with bank-grade security and authentication.',
        'Optimize web application speed, core web vitals, and accessibility across all screen sizes.',
        'Collaborate with product managers, UI/UX designers, and backend engineers to build frictionless wealth tools.'
      ],
      requirements: [
        '2–4 years of production frontend or full-stack software development experience.',
        'Strong proficiency in JavaScript (ES6+), React.js, TypeScript, and modern state management.',
        'Familiarity with CI/CD workflows, Git version control, and performance optimization techniques.',
        'Passion for clean code, unit testing, and building intuitive financial products.'
      ],
      benefits: [
        'Top-tier compensation package with performance incentives.',
        'Latest MacBook / developer hardware and modern tech stack.',
        'Comprehensive health insurance and flexible hybrid work environment.'
      ]
    }
  ];

  const whyJoinPerks = [
    {
      id: 'growth',
      title: 'Growth',
      desc: 'Learn, grow and build a long-term career with us.',
      icon: (
        <svg className="w-5 h-5 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'impact',
      title: 'Impact',
      desc: "Make a real difference in people's financial lives.",
      icon: (
        <svg className="w-5 h-5 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'culture',
      title: 'Culture',
      desc: 'Work in a collaborative and inclusive environment.',
      icon: (
        <svg className="w-5 h-5 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'rewards',
      title: 'Rewards',
      desc: 'Attractive compensation and performance rewards.',
      icon: (
        <svg className="w-5 h-5 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const handleApplyClick = (job, e) => {
    if (e) e.stopPropagation();
    setSelectedJob(job);
  };

  const toggleJobExpansion = (jobId) => {
    setExpandedJobId(prevId => prevId === jobId ? null : jobId);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      role: selectedJob?.title || 'General Application',
      name: fullName,
      email,
      phone,
      message
    };
    setSubmittedData(data);
    setSelectedJob(null);
    setShowThankYouModal(true);

    // Reset fields
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">

      {/* 1. TOP CONTACT UTILITY BAR */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-7xl mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-white/70">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Careers at PROSPERi5 · Join Our Mission</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Empowering Talent · Accelerating Growth
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setTalkAdvisorModal(true)}
              className="bg-[#F5A623] hover:bg-[#D49300] text-[#1E1B2E] font-bold px-4 py-1.5 rounded-full text-[10px] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.25 6.622c0-1.077.873-1.95 1.95-1.95h2.25c.877 0 1.63.585 1.85 1.432l.711 2.766c.2.783-.062 1.615-.67 2.115l-1.56 1.287a15.776 15.776 0 0 0 6.6 6.6l1.287-1.56c.5-.608 1.332-.87 2.115-.67l2.766.711c.847.22 1.432.973 1.432 1.85v2.25c0 1.077-.873 1.95-1.95 1.95h-2.25a16.5 16.5 0 0 1-16.5-16.5v-2.25Z" />
              </svg>
              Contact HR Team
            </button>
          </div>
        </div>
      </div>

      {/* 2. FLOATING NAVBAR */}
      <nav className={`sticky top-0 lg:top-2 max-w-7xl mx-auto px-0 lg:px-4 relative font-sans transition-all ${mobileMenuOpen ? 'z-[9999]' : 'z-50'}`}>
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-[#EBE3F5] shadow-sm lg:shadow-[0_12px_40px_rgba(30,27,46,0.06)] h-[72px] lg:h-[56px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">
          {/* Brand Logo */}
          <div className="flex items-center gap-6 cursor-pointer" onClick={onNavigateHome}>
            <img src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png" className="w-[128px] lg:w-[140px] h-[40px] lg:h-[44px] object-contain" alt="PROSPERi5 Logo" />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#1E1B2E]">
            <button onClick={onNavigateHome} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Home</button>
            <button onClick={() => onNavigatePage && onNavigatePage('about')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">About Us</button>
            <button onClick={() => onNavigatePage && onNavigatePage('protect')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Protect</button>
            <button onClick={() => onNavigatePage && onNavigatePage('investment')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Investment</button>
            <button onClick={() => onNavigatePage && onNavigatePage('insurance')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Insurance</button>
            <button onClick={() => onNavigatePage && onNavigatePage('financing')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Financing</button>
            <button onClick={() => onNavigatePage && onNavigatePage('tools')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Tools</button>
            <button onClick={() => onNavigatePage && onNavigatePage('blog')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Blog</button>
            <button className="text-[#7C1FA8] font-bold cursor-pointer py-1 relative after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full">
              Careers
            </button>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedJob({ title: 'General Career Application' })}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer"
            >
              Apply Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-[#FAF5FD] border border-purple-100 text-[#7C1FA8] flex items-center justify-center cursor-pointer"
              aria-label="Open Menu"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#FAF6FC] z-[100] p-4 overflow-y-auto">
          <div className="max-w-[360px] mx-auto flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2">
              <img src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png" className="w-[128px] h-[40px] object-contain" alt="PROSPERi5 Logo" />
              <button onClick={() => setMobileMenuOpen(false)} className="w-9 h-9 rounded-full bg-[#F5EEFA] text-[#5E1083] flex items-center justify-center cursor-pointer">
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {[
              { num: '01', label: 'Home', action: () => { setMobileMenuOpen(false); onNavigateHome && onNavigateHome(); } },
              { num: '02', label: 'About Us', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('about'); } },
              { num: '03', label: 'Careers', action: () => setMobileMenuOpen(false), active: true },
              { num: '04', label: 'Blog', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('blog'); } },
              { num: '05', label: 'Protect', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('protect'); } },
              { num: '06', label: 'Investment', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investment'); } },
              { num: '07', label: 'Insurance', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('insurance'); } },
              { num: '08', label: 'Financing', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('financing'); } },
              { num: '09', label: 'Tools', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('tools'); } },
            ].map((item) => (
              <button
                key={item.num}
                onClick={item.action}
                className={`w-full h-[52px] rounded-[16px] border px-5 flex items-center gap-4 shadow-sm transition-all duration-200 cursor-pointer text-left ${item.active ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white hover:border-[#7C1FA8]'}`}
              >
                <span className={`font-extrabold text-sm ${item.active ? 'text-[#F5A623]' : 'text-[#7C1FAB]'}`}>{item.num}</span>
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. HERO BANNER SECTION (FULL WIDTH - CUSTOM REACT) */}
      <section className="w-full bg-[#FAF8FC] bg-gradient-to-r from-[#FAF8FC] via-[#F5EEFC] to-[#FAF8FC] relative overflow-hidden border-b border-[#EBE8EF]/60 pt-4 sm:pt-5 lg:pt-6 pb-5 sm:pb-6 lg:pb-7 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Ambient Purple Background Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-purple-200/40 rounded-full filter blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* LEFT COLUMN: Pill Tag, Main Heading, Subtitle & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-1.5 bg-[#F0E6F8] text-[#7C1FA8] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#7C1FA8] inline-block animate-pulse"></span>
              <span>CAREERS AT PROSPERi5</span>
            </div>

            {/* Main Heading (Single Line) */}
            <h1 className="font-sans font-extrabold text-[32px] leading-[40px] sm:text-[40px] sm:leading-[48px] lg:text-[46px] lg:leading-[54px] tracking-[-0.035em] text-[#1E1B2E] mb-3.5 w-full max-w-[720px]">
              Build Your Career <span className="text-[#7C1FA8]">With Prosperi5</span>
            </h1>

            {/* Subtitle Paragraph (Contained Under Heading Width) */}
            <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[23px] sm:leading-[26px] text-[#544F66] mb-6 w-full max-w-[560px]">
              We are always looking for passionate, driven and talented individuals to join our mission of helping people achieve financial freedom.
            </p>

            {/* Action CTA Button */}
            <div>
              <button 
                onClick={() => {
                  const el = document.getElementById('open-positions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else setSelectedJob({ title: 'General Career Application' });
                }}
                className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>View Open Positions</span>
                <span>➔</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Office & Career Illustration */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full mt-4 lg:mt-0">
            <div className="relative z-10 w-full max-w-[520px] sm:max-w-[580px] flex justify-center items-center">
              <img
                src="/careers_hero_banner.png"
                alt="Build Your Career With Prosperi5 - Office & Career Illustration"
                className="w-full h-auto max-h-[360px] sm:max-h-[400px] lg:max-h-[440px] object-cover object-right rounded-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. MAIN CAREERS CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* 2-COLUMN LAYOUT: OPEN POSITIONS (LEFT) + SIDEBAR (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* LEFT COLUMN: OPEN POSITIONS LIST */}
          <section id="open-positions" className="lg:col-span-8 space-y-6 scroll-mt-24">
            
            {/* Main Section Heading */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight">
                  Open Positions
                </h1>
                <p className="text-xs text-[#8E8A9D] mt-1">
                  Click on any card to view full job responsibilities and qualifications.
                </p>
              </div>
            </div>

            {/* List of Job Cards */}
            <div className="space-y-4">
              {openPositions.map((job) => {
                const isExpanded = expandedJobId === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => toggleJobExpansion(job.id)}
                    className={`bg-white rounded-[24px] border p-6 sm:p-7 shadow-sm transition-all duration-300 cursor-pointer ${
                      isExpanded 
                        ? 'border-[#7C1FA8] ring-1 ring-[#7C1FA8]/20 shadow-[0_18px_45px_rgba(124,31,168,0.1)]' 
                        : 'border-[#EBE8EF] hover:border-purple-300 hover:shadow-[0_15px_35px_rgba(124,31,168,0.06)]'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors">
                          {job.title}
                        </h2>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                          isExpanded ? 'bg-[#7C1FA8] text-white' : 'bg-[#FAF5FD] text-[#7C1FA8]'
                        }`}>
                          {isExpanded ? 'Full Details' : 'Details ▾'}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleApplyClick(job, e)}
                        className="self-start sm:self-auto px-6 py-2 rounded-xl border border-[#7C1FA8] text-[#7C1FA8] hover:bg-[#7C1FA8] hover:text-white font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-2xs whitespace-nowrap"
                      >
                        Apply Now
                      </button>
                    </div>

                    {/* Metadata Chips (Location, Department, Experience) */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#544F66] mb-3">
                      {/* Location */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{job.location}</span>
                      </div>

                      {/* Department */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{job.department}</span>
                      </div>

                      {/* Experience */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    {/* Job Summary Description */}
                    <p className="text-xs sm:text-sm text-[#544F66] leading-relaxed">
                      {job.description}
                    </p>

                    {/* EXPANDED FULL JOB DESCRIPTION ACCORDION */}
                    {isExpanded && (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="mt-6 pt-6 border-t border-[#EBE8EF] space-y-6 text-[#1E1B2E] animate-in fade-in slide-in-from-top-2 duration-300"
                      >
                        {/* 1. About the Role */}
                        <div>
                          <h3 className="text-sm font-extrabold text-[#7C1FA8] uppercase tracking-wider mb-2">
                            About the Role
                          </h3>
                          <p className="text-xs sm:text-sm text-[#544F66] leading-relaxed">
                            {job.aboutRole}
                          </p>
                        </div>

                        {/* 2. Key Responsibilities */}
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E1B2E] tracking-tight mb-2.5">
                            Key Responsibilities:
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#544F66]">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-[#7C1FA8] font-black text-sm mt-0.5">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 3. Requirements & Qualifications */}
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E1B2E] tracking-tight mb-2.5">
                            What We Are Looking For:
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#544F66]">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-[#7C1FA8] font-black text-sm mt-0.5">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 4. What We Offer */}
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E1B2E] tracking-tight mb-2.5">
                            What We Offer:
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#544F66]">
                            {job.benefits.map((ben, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-[#F5A623] font-black text-sm mt-0.5">✦</span>
                                <span>{ben}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bottom Expanded CTA Bar */}
                        <div className="pt-5 border-t border-[#F5F2F8] flex flex-col sm:flex-row items-center justify-between gap-3">
                          <button
                            onClick={() => toggleJobExpansion(job.id)}
                            className="text-xs text-[#8E8A9D] hover:text-[#7C1FA8] font-semibold transition-colors cursor-pointer"
                          >
                            ▲ Hide full description
                          </button>

                          <button
                            onClick={(e) => handleApplyClick(job, e)}
                            className="w-full sm:w-auto bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition-all cursor-pointer"
                          >
                            Apply for {job.title} →
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </section>

          {/* RIGHT COLUMN: SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start">

            {/* CARD 1: WHY JOIN US? */}
            <div className="bg-white rounded-[24px] border border-[#EBE8EF] p-6 shadow-sm">
              <h3 className="text-[#1E1B2E] font-extrabold text-base">
                Why Join Us?
              </h3>
              <div className="w-9 h-1 bg-[#7C1FA8] rounded-full mt-2 mb-6"></div>

              <div className="space-y-6">
                {whyJoinPerks.map((perk) => (
                  <div key={perk.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAF5FD] border border-purple-100 flex items-center justify-center shrink-0">
                      {perk.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1E1B2E]">
                        {perk.title}
                      </h4>
                      <p className="text-xs text-[#544F66] leading-relaxed mt-0.5 font-normal">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 2: LIFE AT PROSPERI5 */}
            <div className="bg-white rounded-[24px] border border-[#EBE8EF] p-6 shadow-sm">
              <h3 className="text-[#1E1B2E] font-extrabold text-base">
                Life at Prosperi5
              </h3>
              <div className="w-9 h-1 bg-[#7C1FA8] rounded-full mt-2 mb-4"></div>

              <p className="text-xs sm:text-[13px] text-[#544F66] leading-relaxed font-normal mb-5">
                We believe in empowering our team with the right skills, opportunities and support to excel and grow.
              </p>

              {/* Team Meeting Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-purple-50 border border-[#EBE8EF]">
                <img
                  src="/careers_team_meeting.jpg"
                  alt="Life at PROSPERi5 - Team Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </aside>

        </div>

      </main>

      {/* 5. APPLY NOW POP-UP MODAL (ENQUIRY FORM) */}
      {selectedJob && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl border border-purple-100 p-6 sm:p-8 relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE8EF] mb-5">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E]">
                  Apply for this position
                </h3>
                {selectedJob.title && (
                  <p className="text-xs text-[#7C1FA8] font-bold mt-0.5">
                    {selectedJob.title}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-9 h-9 rounded-full bg-[#FAF5FD] text-[#5E1083] hover:bg-purple-100 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            {/* Application Enquiry Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
                />
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] mb-1.5">
                  Message (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us about yourself"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
              >
                Submit Application
              </button>

            </form>

          </div>
        </div>
      )}

      {/* 6. THANK YOU POP-UP MODAL */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] w-full max-w-md p-6 sm:p-8 shadow-2xl border border-purple-100 text-center relative animate-in zoom-in-95 duration-200">
            
            {/* Close X */}
            <button
              onClick={() => setShowThankYouModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
            >
              ✕
            </button>

            {/* Success Checkmark Animated Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-3xl mx-auto mb-4 font-bold shadow-sm">
              ✓
            </div>

            <h3 className="text-xl font-extrabold text-[#1E1B2E] mb-2">
              Application Submitted Successfully!
            </h3>

            <p className="text-xs sm:text-sm text-[#544F66] leading-relaxed mb-6">
              Thank you for your interest in joining PROSPERi5{submittedData?.role ? ` as a ${submittedData.role}` : ''}. Our talent acquisition team has received your details and will review your profile.
            </p>

            {/* Details Box */}
            {submittedData && (
              <div className="bg-[#FAF8FC] rounded-xl p-4 text-left border border-[#EBE8EF] mb-6 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8E8A9D]">Applicant:</span>
                  <span className="font-bold text-[#1E1B2E]">{submittedData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A9D]">Email:</span>
                  <span className="font-medium text-[#1E1B2E] truncate max-w-[180px]">{submittedData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A9D]">Phone:</span>
                  <span className="font-medium text-[#1E1B2E]">{submittedData.phone}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowThankYouModal(false)}
              className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Back to Careers
            </button>

          </div>
        </div>
      )}

      {/* 7. TALK TO ADVISOR MODAL */}
      {talkAdvisorModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-[24px] w-full max-w-md p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-in zoom-in-95">
            <button
              onClick={() => setTalkAdvisorModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C1FA8] flex items-center justify-center text-xl mb-4 font-bold">
              💼
            </div>
            <h3 className="text-xl font-extrabold text-[#1E1B2E] mb-2">Connect with Careers Team</h3>
            <p className="text-xs text-[#6C677E] leading-relaxed mb-6">
              Have questions about open roles, internships, or culture at PROSPERi5? Get in touch with our HR team.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our HR team will get back to you shortly.'); setTalkAdvisorModal(false); }} className="space-y-3">
              <input type="text" required placeholder="Full Name" className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]" />
              <input type="tel" required placeholder="Mobile Number" className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]" />
              <input type="email" required placeholder="Email Address" className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]" />
              <button type="submit" className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2">
                Submit Query
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 8. FOOTER */}
      <Footer onNavigatePage={onNavigatePage} />

    </div>
  );
}
