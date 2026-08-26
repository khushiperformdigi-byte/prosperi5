import React, { useState, useEffect, useRef } from 'react';
import { FiShield, FiTarget, FiTrendingUp, FiPieChart, FiCalendar, FiUsers, FiCheckCircle, FiUser, FiFileText, FiCreditCard } from 'react-icons/fi';
import Footer from './Footer';

export default function InvestmentPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(false);
  // Calculator state
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);
  const [stepsVisible, setStepsVisible] = useState(false);
  const stepsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStepsVisible(true); },
      { threshold: 0.15 }
    );
    if (stepsRef.current) observer.observe(stepsRef.current);
    return () => observer.disconnect();
  }, []);

  // Compound Interest Calculation for SIP
  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 12 / 100;
    const n = (parseFloat(timePeriod) || 0) * 12;

    if (P <= 0 || n <= 0 || r <= 0) {
      return { futureValue: 0, invested: 0, gainPercent: 0 };
    }

    const futureValue = Math.round(P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = P * n;
    const gain = futureValue - invested;
    const gainPercent = Math.round((gain / invested) * 100);

    return { futureValue, invested, gainPercent };
  };

  const { futureValue, invested, gainPercent } = calculateSIP();

  // Dynamic calculation for comparison chart (working in sync with Left Card inputs)
  const getComparisonData = () => {
    const P = parseFloat(monthlyInvestment) || 0;
    const r_inv = (parseFloat(expectedReturn) || 0) / 12 / 100;
    const r_trad = 6 / 12 / 100; // 6% p.a. traditional savings return rate

    const t3 = Math.max(1, parseInt(timePeriod) || 15);
    const t1 = Math.max(1, Math.round(t3 / 3));
    const t2 = Math.max(t1 + 1, Math.round((2 * t3) / 3));

    const calculateFV = (years, rate) => {
      if (P <= 0 || years <= 0 || rate <= 0) return 0;
      const n = years * 12;
      return Math.round(P * ((Math.pow(1 + rate, n) - 1) / rate) * (1 + rate));
    };

    const periods = [
      { years: t1, label: `${t1} ${t1 === 1 ? 'Year' : 'Years'}` },
      { years: t2, label: `${t2} Years` },
      { years: t3, label: `${t3} Years` }
    ];

    const items = periods.map((p) => {
      const invFV = calculateFV(p.years, r_inv);
      const tradFV = calculateFV(p.years, r_trad);
      return {
        ...p,
        invFV,
        tradFV
      };
    });

    const maxVal = Math.max(...items.map((d) => d.invFV), 100000);

    return { items, maxVal };
  };

  const { items: comparisonItems, maxVal: comparisonMaxVal } = getComparisonData();

  const formatLakhs = (val) => {
    if (!val || val <= 0) return '₹0';
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(1)}Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    if (val >= 1000) {
      return `₹${(val / 1000).toFixed(0)}k`;
    }
    return `₹${val}`;
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] font-body text-body-text antialiased selection:bg-purple-100 selection:text-primary-purple overflow-x-hidden">
      
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
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Investment Solutions · High Returns & Growth</span>
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
            <button onClick={() => onNavigatePage && onNavigatePage('about')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">About Us</button>
            <button onClick={() => onNavigatePage && onNavigatePage('investment')} className="text-[#7C1FA8] font-bold cursor-pointer">Investment</button>
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

      {/* 2. FULL-WIDTH HERO SECTION (COMPACT TOP PADDING - NO TOP GAP) */}
      <section className="w-full bg-gradient-to-br from-[#FAF5FD] via-[#FDFBFD] to-[#F6EEFC] pt-3 pb-6 lg:pt-4 lg:pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-purple-100/50 flex items-center">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-pink-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-extrabold text-[#1E1B2E] leading-[1.12] tracking-tight">
              Smart Investments.<br />
              <span className="bg-gradient-to-r from-[#7C1FAB] via-[#C81E8C] to-[#F5A623] bg-clip-text text-transparent">
                Bigger Tomorrow.
              </span>
            </h1>

            <p className="text-base sm:text-lg font-body text-[#544F66] max-w-lg mx-auto lg:mx-0 font-semibold leading-relaxed">
              Grow your wealth with trusted investment solutions that match your goals and risk comfort.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={() => setSelectedModal(true)}
                className="bg-[#7C1FAB] hover:bg-[#63148B] text-white font-bold px-8 py-4 rounded-[18px] text-sm sm:text-base shadow-xl shadow-[#7C1FAB]/25 transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
              >
                <span>Start Investing</span>
                <span className="text-lg font-normal">→</span>
              </button>

              <button 
                onClick={() => setSelectedModal(true)}
                className="border-2 border-[#7C1FAB] text-[#7C1FAB] hover:bg-[#7C1FAB]/10 font-bold px-7 py-4 rounded-[18px] text-sm sm:text-base transition-all cursor-pointer"
              >
                Talk to Expert
              </button>
            </div>

            {/* Trust Badges with React Icons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs sm:text-sm font-body font-extrabold text-[#1E1B2E]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5EEFB] border border-purple-200/80 text-[#7C1FAB] flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <FiShield className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Secure & Trusted</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5EEFB] border border-purple-200/80 text-[#7C1FAB] flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <FiTarget className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Goal Based Planning</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5EEFB] border border-purple-200/80 text-[#7C1FAB] flex items-center justify-center font-bold shrink-0 shadow-2xs">
                  <FiTrendingUp className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span>Long Term Growth</span>
              </div>
            </div>

          </div>

          {/* Right Hero Graphic Column - Transparent 3D Graphic */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative h-full">
            <img 
              src="/dc1af9b7-84fe-44db-9ec3-7674a25fd1fd.png" 
              alt="Smart Investments 3D Growth Illustration" 
              className="w-full max-w-[620px] lg:max-w-[680px] h-[300px] sm:h-[360px] lg:h-[400px] object-contain object-center transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* 3. INVESTMENT PLANS SECTION */}
        <section className="space-y-6 pt-2">
          
          <div className="text-center space-y-2">
            <span className="bg-[#F5EEFB] text-[#7C1FAB] text-[11px] font-body font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-200/60 shadow-2xs inline-block">
              INVESTMENT PLANS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-heading font-extrabold text-[#1E1B2E] tracking-tight">
              Choose the Right Investment for Your Goals
            </h2>
            <p className="text-sm sm:text-base lg:text-[17px] font-body text-[#544F66] font-semibold">
              Diversify. Grow. Secure.
            </p>
          </div>

          {/* 5 Equal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-3">
            
            {/* Card 1: Mutual Funds */}
            <div className="bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[24px] p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 shadow-2xs hover:shadow-xl hover:shadow-[#7C1FAB]/20 hover:-translate-y-1.5 group cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs">
                  <FiPieChart className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">Mutual Funds</h3>
                  <p className="text-xs font-body text-[#544F66] group-hover:text-white font-semibold mt-1.5 leading-snug transition-colors">Professional management, higher growth potential.</p>
                </div>
              </div>
              <div className="pt-5 text-xs font-body font-extrabold text-[#C81E8C] group-hover:text-[#F5A623] flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all">
                <span>Explore</span>
                <span className="text-sm font-normal">→</span>
              </div>
            </div>

            {/* Card 2: SIP */}
            <div className="bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[24px] p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 shadow-2xs hover:shadow-xl hover:shadow-[#7C1FAB]/20 hover:-translate-y-1.5 group cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs">
                  <FiCalendar className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">SIP</h3>
                  <p className="text-xs font-body text-[#544F66] group-hover:text-white font-semibold mt-1.5 leading-snug transition-colors">Small steps, big wealth over time.</p>
                </div>
              </div>
              <div className="pt-5 text-xs font-body font-extrabold text-[#C81E8C] group-hover:text-[#F5A623] flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all">
                <span>Explore</span>
                <span className="text-sm font-normal">→</span>
              </div>
            </div>

            {/* Card 3: Stocks */}
            <div className="bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[24px] p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 shadow-2xs hover:shadow-xl hover:shadow-[#7C1FAB]/20 hover:-translate-y-1.5 group cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs">
                  <FiTrendingUp className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">Stocks</h3>
                  <p className="text-xs font-body text-[#544F66] group-hover:text-white font-semibold mt-1.5 leading-snug transition-colors">Own a part of leading companies.</p>
                </div>
              </div>
              <div className="pt-5 text-xs font-body font-extrabold text-[#C81E8C] group-hover:text-[#F5A623] flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all">
                <span>Explore</span>
                <span className="text-sm font-normal">→</span>
              </div>
            </div>

            {/* Card 4: Bonds */}
            <div className="bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[24px] p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 shadow-2xs hover:shadow-xl hover:shadow-[#7C1FAB]/20 hover:-translate-y-1.5 group cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs">
                  <FiShield className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">Bonds</h3>
                  <p className="text-xs font-body text-[#544F66] group-hover:text-white font-semibold mt-1.5 leading-snug transition-colors">Stable returns with lower risk.</p>
                </div>
              </div>
              <div className="pt-5 text-xs font-body font-extrabold text-[#C81E8C] group-hover:text-[#F5A623] flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all">
                <span>Explore</span>
                <span className="text-sm font-normal">→</span>
              </div>
            </div>

            {/* Card 5: Retirement Plans */}
            <div className="bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[24px] p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 shadow-2xs hover:shadow-xl hover:shadow-[#7C1FAB]/20 hover:-translate-y-1.5 group cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs">
                  <FiUsers className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">Retirement Plans</h3>
                  <p className="text-xs font-body text-[#544F66] group-hover:text-white font-semibold mt-1.5 leading-snug transition-colors">A stress-free future for you & your family.</p>
                </div>
              </div>
              <div className="pt-5 text-xs font-body font-extrabold text-[#C81E8C] group-hover:text-[#F5A623] flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all">
                <span>Explore</span>
                <span className="text-sm font-normal">→</span>
              </div>
            </div>

          </div>

        {/* 3. END OF TOP CONTAINER */}
        </section>
      </main>

      {/* 4. WHY INVEST WITH US SECTION (FULL-WIDTH COMPACT WITH BG IMAGE) */}
      <section className="w-full bg-cover bg-center bg-no-repeat py-7 lg:py-9 border-y border-purple-100/60 my-4 relative overflow-hidden" style={{ backgroundImage: "url('/partner-value-bg.png')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 3D Circle Visual - Increased Size */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <img 
                src="/ChatGPT Image Aug 24, 2026, 11_00_47 AM.png" 
                alt="A Smarter Way to Build Wealth 3D Illustration" 
                className="w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] object-contain transition-transform duration-300 hover:scale-105 filter drop-shadow-xl"
              />
            </div>

            {/* Right Features - Deep Purple Styling */}
            <div className="lg:col-span-7 space-y-3.5">
              <div>
                <span className="bg-[#F5EEFB] text-[#7C1FAB] text-[10px] sm:text-[11px] font-body font-extrabold px-4 py-1 rounded-full uppercase tracking-wider border border-purple-200/60 shadow-2xs inline-block">
                  WHY INVEST WITH US
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-heading font-extrabold text-[#1E1B2E] tracking-tight mt-1.5">
                  A Smarter Way to Build Wealth
                </h2>
              </div>

              {/* 4 Deep Purple Feature Capsules */}
              <div className="space-y-2.5">
                
                {/* Feature 1 */}
                <div className="bg-[#7C1FAB] hover:bg-[#63148B] py-2.5 px-4.5 rounded-[16px] border border-[#7C1FAB] shadow-md flex items-center gap-3.5 transition-all hover:translate-x-1.5 group cursor-pointer">
                  <div className="w-8 h-8 rounded-xl bg-[#F5A623] text-[#1E1B2E] flex items-center justify-center shrink-0 shadow-2xs font-extrabold group-hover:scale-105 transition-transform">
                    <FiUsers className="w-4.5 h-4.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-[#F5A623]">Expert Guidance</span>
                    <span className="text-xs font-body text-white/90 font-semibold ml-2.5">– Personalized investment plans</span>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-[#7C1FAB] hover:bg-[#63148B] py-2.5 px-4.5 rounded-[16px] border border-[#7C1FAB] shadow-md flex items-center gap-3.5 transition-all hover:translate-x-1.5 group cursor-pointer">
                  <div className="w-8 h-8 rounded-xl bg-[#F5A623] text-[#1E1B2E] flex items-center justify-center shrink-0 shadow-2xs font-extrabold group-hover:scale-105 transition-transform">
                    <FiCheckCircle className="w-4.5 h-4.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-[#F5A623]">Transparent & Safe</span>
                    <span className="text-xs font-body text-white/90 font-semibold ml-2.5">– Your money, our responsibility</span>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-[#7C1FAB] hover:bg-[#63148B] py-2.5 px-4.5 rounded-[16px] border border-[#7C1FAB] shadow-md flex items-center gap-3.5 transition-all hover:translate-x-1.5 group cursor-pointer">
                  <div className="w-8 h-8 rounded-xl bg-[#F5A623] text-[#1E1B2E] flex items-center justify-center shrink-0 shadow-2xs font-extrabold group-hover:scale-105 transition-transform">
                    <FiTrendingUp className="w-4.5 h-4.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-[#F5A623]">Long Term Growth</span>
                    <span className="text-xs font-body text-white/90 font-semibold ml-2.5">– Build wealth steadily</span>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-[#7C1FAB] hover:bg-[#63148B] py-2.5 px-4.5 rounded-[16px] border border-[#7C1FAB] shadow-md flex items-center gap-3.5 transition-all hover:translate-x-1.5 group cursor-pointer">
                  <div className="w-8 h-8 rounded-xl bg-[#F5A623] text-[#1E1B2E] flex items-center justify-center shrink-0 shadow-2xs font-extrabold group-hover:scale-105 transition-transform">
                    <FiCheckCircle className="w-4.5 h-4.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-[#F5A623]">Goal Focused</span>
                    <span className="text-xs font-body text-white/90 font-semibold ml-2.5">– Plan for life's big moments</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* RE-OPEN MAIN CONTAINER FOR TOOLS & SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">


        {/* 5. INTERACTIVE FINANCIAL TOOLS (CALCULATOR & COMPARISON CHART) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: INVESTMENT CALCULATOR CARD WITH CUSTOM BACKGROUND IMAGE */}
          <div 
            className="lg:col-span-6 rounded-[32px] p-6 lg:p-7 border border-purple-500/30 shadow-xl space-y-5 flex flex-col justify-between relative overflow-hidden bg-cover bg-center text-white"
            style={{ backgroundImage: "url('/ChatGPT Image Aug 12, 2026, 09_15_25 PM.png')" }}
          >
            
            <div className="space-y-4 relative z-10">
              
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <FiShield className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white leading-tight">Investment Calculator</h3>
                  <p className="text-xs sm:text-sm font-body text-purple-100 font-semibold mt-0.5">See how your money can grow</p>
                </div>
              </div>

              {/* Calculator Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-1">
                
                {/* Inputs Left Column */}
                <div className="sm:col-span-7 space-y-3.5">
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-body font-extrabold text-purple-100">Monthly Investment</label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-2.5 text-xs font-heading text-[#544F66] font-bold">₹</span>
                        <input 
                          type="number" 
                          value={monthlyInvestment}
                          onChange={(e) => setMonthlyInvestment(e.target.value)}
                          className="w-full bg-white border border-white/80 rounded-xl py-2 pl-7 pr-2 text-xs font-heading font-extrabold text-[#1E1B2E] focus:outline-none focus:border-[#7C1FAB] shadow-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-body font-extrabold text-purple-100">Expected Return (%)</label>
                      <div className="relative mt-1">
                        <input 
                          type="number" 
                          value={expectedReturn}
                          onChange={(e) => setExpectedReturn(e.target.value)}
                          className="w-full bg-white border border-white/80 rounded-xl py-2 px-3 text-xs font-heading font-extrabold text-[#1E1B2E] focus:outline-none focus:border-[#7C1FAB] shadow-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="space-y-1 pt-1">
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      className="w-full accent-[#F5A623] cursor-pointer h-2 bg-white/30 rounded-lg"
                    />
                  </div>

                  {/* Time Period Input */}
                  <div>
                    <label className="text-[11px] font-body font-extrabold text-purple-100">Time Period (Years)</label>
                    <input 
                      type="number" 
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      className="w-full bg-white border border-white/80 rounded-xl py-2 px-3 text-xs font-heading font-extrabold text-[#1E1B2E] focus:outline-none focus:border-[#7C1FAB] shadow-md mt-1"
                    />
                  </div>

                </div>

                {/* Glassmorphic Result Card Right Column */}
                <div className="sm:col-span-5 bg-white/95 backdrop-blur-md rounded-[24px] p-5 border border-white/80 shadow-lg text-[#1E1B2E] flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-body font-extrabold text-[#1E1B2E]">Future Value</span>
                      <FiTrendingUp className="w-5 h-5 text-[#7C1FAB]" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#7C1FAB] tracking-tight pt-1">
                      {formatCurrency(calculateSIP().futureValue || 4274000)}
                    </div>
                    <div className="border-b border-purple-100/80 my-2"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-heading font-extrabold text-[#10B981] flex items-center gap-1">
                        +{calculateSIP().gainPercent || 327}% ▲
                      </span>
                      <span className="text-[11px] font-body text-[#8E8A9D] font-medium">(Approx.)</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Calculate Button */}
            <button 
              onClick={() => setSelectedModal(true)}
              className="w-full bg-[#7C1FAB] hover:bg-[#63148B] text-white font-body font-extrabold py-3.5 rounded-2xl text-sm shadow-xl shadow-[#7C1FAB]/40 border border-purple-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] mt-2 relative z-10"
            >
              <span>Calculate Growth</span>
              <span className="text-base font-normal">→</span>
            </button>

          </div>


          {/* RIGHT: INVESTMENT VS TRADITIONAL SAVINGS CHART CARD */}
          <div className="lg:col-span-6 rounded-[32px] p-6 lg:p-7 border border-[#D4BEE8] shadow-2xs space-y-5 flex flex-col justify-between" style={{ backgroundColor: '#e9dff2' }}>
            
            <div className="space-y-4">
              
              {/* Header & Legend */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/60 border border-purple-200/60 text-[#7C1FAB] flex items-center justify-center shrink-0 shadow-2xs">
                    <FiTrendingUp className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-xl text-[#1E1B2E] leading-tight">Investment vs Traditional Savings</h3>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 text-xs font-body font-extrabold shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-[#F5A623]"></span>
                    <span className="text-[#1E1B2E]">Investment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-[#7C1FAB]"></span>
                    <span className="text-[#544F66]">Traditional Savings</span>
                  </div>
                </div>
              </div>

              {/* Light Chart Canvas */}
              <div className="bg-white/80 backdrop-blur-md rounded-[24px] p-5 lg:p-6 border border-purple-100/60 shadow-md relative space-y-4">
                
                {/* Y-Axis Grid Lines & Chart Area */}
                <div className="relative h-[180px] flex items-end justify-between px-2 pt-6">
                  
                  {/* Dashed Horizontal Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-[#8E8A9D] font-bold">
                    <div className="border-b border-dashed border-purple-100 flex items-center justify-between pb-0.5">
                      <span>{formatLakhs(comparisonMaxVal)}</span>
                    </div>
                    <div className="border-b border-dashed border-purple-100 flex items-center justify-between pb-0.5">
                      <span>{formatLakhs(comparisonMaxVal * 0.66)}</span>
                    </div>
                    <div className="border-b border-dashed border-purple-100 flex items-center justify-between pb-0.5">
                      <span>{formatLakhs(comparisonMaxVal * 0.33)}</span>
                    </div>
                    <div className="border-b border-purple-200 flex items-center justify-between pb-0.5">
                      <span>0</span>
                    </div>
                  </div>

                  {/* Dynamic Bars Container */}
                  <div className="w-full flex items-end justify-around relative z-10 pl-8">
                    {comparisonItems.map((item, idx) => {
                      const invH = Math.max(14, Math.round((item.invFV / comparisonMaxVal) * 125));
                      const tradH = Math.max(10, Math.round((item.tradFV / comparisonMaxVal) * 125));

                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="flex items-end gap-1.5">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[11px] font-heading font-extrabold text-[#F5A623]">
                                {formatLakhs(item.invFV)}
                              </span>
                              <div 
                                style={{ height: `${invH}px` }}
                                className="w-7 sm:w-8 bg-[#F5A623] rounded-t-xl transition-all duration-300 hover:brightness-110 shadow-2xs"
                              />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[11px] font-heading font-bold text-[#544F66]">
                                {formatLakhs(item.tradFV)}
                              </span>
                              <div 
                                style={{ height: `${tradH}px` }}
                                className="w-7 sm:w-8 bg-[#7C1FAB] rounded-t-xl transition-all duration-300 hover:brightness-105 shadow-2xs"
                              />
                            </div>
                          </div>
                          <span className="text-xs font-body font-extrabold text-[#1E1B2E] mt-3">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* 6. HOW IT WORKS SECTION */}
        <section className="space-y-4 pt-2">
          
          <div className="text-center space-y-1.5">
            <span className="bg-[#F5EEFB] text-[#7C1FAB] text-[10px] font-body font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-purple-200/60 shadow-2xs inline-block">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl sm:text-[28px] font-heading font-extrabold text-[#1E1B2E] tracking-tight">
              Simple Steps to Start Investing
            </h2>
            <p className="text-sm sm:text-base lg:text-[17px] font-body text-[#544F66] font-semibold">
              A hassle-free journey towards financial freedom.
            </p>
          </div>

          {/* 4 Step Cards Grid (No Numbers, Connecting Arrows) */}
          <div ref={stepsRef} className="flex flex-col lg:flex-row items-center justify-between gap-3 pt-1">
            
            {/* Step 1 */}
            <div
              className="w-full bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[20px] p-4 flex flex-col items-center text-center space-y-2 transition-all duration-300 shadow-2xs hover:shadow-lg hover:shadow-[#7C1FAB]/20 hover:-translate-y-1 group cursor-pointer"
              style={{
                opacity: stepsVisible ? 1 : 0,
                transform: stepsVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: stepsVisible
                  ? 'opacity 0.5s ease 0s, transform 0.5s ease 0s'
                  : 'none',
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs shrink-0">
                <FiUser className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">Assess Your Goals</h3>
                <p className="text-[11px] font-body text-[#544F66] group-hover:text-white font-semibold mt-1 leading-snug transition-colors">Tell us about your financial dreams</p>
              </div>
            </div>

            {/* Connecting Arrow 1 */}
            <span className="hidden lg:block text-[#7C1FAB] text-xl font-bold px-0.5 shrink-0">→</span>

            {/* Step 2 */}
            <div
              className="w-full bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[20px] p-4 flex flex-col items-center text-center space-y-2 transition-all duration-300 shadow-2xs hover:shadow-lg hover:shadow-[#7C1FAB]/20 hover:-translate-y-1 group cursor-pointer"
              style={{
                opacity: stepsVisible ? 1 : 0,
                transform: stepsVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: stepsVisible
                  ? 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s'
                  : 'none',
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs shrink-0">
                <FiFileText className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">Get a Plan</h3>
                <p className="text-[11px] font-body text-[#544F66] group-hover:text-white font-semibold mt-1 leading-snug transition-colors">Choose the right investment strategy</p>
              </div>
            </div>

            {/* Connecting Arrow 2 */}
            <span className="hidden lg:block text-[#7C1FAB] text-xl font-bold px-0.5 shrink-0">→</span>

            {/* Step 3 */}
            <div
              className="w-full bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[20px] p-4 flex flex-col items-center text-center space-y-2 transition-all duration-300 shadow-2xs hover:shadow-lg hover:shadow-[#7C1FAB]/20 hover:-translate-y-1 group cursor-pointer"
              style={{
                opacity: stepsVisible ? 1 : 0,
                transform: stepsVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: stepsVisible
                  ? 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s'
                  : 'none',
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs shrink-0">
                <FiCreditCard className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">Invest Smartly</h3>
                <p className="text-[11px] font-body text-[#544F66] group-hover:text-white font-semibold mt-1 leading-snug transition-colors">Start with SIP or lumpsum</p>
              </div>
            </div>

            {/* Connecting Arrow 3 */}
            <span className="hidden lg:block text-[#7C1FAB] text-xl font-bold px-0.5 shrink-0">→</span>

            {/* Step 4 */}
            <div
              className="w-full bg-[#FAF4FD] hover:bg-[#7C1FAB] border border-[#EBE3F5] hover:border-[#7C1FAB] rounded-[20px] p-4 flex flex-col items-center text-center space-y-2 transition-all duration-300 shadow-2xs hover:shadow-lg hover:shadow-[#7C1FAB]/20 hover:-translate-y-1 group cursor-pointer"
              style={{
                opacity: stepsVisible ? 1 : 0,
                transform: stepsVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: stepsVisible
                  ? 'opacity 0.5s ease 0.45s, transform 0.5s ease 0.45s'
                  : 'none',
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100/60 border border-purple-200/60 text-[#8B1FA8] group-hover:bg-[#F5A623] group-hover:border-[#F5A623] group-hover:text-[#1E1B2E] flex items-center justify-center group-hover:scale-110 transition-all shadow-2xs shrink-0">
                <FiTrendingUp className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-sm text-[#1E1B2E] group-hover:text-[#F5A623] transition-colors">Watch Your Wealth Grow</h3>
                <p className="text-[11px] font-body text-[#544F66] group-hover:text-white font-semibold mt-1 leading-snug transition-colors">Stay on track to achieve your goals</p>
              </div>
            </div>

          </div>

        </section>


        {/* 7. CTA BANNER */}
        <section className="bg-gradient-to-r from-[#461065] via-[#7C1FAB] to-[#5E1083] rounded-[20px] p-4 lg:p-5 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-lg shrink-0">
              🏆
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-heading font-extrabold tracking-tight">Build a Stronger Financial Future</h2>
              <p className="text-xs sm:text-sm font-body text-white/90 font-semibold mt-0.5">Invest today. Secure tomorrow.</p>
            </div>
          </div>

          <button 
            onClick={() => setSelectedModal(true)}
            className="bg-accent-gold hover:bg-[#D49300] text-heading-ink font-body font-extrabold px-5 py-2 rounded-full text-xs transition-all shadow-md cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
          >
            Start Your Investment Journey →
          </button>

        </section>


      </main>

      {/* SHARED FOOTER */}
      <Footer onNavigatePage={onNavigatePage} />

    </div>
  );
}
