import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';

export default function AboutPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [countVisible, setCountVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => { if (statsRef.current) observer.unobserve(statsRef.current); };
  }, []);

  function AnimatedCount({ end, suffix = '', prefix = '' }) {
    const [count, setCount] = useState(0);
    const animated = useRef(false);
    useEffect(() => {
      if (!countVisible || animated.current) return;
      animated.current = true;
      let start = null;
      const duration = 1500;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = end % 1 !== 0
          ? Math.round(ease * end * 10) / 10
          : Math.floor(ease * end);
        setCount(current);
        if (progress < 1) requestAnimationFrame(step);
        else setCount(end);
      };
      requestAnimationFrame(step);
    }, [countVisible, end]);
    return <span>{prefix}{count}{suffix}</span>;
  }

  const teamMembers = [
    {
      name: 'Rajiv Mehta',
      role: 'Co-Founder & CEO',
      bio: '20+ years in wealth management. Ex-MD at a leading NBFC. Passionate about democratizing finance.',
      avatar: '👨‍💼',
    },
    {
      name: 'Priya Sharma',
      role: 'Co-Founder & COO',
      bio: 'Former CFP with 15 years of experience building partner distribution networks across India.',
      avatar: '👩‍💼',
    },
    {
      name: 'Arjun Nair',
      role: 'Chief Technology Officer',
      bio: 'Built fintech platforms serving 1M+ users. Ex-Zerodha, passionate about elegant engineering.',
      avatar: '👨‍💻',
    },
    {
      name: 'Sneha Kapoor',
      role: 'Chief Business Officer',
      bio: 'Scaled partner ecosystems across 300+ cities. Expert in distribution strategy and partner success.',
      avatar: '👩‍🏢',
    }
  ];

  const values = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Trust First',
      desc: "Every product recommendation is made with your client's best interest at heart. No hidden motives, no conflicts of interest."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Partner Empowerment',
      desc: "We believe advisors should own their client relationships. Our platform amplifies your reach without replacing your role."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
      ),
      title: 'Inclusive Access',
      desc: "Premium financial products shouldn't be limited to the ultra-wealthy. We make them accessible across every city in India."
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation Always',
      desc: 'Continuously evolving our technology to make complex financial workflows simple, fast, and intuitive for every partner.'
    }
  ];

  const milestones = [
    { year: '2019', title: 'Founded', desc: "PROSPERi5 was founded with a vision to democratize financial product distribution in India." },
    { year: '2020', title: 'First 1,000 Partners', desc: "Onboarded our first thousand partners across Maharashtra, Gujarat and Karnataka." },
    { year: '2021', title: 'Series A Funding', desc: "Raised ₹50 Cr Series A to accelerate technology and expand our product suite." },
    { year: '2022', title: '100+ Cities', desc: "Extended our reach to 100+ cities with dedicated regional partner success teams." },
    { year: '2023', title: '₹1,000 Cr AUM', desc: "Crossed ₹1,000 Crore AUM on platform — a major milestone for our partner community." },
    { year: '2024', title: '50K Partners & Growing', desc: "50,000 active partners trust PROSPERi5 as their primary wealth management platform." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-body-text antialiased selection:bg-purple-100 selection:text-primary-purple overflow-x-hidden">

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
              <span className="font-medium text-[#EBE8EF]/80 text-xs">About Us · Building Wealth Together</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Secure · Transparent · Reliable
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setSelectedModal(true)}
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
          <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#1E1B2E]">
            <button onClick={onNavigateHome} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Home</button>
            <button onClick={() => onNavigatePage && onNavigatePage('about')} className="text-[#7C1FA8] font-bold cursor-pointer">About Us</button>
            <button onClick={() => onNavigatePage && onNavigatePage('investment')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Investment</button>
            <button onClick={() => onNavigatePage && onNavigatePage('insurance')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Insurance</button>
            <button onClick={() => onNavigatePage && onNavigatePage('financing')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Financing</button>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedModal(true)}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer"
            >
              Start Investing
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-[#FAF5FD] border border-purple-100 text-[#7C1FA8] flex items-center justify-center cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
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
              { num: '02', label: 'About Us', action: () => setMobileMenuOpen(false), active: true },
              { num: '03', label: 'Investors', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investors'); } },
              { num: '04', label: 'Investment', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investment'); } },
              { num: '05', label: 'Insurance', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('insurance'); } },
              { num: '06', label: 'Financing', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('financing'); } },
            ].map((item) => (
              <button key={item.num} onClick={item.action}
                className={`w-full h-[58px] rounded-[16px] border px-5 flex items-center gap-4 shadow-sm transition-all duration-200 cursor-pointer text-left ${item.active ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white hover:border-[#7C1FA8]'}`}>
                <span className={`font-extrabold text-sm ${item.active ? 'text-[#F5A623]' : 'text-[#7C1FAB]'}`}>{item.num}</span>
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HERO SECTION – Full-width, no bottom clipping */}
      <section className="w-full overflow-hidden">
        <img
          src="/ChatGPT Image Aug 25, 2026, 02_18_28 PM.png"
          alt="About PROSPERi5 - Empowering Partners, Enriching Futures"
          className="w-full h-auto block"
        />
      </section>

      {/* OUR VALUES – Light theme with reduced padding & growing purple hover effect */}
      <section id="our-values" className="w-full bg-[#FAF7FD] py-6 lg:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <p className="text-[#7C1FA8] font-bold text-xs tracking-[0.2em] uppercase mb-2">OUR VALUES</p>
          <h2 className="font-sans font-bold text-2xl lg:text-3xl text-[#1E1B2E] leading-tight tracking-tight">
            The principles that drive everything we do
          </h2>
        </div>

        {/* 5 Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {[
            {
              icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              ),
              title: 'Customer First',
              desc: 'Our partners and their clients are at the heart of everything we do.'
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
              ),
              title: 'Transparency',
              desc: 'We believe in honest, clear and open communication.'
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
                </svg>
              ),
              title: 'Simplicity',
              desc: 'We make complex finance simple, intuitive and easy to understand.'
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.39 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              ),
              title: 'Trust & Security',
              desc: 'We protect your data and ensure the highest standards of security.'
            },
            {
              icon: (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ),
              title: 'Integrity',
              desc: "We do what's right, always—with ethics and responsibility."
            }
          ].map((val, i) => (
            <div
              key={i}
              className="bg-white border border-[#EBE3F5] rounded-3xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:bg-[#7C1FA8] hover:border-[#7C1FA8] hover:-translate-y-2 hover:shadow-[0_14px_40px_rgba(124,31,168,0.35)] cursor-default group"
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-[#2E0B54] text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-white group-hover:text-[#7C1FA8] group-hover:scale-110 transition-all duration-300">
                {val.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#1E1B2E] group-hover:text-white text-base mb-1.5 leading-tight transition-colors duration-300">{val.title}</h3>
                <p className="text-[#544F66] group-hover:text-white/90 text-xs sm:text-sm font-medium leading-relaxed transition-colors duration-300">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY WE EXIST SECTION – White background with gap above */}
      <section className="w-full bg-white py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-xl border border-purple-900/10">
          <img
            src="/ChatGPT Image Aug 25, 2026, 12_50_04 PM.png"
            alt="Why We Exist - Empowering partners to create financial well-being for all"
            className="w-full block h-auto object-cover object-center max-h-[420px]"
          />
        </div>
      </section>

      {/* RECOGNITIONS & TRUST SECTION */}
      <section className="w-full bg-[#18082D] py-5 lg:py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <p className="text-[#9B71DF] font-bold text-xs tracking-[0.2em] uppercase mb-1">RECOGNITIONS & TRUST</p>
            <h2 className="font-sans font-bold text-2xl lg:text-3xl text-white leading-tight tracking-tight">
              Recognized by industry leaders
            </h2>
          </div>

          {/* 4 Compact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                type: 'amfi',
                title: 'AMFI Registered Mutual Fund Distributor',
                sub: 'Certified & Compliant'
              },
              {
                type: 'top',
                title: 'Top Performing Platform',
                sub: 'By Leading Partners'
              },
              {
                type: 'support',
                title: 'Excellence in Partner Support',
                sub: 'Award 2023'
              },
              {
                type: 'trusted',
                title: 'Trusted by 50K+ Partners',
                sub: 'Across India'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#2A084B] border border-[#481678]/50 rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center shadow-lg hover:bg-[#7C1FA8] hover:border-[#7C1FA8] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(124,31,168,0.5)] transition-all duration-300 group cursor-pointer min-h-[220px] justify-between"
              >
                <div className="mb-1.5 transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  <svg className="w-20 h-20" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Left Wreath Branch */}
                    <g className="fill-white group-hover:fill-white transition-colors duration-300">
                      <path d="M 45 96 C 30 85 23 66 23 48 C 23 36 28 24 38 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" className="text-white group-hover:text-white transition-colors duration-300" />
                      <path d="M37 20 C30 22 25 18 23 13 C26 18 33 19 37 20Z" />
                      <path d="M30 32 C23 33 17 28 16 23 C19 28 26 30 30 32Z" />
                      <path d="M26 46 C19 46 14 40 14 34 C17 39 23 42 26 46Z" />
                      <path d="M26 60 C19 61 14 56 14 50 C17 54 23 57 26 60Z" />
                      <path d="M29 74 C23 76 18 72 18 66 C20 70 26 73 29 74Z" />
                      <path d="M36 86 C30 89 25 86 24 80 C27 83 33 85 36 86Z" />
                      <path d="M40 28 C36 24 38 18 42 14 C42 19 40 24 40 28Z" />
                      <path d="M35 40 C31 36 33 30 37 26 C37 31 35 36 35 40Z" />
                      <path d="M33 54 C29 50 31 44 35 40 C35 45 33 50 33 54Z" />
                      <path d="M34 68 C30 64 32 58 36 54 C36 59 34 64 34 68Z" />
                      <path d="M39 80 C35 76 37 70 41 66 C41 71 39 76 39 80Z" />
                    </g>
                    {/* Right Wreath Branch */}
                    <g className="fill-white group-hover:fill-white transition-colors duration-300">
                      <path d="M 75 96 C 90 85 97 66 97 48 C 97 36 92 24 82 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" className="text-white group-hover:text-white transition-colors duration-300" />
                      <path d="M83 20 C90 22 95 18 97 13 C94 18 87 19 83 20Z" />
                      <path d="M90 32 C97 33 103 28 104 23 C101 28 94 30 90 32Z" />
                      <path d="M94 46 C101 46 106 40 106 34 C103 39 97 42 94 46Z" />
                      <path d="M94 60 C101 61 106 56 106 50 C103 54 97 57 94 60Z" />
                      <path d="M91 74 C97 76 102 72 102 66 C100 70 94 73 91 74Z" />
                      <path d="M84 86 C90 89 95 86 96 80 C93 83 87 85 84 86Z" />
                      <path d="M80 28 C84 24 82 18 78 14 C78 19 80 24 80 28Z" />
                      <path d="M85 40 C89 36 87 30 83 26 C83 31 85 36 85 40Z" />
                      <path d="M87 54 C91 50 89 44 85 40 C85 45 87 50 87 54Z" />
                      <path d="M86 68 C90 64 88 58 84 54 C84 59 86 64 86 68Z" />
                      <path d="M81 80 C85 76 83 70 79 66 C79 71 81 76 81 80Z" />
                    </g>
                    {/* Central Shield */}
                    <path className="fill-[#7C1FA8] group-hover:fill-[#F5A623] transition-colors duration-300" d="M60 22 C73 22 81 16 81 16 V48 C81 65 71 77 60 83 C49 77 39 65 39 48 V16 C39 16 47 22 60 22 Z" />
                    {/* Shield Content */}
                    {item.type === 'amfi' && (
                      <g className="fill-white group-hover:fill-[#18082D] transition-colors duration-300">
                        <polygon className="fill-[#F5A623] group-hover:fill-white" points="60,28 61.3,31 64.5,31.3 62,33.5 62.7,36.5 60,34.8 57.3,36.5 58,33.5 55.5,31.3 58.7,31" />
                        <circle cx="60" cy="44" r="4" />
                        <path d="M52 58c0-4.5 3.6-8 8-8s8 3.5 8 8v1H52v-1z" />
                        <circle cx="51" cy="47" r="2.8" />
                        <path d="M45 58c0-3.5 2.7-6 6-6s2.5 1 3.5 2.5C53.3 56 52 57 52 58h-7z" opacity="0.85" />
                        <circle cx="69" cy="47" r="2.8" />
                        <path d="M75 58c0-3.5-2.7-6-6-6s-2.5 1-3.5 2.5C66.7 56 68 57 68 58h7z" opacity="0.85" />
                      </g>
                    )}
                    {item.type === 'top' && (
                      <g className="fill-white group-hover:fill-[#18082D] transition-colors duration-300">
                        <rect x="49" y="52" width="5" height="11" rx="1.5" />
                        <rect x="57.5" y="44" width="5" height="19" rx="1.5" />
                        <rect x="66" y="38" width="5" height="25" rx="1.5" />
                        <path className="stroke-white group-hover:stroke-[#18082D] transition-colors duration-300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M49 46l7-6 6 4 9-9" />
                        <polygon points="71,35 73,40 68,39" className="fill-white group-hover:fill-[#18082D]" />
                      </g>
                    )}
                    {item.type === 'support' && (
                      <g className="fill-white group-hover:fill-[#18082D] transition-colors duration-300">
                        <circle cx="60" cy="42" r="4.5" />
                        <path d="M51 57c0-5 4-9 9-9s9 4 9 9v1H51v-1z" />
                        <circle cx="49" cy="45" r="2.8" />
                        <path d="M43 57c0-3.5 2.7-6 6-6s2.5 1 3.5 2.5C51.3 55 50 56 50 57h-7z" opacity="0.85" />
                        <circle cx="71" cy="45" r="2.8" />
                        <path d="M77 57c0-3.5-2.7-6-6-6s-2.5 1-3.5 2.5C68.7 55 70 56 70 57h7z" opacity="0.85" />
                      </g>
                    )}
                    {item.type === 'trusted' && (
                      <g className="fill-white group-hover:fill-[#18082D] transition-colors duration-300">
                        <circle cx="60" cy="43" r="7" />
                        <path d="M48 63c0-6.5 5.4-11.5 12-11.5s12 5 12 11.5v1H48v-1z" />
                      </g>
                    )}
                  </svg>
                </div>
                <h3 className="font-bold text-white group-hover:text-[#F5A623] text-base sm:text-[17px] leading-snug my-auto max-w-[210px] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#C4A8E8] group-hover:text-white text-xs sm:text-[13px] font-bold pt-1 transition-colors duration-300">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-6 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <span className="inline-block bg-[#F3EAFB] text-[#7C1FA8] font-extrabold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-3">
            THE PEOPLE BEHIND IT
          </span>
          <h2 className="font-sans font-bold text-2xl lg:text-3xl text-[#1E1B2E] leading-tight tracking-tight">Meet Our Leadership</h2>
          <p className="text-[#544F66] font-medium mt-2 max-w-lg mx-auto text-sm">
            A team of seasoned finance professionals and technology innovators united by one mission.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div key={i} className="bg-white border border-[#EBE8EF] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#7C1FA8]/40 transition-all text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F3EAFB] to-[#E9D5F8] flex items-center justify-center text-4xl mx-auto mb-4 border-2 border-[#7C1FA8]/20">
                {member.avatar}
              </div>
              <h3 className="font-bold text-[#1E1B2E] text-base">{member.name}</h3>
              <p className="text-[#7C1FA8] font-semibold text-xs mt-1 mb-3">{member.role}</p>
              <p className="text-[#544F66] text-xs font-medium leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>



      {/* FOOTER */}
      <Footer onNavigatePage={onNavigatePage} onNavigateAbout={() => {}} />

      {/* MODAL */}
      {selectedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setSelectedModal(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-[#1E1B2E]">Talk to an Expert</h2>
              <button onClick={() => setSelectedModal(null)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[#544F66] font-medium mb-6">Our team of financial experts is ready to help you get started on PROSPERi5.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Your full name" className="w-full border border-[#EBE8EF] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C1FA8] transition-colors" />
              <input type="tel" placeholder="Your phone number" className="w-full border border-[#EBE8EF] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C1FA8] transition-colors" />
              <button
                onClick={() => setSelectedModal(null)}
                className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                Request a Callback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
