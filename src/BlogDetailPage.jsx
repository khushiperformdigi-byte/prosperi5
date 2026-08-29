import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function BlogDetailPage({ onNavigateHome, onNavigatePage, articleId = 'post-1' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [talkAdvisorModal, setTalkAdvisorModal] = useState(false);
  const [currentId, setCurrentId] = useState(articleId || 'post-1');

  useEffect(() => {
    if (articleId) {
      setCurrentId(articleId);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [articleId]);

  useEffect(() => {
    if (mobileMenuOpen || talkAdvisorModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, talkAdvisorModal]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const articlesData = {
    'post-1': {
      id: 'post-1',
      category: 'INVESTING',
      titlePrefix: 'SIP vs Lump Sum:',
      titleSuffix: 'Which Strategy Is Right for You?',
      fullTitle: 'SIP vs Lump Sum: Which Strategy Is Right for You?',
      lead: 'A complete comparison to help you understand which investment approach aligns with your financial goals.',
      date: 'May 26, 2025',
      readTime: '6 min read',
      image: '/blog_sip_coins.jpg',
      author: {
        name: 'Rohit Sharma',
        role: 'Head of Investments',
        bio: 'Rohit has over 12 years of experience in financial planning and wealth management. He is passionate about helping investors make informed financial decisions.'
      },
      intro1: 'Investing is one of the most powerful ways to build wealth over time. But when it comes to investing, a common question arises: Should you invest a large sum lump sum or start a Systematic Investment Plan (SIP)?',
      intro2: "Both approaches have their own advantages and are suited for different financial situations and goals. Let's break them down.",
      sections: [
        {
          heading: '1. What is a Lump Sum Investment?',
          desc: 'Lump sum investment means investing a large amount of money in one go. This could be from your savings, bonus, inheritance, or any other source.',
          suitedTitle: 'Best suited for:',
          bullets: [
            'Investors who have a significant amount of disposable surplus',
            'Those who want to take advantage of market opportunities',
            'Long-term wealth creation goals'
          ]
        },
        {
          heading: '2. What is a SIP?',
          desc: 'A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (monthly/quarterly) in mutual funds.',
          suitedTitle: 'Best suited for:',
          bullets: [
            'Investors who prefer disciplined investing',
            'Those with regular income',
            'Long-term goals with rupee cost averaging benefit'
          ]
        },
        {
          heading: '3. Which One Should You Choose?',
          desc: 'There is no one-size-fits-all answer. If you have a lumpsum amount and the market valuations are attractive, a lumpsum investment can deliver higher returns. But if you prefer a disciplined approach or the market seems uncertain, SIP is a smarter choice.',
          conclusion: 'Ultimately, the best strategy is the one that aligns with your goals, risk appetite, and investment horizon.'
        }
      ]
    },
    'featured-1': {
      id: 'featured-1',
      category: 'INVESTING',
      titlePrefix: 'Where should you invest',
      titleSuffix: 'when markets are uncertain?',
      fullTitle: 'Where should you invest when markets are uncertain?',
      lead: "Markets will always have ups and downs. Here's how to stay focused on long-term goals and make confident investment decisions.",
      date: 'May 24, 2025',
      readTime: '6 min read',
      image: '/blog_featured_mountain.jpg',
      author: {
        name: 'Rohit Sharma',
        role: 'Head of Investments',
        bio: 'Rohit has over 12 years of experience in financial planning and wealth management. He is passionate about helping investors make informed financial decisions.'
      },
      intro1: 'Market volatility often triggers anxiety among investors, prompting rash decisions that can permanently damage compounding gains.',
      intro2: 'Maintaining a strategic, patient perspective anchored in asset allocation remains the single best antidote to short-term uncertainty.',
      sections: [
        {
          heading: '1. Diversify Across Uncorrelated Assets',
          desc: 'A robust portfolio combines equity, fixed income, gold, and alternative assets so that downturns in one market are cushioned by stability in another.',
          suitedTitle: 'Key elements:',
          bullets: [
            'Balanced hybrid mutual funds with dynamic asset allocation',
            'High-quality sovereign and corporate bond funds',
            'Gold allocations as an inflation hedge'
          ]
        },
        {
          heading: '2. Never Pause Your Systematic Plans',
          desc: 'Market pullbacks allow your regular SIPs to accumulate more units at lower NAVs, supercharging your future compounding.',
          suitedTitle: 'Best practices:',
          bullets: [
            'Automate monthly debits to remove emotional interference',
            'Step-up your SIP percentage as your annual income increases',
            'Focus on 5-10 year milestone targets rather than quarterly performance'
          ]
        },
        {
          heading: '3. Strategic Rebalancing',
          desc: 'Rebalance your portfolio annually to lock in gains from outperforming sectors and reallocate toward undervalued asset classes.',
          conclusion: 'Disciplined patience always triumphs over reactionary market timing.'
        }
      ]
    },
    'post-2': {
      id: 'post-2',
      category: 'PERSONAL FINANCE',
      titlePrefix: 'How to Build a Financial Plan',
      titleSuffix: 'That Actually Works',
      fullTitle: 'How to Build a Financial Plan That Actually Works',
      lead: 'Simple principles to organize your income, expenses, savings and investments.',
      date: 'May 20, 2025',
      readTime: '5 min read',
      image: '/blog_financial_plan.jpg',
      author: {
        name: 'Rohit Sharma',
        role: 'Head of Investments',
        bio: 'Rohit has over 12 years of experience in financial planning and wealth management. He is passionate about helping investors make informed financial decisions.'
      },
      intro1: 'A successful financial plan is not about drastic lifestyle sacrifices; it is about bringing intentionality and structure to your cash flow.',
      intro2: 'Following a few core fundamentals ensures that your money consistently works for your future goals.',
      sections: [
        {
          heading: '1. Establish an Emergency Reserve',
          desc: 'Before taking investment risk, ensure you have 6–12 months of mandatory living expenses parked in liquid instruments.',
          suitedTitle: 'Best practices:',
          bullets: [
            'High-yield liquid mutual funds or sweep-in fixed deposits',
            'Easily accessible without exit loads or penalty clauses',
            'Separated from everyday transaction accounts'
          ]
        },
        {
          heading: '2. The 50/30/20 Framework',
          desc: 'Categorize your take-home pay into needs (50%), lifestyle wants (30%), and mandatory savings/investments (20%+).',
          suitedTitle: 'Advantages:',
          bullets: [
            'Maintains clear boundaries on lifestyle creep',
            'Guarantees regular wealth building every single month',
            'Provides guilt-free discretionary spending'
          ]
        },
        {
          heading: '3. Goal-Based Investing',
          desc: 'Map every investment to a tangible future horizon: children education, property purchase, or comfortable retirement.',
          conclusion: 'Clarity on time horizon dictates the ideal risk level and asset allocation.'
        }
      ]
    },
    'post-3': {
      id: 'post-3',
      category: 'TAX SAVING',
      titlePrefix: 'Tax-Saving Investments',
      titleSuffix: 'You Should Know About',
      fullTitle: 'Tax-Saving Investments You Should Know About',
      lead: 'Explore common tax-saving options and understand how they fit into your plan.',
      date: 'May 18, 2025',
      readTime: '7 min read',
      image: '/blog_tax_blocks.jpg',
      author: {
        name: 'Rohit Sharma',
        role: 'Head of Investments',
        bio: 'Rohit has over 12 years of experience in financial planning and wealth management. He is passionate about helping investors make informed financial decisions.'
      },
      intro1: 'Tax planning should never be a frantic exercise conducted in the final weeks of March. Planning early preserves substantial compounding gains.',
      intro2: 'Understanding the distinct attributes of tax-advantaged instruments helps you select the right fit for your wealth journey.',
      sections: [
        {
          heading: '1. Equity Linked Savings Schemes (ELSS)',
          desc: 'ELSS funds provide tax deduction under Section 80C with the shortest lock-in period (3 years) among all tax-saving instruments.',
          suitedTitle: 'Best suited for:',
          bullets: [
            'Investors seeking long-term equity growth with tax relief',
            'Younger investors with high risk tolerance',
            'Monthly SIP tax-saving discipline'
          ]
        },
        {
          heading: '2. National Pension System (NPS)',
          desc: 'NPS offers an additional ₹50,000 deduction under Section 80CCD(1B) beyond the standard 80C threshold.',
          suitedTitle: 'Best suited for:',
          bullets: [
            'Building dedicated retirement corpus',
            'Higher tax-bracket earners wanting additional tax optimization',
            'Low-cost pension fund management'
          ]
        },
        {
          heading: '3. Health Insurance Tax Relief (Section 80D)',
          desc: 'Premiums paid for self, family, and senior citizen parents unlock tax deductions up to ₹75,000 annually while protecting your wealth from medical crises.',
          conclusion: 'Opt for solutions that combine meaningful tax efficiency with solid wealth compounding.'
        }
      ]
    },
    'post-4': {
      id: 'post-4',
      category: 'LOANS',
      titlePrefix: 'How to Choose the Right Loan',
      titleSuffix: 'for Your Financial Goal',
      lead: 'Compare loan types, repayment considerations and what to evaluate before borrowing.',
      date: 'May 16, 2025',
      readTime: '5 min read',
      image: '/blog_loan_house.jpg',
      author: {
        name: 'Rohit Sharma',
        role: 'Head of Investments',
        bio: 'Rohit has over 12 years of experience in financial planning and wealth management. He is passionate about helping investors make informed financial decisions.'
      },
      intro1: 'Borrowing capital is a powerful financial leverage when used constructively for appreciating assets or business expansion.',
      intro2: 'Evaluating interest costs, tenure flexibility, and repayment schedules ensures you choose the most cost-effective financing solution.',
      sections: [
        {
          heading: '1. Loan Against Securities (LAS)',
          desc: 'Pledge your mutual funds or equity portfolio to access an instant credit line without liquidating your investments.',
          suitedTitle: 'Key benefits:',
          bullets: [
            'Interest charged only on utilized amount',
            'Zero capital gains tax triggered since no units are sold',
            'Lower interest rates compared to personal loans'
          ]
        },
        {
          heading: '2. Loan Against Property (LAP)',
          desc: 'Unlock substantial long-term capital for business growth by leveraging existing residential or commercial property.',
          suitedTitle: 'Key considerations:',
          bullets: [
            'Attractive long repayment tenures up to 15–20 years',
            'High sanction amounts with competitive interest rates',
            'Ideal for business capacity expansion or debt consolidation'
          ]
        },
        {
          heading: '3. Evaluating Total Borrowing Cost',
          desc: 'Always compare processing charges, foreclosure terms, and prepayment options rather than simply comparing base headline rates.',
          conclusion: 'Smart borrowing preserves cash flow while accelerating financial milestones.'
        }
      ]
    },
    'post-5': {
      id: 'post-5',
      category: 'MARKET INSIGHTS',
      titlePrefix: 'What Market Trends Mean',
      titleSuffix: 'for Long-Term Investors',
      lead: 'A simple look at market movements and what investors should focus on beyond short-term noise.',
      date: 'May 14, 2025',
      readTime: '6 min read',
      image: '/blog_market_trends.jpg',
      author: {
        name: 'Rohit Sharma',
        role: 'Head of Investments',
        bio: 'Rohit has over 12 years of experience in financial planning and wealth management. He is passionate about helping investors make informed financial decisions.'
      },
      intro1: 'Financial news channels thrive on daily volatility, creating unnecessary urgency and emotional turbulence for retail investors.',
      intro2: 'True wealth creation is built by understanding macroeconomic megatrends and staying invested across complete business cycles.',
      sections: [
        {
          heading: '1. Distinguishing Signal from Noise',
          desc: 'Short-term market fluctuations reflect sentiment and liquidity, while multi-year compounding is driven by corporate earnings growth.',
          suitedTitle: 'Core principles:',
          bullets: [
            'Focus on underlying company and fund fundamentals',
            'Avoid trading in and out based on weekly news headlines',
            'Track macroeconomic GDP and consumption trends'
          ]
        },
        {
          heading: '2. The Power of Time in the Market',
          desc: 'Historical data shows that missing the top 10 trading days over a decade cuts your overall portfolio returns in half.',
          suitedTitle: 'Actionable steps:',
          bullets: [
            'Maintain continuous equity exposure through disciplined SIPs',
            'Use market corrections to selectively add quality allocations',
            'Rebalance systematically rather than attempting to time peaks'
          ]
        },
        {
          heading: '3. Long-Term Megatrend Participation',
          desc: 'India’s manufacturing expansion, digital infrastructure, and domestic consumption remain compelling secular growth drivers.',
          conclusion: 'Patience and consistency remain the greatest competitive advantages in investing.'
        }
      ]
    },
    'post-6': {
      id: 'post-6',
      category: 'PROTECTION',
      titlePrefix: 'Why Financial Protection',
      titleSuffix: 'Should Be Part of Your Plan',
      lead: 'Understand how insurance and financial protection can complement your wealth strategy.',
      date: 'May 12, 2025',
      readTime: '5 min read',
      image: '/blog_protection_shield.jpg',
      author: {
        name: 'Rohit Sharma',
        role: 'Head of Investments',
        bio: 'Rohit has over 12 years of experience in financial planning and wealth management. He is passionate about helping investors make informed financial decisions.'
      },
      intro1: 'Investing without adequate insurance protection is like scoring goals without a goalkeeper. A single unexpected medical crisis or disability can erase years of disciplined compounding.',
      intro2: 'Financial protection forms the indestructible foundation upon which all wealth creation strategies rest.',
      sections: [
        {
          heading: '1. Pure Term Life Insurance',
          desc: 'Secure high-value life protection for your dependents at an affordable annual premium.',
          suitedTitle: 'Best practices:',
          bullets: [
            'Opt for sum assured equal to at least 15–20x your annual income',
            'Ensure full transparent medical disclosures',
            'Select reliable insurers with claim settlement ratios exceeding 98%'
          ]
        },
        {
          heading: '2. Comprehensive Health Coverage',
          desc: 'Medical inflation runs above 12% annually. Having a high-deductible super top-up policy protects your investment corpus.',
          suitedTitle: 'Key elements:',
          bullets: [
            'Base health policy plus large super top-up cover',
            'Restoration benefits and zero room-rent capping',
            'Critical illness riders for major medical events'
          ]
        },
        {
          heading: '3. Seamless Risk Shielding',
          desc: 'When your downside risk is covered, you can invest aggressively for long-term growth with peace of mind.',
          conclusion: 'Protect your family today so your investments can flourish tomorrow.'
        }
      ]
    }
  };

  const article = articlesData[currentId] || articlesData['post-1'];

  const relatedArticles = [
    {
      id: 'post-1',
      category: 'INVESTING',
      title: 'How to Build a Strong Investment Portfolio in 2025',
      readTime: '5 min read',
      image: '/blog_sip_coins.jpg'
    },
    {
      id: 'post-5',
      category: 'MARKET INSIGHTS',
      title: 'Understanding Market Volatility and How to Stay Calm',
      readTime: '6 min read',
      image: '/blog_city_water.jpg'
    },
    {
      id: 'post-2',
      category: 'PERSONAL FINANCE',
      title: 'Emergency Fund: How Much is Enough?',
      readTime: '4 min read',
      image: '/blog_emergency_lifebuoy.jpg'
    },
    {
      id: 'post-3',
      category: 'TAX SAVING',
      title: 'Top Tax-Saving Investments for FY 2024-25',
      readTime: '5 min read',
      image: '/blog_tax_blocks.jpg'
    }
  ];

  const handleSelectRelated = (id) => {
    setCurrentId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8]">
      
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
            <button 
              onClick={() => onNavigatePage && onNavigatePage('blog')}
              className="text-[#7C1FA8] font-bold cursor-pointer py-1 relative after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full"
            >
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
              { num: '03', label: 'Blog', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('blog'); }, active: true },
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

      {/* 3. MAIN DETAIL CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* BREADCRUMB NAVIGATION */}
        <nav className="flex items-center gap-2 text-xs sm:text-[13px] text-[#8E8A9D] font-medium mb-6 flex-wrap">
          <button 
            onClick={onNavigateHome} 
            className="hover:text-[#7C1FA8] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-[#8E8A9D]/60">&gt;</span>
          <button 
            onClick={() => onNavigatePage && onNavigatePage('blog')} 
            className="hover:text-[#7C1FA8] transition-colors cursor-pointer"
          >
            Blog
          </button>
          <span className="text-[#8E8A9D]/60">&gt;</span>
          <span className="text-[#7C1FA8] font-semibold truncate max-w-[280px] sm:max-w-md">
            {article.fullTitle}
          </span>
        </nav>

        {/* 2-COLUMN LAYOUT: MAIN CONTENT (LEFT) + STICKY SIDEBAR (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* LEFT COLUMN: ARTICLE CONTENT */}
          <article className="lg:col-span-8 bg-transparent">
            
            {/* Category Tag */}
            <span className="text-[#7C1FA8] font-black text-xs uppercase tracking-wider block mb-3">
              {article.category}
            </span>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#1E1B2E] leading-tight mb-4 tracking-tight">
              {article.titlePrefix ? (
                <>
                  {article.titlePrefix}<br />{article.titleSuffix}
                </>
              ) : (
                article.fullTitle
              )}
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-[#544F66] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {article.lead}
            </p>

            {/* Metadata Bar (Date, Read Time, Share) */}
            <div className="flex items-center gap-6 text-xs sm:text-sm text-[#8E8A9D] mb-8 relative">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#8E8A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{article.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#8E8A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{article.readTime}</span>
              </div>

              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 text-[#544F66] hover:text-[#7C1FA8] transition-colors cursor-pointer font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>

              {copiedToast && (
                <span className="absolute left-48 bg-[#1E1B2E] text-white text-[11px] px-3 py-1 rounded-md shadow animate-in fade-in">
                  Link copied!
                </span>
              )}
            </div>

            {/* Featured Article Banner Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] mb-8 bg-purple-50 shadow-sm">
              <img
                src={article.image}
                alt={article.fullTitle}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content Paragraphs & Sections */}
            <div className="text-[#3A3549] text-[15px] sm:text-base leading-[1.75] space-y-5 font-normal">
              
              <p>{article.intro1}</p>
              <p>{article.intro2}</p>

              {article.sections && article.sections.map((sec, idx) => (
                <div key={idx}>
                  {idx > 0 && <div className="border-b border-[#EBE8EF] my-8"></div>}
                  <div className="pt-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E] tracking-tight mb-3">
                      {sec.heading}
                    </h2>
                    
                    <p className="mb-4">{sec.desc}</p>

                    {sec.bullets && (
                      <>
                        <p className="font-semibold text-[#1E1B2E] mb-2">
                          {sec.suitedTitle || 'Key points:'}
                        </p>

                        <ul className="space-y-2 pl-1 mb-4 text-[#544F66]">
                          {sec.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="text-[#7C1FA8] font-bold">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {sec.conclusion && (
                      <p className="mt-4">{sec.conclusion}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Bottom Interactive Actions */}
              <div className="pt-8 mt-10 border-t border-[#EBE8EF] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => onNavigatePage && onNavigatePage('blog')}
                  className="inline-flex items-center gap-2 text-[#7C1FA8] font-bold text-sm hover:underline cursor-pointer"
                >
                  <span>←</span> Back to all articles
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 rounded-full border border-[#EBE8EF] bg-white text-xs font-bold text-[#544F66] hover:text-[#7C1FA8] hover:border-purple-200 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Article
                  </button>
                  <button
                    onClick={() => setTalkAdvisorModal(true)}
                    className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold text-xs px-5 py-2 rounded-full shadow transition-all cursor-pointer"
                  >
                    Consult an Advisor
                  </button>
                </div>
              </div>

            </div>

          </article>

          {/* RIGHT COLUMN: STICKY SIDEBAR (About the Author + Related Articles) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start">

            {/* CARD 1: ABOUT THE AUTHOR */}
            <div className="bg-white rounded-[24px] border border-[#EBE8EF] p-6 shadow-sm">
              <h3 className="text-[#1E1B2E] font-extrabold text-base">
                About the Author
              </h3>
              <div className="w-9 h-1 bg-[#7C1FA8] rounded-full mt-2 mb-5"></div>

              {/* Author Profile Row */}
              <div className="flex items-center gap-3.5 mb-4">
                {/* Circular Profile Avatar Icon */}
                <div className="w-14 h-14 rounded-full bg-[#E5E3EB] flex items-center justify-center text-[#8E8A9D] shrink-0 overflow-hidden">
                  <svg className="w-8 h-8 fill-current text-gray-400 mt-1" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#1E1B2E]">
                    {article.author?.name || 'Rohit Sharma'}
                  </h4>
                  <p className="text-xs text-[#8E8A9D] font-medium mt-0.5">
                    {article.author?.role || 'Head of Investments'}
                  </p>
                </div>
              </div>

              {/* Author Bio */}
              <p className="text-xs sm:text-[13px] text-[#544F66] leading-relaxed font-normal">
                {article.author?.bio || 'Rohit has over 12 years of experience in financial planning and wealth management. He is passionate about helping investors make informed financial decisions.'}
              </p>
            </div>

            {/* CARD 2: RELATED ARTICLES */}
            <div className="bg-white rounded-[24px] border border-[#EBE8EF] p-6 shadow-sm">
              <h3 className="text-[#1E1B2E] font-extrabold text-base">
                Related Articles
              </h3>
              <div className="w-9 h-1 bg-[#7C1FA8] rounded-full mt-2 mb-5"></div>

              <div className="space-y-4">
                {relatedArticles.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectRelated(item.id)}
                    className="flex items-center gap-3.5 group cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-[14px] overflow-hidden bg-purple-50 shrink-0 border border-[#EBE8EF]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[#7C1FA8] text-[10px] font-black uppercase tracking-wider block mb-0.5">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-snug line-clamp-2 mb-1">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-[#8E8A9D] block">
                        {item.readTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </main>

      {/* 4. TALK TO ADVISOR MODAL */}
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
                <option value="sip">SIP vs Lump Sum Advice</option>
                <option value="investment">Mutual Funds & Stocks</option>
                <option value="insurance">Term / Health Insurance</option>
                <option value="tax">Tax Saving Planning</option>
              </select>
              <button type="submit" className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2">
                Request Free Callback
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. FOOTER */}
      <Footer onNavigatePage={onNavigatePage} />

    </div>
  );
}
