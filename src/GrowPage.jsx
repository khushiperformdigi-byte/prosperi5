import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Testimonials from './Testimonials';

export default function GrowPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Wealth Calculator State
  const [monthlyInv, setMonthlyInv] = useState(10000); // ₹10,000/mo default
  const [expectedReturn, setExpectedReturn] = useState(12); // 12% p.a. default
  const [tenureYears, setTenureYears] = useState(15); // 15 Years default

  // Modal State
  const [selectedModal, setSelectedModal] = useState(false);
  const [modalOption, setModalOption] = useState({ title: '', subtitle: '' });
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', investmentType: 'SIP Wealth Builder', amount: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // SIP Compound Interest Calculation: FV = P * [ (1+r)^n - 1 ] / r * (1+r)
  const calculateSIPGrowth = () => {
    const P = monthlyInv;
    const r = expectedReturn / 12 / 100;
    const n = tenureYears * 12;

    if (P <= 0 || r <= 0 || n <= 0) return { futureValue: 0, totalInvested: 0, totalGains: 0, gainPercent: 0 };

    const futureValue = Math.round(P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const totalInvested = P * n;
    const totalGains = Math.max(0, futureValue - totalInvested);
    const gainPercent = Math.round((totalGains / totalInvested) * 100);

    return { futureValue, totalInvested, totalGains, gainPercent };
  };

  const { futureValue, totalInvested, totalGains, gainPercent } = calculateSIPGrowth();

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleOpenApplyModal = (title = 'Start Investing with Prosperi5', subtitle = 'Fill in your details below to consult with our wealth advisor within 15 minutes.') => {
    setModalOption({ title, subtitle });
    setFormData((prev) => ({ ...prev, amount: monthlyInv.toString() }));
    setFormSubmitted(false);
    setSelectedModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] font-body text-body-text antialiased selection:bg-purple-100 selection:text-primary-purple overflow-x-hidden">
      
      {/* 1. TOP CONTACT UTILITY BAR */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-[1500px] mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-white/70">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                ⚡
              </div>
              <span className="font-medium text-white/90 text-xs">Grow Your Wealth</span>
            </div>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="text-xs text-[#F5A623] font-semibold hidden md:inline-block">
              Expert Curated Portfolios & 100% Transparent Returns
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleOpenApplyModal('Talk to Wealth Expert', 'Get a personalized investment plan built for your financial goals.')}
              className="bg-[#F5A623] hover:bg-[#D49300] text-[#1E1B2E] font-bold px-4 py-1 rounded-full text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              Talk to Expert
            </button>
            <span className="text-white/20">|</span>
            <button onClick={onNavigateHome} className="text-white/80 hover:text-white transition-colors text-xs font-semibold">
              Home
            </button>
          </div>
        </div>
      </div>

      {/* 2. FLOATING NAVBAR */}
      <nav className="sticky top-0 lg:top-2 max-w-7xl mx-auto px-0 lg:px-4 relative font-sans transition-all z-50">
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-purple-200/60 shadow-sm h-[72px] lg:h-[56px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">
          
          {/* Top gradient border line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C1FA8] via-[#C81E8C] to-[#F5A623] rounded-t-full"></div>

          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={onNavigateHome}>
            <img 
              src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png" 
              className="w-[128px] h-[40px] lg:w-auto lg:h-[32px] object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
              alt="PROSPERi5 Logo" 
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-x-6 font-medium text-[#1E1B2E] text-sm px-6 flex-1">
            <button onClick={onNavigateHome} className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer">
              Home
            </button>
            <button onClick={() => onNavigatePage && onNavigatePage('about')} className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer">
              About Us
            </button>
            
            {/* SOLUTIONS DROPDOWN */}
            <div className="relative group py-1">
              <button className="whitespace-nowrap text-[#7C1FA8] hover:text-[#7C1FA8] transition-colors flex items-center gap-1 font-semibold cursor-pointer py-1">
                Solutions
                <svg className="w-3.5 h-3.5 text-[#7C1FA8] transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col bg-white/98 backdrop-blur-md border border-[#EBE8EF] rounded-[22px] p-3 shadow-xl w-[285px] space-y-1.5 z-[9999] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7C1FA8] via-[#C81E8C] to-[#F5A623]"></div>
                
                <button 
                  onClick={() => onNavigatePage && onNavigatePage('grow')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] bg-purple-50 border border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7C1FA8] text-white flex items-center justify-center font-bold text-base shrink-0">
                    🌱
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#7C1FA8] block">Grow</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">SIP, Mutual Funds & Wealth Growth</span>
                  </div>
                </button>

                <button 
                  onClick={() => onNavigatePage && onNavigatePage('borrow')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-50 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FA8] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 transition-all">
                    💸
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#7C1FA8] transition-colors block">Borrow</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Instant Loans, Business Credit & LAP</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Nav Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => handleOpenApplyModal('Start Wealth Journey', 'Begin your SIP & portfolio growth with expert guidance.')}
              className="bg-[#7C1FA8] hover:bg-[#63148B] text-white font-bold px-5 py-2 rounded-full text-xs transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Start Investing
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1E1B2E] hover:bg-purple-50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* 3. HERO SECTION (REDUCED HEIGHT FULL WIDTH BANNER) */}
      <section className="w-full bg-[#FAF8FC] border-b border-[#EBE8EF]/60 relative overflow-hidden">
        <div className="w-full relative max-w-[1920px] mx-auto">
          {/* Main Hero Banner Image with Compact Height */}
          <img 
            src="/ChatGPT Image Aug 26, 2026, 10_22_49 AM.png" 
            alt="Grow Your Wealth - Smart decisions. Stronger future."
            className="w-full h-auto max-h-[460px] sm:max-h-[500px] object-cover object-center block"
          />

          {/* Interactive Hotspots Over the Banner Buttons (Zero Hover Effect) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Start Investing Hotspot Button */}
            <a
              href="#start-investing"
              onClick={(e) => {
                e.preventDefault();
                handleOpenApplyModal('Start Investing Today', 'Access expert curated portfolios and start building wealth with Prosperi5.');
              }}
              title="Start Investing"
              aria-label="Start Investing"
              className="pointer-events-auto absolute left-[8%] sm:left-[8.5%] top-[65%] sm:top-[67%] w-[16%] sm:w-[15%] h-[12%] sm:h-[13%] rounded-2xl cursor-pointer focus:outline-none opacity-0"
            />

            {/* Explore Funds Hotspot Button */}
            <a
              href="#invest-solutions"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.getElementById('invest-solutions');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              title="Explore Funds"
              aria-label="Explore Funds"
              className="pointer-events-auto absolute left-[25%] sm:left-[25.5%] top-[65%] sm:top-[67%] w-[16%] sm:w-[15%] h-[12%] sm:h-[13%] rounded-2xl cursor-pointer focus:outline-none opacity-0"
            />
          </div>
        </div>
      </section>

      {/* 4. INVEST YOUR WAY. GROW EVERY DAY. SECTION (ZERO HOVER EFFECTS) */}
      <section id="invest-solutions" className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto select-none scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-7">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight">
            Invest your way. Grow every day.
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6B7B] mt-1.5 font-medium">
            Choose from a wide range of investment solutions designed for every kind of investor.
          </p>
        </div>

        {/* 2 Grid Lines Form (3 in 1st line, 3 in 2nd line) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Mutual Funds */}
          <div className="bg-white border border-[#EBE8EF] rounded-2xl p-5 shadow-2xs">
            <div className="bg-[#F7F3FC] rounded-xl overflow-hidden flex items-center justify-center h-44 mb-4 p-1">
              <img 
                src="/grow_card_mutual_funds.jpg" 
                alt="Mutual Funds 3D Growth"
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-[#1E1B2E] mb-1.5">Mutual Funds</h3>
            <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
              Invest in expertly managed funds across categories.
            </p>
          </div>

          {/* Card 2: SIP */}
          <div className="bg-white border border-[#EBE8EF] rounded-2xl p-5 shadow-2xs">
            <div className="bg-[#F7F3FC] rounded-xl overflow-hidden flex items-center justify-center h-44 mb-4 p-1">
              <img 
                src="/grow_card_sip.jpg" 
                alt="SIP 3D Calendar Growth"
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-[#1E1B2E] mb-1.5">SIP</h3>
            <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
              Build wealth steadily with Systematic Investment Plans.
            </p>
          </div>

          {/* Card 3: Index Funds */}
          <div className="bg-white border border-[#EBE8EF] rounded-2xl p-5 shadow-2xs">
            <div className="bg-[#F7F3FC] rounded-xl overflow-hidden flex items-center justify-center h-44 mb-4 p-1">
              <img 
                src="/grow_card_index_funds.jpg" 
                alt="Index Funds 3D Chart"
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-[#1E1B2E] mb-1.5">Index Funds</h3>
            <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
              Low cost. Diversified. Tracks the market.
            </p>
          </div>

          {/* Card 4: ELSS Funds */}
          <div className="bg-white border border-[#EBE8EF] rounded-2xl p-5 shadow-2xs">
            <div className="bg-[#F3EBFB] rounded-xl overflow-hidden flex items-center justify-center h-44 mb-4 p-2 relative">
              <div className="relative flex items-center justify-center">
                {/* 3D Glossy Rounded Purple Calculator Box */}
                <div className="w-22 h-22 rounded-[24px] bg-gradient-to-br from-[#7C1FA8] via-[#6A1B9A] to-[#4A148C] text-white flex flex-col items-center justify-center shadow-lg shadow-[#7C1FA8]/30 border border-white/20 relative">
                  <div className="w-14 h-4 bg-[#310A5C]/80 rounded-md border border-white/20 mb-2 flex items-center justify-end px-1.5 text-[9px] font-bold text-purple-200">
                    80C ₹
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 w-14">
                    <div className="h-1.5 rounded bg-white/40"></div>
                    <div className="h-1.5 rounded bg-white/40"></div>
                    <div className="h-1.5 rounded bg-white/40"></div>
                    <div className="h-1.5 rounded bg-white/40"></div>
                    <div className="h-1.5 rounded bg-white/40"></div>
                    <div className="h-1.5 rounded bg-[#F5A623]"></div>
                  </div>
                </div>
                {/* 3D Gold Rupee Coin Badge */}
                <div className="absolute -bottom-1 -right-2 bg-gradient-to-br from-[#FFD700] via-[#F5A623] to-[#D48806] text-white font-extrabold text-xs w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 border-white shadow-md shadow-[#F5A623]/40">
                  ₹
                </div>
              </div>
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-[#1E1B2E] mb-1.5">ELSS Funds</h3>
            <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
              Save tax up to ₹46,800 u/s 80C while growing wealth.
            </p>
          </div>

          {/* Card 5: Thematic Funds */}
          <div className="bg-white border border-[#EBE8EF] rounded-2xl p-5 shadow-2xs">
            <div className="bg-[#F3EBFB] rounded-xl overflow-hidden flex items-center justify-center h-44 mb-4 p-2 relative">
              <div className="relative flex items-center justify-center">
                {/* 3D Glossy Globe Sphere */}
                <div className="w-22 h-22 rounded-full bg-gradient-to-br from-[#7C1FA8] via-[#6A1B9A] to-[#4A148C] text-white flex items-center justify-center shadow-lg shadow-[#7C1FA8]/30 border border-white/20 relative">
                  <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                {/* 3D Gold Rupee Coin Badge */}
                <div className="absolute -bottom-1 -right-2 bg-gradient-to-br from-[#FFD700] via-[#F5A623] to-[#D48806] text-white font-extrabold text-xs w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 border-white shadow-md shadow-[#F5A623]/40">
                  ₹
                </div>
              </div>
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-[#1E1B2E] mb-1.5">Thematic Funds</h3>
            <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
              Invest in future-ready sectors and trends.
            </p>
          </div>

          {/* Card 6: Debt Funds */}
          <div className="bg-white border border-[#EBE8EF] rounded-2xl p-5 shadow-2xs">
            <div className="bg-[#F3EBFB] rounded-xl overflow-hidden flex items-center justify-center h-44 mb-4 p-2 relative">
              <div className="relative flex items-center justify-center">
                {/* 3D Glossy Rounded Shield Box */}
                <div className="w-22 h-22 rounded-[24px] bg-gradient-to-br from-[#7C1FA8] via-[#6A1B9A] to-[#4A148C] text-white flex items-center justify-center shadow-lg shadow-[#7C1FA8]/30 border border-white/20 relative">
                  <svg className="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                {/* 3D Gold Rupee Coin Badge */}
                <div className="absolute -bottom-1 -right-2 bg-gradient-to-br from-[#FFD700] via-[#F5A623] to-[#D48806] text-white font-extrabold text-xs w-7.5 h-7.5 rounded-full flex items-center justify-center border-2 border-white shadow-md shadow-[#F5A623]/40">
                  ₹
                </div>
              </div>
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-[#1E1B2E] mb-1.5">Debt Funds</h3>
            <p className="text-xs sm:text-[13.5px] text-[#6E6B7B] leading-relaxed font-medium">
              Earn stable returns with lower risk investments.
            </p>
          </div>

        </div>
      </section>

      {/* 4.5 WHY INVEST WITH PROSPERI5? SECTION (ENHANCED TEXT SIZE & HEIGHT) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans select-none">
        
        {/* Top Header & 5 Benefit Badges Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Left Title Block (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h2 className="text-2xl sm:text-[32px] font-extrabold text-[#1E1B2E] leading-tight tracking-tight">
              Why invest with Prosperi5?
            </h2>
            <p className="text-sm sm:text-[15px] text-[#6E6B7B] font-medium max-w-xs leading-relaxed">
              Everything you need for a better investment experience.
            </p>
          </div>

          {/* Right 5 Benefit Badges (8 cols, 5-col grid on md/lg) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            
            {/* 1. Expert Curated Funds */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center mb-3 shadow-2xs transition-transform hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-[13px] sm:text-sm text-[#1E1B2E] mb-1 leading-snug">Expert Curated Funds</h4>
              <p className="text-[11.5px] sm:text-xs text-[#6E6B7B] leading-relaxed font-medium">Handpicked by research experts.</p>
            </div>

            {/* 2. Low Cost Investing */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center mb-3 shadow-2xs transition-transform hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-[13px] sm:text-sm text-[#1E1B2E] mb-1 leading-snug">Low Cost Investing</h4>
              <p className="text-[11.5px] sm:text-xs text-[#6E6B7B] leading-relaxed font-medium">Competitive expense ratios for higher returns.</p>
            </div>

            {/* 3. Transparent & Secure */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center mb-3 shadow-2xs transition-transform hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold text-[13px] sm:text-sm text-[#1E1B2E] mb-1 leading-snug">Transparent & Secure</h4>
              <p className="text-[11.5px] sm:text-xs text-[#6E6B7B] leading-relaxed font-medium">Your investments are safe with us.</p>
            </div>

            {/* 4. Goal Based Approach */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center mb-3 shadow-2xs transition-transform hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-[13px] sm:text-sm text-[#1E1B2E] mb-1 leading-snug">Goal Based Approach</h4>
              <p className="text-[11.5px] sm:text-xs text-[#6E6B7B] leading-relaxed font-medium">Invest with purpose and clarity.</p>
            </div>

            {/* 5. Easy & Convenient */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center mb-3 shadow-2xs transition-transform hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-[13px] sm:text-sm text-[#1E1B2E] mb-1 leading-snug">Easy & Convenient</h4>
              <p className="text-[11.5px] sm:text-xs text-[#6E6B7B] leading-relaxed font-medium">Invest, track & manage all in one place.</p>
            </div>

          </div>
        </div>

        {/* Bottom 2 Grid Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Card: Market Snapshot (Color #7C1FA8 with Uncut Glowing Graph Line) */}
          <div className="lg:col-span-6 bg-[#7C1FA8] bg-gradient-to-br from-[#7C1FA8] via-[#65178B] to-[#4A0B66] text-white rounded-3xl p-6 sm:p-7 border border-[#9D2BB8]/40 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
            
            {/* Ambient Background Glow Circles */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12"></div>
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-black/20 rounded-full blur-3xl pointer-events-none -ml-12 -mb-12"></div>

            <div className="relative z-10">
              <span className="text-purple-200 text-[11px] font-bold uppercase tracking-wider block mb-1">
                Market Snapshot
              </span>
              
              <div className="flex justify-between items-baseline mb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Nifty 50</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-white">24,854.60</span>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      ▲ 162.45 (0.66%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Trajectory Stock Chart (Exact Match to Screenshot 2 Multi-Curve Market Line) */}
              <div className="w-full h-36 my-2 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="purpleCardGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Fill Area underneath graph */}
                  <path
                    d="M 10,105 
                       C 25,90 35,80 50,72 
                       C 65,65 75,76 90,74 
                       C 105,72 120,58 140,55 
                       C 160,52 170,62 185,60 
                       C 200,58 215,35 230,28 
                       C 245,22 255,38 270,40 
                       C 285,42 300,25 320,18 
                       C 340,12 355,22 370,18 
                       C 380,15 388,10 392,8 
                       L 392,120 L 10,120 Z"
                    fill="url(#purpleCardGrad)"
                  />
                  {/* Realistic Multi-Curve Market Trajectory Line */}
                  <path
                    d="M 10,105 
                       C 25,90 35,80 50,72 
                       C 65,65 75,76 90,74 
                       C 105,72 120,58 140,55 
                       C 160,52 170,62 185,60 
                       C 200,58 215,35 230,28 
                       C 245,22 255,38 270,40 
                       C 285,42 300,25 320,18 
                       C 340,12 355,22 370,18 
                       C 380,15 388,10 392,8"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Start Dot (Bottom-Left) */}
                  <circle cx="10" cy="105" r="4" fill="#FFFFFF" />

                  {/* End Dot (Top-Right Peak) */}
                  <circle cx="392" cy="8" r="5" fill="#FFFFFF" className="shadow-md" />
                </svg>
              </div>

              {/* Time Period Filter Tabs */}
              <div className="bg-black/20 border border-white/20 rounded-xl p-1.5 flex items-center justify-between text-xs mt-3 backdrop-blur-xs">
                <button className="bg-white text-[#7C1FA8] font-black px-3 py-1 rounded-lg text-[11px] shadow-xs">
                  1D <span className="text-[10px] text-emerald-700 font-bold">+0.66%</span>
                </button>
                <button className="text-purple-100 hover:text-white font-semibold px-2 py-1 text-[11px]">
                  1M <span className="text-[10px] text-purple-200 font-normal">+2.25%</span>
                </button>
                <button className="text-purple-100 hover:text-white font-semibold px-2 py-1 text-[11px]">
                  1Y <span className="text-[10px] text-purple-200 font-normal">+18.62%</span>
                </button>
                <button className="text-purple-100 hover:text-white font-semibold px-2 py-1 text-[11px]">
                  3Y <span className="text-[10px] text-purple-200 font-normal">+24.18%</span>
                </button>
                <button className="text-purple-100 hover:text-white font-semibold px-2 py-1 text-[11px]">
                  5Y <span className="text-[10px] text-purple-200 font-normal">+56.32%</span>
                </button>
              </div>
            </div>

            <p className="text-[10px] text-purple-200 font-medium pt-1 relative z-10">
              Source: NSE India | As on 24 May 2024
            </p>
          </div>

          {/* Right Card: Prosperi5 by the numbers (With User Uploaded Background Image) */}
          <div 
            className="lg:col-span-6 border border-[#EBE8EF] rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: 'url("/ChatGPT Image Aug 12, 2026, 09_15_25 PM.png")' }}
          >
            {/* Soft backdrop overlay for readability */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-semibold text-[#1E1B2E] mb-1">
                Prosperi5 by the numbers
              </h3>
              <p className="text-sm sm:text-[15.5px] text-[#4A4754] font-semibold leading-relaxed mb-5">
                Empowering over a million investors with transparent growth, institutional-grade security, and proven market returns.
              </p>
            </div>

            {/* 2x2 Metric Grid */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              
              {/* Metric 1: Assets on Platform */}
              <div className="bg-[#FAF7FD] border border-[#F0E6F7] rounded-2xl p-4.5 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center shrink-0">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-base sm:text-lg font-extrabold text-[#7C1FA8] block leading-tight">₹10,000 Cr+</span>
                  <span className="text-xs text-[#6E6B7B] font-medium">Assets on Platform</span>
                </div>
              </div>

              {/* Metric 2: Happy Investors */}
              <div className="bg-[#FAF7FD] border border-[#F0E6F7] rounded-2xl p-4.5 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center shrink-0">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-base sm:text-lg font-extrabold text-[#7C1FA8] block leading-tight">1M+</span>
                  <span className="text-xs text-[#6E6B7B] font-medium">Happy Investors</span>
                </div>
              </div>

              {/* Metric 3: Average Rating */}
              <div className="bg-[#FAF7FD] border border-[#F0E6F7] rounded-2xl p-4.5 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center shrink-0">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <span className="text-base sm:text-lg font-extrabold text-[#7C1FA8] block leading-tight">4.8 ★</span>
                  <span className="text-xs text-[#6E6B7B] font-medium">Average Rating</span>
                </div>
              </div>

              {/* Metric 4: Uptime & Security */}
              <div className="bg-[#FAF7FD] border border-[#F0E6F7] rounded-2xl p-4.5 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#F3E8FF] text-[#7C1FA8] flex items-center justify-center shrink-0">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <span className="text-base sm:text-lg font-extrabold text-[#7C1FA8] block leading-tight">99.9%</span>
                  <span className="text-xs text-[#6E6B7B] font-medium">Uptime & Security</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <Testimonials />

      {/* 7.5 READY TO GROW YOUR WEALTH CTA BANNER (PLACED AFTER TESTIMONIALS WITH SEMI-BOLD TEXT) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-10 font-sans select-none">
        <div className="bg-[#1A0826] bg-gradient-to-r from-[#280A3D] via-[#1C072A] to-[#11031C] rounded-2xl py-4 sm:py-5 px-6 sm:px-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-900/40 relative overflow-hidden">
          
          {/* Left Graphic + Title Block */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* 3D Growth Graphic Box */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#2C0A45] p-1 flex items-center justify-center border border-purple-400/30 shadow-lg shrink-0">
              <img 
                src="/grow_card_index_funds.jpg" 
                alt="3D Growth Chart" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1">
                Ready to grow your wealth?
              </h3>
              <p className="text-xs sm:text-sm text-purple-200 font-semibold">
                Join 1M+ investors and start your investment journey today.
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={() => handleOpenApplyModal("Start Investing", "Begin your wealth creation journey with Prosperi5.")}
              className="bg-white text-[#7C1FA8] hover:bg-purple-50 font-bold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Start Investing
            </button>
            
            <button
              onClick={() => handleOpenApplyModal("Talk to Expert", "Schedule a 1-on-1 session with our certified financial planner.")}
              className="bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-white/40 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Talk to Expert
            </button>
          </div>

        </div>
      </section>

      {/* 8. WEALTH INQUIRY MODAL */}
      {selectedModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white bg-cover bg-center rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 overflow-hidden border border-purple-100/80"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <button
                onClick={() => setSelectedModal(false)}
                className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gray-100/90 text-gray-500 hover:bg-gray-200 flex items-center justify-center cursor-pointer font-bold transition-colors z-20"
              >
                ✕
              </button>

              {!formSubmitted ? (
                <>
                  <h3 className="text-2xl font-extrabold text-[#1E1B2E] mb-1">
                    {modalOption.title || 'Start Wealth Growth'}
                  </h3>
                  <p className="text-sm text-[#6E6B7B] mb-5 font-medium">
                    {modalOption.subtitle || 'Fill in your details below and our wealth advisor will reach out within 15 minutes.'}
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
                    <div>
                      <label className="block font-extrabold text-[#1E1B2E] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/95 border border-gray-200/90 rounded-xl py-3 px-4 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block font-extrabold text-[#1E1B2E] mb-1.5">Mobile Number</label>
                      <div className="flex items-center bg-white/95 border border-gray-200/90 rounded-xl overflow-hidden focus-within:border-[#7C1FA8] focus-within:ring-1 focus-within:ring-[#7C1FA8] transition-all shadow-2xs">
                        <select className="bg-transparent pl-3 pr-1 py-3 text-xs sm:text-sm font-bold text-[#1E1B2E] outline-none border-r border-gray-200/90 cursor-pointer">
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+1">🇨🇦 +1</option>
                        </select>
                        <input
                          type="tel"
                          required
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-transparent py-3 px-3 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-extrabold text-[#1E1B2E] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/95 border border-gray-200/90 rounded-xl py-3 px-4 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block font-extrabold text-[#1E1B2E] mb-1.5">Target Monthly Investment</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹10,000 / month"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full bg-white/95 border border-gray-200/90 rounded-xl py-3 px-4 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#7C1FA8] hover:bg-[#63148B] text-white font-extrabold rounded-xl text-sm sm:text-base uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer mt-2 flex items-center justify-center gap-2"
                    >
                      <span>Submit Wealth Request</span>
                      <span>➔</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mx-auto font-bold">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-[#1E1B2E]">Application Received!</h4>
                  <p className="text-xs text-[#6E6B7B] leading-relaxed">
                    Thank you <span className="font-bold text-[#1E1B2E]">{formData.name}</span>. Your wealth advisor will call you shortly at <span className="font-bold text-[#1E1B2E]">{formData.phone}</span>.
                  </p>
                  <button
                    onClick={() => setSelectedModal(false)}
                    className="w-full py-3 bg-[#7C1FA8] text-white font-bold rounded-xl text-xs"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 9. FOOTER INTEGRATION */}
      <Footer onNavigateHome={onNavigateHome} onNavigatePage={onNavigatePage} />

    </div>
  );
}
