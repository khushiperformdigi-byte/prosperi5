import React, { useState, useEffect, useMemo } from 'react';
import Footer from './Footer';

export default function BlogPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [talkAdvisorModal, setTalkAdvisorModal] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen || selectedArticle || talkAdvisorModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, selectedArticle, talkAdvisorModal]);

  const categories = [
    { id: 'All', label: 'All' },
    { id: 'Invest', label: 'Invest' },
    { id: 'Borrow', label: 'Borrow' },
    { id: 'Protect', label: 'Protect' },
    { id: 'Personal Finance', label: 'Personal Finance' },
    { id: 'Tax', label: 'Tax' },
    { id: 'Market Insights', label: 'Market Insights' },
  ];

  const featuredPost = {
    id: 'featured-1',
    category: 'FEATURED',
    categoryFilter: 'Invest',
    title: 'Where should you invest when markets are uncertain?',
    excerpt: "Markets will always have ups and downs. Here's how to stay focused on long-term goals and make confident investment decisions.",
    image: '/blog_featured_mountain.jpg',
    date: 'May 24, 2025',
    readTime: '6 min read',
    author: {
      name: 'Rajiv Mehta',
      role: 'Head of Wealth Research',
      avatar: '👨‍💼'
    },
    content: `
      <h3>Navigating Market Volatility with Confidence</h3>
      <p>Market uncertainty is an inevitable part of investing. Whether driven by geopolitical shifts, interest rate fluctuations, or economic cycles, short-term turbulence often tempts investors to react emotionally. However, history demonstrates that disciplined, patient investors achieve the best outcomes.</p>
      
      <h4>1. Maintain a Diversified Asset Allocation</h4>
      <p>The single most reliable buffer against market volatility is a well-structured asset allocation. Spreading capital across equity, debt instruments, gold, and alternative assets ensures that downturns in one segment are cushioned by stability in another.</p>
      
      <h4>2. Continue Systematic Investment Plans (SIPs)</h4>
      <p>When stock markets correct, your SIP purchases units at a discounted NAV (Rupee Cost Averaging). Halting SIPs during a downturn undermines the core compounding power of disciplined investing.</p>
      
      <h4>3. Rebalance Periodically</h4>
      <p>Use periodic rebalancing to take profits from outperforming assets and allocate into undervalued opportunities without trying to time the peak or bottom.</p>

      <blockquote>"The stock market is a device for transferring money from the impatient to the patient." – Warren Buffett</blockquote>
    `
  };

  const blogPosts = [
    {
      id: 'post-1',
      category: 'INVESTING',
      categoryFilter: 'Invest',
      title: 'SIP vs Lump Sum: Which Strategy Is Right for You?',
      excerpt: 'Understand the difference between investing regularly and investing a larger amount at once.',
      image: '/blog_sip_coins.jpg',
      date: 'May 22, 2025',
      readTime: '6 min read',
      readTimeMinutes: 6,
      author: { name: 'Arjun Nair', role: 'Fintech Strategist', avatar: '👨‍💻' },
      content: `
        <h3>Choosing the Optimal Entry Strategy</h3>
        <p>A Systematic Investment Plan (SIP) allows you to invest fixed amounts at regular intervals, while Lump Sum investing involves deploying a significant sum in one transaction.</p>
        <h4>When to Choose SIP:</h4>
        <p>Ideal for salaried professionals with regular monthly cash flow, beginners seeking emotional discipline, and volatile markets where Rupee Cost Averaging lowers average acquisition cost.</p>
        <h4>When to Choose Lump Sum:</h4>
        <p>Best suited when you receive bonuses, property sale proceeds, or when market valuations are demonstrably attractive and historical multiples indicate low downside risk.</p>
      `
    },
    {
      id: 'post-2',
      category: 'PERSONAL FINANCE',
      categoryFilter: 'Personal Finance',
      title: 'How to Build a Financial Plan That Actually Works',
      excerpt: 'Simple principles to organize your income, expenses, savings and investments.',
      image: '/blog_financial_plan.jpg',
      date: 'May 20, 2025',
      readTime: '5 min read',
      readTimeMinutes: 5,
      author: { name: 'Priya Sharma', role: 'Certified Financial Planner', avatar: '👩‍💼' },
      content: `
        <h3>A Step-by-Step Blueprint for Financial Independence</h3>
        <p>A sound financial plan is not about deprivation; it is about creating intentionality with every rupee earned.</p>
        <h4>1. The 50/30/20 Rule Refined</h4>
        <p>Allocate 50% of net income to essentials, 30% to lifestyle and discretionary spending, and at least 20% toward aggressive wealth compounding and debt payoff.</p>
        <h4>2. Build an Emergency Buffer First</h4>
        <p>Keep 6 to 12 months of mandatory living expenses in high-yield liquid funds before deploying capital into long-term illiquid assets.</p>
      `
    },
    {
      id: 'post-3',
      category: 'TAX',
      categoryFilter: 'Tax',
      title: 'Tax-Saving Investments You Should Know About',
      excerpt: 'Explore common tax-saving options and understand how they fit into your plan.',
      image: '/blog_tax_blocks.jpg',
      date: 'May 18, 2025',
      readTime: '7 min read',
      readTimeMinutes: 7,
      author: { name: 'Sneha Kapoor', role: 'Tax & Structuring Lead', avatar: '👩‍🏢' },
      content: `
        <h3>Maximizing Post-Tax Returns Legally</h3>
        <p>Tax optimization shouldn't be an afterthought at the end of March. Planning early preserves substantial compounding gains over a 10–20 year horizon.</p>
        <h4>ELSS vs PPF vs NPS</h4>
        <p>Equity Linked Savings Schemes (ELSS) offer the shortest lock-in period (3 years) combined with potential equity upsides. NPS provides an additional deduction under Section 80CCD(1B) while securing retirement corpus.</p>
      `
    },
    {
      id: 'post-4',
      category: 'LOANS',
      categoryFilter: 'Borrow',
      title: 'How to Choose the Right Loan for Your Financial Goal',
      excerpt: 'Compare loan types, repayment considerations and what to evaluate before borrowing.',
      image: '/blog_loan_house.jpg',
      date: 'May 16, 2025',
      readTime: '5 min read',
      readTimeMinutes: 5,
      author: { name: 'Vikram Joshi', role: 'Credit Solutions Director', avatar: '👨‍💼' },
      content: `
        <h3>Borrowing Smart: Good Debt vs High-Cost Liabilities</h3>
        <p>Not all borrowing is created equal. Securing loans against existing assets (like Loan Against Securities or LAP) unlocks liquidity at interest rates often 40-60% lower than unsecured personal loans.</p>
        <h4>Key Metrics to Evaluate:</h4>
        <p>Always inspect the Total Effective APR, foreclosure charges, prepayment flexibility, and tenure alignment with your projected cash flow.</p>
      `
    },
    {
      id: 'post-5',
      category: 'MARKET INSIGHTS',
      categoryFilter: 'Market Insights',
      title: 'What Market Trends Mean for Long-Term Investors',
      excerpt: 'A simple look at market movements and what investors should focus on beyond short-term noise.',
      image: '/blog_market_trends.jpg',
      date: 'May 14, 2025',
      readTime: '6 min read',
      readTimeMinutes: 6,
      author: { name: 'Rajiv Mehta', role: 'Head of Wealth Research', avatar: '👨‍💼' },
      content: `
        <h3>Decoding Sector Rotations & Structural Megatrends</h3>
        <p>Daily headlines focus on noise, while generational wealth is created by participating in macroeconomic megatrends: digital transformation, renewable energy, and domestic manufacturing.</p>
        <h4>Staying Grounded:</h4>
        <p>Avoid chasing last quarter's hottest sector. Maintain diversified thematic exposure managed by seasoned asset managers with verifiable risk-adjusted alpha.</p>
      `
    },
    {
      id: 'post-6',
      category: 'PROTECTION',
      categoryFilter: 'Protect',
      title: 'Why Financial Protection Should Be Part of Your Plan',
      excerpt: 'Understand how insurance and financial protection can complement your wealth strategy.',
      image: '/blog_protection_shield.jpg',
      date: 'May 12, 2025',
      readTime: '5 min read',
      readTimeMinutes: 5,
      author: { name: 'Priya Sharma', role: 'Certified Financial Planner', avatar: '👩‍💼' },
      content: `
        <h3>The Foundation of Every Resilient Wealth Strategy</h3>
        <p>Investing without adequate insurance protection is like scoring goals without a goalkeeper. A single unexpected medical crisis or disability can erase years of disciplined compounding.</p>
        <h4>Core Pillars of Protection:</h4>
        <p>1. Pure Term Insurance covering at least 15–20x annual earnings.<br />2. Comprehensive Super Top-Up Health Coverage covering critical illnesses.</p>
      `
    },
    // Supplementary posts for pagination / extensive categories
    {
      id: 'post-7',
      category: 'INVESTING',
      categoryFilter: 'Invest',
      title: 'Understanding Debt Funds vs Fixed Deposits in Rising Rate Environments',
      excerpt: 'How fixed income strategies have evolved and how to optimize yield with minimal duration risk.',
      image: '/opp_fixed_income.png',
      date: 'May 08, 2025',
      readTime: '4 min read',
      readTimeMinutes: 4,
      author: { name: 'Arjun Nair', role: 'Fintech Strategist', avatar: '👨‍💻' },
      content: `
        <h3>Balancing Liquidity, Safety, and Yield</h3>
        <p>Fixed income forms the ballast of any balanced portfolio. Exploring target maturity debt funds and corporate bond funds can provide predictable returns with high credit quality.</p>
      `
    },
    {
      id: 'post-8',
      category: 'LOANS',
      categoryFilter: 'Borrow',
      title: 'Loan Against Mutual Funds: Instant Liquidity Without Selling Units',
      excerpt: 'Keep your compounding intact while accessing short-term capital at competitive interest rates.',
      image: '/fin_chart_clean.png',
      date: 'May 05, 2025',
      readTime: '5 min read',
      readTimeMinutes: 5,
      author: { name: 'Vikram Joshi', role: 'Credit Solutions Director', avatar: '👨‍💼' },
      content: `
        <h3>Preserve Your Compounding Journey</h3>
        <p>Liquidating your equity mutual funds triggers capital gains tax and breaks your long-term compounding chain. Pledging your units for an overdraft facility gives you the liquidity you need while remaining fully invested in market upside.</p>
      `
    },
    {
      id: 'post-9',
      category: 'PROTECTION',
      categoryFilter: 'Protect',
      title: 'Term Life Insurance: Key Clauses Every Policyholder Must Verify',
      excerpt: 'Critical riders, claim settlement ratios, and disclosure practices to prevent claim rejections.',
      image: '/card_umbrella_3d.jpg',
      date: 'Apr 28, 2025',
      readTime: '6 min read',
      readTimeMinutes: 6,
      author: { name: 'Priya Sharma', role: 'Certified Financial Planner', avatar: '👩‍💼' },
      content: `
        <h3>Securing Your Family's Financial Future</h3>
        <p>When selecting term cover, always check the 3-year Section 45 insurance moratorium clause, critical illness riders, and ensure 100% full disclosure on all medical and lifestyle questionnaires.</p>
      `
    }
  ];

  // Filtering & Sorting
  const filteredPosts = useMemo(() => {
    let list = [...blogPosts];

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.categoryFilter === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'latest') {
      // already latest first by default order
    } else if (sortBy === 'oldest') {
      list.reverse();
    } else if (sortBy === 'read-time-asc') {
      list.sort((a, b) => a.readTimeMinutes - b.readTimeMinutes);
    } else if (sortBy === 'read-time-desc') {
      list.sort((a, b) => b.readTimeMinutes - a.readTimeMinutes);
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const displayedPosts = filteredPosts.slice(
    (currentPageNum - 1) * postsPerPage,
    currentPageNum * postsPerPage
  );

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPageNum(pageNum);
      const el = document.getElementById('blog-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">

      {/* 1. TOP CONTACT UTILITY BAR */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-[1500px] mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-white/70">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Knowledge & Insights · Smart Financial Decisions</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Practical Guides · Market Insights · Tax Strategies
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
              Talk to an Advisor
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
            <button onClick={() => onNavigatePage && onNavigatePage('investors')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Investors</button>
            {/* Active Blog tab indicator */}
            <button className="text-[#7C1FA8] font-bold cursor-pointer py-1 relative after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full">
              Blog
            </button>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTalkAdvisorModal(true)}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer"
            >
              Get Free Advice
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
              { num: '03', label: 'Blog', action: () => setMobileMenuOpen(false), active: true },
              { num: '04', label: 'Protect', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('protect'); } },
              { num: '05', label: 'Investment', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investment'); } },
              { num: '06', label: 'Insurance', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('insurance'); } },
              { num: '07', label: 'Financing', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('financing'); } },
              { num: '08', label: 'Tools', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('tools'); } },
              { num: '09', label: 'Investors', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investors'); } },
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

      {/* 3. HERO SECTION BANNER - FULL WIDTH */}
      <section className="w-full overflow-hidden bg-[#FAF5FD]">
        <img
          src="/blog_hero_banner.png"
          alt="Ideas that help you grow, protect and manage your wealth - Insights & Knowledge by PROSPERi5"
          className="w-full h-auto block select-none"
        />
      </section>

      {/* 4. MAIN BLOG LISTING CONTENT */}
      <main id="blog-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* CATEGORY FILTER TABS & SORT / SEARCH BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10 pb-6 border-b border-[#EBE8EF]">

          {/* Category Filter Pills (Responsive scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setCurrentPageNum(1);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                    ? 'bg-[#5E1083] text-white shadow-md shadow-purple-900/15'
                    : 'bg-white text-[#544F66] border border-[#EBE8EF] hover:border-purple-300 hover:text-[#7C1FA8]'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 self-end lg:self-auto w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPageNum(1);
                }}
                className="w-full bg-white border border-[#EBE8EF] rounded-full pl-9 pr-8 py-2 text-xs text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
              />
              <svg className="w-4 h-4 text-[#8E8A9D] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#EBE8EF] text-[#1E1B2E] font-semibold text-xs sm:text-sm rounded-full pl-4 pr-9 py-2 focus:outline-none focus:border-[#7C1FA8] transition-all cursor-pointer shadow-2xs"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="read-time-asc">Quick Reads (Shortest)</option>
                <option value="read-time-desc">In-Depth Reads</option>
              </select>
              <svg className="w-4 h-4 text-[#544F66] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 5. FEATURED BLOG CARD */}
        {activeCategory === 'All' && !searchQuery && currentPageNum === 1 && (
          <div
            onClick={() => onNavigatePage ? onNavigatePage('blog-detail', featuredPost.id) : setSelectedArticle(featuredPost)}
            className="mb-12 bg-white rounded-[24px] border border-[#EBE8EF] overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(124,31,168,0.08)] hover:border-purple-200 transition-all duration-300 group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Image Section */}
              <div className="lg:col-span-6 relative overflow-hidden bg-purple-50 min-h-[260px] sm:min-h-[340px] lg:min-h-[380px]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Content Section */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  {/* Category / Featured Tag */}
                  <div className="inline-block mb-3 sm:mb-4">
                    <span className="text-[#7C1FA8] font-black text-xs tracking-wider uppercase bg-[#F5EEFB] px-3 py-1 rounded-md border border-purple-100">
                      FEATURED
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#544F66] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Meta Row */}
                <div className="flex items-center justify-between pt-4 border-t border-[#F5F2F8] text-xs sm:text-sm text-[#8E8A9D]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#8E8A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {featuredPost.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#8E8A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <span className="text-[#7C1FA8] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <span className="text-base leading-none">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. BLOG CARDS GRID (3 Columns Responsive) */}
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {displayedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onNavigatePage ? onNavigatePage('blog-detail', post.id) : setSelectedArticle(post)}
                className="bg-white rounded-[24px] border border-[#EBE8EF] overflow-hidden shadow-sm hover:shadow-[0_18px_40px_rgba(124,31,168,0.08)] hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Card Top Image */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-purple-50">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    {/* Category */}
                    <span className="text-[#7C1FA8] text-[11px] sm:text-xs font-black tracking-wider uppercase block mb-2.5">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#6C677E] text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer / Meta */}
                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5F2F8] flex items-center justify-between text-[11px] sm:text-xs text-[#8E8A9D]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#8E8A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <span className="text-[#7C1FA8] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read article <span className="text-sm">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[24px] border border-[#EBE8EF] p-8 mb-14">
            <div className="w-14 h-14 rounded-full bg-purple-50 text-[#7C1FA8] flex items-center justify-center text-2xl mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-[#1E1B2E] mb-2">No articles found</h3>
            <p className="text-sm text-[#8E8A9D] max-w-md mx-auto mb-6">
              We couldn't find any articles matching your search or category filter. Try clearing filters or exploring other topics.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="bg-[#7C1FA8] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#6b1a91] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 7. PAGINATION SECTION */}
        <div className="flex items-center justify-center gap-2 mb-16 select-none">
          {/* Previous Arrow */}
          <button
            onClick={() => handlePageChange(currentPageNum - 1)}
            disabled={currentPageNum === 1}
            className="w-10 h-10 rounded-xl border border-[#EBE8EF] bg-white flex items-center justify-center text-[#544F66] hover:border-purple-300 hover:text-[#7C1FA8] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
            aria-label="Previous Page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page numbers matching mockup */}
          {[1, 2, 3].map((num) => {
            const isActive = currentPageNum === num;
            return (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${isActive
                  ? 'bg-[#5E1083] text-white shadow-sm'
                  : 'bg-white border border-[#EBE8EF] text-[#544F66] hover:border-purple-300 hover:text-[#7C1FA8]'
                  }`}
              >
                {num}
              </button>
            );
          })}

          <span className="w-8 text-center text-[#8E8A9D] font-bold">...</span>

          <button
            onClick={() => handlePageChange(10)}
            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${currentPageNum === 10
              ? 'bg-[#5E1083] text-white shadow-sm'
              : 'bg-white border border-[#EBE8EF] text-[#544F66] hover:border-purple-300 hover:text-[#7C1FA8]'
              }`}
          >
            10
          </button>

          {/* Next Arrow */}
          <button
            onClick={() => handlePageChange(currentPageNum + 1)}
            disabled={currentPageNum === 10}
            className="w-10 h-10 rounded-xl border border-[#EBE8EF] bg-white flex items-center justify-center text-[#544F66] hover:border-purple-300 hover:text-[#7C1FA8] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
            aria-label="Next Page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 8. NEWSLETTER / WEALTH DIGEST CTA */}


      </main>

      {/* 9. ARTICLE DETAIL MODAL / READER */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-100 flex flex-col relative my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-[#EBE8EF] flex items-center justify-between z-20">
              <span className="text-[#7C1FA8] font-black text-xs uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-[#FAF5FD] text-[#5E1083] hover:bg-purple-100 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-purple-50">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-10 space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Author & Meta Row */}
              <div className="flex items-center justify-between py-3 border-y border-[#EBE8EF] text-xs text-[#8E8A9D]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-base">
                    {selectedArticle.author?.avatar || '✍️'}
                  </div>
                  <div>
                    <span className="font-bold text-[#1E1B2E] block">{selectedArticle.author?.name || 'Editorial Team'}</span>
                    <span className="text-[11px] text-[#8E8A9D]">{selectedArticle.author?.role || 'PROSPERi5 Insights'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              {/* Rich Body Content */}
              <div
                className="prose prose-purple max-w-none text-[#544F66] text-sm sm:text-base leading-relaxed space-y-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#1E1B2E] [&>h4]:text-lg [&>h4]:font-bold [&>h4]:text-[#1E1B2E] [&>blockquote]:border-l-4 [&>blockquote]:border-[#7C1FA8] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#7C1FA8]"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Share & Feedback Row */}
              <div className="pt-6 border-t border-[#EBE8EF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#1E1B2E]">Was this article helpful?</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Article link copied to clipboard!');
                      }
                    }}
                    className="bg-[#FAF5FD] hover:bg-purple-100 text-[#7C1FA8] font-bold text-xs px-4 py-2 rounded-full border border-purple-200 transition-all cursor-pointer"
                  >
                    🔗 Share Article
                  </button>
                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      setTalkAdvisorModal(true);
                    }}
                    className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold text-xs px-4 py-2 rounded-full shadow transition-all cursor-pointer"
                  >
                    Consult an Advisor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. TALK TO ADVISOR MODAL */}
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
              💬
            </div>
            <h3 className="text-xl font-extrabold text-[#1E1B2E] mb-2">Speak to a Wealth Advisor</h3>
            <p className="text-xs text-[#6C677E] leading-relaxed mb-6">
              Get personalized financial advice tailored to your goals. Our certified experts are ready to guide you.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! An advisor will call you shortly.'); setTalkAdvisorModal(false); }} className="space-y-3">
              <input type="text" required placeholder="Full Name" className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]" />
              <input type="tel" required placeholder="Mobile Number" className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]" />
              <input type="email" placeholder="Email Address" className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]" />
              <select className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]">
                <option value="investment">Mutual Funds & SIPs</option>
                <option value="insurance">Term / Health Insurance</option>
                <option value="loans">Loan Against Securities / LAP</option>
                <option value="tax">Tax Planning</option>
              </select>
              <button type="submit" className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2">
                Request Free Callback
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 11. FOOTER */}
      <Footer onNavigatePage={onNavigatePage} />

    </div>
  );
}
