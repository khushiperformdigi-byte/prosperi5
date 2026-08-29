import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import Testimonials from './Testimonials';

function AnimatedCounter({ end, decimals = 0, prefix = '', suffix = '', duration = 1600 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOutProgress * end;
            setCount(decimals > 0 ? parseFloat(currentVal.toFixed(decimals)) : Math.floor(currentVal));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated, decimals]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : new Intl.NumberFormat('en-IN').format(count);

  return <span ref={ref}>{prefix}{formattedCount}{suffix}</span>;
}

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

      {/* 3. HERO SECTION (GROW YOUR WEALTH) */}
      <section className="w-full bg-[#FAF8FC] border-b border-[#EBE8EF]/60 relative overflow-hidden pt-3 sm:pt-4 lg:pt-5 pb-3 sm:pb-4 lg:pb-5 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-200/30 rounded-full filter blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-pink-100/30 rounded-full filter blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: Main Copy, Badges & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Top Category Badge */}
            <span className="text-[#7C1FAB] text-xs font-extrabold tracking-wider uppercase mb-2 inline-block font-sans">
              GROW YOUR WEALTH
            </span>

            {/* Main Title */}
            <h1 className="font-sans font-extrabold text-[36px] leading-[44px] sm:text-[46px] sm:leading-[54px] lg:text-[54px] lg:leading-[62px] tracking-[-0.03em] text-[#1E1135] mb-2.5">
              Smart decisions <br />
              <span className="text-[#7C1FA8]">Stronger future.</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[15px] sm:text-[16.5px] leading-[23px] sm:leading-[26px] text-[#544F66] mb-5 max-w-[540px]"
            >
              Access expert curated investments and tools to grow your wealth, your way.
            </p>

            {/* 4 Feature Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 w-full max-w-2xl">
              {/* Feature 1: Curated by Experts */}
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 px-3 rounded-xl bg-purple-50/70 border border-purple-100/90 shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-purple-100/90 text-[#7C1FA8] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <span className="text-[11.5px] sm:text-xs font-semibold text-[#1E1135] leading-tight font-sans">
                  Curated by Experts
                </span>
              </div>

              {/* Feature 2: Low Cost Investing */}
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 px-3 rounded-xl bg-purple-50/70 border border-purple-100/90 shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-purple-100/90 text-[#7C1FA8] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v2.25m-7.5-3.75l3 3m0 0l3-3m-3 3V3m6 12V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5h10.5a2.25 2.25 0 002.25-2.25z" />
                  </svg>
                </div>
                <span className="text-[11.5px] sm:text-xs font-semibold text-[#1E1135] leading-tight font-sans">
                  Low Cost Investing
                </span>
              </div>

              {/* Feature 3: Transparent & Secure */}
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 px-3 rounded-xl bg-purple-50/70 border border-purple-100/90 shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-purple-100/90 text-[#7C1FA8] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
                  </svg>
                </div>
                <span className="text-[11.5px] sm:text-xs font-semibold text-[#1E1135] leading-tight font-sans">
                  Transparent &amp; Secure
                </span>
              </div>

              {/* Feature 4: SIP & Goal Based */}
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 px-3 rounded-xl bg-purple-50/70 border border-purple-100/90 shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-purple-100/90 text-[#7C1FA8] flex items-center justify-center shrink-0 font-bold text-xs">
                  %
                </div>
                <span className="text-[11.5px] sm:text-xs font-semibold text-[#1E1135] leading-tight font-sans">
                  SIP &amp; Goal Based
                </span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                onClick={() => handleOpenApplyModal('Start Investing Today', 'Access expert curated portfolios and start building wealth with Prosperi5.')}
                className="h-[48px] sm:h-[52px] px-7 sm:px-8 rounded-[16px] bg-[#7C1FA8] hover:bg-[#68198f] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Start Investing</span>
              </button>
              <a
                href="#invest-solutions"
                onClick={(e) => {
                  e.preventDefault();
                  const elem = document.getElementById('invest-solutions');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="h-[48px] sm:h-[52px] px-7 sm:px-8 rounded-[16px] bg-white border-2 border-[#7C1FA8] text-[#7C1FA8] hover:bg-purple-50 font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer flex items-center justify-center"
              >
                Explore Funds
              </a>
            </div>

            {/* Social Proof Row */}
            <div className="flex items-center gap-3 pt-0.5">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="/Portrait 2 (2).png" alt="User 1" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="/Portrait 2 (3).png" alt="User 2" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="/Portrait 2 (4).png" alt="User 3" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="/Portrait 2.png" alt="User 4" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#544F66] font-sans">
                <span className="font-extrabold text-[#7C1FA8]">1M+</span> investors are growing with PROSPERi5
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Massive 3D Plant Graphic Shifted Upwards */}
          <div className="lg:col-span-6 relative flex items-center justify-center mt-2 lg:-mt-10 lg:-mb-4 w-full">
            {/* Background Soft Purple Circle Ring Glow */}
            <div className="absolute w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] lg:w-[640px] lg:h-[640px] bg-gradient-to-tr from-purple-200/50 via-purple-100/60 to-pink-100/50 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {/* 3D Potted Plant Illustration (Shifted Slightly Upward) */}
            <div className="relative z-10 w-full max-w-[440px] sm:max-w-[580px] lg:max-w-[680px] lg:-translate-y-4 flex justify-center">
              <img
                src="/ChatGPT Image Aug 29, 2026, 02_37_21 PM.png"
                alt="Smart decisions Stronger future - Wealth Growth Plant"
                className="w-full h-auto max-h-[500px] sm:max-h-[580px] object-contain drop-shadow-2xl select-none pointer-events-none"
              />
            </div>

            {/* Compact Floating Wealth Created Stats Card with Counter Animation */}
            <div className="absolute right-0 sm:right-[10px] lg:right-[15px] top-[4%] sm:top-[6%] lg:top-[6%] z-20 bg-white/95 backdrop-blur-md rounded-[18px] sm:rounded-[20px] p-3 sm:p-3.5 border border-purple-100/90 shadow-xl w-[175px] sm:w-[195px] select-none transition-all hover:scale-105 font-sans">
              <span className="text-[9.5px] font-extrabold text-[#8E8A9D] uppercase tracking-wider block mb-0.5 font-sans">
                Wealth Created
              </span>
              <h4 className="text-lg sm:text-xl font-black text-[#7C1FA8] leading-tight font-sans tracking-tight">
                <AnimatedCounter end={2350} prefix="₹" suffix=" Cr+" />
              </h4>
              <p className="text-[9.5px] text-[#544F66] font-medium mt-0.5 mb-2 font-sans">
                Across <AnimatedCounter end={1} suffix="M+" /> investor accounts
              </p>

              {/* Sparkline Line Chart Graphic */}
              <div className="w-full h-8 sm:h-9 bg-purple-50/70 rounded-lg p-1.5 flex items-end justify-between relative overflow-hidden mb-2.5">
                <svg className="w-full h-full text-[#7C1FA8] overflow-visible" viewBox="0 0 100 40" fill="none">
                  <path
                    d="M 5 32 L 22 24 L 38 26 L 55 18 L 70 21 L 85 12 L 95 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Glowing Data Dots */}
                  <circle cx="5" cy="32" r="3" fill="#7C1FA8" />
                  <circle cx="22" cy="24" r="3" fill="#7C1FA8" />
                  <circle cx="38" cy="26" r="3" fill="#7C1FA8" />
                  <circle cx="55" cy="18" r="3" fill="#7C1FA8" />
                  <circle cx="70" cy="21" r="3" fill="#7C1FA8" />
                  <circle cx="85" cy="12" r="3" fill="#7C1FA8" />
                  <circle cx="95" cy="6" r="4" fill="#7C1FA8" stroke="white" strokeWidth="2" />
                </svg>
              </div>

              {/* Y-o-Y Growth Pill */}
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-extrabold text-[10.5px]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  <AnimatedCounter end={18.6} decimals={1} suffix="%" />
                </span>
                <span className="text-[9.5px] font-semibold text-[#544F66] font-sans">
                  Y-o-Y Growth
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. INVEST YOUR WAY. GROW EVERY DAY. SECTION (ZERO HOVER EFFECTS) */}
      <section id="invest-solutions" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none scroll-mt-24">
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
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans select-none">
        
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10 font-sans select-none">
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
