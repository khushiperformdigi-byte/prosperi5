import React, { useState } from 'react';
import Footer from './Footer';

export default function ProtectPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const protectionPlans = [
    {
      id: 'health',
      category: 'health',
      title: 'Family Health Protection',
      subtitle: 'Comprehensive medical coverage with 10,000+ cashless hospitals across India.',
      badge: 'Most Popular',
      image: '/card_heart_clean.png',
      bgGradient: 'from-[#FAF2FF] to-[#F5E6FF]',
      border: 'border-[#E5C6FF]',
      tagBg: 'bg-[#7C1FAB] text-white',
      accentColor: '#7C1FAB',
      features: ['Up to ₹1 Crore Sum Insured', 'Cashless Hospitalization in 30 Mins', 'Zero Co-payment & No Room Rent Cap', 'Annual Health Checkups Included']
    },
    {
      id: 'life',
      category: 'life',
      title: 'Term Life Protection',
      subtitle: 'Ensure absolute financial independence and legacy security for your loved ones.',
      badge: 'High Coverage',
      image: '/card_umbrella_clean.png',
      bgGradient: 'from-[#FFF7ED] to-[#FFEDD5]',
      border: 'border-[#FED7AA]',
      tagBg: 'bg-[#EA580C] text-white',
      accentColor: '#EA580C',
      features: ['High Cover up to ₹5 Crore', '99.4% Claim Settlement Ratio', 'Tax Savings under Sec 80C', 'Critical Illness Rider Available']
    },
    {
      id: 'home',
      category: 'property',
      title: 'Home & Property Guard',
      subtitle: 'Complete protection against fire, natural disasters, theft and structural damage.',
      badge: 'All-Risk Cover',
      image: '/card_home_clean.png',
      bgGradient: 'from-[#F0FDF4] to-[#DCFCE7]',
      border: 'border-[#BBF7D0]',
      tagBg: 'bg-[#16A34A] text-white',
      accentColor: '#16A34A',
      features: ['Structure & Content Coverage', 'Burglary & Theft Reimbursement', 'Instant Video Claim Settlement', 'Alternative Accommodation Allowance']
    },
    {
      id: 'motor',
      category: 'motor',
      title: 'Motor & Vehicle Guard',
      subtitle: 'Cashless garage network, zero depreciation, and 24x7 roadside assistance.',
      badge: 'Instant Renewal',
      image: '/card_car_orange.png',
      bgGradient: 'from-[#EFF6FF] to-[#DBEAFE]',
      border: 'border-[#BFDBFE]',
      tagBg: 'bg-[#0284C7] text-white',
      accentColor: '#0284C7',
      features: ['5,000+ Network Garages', 'Zero Depreciation Add-on', 'Engine Protect & Consumables', '24/7 On-spot Towing Assistance']
    }
  ];

  const filteredPlans = activeCategory === 'all' 
    ? protectionPlans 
    : protectionPlans.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FDFBFD] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FAB] overflow-x-hidden">
      
      {/* 1. TOP CONTACT UTILITY BAR */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-[1500px] mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-white/70">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Protect What Matters · Complete Financial Security</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              50,000+ Families Protected · 99.4% Settlement
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setSelectedPlanModal({ title: 'Talk to a Protection Advisor' })}
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
            <button onClick={() => onNavigatePage && onNavigatePage('about')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">About Us</button>
            <button onClick={() => onNavigatePage && onNavigatePage('protect')} className="text-[#7C1FA8] font-bold cursor-pointer">Protect</button>
            <button onClick={() => onNavigatePage && onNavigatePage('investment')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Investment</button>
            <button onClick={() => onNavigatePage && onNavigatePage('insurance')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Insurance</button>
            <button onClick={() => onNavigatePage && onNavigatePage('financing')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Financing</button>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedPlanModal({ title: 'Explore Protection Plans' })}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer"
            >
              Get Protected
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

      {/* 3. HERO SECTION - USING ChatGPT Image Aug 25, 2026, 05_41_16 PM.png */}
      <section className="w-full bg-[#180A2A] relative overflow-hidden border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full">
            <img 
              src="/ChatGPT Image Aug 25, 2026, 05_41_16 PM.png" 
              alt="Protection today, confidence always - PROSPERi5" 
              className="w-full h-auto block object-cover max-h-[580px] lg:max-h-[620px]"
            />

            {/* Interactive Click Hotspots over Hero Banner */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
                <div className="max-w-xl text-left hidden sm:block opacity-0 pointer-events-auto">
                  {/* Invisible structural hotspot helper */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE PROSPERI5 - MORE THAN JUST PROTECTION SECTION */}
      <section 
        className="w-full relative bg-cover bg-center bg-no-repeat py-12 lg:py-16 border-b border-[#EBE3F5]"
        style={{ backgroundImage: "url('/ChatGPT Image Aug 25, 2026, 11_06_32 PM.png')" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 relative z-10">
          
          {/* Left Text Block */}
          <div className="w-full lg:w-[32%] text-left">
            <span className="text-[#7C1FAB] font-extrabold text-xs tracking-[0.18em] uppercase mb-2.5 block">
              WHY CHOOSE PROSPERI5
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-[38px] text-[#1E1B2E] leading-[1.15] tracking-tight mb-4">
              More than just protection
            </h2>
            <p className="text-[#544F66] text-sm sm:text-base leading-relaxed font-medium">
              We go beyond policies to deliver lasting value, trust and care.
            </p>
          </div>

          {/* Right 4 Columns Card Container */}
          <div className="w-full lg:w-[68%] bg-white/90 backdrop-blur-md border border-[#EBE0F7] rounded-[28px] lg:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#EBE0F7]">
              
              {/* Col 1: Trusted by Thousands */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:px-6 first:lg:pl-0 last:lg:pr-0 pt-4 sm:pt-0 group">
                <div className="w-16 h-16 rounded-full bg-[#F3E8FF] text-[#7C1FAB] flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base lg:text-[17px] text-[#1E1B2E] mb-2 leading-snug">
                  Trusted by Thousands
                </h3>
                <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                  Backed by expertise and trusted by 25,000+ families.
                </p>
              </div>

              {/* Col 2: Instant Protection */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:px-6 pt-6 sm:pt-0 group">
                <div className="w-16 h-16 rounded-full bg-[#F3E8FF] text-[#7C1FAB] flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base lg:text-[17px] text-[#1E1B2E] mb-2 leading-snug">
                  Instant Protection
                </h3>
                <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                  Get covered in minutes with quick, digital onboarding.
                </p>
              </div>

              {/* Col 3: Affordable Plans */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:px-6 pt-6 sm:pt-0 group">
                <div className="w-16 h-16 rounded-full bg-[#F3E8FF] text-[#7C1FAB] flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base lg:text-[17px] text-[#1E1B2E] mb-2 leading-snug">
                  Affordable Plans
                </h3>
                <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                  Flexible plans that fit your budget and needs.
                </p>
              </div>

              {/* Col 4: Always Here */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:px-6 first:lg:pl-0 last:lg:pr-0 pt-6 sm:pt-0 group">
                <div className="w-16 h-16 rounded-full bg-[#F3E8FF] text-[#7C1FAB] flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5zm18 0a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base lg:text-[17px] text-[#1E1B2E] mb-2 leading-snug">
                  Always Here
                </h3>
                <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                  Dedicated support whenever you need us.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. BE PREPARED ALWAYS & HOW GETTING PROTECTED WORKS SECTION */}
      <section className="w-full bg-[#FAF8FC] pt-8 lg:pt-12 pb-6 sm:pb-8 border-t border-[#EBE3F5]">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8 lg:space-y-10">
          
          {/* PART 1: BE PREPARED, ALWAYS (Full width layout, no box card wrapper) */}
          <div className="w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              
              {/* Left Column: Armchair graphic */}
              <div className="w-full lg:w-5/12 flex justify-center shrink-0">
                <div className="relative rounded-[20px] overflow-hidden max-w-[380px] lg:max-w-none shadow-sm border border-purple-100/50 bg-[#F3E8FF]/30">
                  <img
                    src="/protect_chair_graphic.png"
                    alt="Comfortable protection - PROSPERi5"
                    className="w-full h-auto object-cover rounded-[20px] hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Middle Column: Headline & Description */}
              <div className="w-full lg:w-4/12 text-left space-y-3">
                <span className="text-[#7C1FAB] font-extrabold text-xs tracking-[0.18em] uppercase block">
                  BE PREPARED, ALWAYS
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-[34px] text-[#1E1B2E] leading-[1.18] tracking-tight">
                  Life is unpredictable.<br className="hidden sm:block" /> Your protection shouldn’t be.
                </h2>
                <p className="text-[#544F66] text-xs sm:text-sm leading-relaxed font-medium pt-0.5">
                  From critical illnesses to accidents, we help you prepare for the uncertainties so you can focus on what truly matters.
                </p>
              </div>

              {/* Thin Vertical Divider (Desktop) */}
              <div className="hidden lg:block w-[1px] bg-[#E2D4F3] self-stretch my-2" />

              {/* Right Column: 4 Feature Cards */}
              <div className="w-full lg:w-3/12 flex flex-col gap-3 shrink-0">
                {/* Feature 1 */}
                <div className="bg-white border border-[#EFE5FA] rounded-[16px] p-3.5 flex items-center gap-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                  <div className="w-9.5 h-9.5 rounded-lg bg-[#F3E8FF] text-[#7C1FAB] flex items-center justify-center shrink-0 group-hover:bg-[#7C1FAB] group-hover:text-white transition-colors">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm text-[#1E1B2E] leading-snug">
                    Financial security for your family
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="bg-white border border-[#EFE5FA] rounded-[16px] p-3.5 flex items-center gap-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                  <div className="w-9.5 h-9.5 rounded-lg bg-[#F3E8FF] text-[#7C1FAB] flex items-center justify-center shrink-0 group-hover:bg-[#7C1FAB] group-hover:text-white transition-colors">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm text-[#1E1B2E] leading-snug">
                    Cashless healthcare across India
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="bg-white border border-[#EFE5FA] rounded-[16px] p-3.5 flex items-center gap-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                  <div className="w-9.5 h-9.5 rounded-lg bg-[#F3E8FF] text-[#7C1FAB] flex items-center justify-center shrink-0 group-hover:bg-[#7C1FAB] group-hover:text-white transition-colors">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm text-[#1E1B2E] leading-snug">
                    24/7 claim assistance
                  </span>
                </div>

                {/* Feature 4 */}
                <div className="bg-white border border-[#EFE5FA] rounded-[16px] p-3.5 flex items-center gap-3.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                  <div className="w-9.5 h-9.5 rounded-lg bg-[#F3E8FF] text-[#7C1FAB] flex items-center justify-center shrink-0 group-hover:bg-[#7C1FAB] group-hover:text-white transition-colors">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm text-[#1E1B2E] leading-snug">
                    Quick & hassle-free processes
                  </span>
                </div>
              </div>

            </div>
          </div>


          {/* PART 2: HOW GETTING PROTECTED WORKS (4-STEP FLOW) */}
          <div className="text-center w-full">
            <span className="text-[#7C1FAB] font-extrabold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-1.5 block">
              SIMPLE. QUICK. SECURE.
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#1E1B2E] tracking-tight">
              How getting protected works
            </h2>

            {/* 4 Steps Flex Row with clear gaps & equal card sizes */}
            <div className="w-full max-w-5xl mx-auto mt-6">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-3.5">
                
                {/* Step 01 */}
                <div className="w-full lg:w-[210px] min-h-[145px] shrink-0 bg-white/95 backdrop-blur-sm rounded-[20px] p-4 border border-[#EBE3F5] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group text-left">
                  <div className="flex items-center justify-between w-full mb-2.5">
                    <div className="w-11 h-11 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
                      <div className="w-7 h-7 rounded-full bg-[#7C1FAB] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                    </div>
                    <span className="font-black text-xl text-[#7C1FAB] font-mono">01</span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-[#1E1B2E] mb-1">Choose a Plan</h3>
                    <p className="text-[11px] sm:text-xs text-[#544F66] font-medium leading-relaxed">
                      Pick a plan that fits your needs.
                    </p>
                  </div>
                </div>

                {/* Arrow 1 Connector */}
                <div className="hidden lg:flex items-center justify-center shrink-0 px-1">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E5C6FF] shadow-xs flex items-center justify-center text-[#7C1FAB] hover:bg-[#7C1FAB] hover:text-white transition-all duration-300">
                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="w-full lg:w-[210px] min-h-[145px] shrink-0 bg-white/95 backdrop-blur-sm rounded-[20px] p-4 border border-[#EBE3F5] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group text-left">
                  <div className="flex items-center justify-between w-full mb-2.5">
                    <div className="w-11 h-11 rounded-full bg-[#FFE4E6] flex items-center justify-center shrink-0">
                      <div className="w-7 h-7 rounded-full bg-[#DB2777] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <span className="font-black text-xl text-[#DB2777] font-mono">02</span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-[#1E1B2E] mb-1">Share Details</h3>
                    <p className="text-[11px] sm:text-xs text-[#544F66] font-medium leading-relaxed">
                      Provide basic details in a few minutes.
                    </p>
                  </div>
                </div>

                {/* Arrow 2 Connector */}
                <div className="hidden lg:flex items-center justify-center shrink-0 px-1">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#FBCFE8] shadow-xs flex items-center justify-center text-[#DB2777] hover:bg-[#DB2777] hover:text-white transition-all duration-300">
                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Step 03 */}
                <div className="w-full lg:w-[210px] min-h-[145px] shrink-0 bg-white/95 backdrop-blur-sm rounded-[20px] p-4 border border-[#EBE3F5] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group text-left">
                  <div className="flex items-center justify-between w-full mb-2.5">
                    <div className="w-11 h-11 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
                      <div className="w-7 h-7 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <span className="font-black text-xl text-[#F59E0B] font-mono">03</span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-[#1E1B2E] mb-1">Get Covered</h3>
                    <p className="text-[11px] sm:text-xs text-[#544F66] font-medium leading-relaxed">
                      Your policy is activated instantly.
                    </p>
                  </div>
                </div>

                {/* Arrow 3 Connector */}
                <div className="hidden lg:flex items-center justify-center shrink-0 px-1">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#FDE68A] shadow-xs flex items-center justify-center text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white transition-all duration-300">
                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Step 04 */}
                <div className="w-full lg:w-[210px] min-h-[145px] shrink-0 bg-white/95 backdrop-blur-sm rounded-[20px] p-4 border border-[#EBE3F5] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group text-left">
                  <div className="flex items-center justify-between w-full mb-2.5">
                    <div className="w-11 h-11 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                      <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16a2 2 0 104 0M4 12a8 8 0 1116 0H4z" />
                        </svg>
                      </div>
                    </div>
                    <span className="font-black text-xl text-[#16A34A] font-mono">04</span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-[#1E1B2E] mb-1">Stay Secure</h3>
                    <p className="text-[11px] sm:text-xs text-[#544F66] font-medium leading-relaxed">
                      We've got your back, always.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. READY TO PROTECT CTA BANNER (Card Form, Deep Purple Homepage Color, Enhanced Umbrella Icon, Decreased Width) */}
      <section className="w-full bg-[#FAF8FC] py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#200A38] via-[#1B0B2E] to-[#160826] border border-[#3D1A5C]/80 rounded-[26px] lg:rounded-[30px] p-5 sm:p-7 lg:p-8 shadow-[0_16px_40px_rgba(24,10,42,0.35)] relative overflow-hidden group">
            
            {/* Background Ambient Glow */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#7C1FAB]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 lg:gap-8">
              
              {/* Left side: Improved Umbrella Icon & Text */}
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-[20px] bg-gradient-to-br from-[#7C1FAB] to-[#4A1069] border border-purple-400/40 flex items-center justify-center shrink-0 shadow-lg shadow-purple-950/60 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/card_umbrella_clean.png" 
                    alt="Umbrella Protection" 
                    className="w-9 h-9 object-contain drop-shadow-md"
                  />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-lg sm:text-xl lg:text-[22px] text-white tracking-tight leading-snug">
                    Protect today. Secure tomorrow.
                  </h3>
                  <p className="text-[#D3C4E5] text-xs sm:text-sm font-medium mt-1">
                    Take the first step towards a worry-free future for you and your loved ones.
                  </p>
                </div>
              </div>

              {/* Right side: 2 Buttons */}
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setSelectedPlanModal({ title: 'Explore Protection Plans' })}
                  className="bg-white hover:bg-purple-50 text-[#1E1B2E] font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  Explore Plans <span className="text-base leading-none text-[#7C1FAB]">→</span>
                </button>
                <button
                  onClick={() => setSelectedPlanModal({ title: 'Talk to a Protection Expert' })}
                  className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  Talk to an Expert
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer onNavigatePage={onNavigatePage} />

      {/* MODAL DIALOG */}
      {selectedPlanModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={() => setSelectedPlanModal(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-[#1E1B2E]">{selectedPlanModal.title || 'Get Protected'}</h2>
              <button onClick={() => setSelectedPlanModal(null)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[#544F66] font-medium mb-6 text-sm">Enter your contact details to receive a customized quote & policy consultation.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border border-[#EBE8EF] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C1FAB] transition-colors" />
              <input type="tel" placeholder="Mobile Number" className="w-full border border-[#EBE8EF] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C1FAB] transition-colors" />
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
