import React, { useState } from 'react';
import Testimonials from './Testimonials';
import Footer from './Footer';

export default function KnowledgeCenterPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const categories = [
    'All',
    'Mutual Funds & SIP',
    'Tax Savings',
    'Loans & Credit',
    'Insurance Guides',
    'Wealth Strategy'
  ];

  const articles = [
    {
      id: 1,
      title: "Mastering SIPs: How Small Monthly Investments Build Wealth",
      category: "Mutual Funds & SIP",
      readTime: "5 min read",
      date: "Aug 24, 2026",
      excerpt: "Discover the magic of compounding and how disciplined monthly investments in top-performing equity mutual funds create financial freedom.",
      image: "/grow_card_sip.jpg",
      author: "Pawan Saini",
      badgeColor: "bg-purple-100 text-[#7C1FA8]"
    },
    {
      id: 2,
      title: "Section 80C Demystified: Save Tax & Build Wealth with ELSS",
      category: "Tax Savings",
      readTime: "6 min read",
      date: "Aug 22, 2026",
      excerpt: "Save up to ₹46,800 in taxes under Section 80C while earning high equity growth with the shortest 3-year lock-in period.",
      image: "/grow_card_elss_funds.jpg",
      author: "Ananya Sen",
      badgeColor: "bg-pink-100 text-[#C81E8C]"
    },
    {
      id: 3,
      title: "Loan Against Mutual Funds: Unlock Instant Cash Without Selling",
      category: "Loans & Credit",
      readTime: "4 min read",
      date: "Aug 20, 2026",
      excerpt: "Need emergency funds? Pledge your portfolio and get instant overdraft starting at 9.5% p.a. while your investments keep growing.",
      image: "/grow_card_mutual_funds.jpg",
      author: "Vikram Malhotra",
      badgeColor: "bg-amber-100 text-[#D48806]"
    },
    {
      id: 4,
      title: "Comprehensive Health Insurance Guide for Indian Families",
      category: "Insurance Guides",
      readTime: "7 min read",
      date: "Aug 18, 2026",
      excerpt: "Learn how to choose the right sum insured, understand pre-existing condition waiting periods, and avoid claim rejection pitfalls.",
      image: "/card_heart_3d.jpg",
      author: "Priya Sharma",
      badgeColor: "bg-emerald-100 text-[#059669]"
    },
    {
      id: 5,
      title: "Index Funds vs Active Mutual Funds: Which Fits Your Goals?",
      category: "Mutual Funds & SIP",
      readTime: "5 min read",
      date: "Aug 15, 2026",
      excerpt: "Compare low-cost Nifty 50 index funds with actively managed equity funds to optimize your portfolio risk-return ratio.",
      image: "/grow_card_index_funds.jpg",
      author: "Rajesh Kumar",
      badgeColor: "bg-blue-100 text-[#2563EB]"
    },
    {
      id: 6,
      title: "Building a Multi-Asset Ecosystem: Balancing Risk & Return",
      category: "Wealth Strategy",
      readTime: "8 min read",
      date: "Aug 12, 2026",
      excerpt: "A strategic breakdown on combining fixed income debt, equity SIPs, and term insurance to secure your family's future.",
      image: "/card_growth_3d.png",
      author: "Prosperi5 Research Team",
      badgeColor: "bg-purple-100 text-[#7C1FA8]"
    }
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      q: "What is Prosperi5 Knowledge Center?",
      a: "Prosperi5 Knowledge Center is an educational hub providing simplified guides, market insights, calculator tools, and expert advice on mutual funds, SIPs, loans, tax savings, and insurance."
    },
    {
      q: "Are the financial articles free to read?",
      a: "Yes! All articles, research reports, and wealth guides in our Knowledge Center are 100% free for all investors and financial advisors."
    },
    {
      q: "How can I start investing after reading a guide?",
      a: "You can click 'Start Investing' on any guide to open instant paperless KYC and start your portfolio journey with zero advisory fees."
    },
    {
      q: "Can I consult a certified financial expert?",
      a: "Absolutely. You can request a 1-on-1 personalized call with a certified Prosperi5 wealth expert at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-[#544F66] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">
      


      {/* 3. HERO SECTION (FULL WIDTH - CUSTOM REACT) */}
      <section className="w-full bg-[#FAF8FC] bg-gradient-to-r from-[#FAF8FC] via-[#F5EEFC] to-[#FAF8FC] relative overflow-hidden border-b border-[#EBE8EF]/60 pt-4 sm:pt-5 lg:pt-6 pb-5 sm:pb-6 lg:pb-7 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Ambient Purple Background Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-purple-200/40 rounded-full filter blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* LEFT COLUMN: Main Heading, Subtitle & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-1.5 bg-[#F0E6F8] text-[#7C1FA8] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#7C1FA8] inline-block animate-pulse"></span>
              <span>KNOWLEDGE CENTER</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-sans font-extrabold text-[36px] leading-[44px] sm:text-[48px] sm:leading-[54px] lg:text-[52px] lg:leading-[58px] tracking-[-0.035em] text-[#1E1B2E] mb-3.5 w-full max-w-[640px]">
              Knowledge that <br />helps you <span className="text-[#7C1FA8]">grow smarter.</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[23px] sm:leading-[26px] text-[#544F66] mb-6 w-full max-w-[560px]">
              Expert insights, practical guides and powerful tools to help you make better financial decisions every day.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <button 
                onClick={() => {
                  const el = document.getElementById('articles-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Explore Wealth Guides</span>
                <span>➔</span>
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('topics-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-[#7C1FA8] text-[#7C1FA8] hover:bg-purple-50/80 font-extrabold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Browse Topics</span>
              </button>
            </div>

            {/* Popular Searches Row */}
            <div className="w-full max-w-[580px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8E8A9D] block mb-2">
                POPULAR SEARCHES
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: 'SIP Guide', icon: '📈', cat: 'Mutual Funds & SIP' },
                  { label: 'Income Tax Saving', icon: '📄', cat: 'Tax Savings' },
                  { label: 'Home Loan', icon: '🏠', cat: 'Loans & Credit' },
                  { label: 'Mutual Funds', icon: '⏱️', cat: 'Mutual Funds & SIP' },
                  { label: 'Retirement Planning', icon: '👤', cat: 'Wealth Strategy' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCategory(item.cat);
                      setSearchQuery(item.label);
                      const el = document.getElementById('articles-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white/90 hover:bg-purple-50 border border-[#EBE3F5] hover:border-[#7C1FA8]/50 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-[#1E1B2E] shadow-2xs transition-all cursor-pointer active:scale-95"
                  >
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Education & Knowledge Illustration */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full mt-4 lg:mt-0">
            <div className="relative z-10 w-full max-w-[620px] sm:max-w-[700px] lg:max-w-[780px] flex justify-center items-center">
              <img
                src="/ChatGPT Image Aug 29, 2026, 05_28_39 PM.png"
                alt="Knowledge that helps you grow smarter - PROSPERi5 Knowledge Center 3D Illustration"
                className="w-full h-auto max-h-[460px] sm:max-h-[520px] lg:max-h-[580px] object-contain drop-shadow-xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. EXPLORE FINANCIAL TOPICS SECTION (COMPACT & CENTERED) */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
        
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <span className="text-[#7C1FA8] text-xs font-semibold uppercase tracking-wider block mb-1.5">
            EXPLORE FINANCIAL TOPICS
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1B2E] tracking-tight leading-tight mb-2.5">
            Explore. Learn. Grow. All in one <span className="text-[#7C1FA8]">place.</span>
          </h2>
          <p className="text-sm sm:text-[15.5px] text-[#6E6B7B] font-medium leading-relaxed max-w-xl mx-auto">
            Browse curated knowledge across key financial topics and take confident steps toward your goals.
          </p>
        </div>

        {/* 5 Compact Cards Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5">
          
          {/* Card 1: Partner */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[220px]">
            <div>
              <div className="bg-[#F4EDFC] rounded-xl h-28 mb-3.5 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/fin_books_clean.png" 
                  alt="Partner 3D" 
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1">Partner</h4>
              <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                Learn, grow and succeed together with Prosperi5.
              </p>
            </div>
          </div>

          {/* Card 2: Personal Finance */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[220px]">
            <div>
              <div className="bg-[#E8F8F0] rounded-xl h-28 mb-3.5 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/fin_wallet_clean.png" 
                  alt="Personal Finance 3D" 
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1">Personal Finance</h4>
              <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                Manage money better and achieve your financial goals with smart planning.
              </p>
            </div>
          </div>

          {/* Card 3: Loans */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[220px]">
            <div>
              <div className="bg-[#FFF4E6] rounded-xl h-28 mb-3.5 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/fin_home_clean.png" 
                  alt="Loans 3D" 
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1">Loans</h4>
              <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                Understand loans, compare options and borrow smartly.
              </p>
            </div>
          </div>

          {/* Card 4: Tax */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[220px]">
            <div>
              <div className="bg-[#EBF3FF] rounded-xl h-28 mb-3.5 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/fin_vault_clean.png" 
                  alt="Tax 3D" 
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1">Tax</h4>
              <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                Stay compliant and save more with smart tax planning.
              </p>
            </div>
          </div>

          {/* Card 5: Market Insights */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[220px]">
            <div>
              <div className="bg-[#FDF0F7] rounded-xl h-28 mb-3.5 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/fin_chart_clean.png" 
                  alt="Market Insights 3D" 
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                />
              </div>
              <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1">Market Insights</h4>
              <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                Track trends and get expert views to make informed investment decisions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. LEARN BY YOUR FINANCIAL GOAL SECTION */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none border-t border-[#EBE8EF]/60">
        
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[#7C1FA8] text-xs font-semibold uppercase tracking-wider block mb-1.5">
            LEARN BY YOUR FINANCIAL GOAL
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1B2E] tracking-tight leading-tight mb-2.5">
            Learn what matters to your <span className="text-[#7C1FA8]">financial goals.</span>
          </h2>
          <p className="text-sm sm:text-[15.5px] text-[#6E6B7B] font-medium leading-relaxed max-w-xl mx-auto">
            Explore practical guides, insights and tools designed around the milestones you want to achieve.
          </p>
        </div>

        {/* 6 Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Start Investing */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4.5 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[250px]">
            <div>
              <div className="bg-[#F4EDFC] rounded-xl h-36 mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/grow_card_sip.jpg" 
                  alt="Start Investing 3D" 
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="w-9 h-9 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center shadow-md absolute bottom-2.5 left-3 border-2 border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1.5">Start Investing</h4>
              <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
                Understand the basics and take your first step with confidence.
              </p>
            </div>
          </div>

          {/* Card 2: Build Wealth */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4.5 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[250px]">
            <div>
              <div className="bg-[#FFF4E6] rounded-xl h-36 mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/grow_card_mutual_funds.jpg" 
                  alt="Build Wealth 3D" 
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="w-9 h-9 rounded-full bg-[#F5A623] text-white flex items-center justify-center shadow-md absolute bottom-2.5 left-3 border-2 border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1.5">Build Wealth</h4>
              <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
                Discover smarter ways to grow and manage your wealth over time.
              </p>
            </div>
          </div>

          {/* Card 3: Buy a Home */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4.5 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[250px]">
            <div>
              <div className="bg-[#EBF3FF] rounded-xl h-36 mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/fin_home_clean.png" 
                  alt="Buy a Home 3D" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md absolute bottom-2.5 left-3 border-2 border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1.5">Buy a Home</h4>
              <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
                Learn about home loans, down payments and planning for your dream home.
              </p>
            </div>
          </div>

          {/* Card 4: Save Tax */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4.5 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[250px]">
            <div>
              <div className="bg-[#E8F8F0] rounded-xl h-36 mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/grow_card_elss_funds.jpg" 
                  alt="Save Tax 3D" 
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-md absolute bottom-2.5 left-3 border-2 border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1.5">Save Tax</h4>
              <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
                Understand tax-saving opportunities and make more informed decisions.
              </p>
            </div>
          </div>

          {/* Card 5: Plan Retirement */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4.5 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[250px]">
            <div>
              <div className="bg-[#FFF8E7] rounded-xl h-36 mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/grow_card_index_funds.jpg" 
                  alt="Plan Retirement 3D" 
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="w-9 h-9 rounded-full bg-[#D48806] text-white flex items-center justify-center shadow-md absolute bottom-2.5 left-3 border-2 border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1.5">Plan Retirement</h4>
              <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
                Build a plan today for the lifestyle you want tomorrow.
              </p>
            </div>
          </div>

          {/* Card 6: Protect Your Family */}
          <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4.5 shadow-2xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group min-h-[250px]">
            <div>
              <div className="bg-[#F4EDFC] rounded-xl h-36 mb-4 flex items-center justify-center p-2 relative overflow-hidden">
                <img 
                  src="/card_heart_3d.jpg" 
                  alt="Protect Your Family 3D" 
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="w-9 h-9 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center shadow-md absolute bottom-2.5 left-3 border-2 border-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-1.5">Protect Your Family</h4>
              <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
                Learn how insurance and financial planning can help protect what matters.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8 select-none">

        {/* 6. BEGINNER'S LEARNING HUB SECTION */}
        <div className="py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column (Header + 3D Learning Hub Graphic Box) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[#7C1FA8] text-xs font-semibold uppercase tracking-wider block mb-2">
                  BEGINNER'S LEARNING HUB
                </span>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1B2E] tracking-tight leading-tight mb-3">
                  New to finance?<br />
                  Start <span className="text-[#7C1FA8]">your journey</span> here.
                </h2>
                <p className="text-xs sm:text-sm text-[#6E6B7B] font-medium leading-relaxed">
                  Simple guides and bite-sized lessons to help you understand the basics and build confidence.
                </p>
              </div>

              {/* 3D Wealth Growth Graphic Container */}
              <div className="bg-[#FAF5FD] border border-purple-100/80 rounded-[28px] p-2 relative flex items-center justify-center shadow-2xs w-full flex-1 min-h-[340px] overflow-hidden">
                <img 
                  src="/cdea012a-16aa-48fb-bcaf-684495cac50b.png" 
                  alt="Your Wealth Growth 3D" 
                  className="w-full max-w-[560px] h-auto object-contain filter drop-shadow-md scale-110 sm:scale-125 hover:scale-130 transition-transform duration-300 transform origin-center"
                />
              </div>
            </div>

            {/* Right Column (5 Stacked Compact Cards) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
              
              {/* Card 1: Investing 101 */}
              <div className="bg-white hover:bg-[#FAF5FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#F4EDFC] text-[#7C1FA8] font-bold text-lg flex items-center justify-center shrink-0 border border-purple-100">
                    101
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-0.5">
                      Investing 101
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                      Learn the fundamentals of investing and how it can help you grow your money.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Mutual Funds Explained */}
              <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#E8F8F0] text-[#10B981] flex items-center justify-center shrink-0 border border-emerald-100">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-0.5">
                      Mutual Funds Explained
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                      Understand how mutual funds work and why they are a smart choice for investors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: SIP Basics */}
              <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#FFF4E6] text-[#F5A623] flex items-center justify-center shrink-0 border border-amber-100">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-0.5">
                      SIP Basics
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                      Learn how SIP works and how small, consistent steps can create big wealth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: Understanding Risk */}
              <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#FDF0F7] text-[#EC4899] flex items-center justify-center shrink-0 border border-pink-100">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-0.5">
                      Understanding Risk
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                      Discover different types of risk and how to manage them wisely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5: How Markets Work */}
              <div className="bg-white hover:bg-[#FAF7FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#EBF3FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-blue-100">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors mb-0.5">
                      How Markets Work
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#6E6B7B] leading-snug font-medium">
                      Get a simple introduction to stock markets and the forces that drive them.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 7. MARKET INSIGHTS SECTION */}
        <section className="py-6 sm:py-8 select-none border-t border-[#EBE8EF]/60">
          
          {/* Top Header Row - Centered */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-[#7C1FA8] text-xs font-semibold uppercase tracking-wider block">
              MARKET INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1B2E] tracking-tight leading-tight">
              Insights that keep you <span className="text-[#7C1FA8]">ahead of the market.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6B7B] font-medium leading-relaxed">
              Stay informed with the latest market movements, sector performance and expert analysis to make smarter investment decisions.
            </p>
          </div>

          {/* Middle Grid: Market Overview + Top Market Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
            
            {/* Left Column: Market Overview Image Asset */}
            <div className="lg:col-span-7 flex flex-col h-full w-full">
              <img 
                src="/ChatGPT Image Aug 26, 2026, 12_48_17 PM.png" 
                alt="Market Overview Dashboard" 
                className="w-full h-full min-h-full object-cover rounded-2xl border border-[#EBE8EF] shadow-2xs block"
              />
            </div>

            {/* Right Column: Top Market Insights (Single Container Box for all 3 articles) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#EBE8EF] shadow-2xs flex flex-col justify-between h-full space-y-4">
              
              {/* List Header */}
              <div className="flex items-center justify-between border-b border-[#EBE8EF]/80 pb-3">
                <h3 className="font-semibold text-lg text-[#1E1B2E]">Top Market Insights</h3>
                <button className="text-xs font-bold text-[#7C1FA8] hover:underline flex items-center gap-1 cursor-pointer">
                  <span>View all insights</span>
                  <span>→</span>
                </button>
              </div>

              {/* Articles Group inside Single Box Container */}
              <div className="space-y-3">
                {/* Article 1 */}
                <div className="bg-[#FAF8FC] hover:bg-[#FAF5FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-xl p-3 transition-all flex items-center gap-3.5 cursor-pointer group">
                  <img 
                    src="/grow_card_mutual_funds.jpg" 
                    alt="Market Outlook" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-purple-100"
                  />
                  <div className="space-y-1">
                    <span className="text-[9.5px] font-bold text-[#7C1FA8] bg-purple-50 px-2 py-0.5 rounded-full inline-block uppercase">
                      MARKET OUTLOOK
                    </span>
                    <h4 className="font-semibold text-sm text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-snug">
                      Market Outlook: May 2026
                    </h4>
                    <p className="text-[11px] text-[#6E6B7B] line-clamp-2 font-medium leading-tight">
                      Global cues remain positive as earnings season progresses; markets eye key macro data this week.
                    </p>
                    <span className="text-[10px] text-[#8C8899] font-medium block pt-0.5">26 May 2026 • 5 min read</span>
                  </div>
                </div>

                {/* Article 2 */}
                <div className="bg-[#FAF8FC] hover:bg-[#FAF5FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-xl p-3 transition-all flex items-center gap-3.5 cursor-pointer group">
                  <img 
                    src="/grow_card_index_funds.jpg" 
                    alt="Expert Take" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-emerald-100"
                  />
                  <div className="space-y-1">
                    <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block uppercase">
                      EXPERT COMMENTARY
                    </span>
                    <h4 className="font-semibold text-sm text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-snug">
                      Expert Take: Where Are We Headed?
                    </h4>
                    <p className="text-[11px] text-[#6E6B7B] line-clamp-2 font-medium leading-tight">
                      Our experts share their views on market trends, valuations and what investors should watch.
                    </p>
                    <span className="text-[10px] text-[#8C8899] font-medium block pt-0.5">25 May 2026 • 6 min read</span>
                  </div>
                </div>

                {/* Article 3 */}
                <div className="bg-[#FAF8FC] hover:bg-[#FAF5FD] border border-[#EBE8EF] hover:border-[#7C1FA8]/60 rounded-xl p-3 transition-all flex items-center gap-3.5 cursor-pointer group">
                  <img 
                    src="/grow_card_sip.jpg" 
                    alt="Sector Insights" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-blue-100"
                  />
                  <div className="space-y-1">
                    <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block uppercase">
                      SECTOR INSIGHTS
                    </span>
                    <h4 className="font-semibold text-sm text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-snug">
                      IT & Financials Lead the Rally
                    </h4>
                    <p className="text-[11px] text-[#6E6B7B] line-clamp-2 font-medium leading-tight">
                      Technology and financial sectors show strength amid strong Q4 results and global demand.
                    </p>
                    <span className="text-[10px] text-[#8C8899] font-medium block pt-0.5">24 May 2026 • 4 min read</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </section>

      </main>

      {/* 8. TESTIMONIALS SECTION */}
      <Testimonials />

      {/* 9. ARTICLE DETAIL MODAL */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white bg-cover bg-center rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 overflow-hidden border border-purple-100/80"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gray-100/90 text-gray-500 hover:bg-gray-200 flex items-center justify-center cursor-pointer font-bold transition-colors z-20"
              >
                ✕
              </button>

              <h3 className="text-xl font-semibold text-[#1E1B2E] mb-2 pr-6">
                {selectedArticleModal.title}
              </h3>

              <p className="text-xs text-[#6E6B7B] font-medium mb-4 leading-relaxed">
                {selectedArticleModal.excerpt || selectedArticleModal.content}
              </p>

              <div className="bg-[#FAF7FC]/90 backdrop-blur-xs p-4 rounded-xl border border-[#E8DEF2] space-y-3 mb-6">
                <div className="flex justify-between text-xs font-semibold text-[#7C1FA8]">
                  <span>SEBI Verified Content</span>
                  <span>Prosperi5 Research</span>
                </div>
                <p className="text-[11px] text-[#6E6B7B]">
                  Looking to implement this financial strategy for your portfolio? Get personalized guidance from our team.
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedArticleModal(null);
                  if (onNavigatePage) onNavigatePage('grow');
                }}
                className="w-full py-3 bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold rounded-xl text-sm transition-all text-center cursor-pointer shadow-md active:scale-95"
              >
                Start Investing Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. FOOTER */}
      <Footer onNavigatePage={(p) => navigateToPage ? navigateToPage(p) : onNavigatePage && onNavigatePage(p)} />
    </div>
  );
}
