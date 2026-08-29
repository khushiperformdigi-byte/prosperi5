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
      


      {/* 3. HERO SECTION (PROTECT WHAT MATTERS) */}
      <section className="w-full bg-[#160628] bg-gradient-to-r from-[#19062D] via-[#140426] to-[#200A38] relative overflow-hidden border-b border-purple-900/50 pt-2.5 sm:pt-3 lg:pt-3.5 pb-2.5 sm:pb-3 lg:pb-3.5 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-purple-600/20 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-pink-600/15 rounded-full filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: Title, Subtitle, CTA & Social Proof */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Top Category Badge */}
            <span className="text-purple-300/90 text-xs font-extrabold tracking-widest uppercase mb-1.5 inline-block font-sans">
              PROTECT WHAT MATTERS
            </span>

            {/* Main Title */}
            <h1 className="font-sans font-extrabold text-[34px] leading-[42px] sm:text-[44px] sm:leading-[50px] lg:text-[50px] lg:leading-[58px] tracking-[-0.03em] text-white mb-2.5">
              Protection today, <br />
              <span className="text-[#C084FC]">confidence</span> <br />
              always.
            </h1>

            {/* Subtitle Paragraph */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[14.5px] sm:text-[15.5px] leading-[22px] sm:leading-[25px] text-purple-100/80 mb-5 max-w-[500px]"
            >
              Comprehensive protection plans that safeguard your loved ones, your health and your future.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <button
                onClick={() => setSelectedPlanModal({ title: 'Explore Protection Plans' })}
                className="h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-[16px] bg-[#7C1FA8] hover:bg-[#68198f] text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-950/60 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Protection</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              
              <button
                onClick={() => {
                  const elem = document.getElementById('why-choose-protect');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-[16px] bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>How it Works</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Social Proof Row */}
            <div className="flex items-center gap-4 pt-0.5">
              {/* 3 Purple Icon Badges */}
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-200 flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-200 flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-200 flex items-center justify-center shadow-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>

              {/* Text & 5 Stars */}
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-purple-100/90 font-sans">
                  Trusted by <span className="font-extrabold text-white">50,000+</span> Families across PROSPERi5
                </span>
                <div className="flex items-center gap-1 text-[#F5A623] text-xs mt-0.5">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Shield Podium Graphic */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end mt-2 lg:mt-0 w-full">
            {/* Background Soft Purple Circle Glow */}
            <div className="absolute w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] lg:w-[580px] lg:h-[580px] bg-gradient-to-tr from-purple-600/30 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {/* Custom User 3D Metallic Shield Podium Image */}
            <div className="relative z-10 w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px] flex justify-center lg:justify-end lg:-translate-y-2">
              <img
                src="/ChatGPT Image Aug 29, 2026, 02_55_13 PM.png"
                alt="Protection today confidence always - 3D Shield Podium"
                className="w-full h-auto max-h-[360px] sm:max-h-[400px] lg:max-h-[420px] object-contain drop-shadow-2xl select-none pointer-events-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE PROSPERI5 - MORE THAN JUST PROTECTION SECTION */}
      <section 
        id="why-choose-protect"
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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10">
          
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
            <div className="w-full max-w-7xl mx-auto mt-6">
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
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E5C6FF] shadow-xs flex items-center justify-center text-[#7C1FAB] hover:bg-[#7C1FAB] hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="w-10 h-10 rounded-full bg-white border border-[#FBCFE8] shadow-xs flex items-center justify-center text-[#DB2777] hover:bg-[#DB2777] hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="w-10 h-10 rounded-full bg-white border border-[#FDE68A] shadow-xs flex items-center justify-center text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* 7. READY TO PROTECT CTA BANNER (Brand Purple #7C1FA8 Gradient, Compact Height) */}
      <section className="w-full bg-[#FAF8FC] py-4 sm:py-5 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#7C1FA8] via-[#6B1991] to-[#521172] border border-purple-400/40 rounded-[22px] lg:rounded-[26px] p-3.5 sm:p-4.5 lg:p-5 shadow-xl shadow-purple-900/30 relative overflow-hidden group">
            
            {/* Background Ambient Glow */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-6">
              
              {/* Left side: Improved Umbrella Icon & Text */}
              <div className="flex items-center gap-3.5 text-center md:text-left">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] bg-white/15 border border-white/25 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/card_umbrella_clean.png" 
                    alt="Umbrella Protection" 
                    className="w-7 h-7 object-contain drop-shadow-md brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-base sm:text-lg lg:text-xl text-white tracking-tight leading-snug">
                    Protect today. Secure tomorrow.
                  </h3>
                  <p className="text-purple-100/90 text-xs sm:text-[13px] font-medium mt-0.5">
                    Take the first step towards a worry-free future for you and your loved ones.
                  </p>
                </div>
              </div>

              {/* Right side: 2 Buttons (Pill shape matching reference image) */}
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setSelectedPlanModal({ title: 'Explore Protection Plans' })}
                  className="bg-white hover:bg-purple-50 text-[#7C1FA8] font-extrabold text-xs sm:text-sm px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Explore Plans</span>
                  <span className="text-base leading-none text-[#7C1FA8]">→</span>
                </button>
                <button
                  onClick={() => setSelectedPlanModal({ title: 'Talk to a Protection Expert' })}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
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
          <div 
            className="bg-white bg-cover bg-center rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden border border-purple-100/80" 
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
            onClick={e => e.stopPropagation()}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl text-[#1E1B2E]">{selectedPlanModal.title || 'Get Protected'}</h2>
                <button onClick={() => setSelectedPlanModal(null)} className="w-9 h-9 rounded-full bg-gray-100/90 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors z-20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-[#544F66] font-medium mb-6 text-sm">Enter your contact details to receive a customized quote & policy consultation.</p>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full border border-[#EBE8EF] bg-white/95 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C1FAB] transition-colors shadow-2xs" />
                <div className="flex items-center border border-[#EBE8EF] bg-white/95 rounded-xl overflow-hidden focus-within:border-[#7C1FAB] transition-colors shadow-2xs">
                  <select className="bg-transparent pl-3 pr-1 py-3 text-xs sm:text-sm font-semibold text-[#1E1B2E] outline-none border-r border-[#EBE8EF] cursor-pointer">
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+1">🇨🇦 +1</option>
                  </select>
                  <input type="tel" placeholder="Mobile Number" className="w-full px-3 py-3 text-sm text-[#1E1B2E] outline-none bg-transparent" />
                </div>
                <button
                  onClick={() => setSelectedPlanModal(null)}
                  className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
