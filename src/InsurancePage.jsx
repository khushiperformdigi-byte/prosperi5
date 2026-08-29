import React, { useState, useEffect } from 'react';
import Footer from './Footer';

// Helper component for animated Protection Score gauge & counter
function AnimatedProtectionScore({ onOpenModal }) {
  const [score, setScore] = useState(0);
  const [strokeVal, setStrokeVal] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1800; // 1.8 seconds smooth animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth acceleration & deceleration (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentScore = Math.round(easeProgress * 85);
      const currentStroke = easeProgress * 85;

      setScore(currentScore);
      setStrokeVal(currentStroke);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  return (
    <div className="absolute bottom-0 right-0 sm:right-2 bg-white/95 backdrop-blur-md rounded-[20px] p-3.5 sm:p-4 border border-purple-100 shadow-xl flex items-center gap-4 max-w-[340px] sm:max-w-[370px] z-20 select-none">
      {/* Score Gauge Circle */}
      <div className="flex flex-col items-center shrink-0">
        <span className="text-[10px] font-extrabold text-[#544F66] uppercase tracking-wider mb-1 block text-left w-full">
          Your Protection Score
        </span>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-purple-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#7C1FA8] transition-all duration-75 ease-out"
              strokeDasharray={`${strokeVal}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-extrabold text-sm sm:text-base text-[#1E1B2E] leading-none">{score}%</span>
            <span className="text-[9px] font-bold text-[#666077] leading-none mt-0.5">Excellent</span>
          </div>
        </div>
      </div>

      <div className="w-[1px] bg-purple-100 self-stretch my-1"></div>

      {/* Score Copy & Link */}
      <div className="flex flex-col text-left">
        <h4 className="font-extrabold text-xs sm:text-sm text-[#1E1B2E] mb-0.5">You're well protected!</h4>
        <p className="text-[11px] text-[#666077] font-medium leading-tight mb-2">
          Review your policies and increase your coverage.
        </p>
        <button
          onClick={() => onOpenModal({ title: 'Your Coverage Details' })}
          className="text-[#7C1FA8] font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer w-fit"
        >
          <span>View My Coverage</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default function InsurancePage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [coverageAmount, setCoverageAmount] = useState(1000000);
  const [memberAge, setMemberAge] = useState(30);
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState(false);

  const calculateEstimate = () => {
    const base = coverageAmount / 10000;
    const ageMultiplier = memberAge > 40 ? 1.5 : memberAge > 50 ? 2.2 : 1.0;
    const monthly = Math.round(base * ageMultiplier * 1.2);
    return monthly;
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const insurancePlans = [
    {
      id: 'life',
      title: 'Term Life Insurance',
      subtitle: "Secure your family's future with complete protection.",
      image: '/card_umbrella_clean.png',
      bgGradient: 'bg-[#F4EDFC]',
      cardBorder: 'border-[#E8DAF5]',
      iconColor: 'text-[#7C1FAB]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'health',
      title: 'Health Insurance',
      subtitle: 'Quality healthcare for you & your family.',
      image: '/card_heart_clean.png',
      bgGradient: 'bg-[#FDF0F6]',
      cardBorder: 'border-[#FAD6E7]',
      iconColor: 'text-[#C81E8C]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'car',
      title: 'Car Insurance',
      subtitle: 'Complete protection for your vehicle.',
      image: '/card_car_orange.png',
      bgGradient: 'bg-[#FFF6ED]',
      cardBorder: 'border-[#FFE3CD]',
      iconColor: 'text-[#EA580C]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1m-6 0a1 1 0 102 0m-2 0a1 1 0 112 0m6 0a1 1 0 102 0m-2 0a1 1 0 112 0" />
        </svg>
      )
    },
    {
      id: 'home',
      title: 'Home Insurance',
      subtitle: 'Protect your home and peace of mind.',
      image: '/card_home_clean.png',
      bgGradient: 'bg-[#F1F9F4]',
      cardBorder: 'border-[#D5ECE0]',
      iconColor: 'text-[#16A34A]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'travel',
      title: 'Travel Insurance',
      subtitle: 'Worry-free travel across the world.',
      image: '/card_plane_clean.png',
      bgGradient: 'bg-[#F0F7FF]',
      cardBorder: 'border-[#D3E6FE]',
      iconColor: 'text-[#0284C7]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      id: 'child',
      title: 'Child Insurance',
      subtitle: "Secure your child's bright future with the right plan.",
      image: '/card_teddy_clean.png',
      bgGradient: 'bg-[#FDF2F8]',
      cardBorder: 'border-[#FCD7EC]',
      iconColor: 'text-[#D946EF]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-body-text antialiased selection:bg-purple-100 selection:text-primary-purple overflow-x-hidden">
      
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
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Insurance Protection · Health, Life & Wealth Safety</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Secure · Transparent · Reliable
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setSelectedPlanModal({ title: 'Talk to Advisor' })}
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
      <nav className="sticky top-0 lg:top-2 max-w-7xl mx-auto px-0 lg:px-4 relative font-sans transition-all z-50">
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-[#EBE3F5] shadow-sm lg:shadow-[0_12px_40px_rgba(30,27,46,0.06)] h-[72px] lg:h-[56px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">
          {/* Brand Logo */}
          <div className="flex items-center gap-6 cursor-pointer" onClick={onNavigateHome}>
            <img src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png" className="w-[128px] lg:w-[140px] h-[40px] lg:h-[44px] object-contain" alt="PROSPERi5 Logo" />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#1E1B2E]">
            <button onClick={onNavigateHome} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Home</button>
            <button onClick={() => onNavigatePage && onNavigatePage('about')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">About Us</button>
            <button onClick={() => onNavigatePage && onNavigatePage('investment')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Investment</button>
            <button onClick={() => onNavigatePage && onNavigatePage('insurance')} className="text-[#7C1FA8] font-bold cursor-pointer">Insurance</button>
            <button onClick={() => onNavigatePage && onNavigatePage('financing')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Financing</button>
            <button onClick={() => onNavigatePage && onNavigatePage('tools')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Tools</button>
            <button onClick={() => onNavigatePage && onNavigatePage('blog')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Blog</button>
          </div>

          {/* Desktop CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedPlanModal({ title: 'Start Investing' })}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer"
            >
              Start Investing
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (SECURE TODAY, STAY PROTECTED TOMORROW) */}
      <section className="w-full bg-[#FAF8FC] bg-gradient-to-r from-[#FAF8FC] via-[#F5EEFC] to-[#FAF8FC] relative overflow-hidden border-b border-[#EBE8EF]/60 pt-4 sm:pt-5 lg:pt-6 pb-4 sm:pb-5 lg:pb-6 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-purple-300/20 rounded-full filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* LEFT COLUMN: Badge, Title, Subtitle, Buttons & 3 Feature Badges */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Category Badge */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#7C1FA8] inline-block animate-pulse"></span>
              <span className="text-[#7C1FA8] text-xs font-black uppercase tracking-widest font-sans">
                SECURE TODAY, STAY PROTECTED TOMORROW
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-sans font-extrabold text-[34px] leading-[42px] sm:text-[44px] sm:leading-[52px] lg:text-[50px] lg:leading-[58px] tracking-[-0.03em] text-[#1E1B2E] mb-3 max-w-[560px]">
              Insurance that protects what <span className="text-[#7C1FA8]">matters most.</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[22px] sm:leading-[25px] text-[#544F66] mb-6 max-w-[480px]">
              Simple, reliable and transparent insurance plans for you and your loved ones.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-7">
              <button
                onClick={() => setSelectedPlanModal({ title: 'Explore Insurance Plans' })}
                className="h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-xl bg-[#7C1FA8] hover:bg-[#68198f] text-white font-bold text-sm sm:text-base shadow-md shadow-purple-900/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Plans</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              
              <button
                onClick={() => setSelectedPlanModal({ title: 'Talk to Advisor' })}
                className="h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-xl bg-white hover:bg-purple-50 text-[#7C1FA8] border border-[#7C1FA8]/40 font-bold text-sm sm:text-base shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
              >
                Talk to Advisor
              </button>
            </div>

            {/* 3 Feature Badges Row */}
            <div className="flex items-center gap-3.5 pt-2 border-t border-purple-100/80 w-full max-w-[560px]">
              {/* Feature 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100/70 border border-purple-200/60 text-[#7C1FA8] flex items-center justify-center shrink-0 shadow-2xs">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-xs text-[#1E1B2E]">Trusted Insurers</span>
                  <span className="text-[11px] font-medium text-[#666077]">Top partners</span>
                </div>
              </div>

              <span className="text-purple-200 hidden sm:inline">|</span>

              {/* Feature 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100/70 border border-purple-200/60 text-[#7C1FA8] flex items-center justify-center shrink-0 shadow-2xs">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-xs text-[#1E1B2E]">100% Transparent</span>
                  <span className="text-[11px] font-medium text-[#666077]">No hidden charges</span>
                </div>
              </div>

              <span className="text-purple-200 hidden sm:inline">|</span>

              {/* Feature 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100/70 border border-purple-200/60 text-[#7C1FA8] flex items-center justify-center shrink-0 shadow-2xs">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-xs text-[#1E1B2E]">Quick & Hassle-free</span>
                  <span className="text-[11px] font-medium text-[#666077]">Buy in minutes</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: User Image & Protection Score Floating Card */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full mt-4 lg:mt-0">
            
            {/* Family Image Container with Glowing Shield */}
            <div className="relative z-10 w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] flex justify-center items-end">
              <img
                src="/ChatGPT Image Aug 29, 2026, 03_09_25 PM.png"
                alt="Insurance that protects what matters most - Family Shield"
                className="w-full h-auto max-h-[420px] sm:max-h-[460px] lg:max-h-[480px] object-contain drop-shadow-xl select-none translate-y-6 sm:translate-y-7 lg:translate-y-8 -mb-6 sm:-mb-7 lg:-mb-8"
              />

              {/* Protection Score Animated Floating Card Overlay (Bottom Right) */}
              <AnimatedProtectionScore onOpenModal={(modal) => setSelectedPlanModal(modal)} />
            </div>

          </div>

        </div>
      </section>

      {/* MAIN CONTAINER FOR PAGE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* 3. COVERAGE FOR EVERY NEED IN LIFE (MATCHING CHATGPT IMAGE) */}
        <section className="py-3 space-y-5">
          <div className="text-center space-y-0.5">
            <span className="text-[#7C1FAB] text-[11px] font-extrabold tracking-widest uppercase block">
              COVERAGE FOR EVERY NEED IN LIFE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E]">
              Plans for every <span className="text-[#7C1FAB]">need</span> in life
            </h2>
          </div>

          {/* 2 Rows x 3 Columns Pastel Tinted Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {insurancePlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanModal(plan)}
                className={`${plan.bgGradient} border ${plan.cardBorder} rounded-[26px] p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-xl hover:scale-[1.015] group cursor-pointer relative overflow-hidden flex justify-between min-h-[190px] sm:min-h-[210px]`}
              >
                {/* Left Text & Icon Container */}
                <div className="flex flex-col justify-between space-y-3 z-10 max-w-[58%] sm:max-w-[62%]">
                  <div className="space-y-3">
                    {/* Icon Box */}
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center shrink-0">
                      <div className={plan.iconColor}>{plan.icon}</div>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#1E1B2E] leading-snug group-hover:text-[#7C1FAB] transition-colors">
                        {plan.title}
                      </h3>
                      <p className="text-xs sm:text-[12.5px] text-[#544F66] font-semibold leading-relaxed mt-1.5">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side 3D Graphic Visual (Seamless Background Blend) */}
                <div className="absolute right-[-10px] sm:right-[0px] bottom-[0px] w-[50%] h-[85%] flex items-end justify-end pointer-events-none">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    style={{ mixBlendMode: 'multiply' }}
                    className="max-w-full max-h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Single Circle Arrow Button (Shifted to Bottom Right Corner) */}
                <div className="absolute bottom-3.5 right-3.5 z-20">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#7C1FAB] group-hover:bg-[#7C1FAB] group-hover:text-white transition-all text-xl sm:text-2xl font-bold pb-0.5">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WHY CHOOSE PROSPERIS SECTION (COMPACT HEIGHT) */}
        <section className="bg-[#FAF5FD] border border-[#EBE8EF] rounded-[20px] py-3.5 px-4 sm:px-5 lg:py-4 lg:px-6 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Left Header Box */}
            <div className="lg:col-span-4 space-y-0.5 text-left">
              <span className="text-[#7C1FAB] text-[10px] font-extrabold tracking-wider uppercase block">
                WHY CHOOSE PROSPERIS?
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] leading-tight">
                Insurance that works for you, not the other way
              </h2>
              <div className="w-8 h-0.5 bg-[#7C1FAB] rounded-full mt-1"></div>
            </div>

            {/* Right 4 Horizontal Feature Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 divide-y-0 sm:divide-x sm:divide-purple-200/50">
              
              <div className="sm:pl-3 space-y-0.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-[12px] text-[#1E1B2E] leading-tight">Compare & Save</h4>
                <p className="text-[10.5px] text-[#8E8A9D] font-medium leading-tight">Compare plans from top insurers</p>
              </div>

              <div className="sm:pl-3 space-y-0.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-[12px] text-[#1E1B2E] leading-tight">Easy Claims</h4>
                <p className="text-[10.5px] text-[#8E8A9D] font-medium leading-tight">Hassle-free claim assistance</p>
              </div>

              <div className="sm:pl-3 space-y-0.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-[12px] text-[#1E1B2E] leading-tight">Expert Guidance</h4>
                <p className="text-[10.5px] text-[#8E8A9D] font-medium leading-tight">Get advice from certified experts</p>
              </div>

              <div className="sm:pl-3 space-y-0.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-[12px] text-[#1E1B2E] leading-tight">Policy Management</h4>
                <p className="text-[10.5px] text-[#8E8A9D] font-medium leading-tight">Manage all your policies in one place.</p>
              </div>

            </div>

          </div>
        </section>

        {/* 5. BANNER CTA SECTION */}
        <section className="bg-[#5E1683] rounded-[22px] p-4.5 sm:p-6 lg:px-8 py-5 text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg relative overflow-hidden">
          
          <div className="flex items-center gap-4.5 text-left max-w-xl sm:max-w-2xl lg:max-w-3xl flex-1">
            {/* 3D Shield Badge Visual */}
            <div className="w-12.5 h-12.5 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl sm:text-2xl shadow-inner shrink-0">
              🛡️
            </div>

            <div className="space-y-0.5">
              <span className="text-[10.5px] sm:text-xs font-extrabold uppercase tracking-widest text-purple-200 block">
                PEACE OF MIND, ALWAYS
              </span>
              <h3 className="text-base sm:text-xl lg:text-2xl font-extrabold text-white leading-snug tracking-tight">
                Protection today. Peace of mind always.
              </h3>
              <p className="text-xs sm:text-sm text-purple-100/90 font-medium">
                Talk to our experts and find the right plan for you and your loved ones.
              </p>
            </div>
          </div>

          <button 
            onClick={() => setSelectedPlanModal({ title: 'Talk to Advisor' })}
            className="bg-white hover:bg-purple-50 text-[#1E1B2E] font-extrabold px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm min-w-[210px] sm:min-w-[240px] transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
          >
            <span>Talk to Advisor</span>
            <span className="text-sm">→</span>
          </button>
        </section>

      </main>

      {/* 6. HOMEPAGE FLOATING FOOTER */}
      <Footer onNavigatePage={onNavigatePage} />

      {/* MODAL / CALCULATOR DIALOG */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white bg-cover bg-center rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-purple-100/80 relative overflow-hidden animate-in fade-in zoom-in duration-200"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-sm">
                    🛡️
                  </div>
                  <h3 className="font-extrabold text-base text-[#1E1B2E]">
                    {selectedPlanModal.title || 'Insurance Policy Quote'}
                  </h3>
                </div>
                <button 
                  onClick={() => { setSelectedPlanModal(null); setQuoteSuccessMsg(false); }}
                  className="w-7 h-7 rounded-full bg-gray-100/90 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors z-20"
                >
                  ✕
                </button>
              </div>

              {quoteSuccessMsg ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-lg font-extrabold text-[#1E1B2E]">Quote Request Sent!</h4>
                  <p className="text-xs text-[#544F66]">
                    Our certified insurance advisor will call you within 15 minutes with customized plan options.
                  </p>
                  <button 
                    onClick={() => { setSelectedPlanModal(null); setQuoteSuccessMsg(false); }}
                    className="bg-[#7C1FAB] text-white font-bold px-6 py-2 rounded-full text-xs mt-2"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-[#544F66] font-medium">
                    {selectedPlanModal.subtitle || 'Calculate estimated premium and get instant quotes from 50+ top insurers.'}
                  </p>

                  {/* Instant Quote Estimator */}
                  <div className="bg-[#FAF5FD]/90 backdrop-blur-xs p-3.5 rounded-2xl border border-purple-100 space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#1E1B2E] block mb-1">Coverage Amount</label>
                      <select 
                        value={coverageAmount}
                        onChange={(e) => setCoverageAmount(Number(e.target.value))}
                        className="w-full bg-white border border-purple-200 rounded-xl p-2 text-xs font-bold text-[#1E1B2E]"
                      >
                        <option value={500000}>₹ 5 Lakhs</option>
                        <option value={1000000}>₹ 10 Lakhs</option>
                        <option value={2500000}>₹ 25 Lakhs</option>
                        <option value={5000000}>₹ 50 Lakhs</option>
                        <option value={10000000}>₹ 1 Crore</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#1E1B2E] block mb-1">Your Age</label>
                      <input 
                        type="number"
                        value={memberAge}
                        onChange={(e) => setMemberAge(Number(e.target.value))}
                        className="w-full bg-white border border-purple-200 rounded-xl p-2 text-xs font-bold text-[#1E1B2E]"
                      />
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-purple-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#8E8A9D] block">Estimated Premium</span>
                        <span className="text-lg font-extrabold text-[#7C1FAB]">{formatCurrency(calculateEstimate())} <span className="text-[10px] font-normal text-gray-500">/ mo</span></span>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                        Zero Commission
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input 
                      type="text"
                      placeholder="Your Full Name"
                      className="w-full bg-white/95 border border-gray-200 rounded-xl p-2.5 text-xs font-medium text-[#1E1B2E] focus:outline-none focus:border-[#7C1FAB] shadow-2xs"
                    />
                    <div className="flex items-center bg-white/95 border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#7C1FAB] shadow-2xs">
                      <select className="bg-transparent pl-2.5 pr-1 py-2.5 text-xs font-bold text-[#1E1B2E] outline-none border-r border-gray-200 cursor-pointer">
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
                        placeholder="Mobile Number"
                        className="w-full bg-transparent p-2.5 text-xs font-medium text-[#1E1B2E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setQuoteSuccessMsg(true)}
                    className="w-full bg-[#7C1FAB] hover:bg-[#65148D] text-white font-extrabold py-3 rounded-full text-xs shadow-md transition-all cursor-pointer"
                  >
                    Get Instant Free Quotes →
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

