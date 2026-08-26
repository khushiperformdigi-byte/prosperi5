import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function ToolsPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCalculatorModal, setActiveCalculatorModal] = useState(null); // 'sip' | 'emi' | 'term' | 'las' | 'expert' | null

  // SIP Calculator state
  const [sipAmount, setSipAmount] = useState(10000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // EMI Calculator state
  const [emiAmount, setEmiAmount] = useState(2500000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiYears, setEmiYears] = useState(20);

  // Term Insurance state
  const [termAge, setTermAge] = useState(30);
  const [termIncome, setTermIncome] = useState(1200000);
  const [termCoverYears, setTermCoverYears] = useState(30);
  const [isSmoker, setIsSmoker] = useState(false);

  // Loan Against Securities state
  const [lasPortfolio, setLasPortfolio] = useState(2000000);
  const [lasSecurityType, setLasSecurityType] = useState('mutual_funds_equity'); // 'mutual_funds_equity' | 'mutual_funds_debt' | 'stocks' | 'bonds'

  useEffect(() => {
    if (mobileMenuOpen || activeCalculatorModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, activeCalculatorModal]);

  // Calculations
  const calculateSIP = () => {
    const P = parseFloat(sipAmount) || 0;
    const i = (parseFloat(sipRate) || 0) / 12 / 100;
    const n = (parseFloat(sipYears) || 0) * 12;
    if (P <= 0 || n <= 0 || i <= 0) return { invested: 0, returns: 0, total: 0 };
    const total = Math.round(P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const invested = Math.round(P * n);
    const returns = total - invested;
    return { invested, returns, total };
  };

  const calculateEMI = () => {
    const P = parseFloat(emiAmount) || 0;
    const r = (parseFloat(emiRate) || 0) / 12 / 100;
    const n = (parseFloat(emiYears) || 0) * 12;
    if (P <= 0 || n <= 0 || r <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };
    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalPayment = Math.round(emi * n);
    const totalInterest = totalPayment - P;
    return { emi, totalInterest, totalPayment };
  };

  const calculateTermCover = () => {
    const income = parseFloat(termIncome) || 0;
    const recommendedCover = Math.round(income * 15);
    // Base estimation formula
    const basePerLakh = isSmoker ? 14 : 9;
    const ageMultiplier = termAge > 35 ? 1.4 : termAge > 45 ? 2.1 : 1.0;
    const monthlyPremium = Math.round(((recommendedCover / 100000) * basePerLakh * ageMultiplier) / 12);
    return { recommendedCover, monthlyPremium };
  };

  const calculateLAS = () => {
    const portfolio = parseFloat(lasPortfolio) || 0;
    let ltv = 0.5; // 50%
    let interestRate = 9.5;
    if (lasSecurityType === 'mutual_funds_debt') {
      ltv = 0.7;
      interestRate = 9.0;
    } else if (lasSecurityType === 'stocks') {
      ltv = 0.5;
      interestRate = 10.0;
    } else if (lasSecurityType === 'bonds') {
      ltv = 0.8;
      interestRate = 8.75;
    }
    const maxLoan = Math.round(portfolio * ltv);
    const monthlyInterest = Math.round((maxLoan * (interestRate / 100)) / 12);
    return { maxLoan, ltvPercentage: ltv * 100, interestRate, monthlyInterest };
  };

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const sipResults = calculateSIP();
  const emiResults = calculateEMI();
  const termResults = calculateTermCover();
  const lasResults = calculateLAS();

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FAB] overflow-x-hidden">
      
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
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Smart Tools · Calculators & Future Planning</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Instant Results · 100% Accurate · Private & Secure
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setActiveCalculatorModal('expert')}
              className="bg-[#F5A623] hover:bg-[#D49300] text-[#1E1B2E] font-bold px-4 py-1.5 rounded-full text-[10px] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.25 6.622c0-1.077.873-1.95 1.95-1.95h2.25c.877 0 1.63.585 1.85 1.432l.711 2.766c.2.783-.062 1.615-.67 2.115l-1.56 1.287a15.776 15.776 0 0 0 6.6 6.6l1.287-1.56c.5-.608 1.332-.87 2.115-.67l2.766.711c.847.22 1.432.973 1.432 1.85v2.25c0 1.077-.873 1.95-1.95 1.95h-2.25a16.5 16.5 0 0 1-16.5-16.5v-2.25Z" />
              </svg>
              Talk to an Expert
            </button>

            <div className="flex items-center gap-3 sm:gap-4 text-[#EBE8EF]/80 text-xs">
              <span className="text-[#EBE8EF]/20">|</span>
              <a href="#partner-login" className="hover:text-white transition-colors flex items-center gap-1 font-medium">
                <svg className="w-3.5 h-3.5 text-muted-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Partner Login
              </a>
              <span className="text-[#EBE8EF]/20">|</span>
              <a href="#investor-login" className="hover:text-white transition-colors flex items-center gap-1 font-medium">
                <svg className="w-3.5 h-3.5 text-muted-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Investor Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FLOATING NAVBAR */}
      <nav className={`sticky top-0 lg:top-2 max-w-7xl mx-auto px-0 lg:px-4 relative font-sans transition-all ${mobileMenuOpen ? 'z-[9999]' : 'z-50'}`}>
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-[#EBE3F5] shadow-sm lg:shadow-[0_12px_40px_rgba(30,27,46,0.06)] h-[72px] lg:h-[56px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">
          
          {/* Top gradient border line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C1FAB] via-[#C81E8C] to-[#F5A623] rounded-t-full"></div>

          {/* Brand Logo */}
          <div className="flex items-center gap-6 cursor-pointer group" onClick={onNavigateHome}>
            <img src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png" className="w-[128px] lg:w-[140px] h-[40px] lg:h-[44px] object-contain transition-transform duration-300 group-hover:scale-[1.02]" alt="PROSPERi5 Logo" />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#1E1B2E]">
            <button onClick={onNavigateHome} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Home</button>
            <button onClick={() => onNavigatePage && onNavigatePage('about')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">About Us</button>
            
            {/* Solutions Dropdown */}
            <div className="relative group py-1">
              <button className="hover:text-[#7C1FA8] transition-colors flex items-center gap-1 font-semibold cursor-pointer py-1">
                Solutions
                <svg className="w-3.5 h-3.5 text-heading-ink/80 group-hover:text-[#7C1FA8] transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col bg-white/98 backdrop-blur-md border border-[#EBE8EF] rounded-[22px] p-3 shadow-[0_15px_40px_rgba(30,27,46,0.12)] w-[285px] space-y-1.5 animate-in fade-in slide-in-from-top-2 z-[9999] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7C1FAB] via-[#C81E8C] to-[#F5A623]"></div>

                <button 
                  onClick={() => onNavigatePage && onNavigatePage('protect')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7C1FAB] text-white flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 transition-all">
                    🛡️
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#7C1FAB] transition-colors block">Protect</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Health, Life & Property Security</span>
                  </div>
                </button>

                <button 
                  onClick={() => onNavigatePage && onNavigatePage('investment')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5FD] border border-purple-200 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 group-hover/item:bg-[#7C1FAB] group-hover/item:text-white transition-all">
                    📈
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#7C1FAB] transition-colors block">Investment</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">SIP, Mutual Funds, Stocks</span>
                  </div>
                </button>

                <button 
                  onClick={() => onNavigatePage && onNavigatePage('insurance')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FCEBF4] border border-pink-200 text-[#C81E8C] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 group-hover/item:bg-[#C81E8C] group-hover/item:text-white transition-all">
                    🛡️
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#C81E8C] transition-colors block">Insurance</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Health, Life, Motor & Property</span>
                  </div>
                </button>

                <button 
                  onClick={() => onNavigatePage && onNavigatePage('financing')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFF4DE] border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 group-hover/item:bg-[#F5A623] group-hover/item:text-white transition-all">
                    💰
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#D49300] transition-colors block">Financing</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Business Loans, LAP & Capital</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Tools Page Active Tab Indicator */}
            <button className="text-[#7C1FA8] font-bold cursor-pointer py-1 relative after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full">
              Tools
            </button>
            <button onClick={() => onNavigatePage && onNavigatePage('blog')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Blog</button>
            <button onClick={() => onNavigatePage && onNavigatePage('investors')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Investors</button>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveCalculatorModal('expert')}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer"
            >
              Get Free Consultation
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
              { num: '02', label: 'About Us', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('about'); } },
              { num: '03', label: 'Tools', action: () => setMobileMenuOpen(false), active: true },
              { num: '04', label: 'Blog', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('blog'); } },
              { num: '05', label: 'Protect', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('protect'); } },
              { num: '06', label: 'Investment', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investment'); } },
              { num: '07', label: 'Insurance', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('insurance'); } },
              { num: '08', label: 'Financing', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('financing'); } },
              { num: '09', label: 'Investors', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investors'); } },
            ].map((item) => (
              <button key={item.num} onClick={item.action}
                className={`w-full h-[54px] rounded-[16px] border px-5 flex items-center gap-4 shadow-sm transition-all duration-200 cursor-pointer text-left ${item.active ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white hover:border-[#7C1FA8]'}`}>
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
          src="/tools_hero_banner.png" 
          alt="Calculate today. Plan better tomorrow. - Smart Tools by PROSPERi5" 
          className="w-full h-auto block select-none"
        />
      </section>

      {/* 4. ATTRACTIVE & BEAUTIFUL TOOLS 4-CARDS SECTION */}
      <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8FC] relative">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[#7C1FAB] text-xs sm:text-[13px] font-extrabold tracking-[0.18em] uppercase block mb-3">
              ALL THE TOOLS YOU NEED
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1E1B2E] tracking-tight leading-tight mb-4">
              Powerful tools for your financial journey
            </h2>
            <p className="text-[#544F66] text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
              Calculate, compare and plan smarter with our easy-to-use financial calculators.
            </p>
          </div>

          {/* 4 Premium Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

            {/* CARD 1: SIP CALCULATOR */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#EBE3F5] p-6 sm:p-8 lg:p-9 shadow-[0_8px_30px_rgba(30,27,46,0.04)] hover:shadow-[0_20px_45px_rgba(124,31,171,0.09)] transition-all duration-300 flex flex-col justify-between group hover:border-[#D8B4FE]/80 relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                
                {/* Left Text Block */}
                <div className="flex-1 space-y-4 text-left">
                  
                  {/* Badge & Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F5EEFB] text-[#7C1FAB] flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 group-hover:bg-[#7C1FAB] group-hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#1E1B2E]">
                      SIP Calculator
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                    Plan your investments and see how small steps today can create big wealth tomorrow.
                  </p>

                  {/* Checklist */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#7C1FAB] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Estimate future returns</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#7C1FAB] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Adjust SIP amount & duration</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#7C1FAB] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Detailed year-wise projection</span>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => onNavigatePage && onNavigatePage('sip-calculator')}
                      className="inline-flex items-center gap-2 border border-[#7C1FAB]/30 text-[#7C1FAB] hover:bg-[#7C1FAB] hover:text-white rounded-[14px] px-5 py-2.5 font-bold text-xs transition-all duration-300 shadow-sm cursor-pointer group-hover:border-[#7C1FAB]"
                    >
                      <span>Calculate SIP</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right 3D Graphic (Transparent background) */}
                <div className="w-full sm:w-[210px] md:w-[240px] h-[190px] sm:h-[220px] flex items-center justify-center shrink-0 relative mt-2 sm:mt-0">
                  <div className="absolute inset-0 bg-purple-100/30 rounded-full blur-2xl group-hover:bg-purple-200/40 transition-colors pointer-events-none"></div>
                  <img
                    src="/tools_card_sip.png"
                    alt="SIP Calculator 3D Illustration"
                    className="max-h-[190px] sm:max-h-[220px] w-auto object-contain select-none group-hover:scale-105 transition-transform duration-300 relative z-10"
                  />
                </div>

              </div>

            </div>

            {/* CARD 2: EMI CALCULATOR */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#EBE3F5] p-6 sm:p-8 lg:p-9 shadow-[0_8px_30px_rgba(30,27,46,0.04)] hover:shadow-[0_20px_45px_rgba(200,30,140,0.09)] transition-all duration-300 flex flex-col justify-between group hover:border-[#FBCFE8]/90 relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                
                {/* Left Text Block */}
                <div className="flex-1 space-y-4 text-left">
                  
                  {/* Badge & Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FCEBF4] text-[#C81E8C] flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 group-hover:bg-[#C81E8C] group-hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#1E1B2E]">
                      EMI Calculator
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                    Calculate your loan EMI and plan your repayments better.
                  </p>

                  {/* Checklist */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#C81E8C] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Monthly EMI estimation</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#C81E8C] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Total interest & payment breakup</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#C81E8C] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Compare different loan options</span>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => onNavigatePage && onNavigatePage('emi-calculator')}
                      className="inline-flex items-center gap-2 border border-[#C81E8C]/30 text-[#C81E8C] hover:bg-[#C81E8C] hover:text-white rounded-[14px] px-5 py-2.5 font-bold text-xs transition-all duration-300 shadow-sm cursor-pointer group-hover:border-[#C81E8C]"
                    >
                      <span>Calculate EMI</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right 3D Graphic (Transparent background) */}
                <div className="w-full sm:w-[210px] md:w-[240px] h-[190px] sm:h-[220px] flex items-center justify-center shrink-0 relative mt-2 sm:mt-0">
                  <div className="absolute inset-0 bg-pink-100/30 rounded-full blur-2xl group-hover:bg-pink-200/40 transition-colors pointer-events-none"></div>
                  <img
                    src="/tools_card_emi.png"
                    alt="EMI Calculator 3D Illustration"
                    className="max-h-[190px] sm:max-h-[220px] w-auto object-contain select-none group-hover:scale-105 transition-transform duration-300 relative z-10"
                  />
                </div>

              </div>

            </div>

            {/* CARD 3: TERM INSURANCE CALCULATOR */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#EBE3F5] p-6 sm:p-8 lg:p-9 shadow-[0_8px_30px_rgba(30,27,46,0.04)] hover:shadow-[0_20px_45px_rgba(245,166,35,0.09)] transition-all duration-300 flex flex-col justify-between group hover:border-[#FED7AA]/90 relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                
                {/* Left Text Block */}
                <div className="flex-1 space-y-4 text-left">
                  
                  {/* Badge & Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF4DE] text-[#EA580C] flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 group-hover:bg-[#EA580C] group-hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#1E1B2E]">
                      Term Insurance Calculator
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                    Find the right term insurance cover for your family's financial security.
                  </p>

                  {/* Checklist */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#EA580C] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Calculate coverage you need</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#EA580C] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Premium estimation</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#EA580C] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Compare plan benefits</span>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => onNavigatePage && onNavigatePage('term-insurance-calculator')}
                      className="inline-flex items-center gap-2 border border-[#EA580C]/30 text-[#EA580C] hover:bg-[#EA580C] hover:text-white rounded-[14px] px-5 py-2.5 font-bold text-xs transition-all duration-300 shadow-sm cursor-pointer group-hover:border-[#EA580C]"
                    >
                      <span>Calculate Coverage</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right 3D Graphic (Transparent background) */}
                <div className="w-full sm:w-[210px] md:w-[240px] h-[190px] sm:h-[220px] flex items-center justify-center shrink-0 relative mt-2 sm:mt-0">
                  <div className="absolute inset-0 bg-amber-100/30 rounded-full blur-2xl group-hover:bg-amber-200/40 transition-colors pointer-events-none"></div>
                  <img
                    src="/tools_card_term.png"
                    alt="Term Insurance 3D Illustration"
                    className="max-h-[190px] sm:max-h-[220px] w-auto object-contain select-none group-hover:scale-105 transition-transform duration-300 relative z-10"
                  />
                </div>

              </div>

            </div>

            {/* CARD 4: LOAN AGAINST SECURITIES CALCULATOR */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#EBE3F5] p-6 sm:p-8 lg:p-9 shadow-[0_8px_30px_rgba(30,27,46,0.04)] hover:shadow-[0_20px_45px_rgba(22,163,74,0.09)] transition-all duration-300 flex flex-col justify-between group hover:border-[#BBF7D0]/90 relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                
                {/* Left Text Block */}
                <div className="flex-1 space-y-4 text-left">
                  
                  {/* Badge & Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#16A34A] flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 group-hover:bg-[#16A34A] group-hover:text-white transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#1E1B2E]">
                      Loan Against Securities
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                    Unlock the value of your investments with quick and easy loans.
                  </p>

                  {/* Checklist */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#16A34A] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Loan eligibility estimation</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#16A34A] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Interest & repayment details</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#1E1B2E] font-medium">
                      <svg className="w-4 h-4 text-[#16A34A] shrink-0 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Max loan you can get</span>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => onNavigatePage && onNavigatePage('loan-against-securities')}
                      className="inline-flex items-center gap-2 border border-[#16A34A]/30 text-[#16A34A] hover:bg-[#16A34A] hover:text-white rounded-[14px] px-5 py-2.5 font-bold text-xs transition-all duration-300 shadow-sm cursor-pointer group-hover:border-[#16A34A]"
                    >
                      <span>Calculate Loan</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right 3D Graphic (Transparent background) */}
                <div className="w-full sm:w-[210px] md:w-[240px] h-[190px] sm:h-[220px] flex items-center justify-center shrink-0 relative mt-2 sm:mt-0">
                  <div className="absolute inset-0 bg-emerald-100/30 rounded-full blur-2xl group-hover:bg-emerald-200/40 transition-colors pointer-events-none"></div>
                  <img
                    src="/tools_card_las.png"
                    alt="Loan Against Securities 3D Illustration"
                    className="max-h-[190px] sm:max-h-[220px] w-auto object-contain select-none group-hover:scale-105 transition-transform duration-300 relative z-10"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE MODALS FOR REAL-TIME CALCULATIONS */}

      {/* SIP CALCULATOR MODAL */}
      {activeCalculatorModal === 'sip' && (
        <div className="fixed inset-0 bg-[#11081F]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-in fade-in zoom-in duration-200 my-8">
            <button
              onClick={() => setActiveCalculatorModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-purple-50 text-[#7C1FAB] hover:bg-purple-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EEFB] text-[#7C1FAB] flex items-center justify-center text-2xl font-bold">
                📈
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E1B2E]">SIP & Wealth Growth Calculator</h3>
                <p className="text-xs text-[#544F66]">Simulate the power of compounding for your monthly investments</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Sliders Column */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Monthly Investment</span>
                    <span className="text-[#7C1FAB] font-bold text-sm bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">{formatINR(sipAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="w-full accent-[#7C1FAB] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>₹500</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Expected Return Rate (p.a.)</span>
                    <span className="text-[#7C1FAB] font-bold text-sm bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">{sipRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full accent-[#7C1FAB] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Time Period (Years)</span>
                    <span className="text-[#7C1FAB] font-bold text-sm bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">{sipYears} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-[#7C1FAB] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>1 Yr</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Result Summary Box */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#F5EEFB] to-[#FAF5FD] border border-purple-200/80 rounded-2xl p-5 text-center space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#7C1FAB] uppercase tracking-wider block">Estimated Future Value</span>
                  <div className="text-2xl font-black text-[#1E1B2E] mt-1">{formatINR(sipResults.total)}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left bg-white/80 rounded-xl p-3 border border-purple-100/80">
                  <div>
                    <span className="text-[10px] text-gray-500 block font-medium">Invested Amount</span>
                    <span className="text-xs font-bold text-[#1E1B2E]">{formatINR(sipResults.invested)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-medium">Est. Returns</span>
                    <span className="text-xs font-bold text-[#16A34A]">+{formatINR(sipResults.returns)}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setActiveCalculatorModal(null); alert('Our investment advisor will help you start this SIP!'); }}
                  className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Start This SIP Today
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMI CALCULATOR MODAL */}
      {activeCalculatorModal === 'emi' && (
        <div className="fixed inset-0 bg-[#11081F]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-pink-100 relative animate-in fade-in zoom-in duration-200 my-8">
            <button
              onClick={() => setActiveCalculatorModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-pink-50 text-[#C81E8C] hover:bg-pink-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FCEBF4] text-[#C81E8C] flex items-center justify-center text-2xl font-bold">
                🏠
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E1B2E]">Loan & EMI Calculator</h3>
                <p className="text-xs text-[#544F66]">Plan monthly installments for Home, Business or Personal Loans</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Sliders Column */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Loan Amount</span>
                    <span className="text-[#C81E8C] font-bold text-sm bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-100">{formatINR(emiAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={emiAmount}
                    onChange={(e) => setEmiAmount(Number(e.target.value))}
                    className="w-full accent-[#C81E8C] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Interest Rate (% p.a.)</span>
                    <span className="text-[#C81E8C] font-bold text-sm bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-100">{emiRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.1"
                    value={emiRate}
                    onChange={(e) => setEmiRate(Number(e.target.value))}
                    className="w-full accent-[#C81E8C] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>5%</span>
                    <span>20%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Loan Tenure (Years)</span>
                    <span className="text-[#C81E8C] font-bold text-sm bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-100">{emiYears} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={emiYears}
                    onChange={(e) => setEmiYears(Number(e.target.value))}
                    className="w-full accent-[#C81E8C] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>1 Yr</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Result Summary Box */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#FCEBF4] to-[#FAF5FD] border border-pink-200/80 rounded-2xl p-5 text-center space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#C81E8C] uppercase tracking-wider block">Monthly EMI</span>
                  <div className="text-2xl font-black text-[#1E1B2E] mt-1">{formatINR(emiResults.emi)}<span className="text-xs font-normal text-gray-500">/mo</span></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left bg-white/80 rounded-xl p-3 border border-pink-100/80">
                  <div>
                    <span className="text-[10px] text-gray-500 block font-medium">Total Interest</span>
                    <span className="text-xs font-bold text-[#EA580C]">{formatINR(emiResults.totalInterest)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-medium">Total Payment</span>
                    <span className="text-xs font-bold text-[#1E1B2E]">{formatINR(emiResults.totalPayment)}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setActiveCalculatorModal(null); alert('Our loan advisor will assist you with the best loan rates!'); }}
                  className="w-full bg-[#C81E8C] hover:bg-[#a61573] text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Apply for Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TERM INSURANCE CALCULATOR MODAL */}
      {activeCalculatorModal === 'term' && (
        <div className="fixed inset-0 bg-[#11081F]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-100 relative animate-in fade-in zoom-in duration-200 my-8">
            <button
              onClick={() => setActiveCalculatorModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-amber-50 text-[#EA580C] hover:bg-amber-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4DE] text-[#EA580C] flex items-center justify-center text-2xl font-bold">
                🛡️
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E1B2E]">Term Insurance Cover Calculator</h3>
                <p className="text-xs text-[#544F66]">Find the ideal life cover to secure your family's future</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Inputs Column */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Your Current Age</span>
                    <span className="text-[#EA580C] font-bold text-sm bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">{termAge} Years</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    step="1"
                    value={termAge}
                    onChange={(e) => setTermAge(Number(e.target.value))}
                    className="w-full accent-[#EA580C] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Annual Income</span>
                    <span className="text-[#EA580C] font-bold text-sm bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">{formatINR(termIncome)}</span>
                  </div>
                  <input
                    type="range"
                    min="300000"
                    max="10000000"
                    step="100000"
                    value={termIncome}
                    onChange={(e) => setTermIncome(Number(e.target.value))}
                    className="w-full accent-[#EA580C] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <span className="text-xs font-semibold text-[#1E1B2E]">Tobacco / Smoking Consumer?</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSmoker(false)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${!isSmoker ? 'bg-[#EA580C] text-white' : 'bg-white text-gray-600 border'}`}
                    >
                      No
                    </button>
                    <button
                      onClick={() => setIsSmoker(true)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${isSmoker ? 'bg-[#EA580C] text-white' : 'bg-white text-gray-600 border'}`}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>

              {/* Result Summary Box */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#FFF4DE] to-[#FFFDF7] border border-amber-200/80 rounded-2xl p-5 text-center space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-wider block">Recommended Cover (15x)</span>
                  <div className="text-2xl font-black text-[#1E1B2E] mt-1">{formatINR(termResults.recommendedCover)}</div>
                </div>

                <div className="bg-white/90 rounded-xl p-3 border border-amber-200/80 text-center">
                  <span className="text-[10px] text-gray-500 block font-medium">Est. Starting Premium</span>
                  <span className="text-base font-black text-[#16A34A]">{formatINR(termResults.monthlyPremium)}<span className="text-[10px] font-normal text-gray-500">/month</span></span>
                </div>

                <button
                  onClick={() => { setActiveCalculatorModal(null); alert('Our insurance expert will share customized quotes!'); }}
                  className="w-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Get Exact Policy Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOAN AGAINST SECURITIES MODAL */}
      {activeCalculatorModal === 'las' && (
        <div className="fixed inset-0 bg-[#11081F]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 relative animate-in fade-in zoom-in duration-200 my-8">
            <button
              onClick={() => setActiveCalculatorModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-emerald-50 text-[#16A34A] hover:bg-emerald-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#16A34A] flex items-center justify-center text-2xl font-bold">
                💰
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1E1B2E]">Loan Against Securities (LAS) Planner</h3>
                <p className="text-xs text-[#544F66]">Borrow against Mutual Funds & Shares without selling your portfolio</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Inputs Column */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
                    <span className="text-[#544F66]">Portfolio Value</span>
                    <span className="text-[#16A34A] font-bold text-sm bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">{formatINR(lasPortfolio)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="50000000"
                    step="100000"
                    value={lasPortfolio}
                    onChange={(e) => setLasPortfolio(Number(e.target.value))}
                    className="w-full accent-[#16A34A] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544F66] mb-2">Collateral Asset Class</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'mutual_funds_equity', label: 'Equity MFs (50% LTV)' },
                      { id: 'mutual_funds_debt', label: 'Debt MFs (70% LTV)' },
                      { id: 'stocks', label: 'Listed Stocks (50% LTV)' },
                      { id: 'bonds', label: 'Govt Bonds (80% LTV)' },
                    ].map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setLasSecurityType(sec.id)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${lasSecurityType === sec.id ? 'bg-[#16A34A] border-[#16A34A] text-white shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result Summary Box */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#ECFDF5] to-[#F0FDF4] border border-emerald-200/80 rounded-2xl p-5 text-center space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider block">Max Credit Limit</span>
                  <div className="text-2xl font-black text-[#1E1B2E] mt-1">{formatINR(lasResults.maxLoan)}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left bg-white/90 rounded-xl p-3 border border-emerald-200/80">
                  <div>
                    <span className="text-[10px] text-gray-500 block font-medium">Interest Rate</span>
                    <span className="text-xs font-bold text-[#16A34A]">{lasResults.interestRate}% p.a.</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block font-medium">Monthly Interest</span>
                    <span className="text-xs font-bold text-[#1E1B2E]">{formatINR(lasResults.monthlyInterest)}</span>
                  </div>
                </div>

                <button
                  onClick={() => { setActiveCalculatorModal(null); alert('Our credit specialist will help unlock your portfolio loan!'); }}
                  className="w-full bg-[#16A34A] hover:bg-[#15803d] text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Get Instant Credit Line
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPERT CONSULTATION MODAL */}
      {activeCalculatorModal === 'expert' && (
        <div className="fixed inset-0 bg-[#11081F]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActiveCalculatorModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-purple-50 text-[#7C1FAB] hover:bg-purple-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-xl mb-4">
              🧮
            </div>

            <h3 className="text-xl font-bold text-[#1E1B2E] mb-2">Talk to a Financial Expert</h3>
            <p className="text-xs text-[#544F66] mb-6">
              Connect with our certified wealth advisors to get customized financial roadmaps and calculator guidance.
            </p>

            <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); setActiveCalculatorModal(null); alert('Thank you! Our advisor will contact you shortly.'); }}>
              <div>
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Tool of Interest</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors bg-white">
                  <option>SIP & Wealth Growth Calculator</option>
                  <option>Home Loan & EMI Planner</option>
                  <option>Term Insurance & Cover Planner</option>
                  <option>Loan Against Securities (LAS)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
              >
                Request Free Call
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer onNavigatePage={onNavigatePage} />
    </div>
  );
}
