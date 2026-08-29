import React, { useState, useMemo } from 'react';
import Footer from './Footer';

export default function LoanAgainstSecuritiesPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  // LAS Calculator Inputs (Defaults matching screenshot)
  const [securitiesValue, setSecuritiesValue] = useState(1000000); // 10 Lakh
  const [ltv, setLtv] = useState(70); // 70%

  // Handlers
  const handleSecuritiesChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(rawVal);
    setSecuritiesValue(Math.min(Math.max(num, 0), 50000000));
  };

  const handleLtvChange = (e) => {
    const num = Number(e.target.value);
    setLtv(Math.min(Math.max(num, 50), 90));
  };

  const handleReset = () => {
    setSecuritiesValue(1000000);
    setLtv(70);
  };

  // Math Calculation
  const eligibleLoanAmount = useMemo(() => {
    const val = parseFloat(securitiesValue) || 0;
    const ltvRatio = parseFloat(ltv) || 70;
    return Math.round((val * ltvRatio) / 100);
  }, [securitiesValue, ltv]);

  // Format currency helper
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FAB] overflow-x-hidden">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-7xl mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-white/70">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Loan Against Securities · Instant Liquidity</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Zero Equity Dilution · Retain Dividends &amp; Growth
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setConsultModalOpen(true)}
              className="bg-[#F5A623] hover:bg-[#D49300] text-[#1E1B2E] font-bold px-4 py-1.5 rounded-full text-[10px] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.25 6.622c0-1.077.873-1.95 1.95-1.95h2.25c.877 0 1.63.585 1.85 1.432l.711 2.766c.2.783-.062 1.615-.67 2.115l-1.56 1.287a15.776 15.776 0 0 0 6.6 6.6l1.287-1.56c.5-.608 1.332-.87 2.115-.67l2.766.711c.847.22 1.432.973 1.432 1.85v2.25c0 1.077-.873 1.95-1.95 1.95h-2.25a16.5 16.5 0 0 1-16.5-16.5v-2.25Z" />
              </svg>
              Talk to LAS Specialist
            </button>
          </div>
        </div>
      </div>

      {/* 2. FLOATING NAVBAR */}
      <nav className={`sticky top-0 lg:top-2 max-w-7xl mx-auto px-0 lg:px-4 relative font-sans transition-all ${mobileMenuOpen ? 'z-[9999]' : 'z-50'}`}>
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-[#EBE3F5] shadow-sm lg:shadow-[0_12px_40px_rgba(30,27,46,0.06)] h-[72px] lg:h-[56px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">
          
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#7C1FAB] via-[#C81E8C] to-[#F5A623] rounded-t-full"></div>

          {/* Logo */}
          <div className="flex items-center gap-6 cursor-pointer group" onClick={onNavigateHome}>
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
            <button onClick={() => onNavigatePage && onNavigatePage('tools')} className="text-[#7C1FA8] font-bold cursor-pointer py-1 relative after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full">Tools</button>
            <button onClick={() => onNavigatePage && onNavigatePage('investors')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer py-1">Investors</button>
          </div>

          {/* CTA & Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setConsultModalOpen(true)}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer"
            >
              Apply for LAS
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
              { num: '03', label: 'Tools', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('tools'); } },
              { num: '04', label: 'Loan Against Securities', action: () => setMobileMenuOpen(false), active: true },
              { num: '05', label: 'SIP Calculator', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('sip-calculator'); } },
              { num: '06', label: 'EMI Calculator', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('emi-calculator'); } },
              { num: '07', label: 'Financing', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('financing'); } },
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

      {/* 3. HERO SECTION (FULL WIDTH) */}
      <section className="w-full bg-[#FAF8FC] bg-gradient-to-r from-[#FAF8FC] via-[#F5EEFC] to-[#FAF8FC] relative overflow-hidden border-b border-[#EBE8EF]/60 pt-4 sm:pt-5 lg:pt-6 pb-5 sm:pb-6 lg:pb-7 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Ambient Purple Background Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-purple-200/40 rounded-full filter blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* LEFT COLUMN: Category Badge, Heading, Subtitle, and 3 Feature Badges */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-1.5 bg-[#F0E6F8] text-[#7C1FA8] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#7C1FA8] inline-block animate-pulse"></span>
              <span>LOAN AGAINST SECURITIES CALCULATOR</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-sans font-extrabold text-[34px] leading-[42px] sm:text-[44px] sm:leading-[52px] lg:text-[48px] lg:leading-[56px] tracking-[-0.035em] text-[#1E1B2E] mb-3.5 w-full max-w-[640px]">
              Unlock Value. <br />Invest. Grow. <span className="text-[#7C1FA8]">Achieve More.</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[23px] sm:leading-[26px] text-[#544F66] mb-6 w-full max-w-[640px]">
              Use our Loan Against Securities Calculator to estimate your loan amount and plan your finances better.
            </p>

            {/* 3 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-purple-100/80 w-full max-w-[640px]">
              
              {/* Badge 1 */}
              <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-3 flex flex-col items-start text-left shadow-2xs">
                <span className="text-base mb-1">🧮</span>
                <span className="font-extrabold text-xs text-[#1E1B2E]">Instant Estimate</span>
                <span className="text-[10px] font-medium text-[#666077] mt-0.5">Quick loan calculation</span>
              </div>

              {/* Badge 2 */}
              <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-3 flex flex-col items-start text-left shadow-2xs">
                <span className="text-base mb-1">📈</span>
                <span className="font-extrabold text-xs text-[#1E1B2E]">Higher Value</span>
                <span className="text-[10px] font-medium text-[#666077] mt-0.5">Leverage investments</span>
              </div>

              {/* Badge 3 */}
              <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-3 flex flex-col items-start text-left shadow-2xs">
                <span className="text-base mb-1">🛡️</span>
                <span className="font-extrabold text-xs text-[#1E1B2E]">Secure Process</span>
                <span className="text-[10px] font-medium text-[#666077] mt-0.5">Quick & hassle-free</span>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Professional Securities Portfolio Dashboard Graphic */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full mt-4 lg:mt-0">
            <div className="relative z-10 w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] flex justify-center items-center">
              <img
                src="/investor_tablet_dashboard.png"
                alt="Unlock Value. Invest. Grow. Achieve More. - Professional Securities Portfolio"
                className="w-full h-auto max-h-[380px] sm:max-h-[420px] lg:max-h-[440px] object-cover rounded-[24px] shadow-xl border border-purple-100/60 select-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. MAIN CALCULATOR CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">

        {/* 2-COLUMN CALCULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: LAS CALCULATOR */}
          <div className="lg:col-span-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-4 text-left">
            
            {/* Card Header */}
            <div className="flex items-center gap-2.5 pb-1.5 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-[#7C1FAB] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#1E1B2E]">LAS Calculator</h2>
            </div>

            {/* INPUT 1: Securities Value */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E1B2E]">
                Securities Value (₹)
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={securitiesValue.toLocaleString('en-IN')}
                  onChange={handleSecuritiesChange}
                  className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none"
                />
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="50000"
                  max="50000000"
                  step="50000"
                  value={securitiesValue}
                  onChange={(e) => setSecuritiesValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#8E8A9D] mt-0.5">
                  <span>₹ 50,000</span>
                  <span>₹ 5,00,00,000</span>
                </div>
              </div>
            </div>

            {/* INPUT 2: Loan to Value (LTV) */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs font-bold text-[#1E1B2E]">
                  Loan to Value (LTV)
                </label>
                <span className="text-[#8E8A9D] cursor-pointer" title="Percentage of securities market value eligible for loan">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </span>
              </div>

              <div className="relative">
                <select
                  value={ltv}
                  onChange={handleLtvChange}
                  className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none cursor-pointer"
                >
                  {[50, 55, 60, 65, 70, 75, 80, 85, 90].map((ltvVal) => (
                    <option key={ltvVal} value={ltvVal}>{ltvVal}%</option>
                  ))}
                </select>
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="1"
                  value={ltv}
                  onChange={(e) => setLtv(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#8E8A9D] mt-0.5">
                  <span>50%</span>
                  <span>90%</span>
                </div>
              </div>
            </div>

            {/* ELIGIBLE LOAN AMOUNT BOX */}
            <div className="bg-[#FAF5FD] rounded-2xl p-4 border border-purple-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-lg shrink-0">
                💰
              </div>
              <div>
                <span className="text-xs font-semibold text-[#544F66] block">Eligible Loan Amount</span>
                <span className="text-2xl sm:text-3xl font-black text-[#7C1FAB] tracking-tight">
                  {formatINR(eligibleLoanAmount)}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="w-full bg-[#5E1083] hover:bg-[#7C1FAB] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Calculate Loan</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="text-[11px] font-bold text-[#8E8A9D] hover:text-[#7C1FAB] transition-colors flex items-center gap-1 py-0.5 cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>Reset All</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: WHY LOAN AGAINST SECURITIES? */}
          <div className="lg:col-span-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-4 text-left relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-1.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-100 text-[#C81E8C] flex items-center justify-center font-bold text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Why Loan Against Securities?</h2>
                </div>
              </div>
            </div>

            {/* 4 FEATURE ROWS (Matching Screenshot) */}
            <div className="space-y-3.5 pt-1">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-purple-50/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#FAF5FD] border border-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-sm shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1E1B2E]">Quick Liquidity</h3>
                  <p className="text-xs text-[#544F66]">Get funds in just a few hours.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-purple-50/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#FAF5FD] border border-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-sm shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1E1B2E]">Keep Your Investments</h3>
                  <p className="text-xs text-[#544F66]">Hold your securities and still get cash.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-purple-50/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#FAF5FD] border border-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-sm shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1E1B2E]">Flexible Tenure</h3>
                  <p className="text-xs text-[#544F66]">Choose a repayment period that suits you.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-purple-50/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#FAF5FD] border border-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-sm shrink-0">
                  <span className="text-base font-black text-[#7C1FAB]">%</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1E1B2E]">Lower Interest Rates</h3>
                  <p className="text-xs text-[#544F66]">Enjoy competitive interest rates.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4. HOW IT WORKS (Matching Screenshot) */}
        <section className="mt-10 sm:mt-12 text-left">
          
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E] tracking-tight mb-6">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            
            {/* Step 1 */}
            <div className="relative bg-white rounded-[22px] border border-[#EBE3F5] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[155px]">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-sm font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1E1B2E] mb-1">1. Share Securities</h3>
                <p className="text-[11px] text-[#544F66]">Use your shares / mutual funds as collateral.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-[22px] border border-[#EBE3F5] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[155px]">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-sm font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1E1B2E] mb-1">2. Get Loan</h3>
                <p className="text-[11px] text-[#544F66]">Receive instant loan against your holdings.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-[22px] border border-[#EBE3F5] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[155px]">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-sm font-bold">
                <span className="text-base font-black">₹</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1E1B2E] mb-1">3. Use Funds</h3>
                <p className="text-[11px] text-[#544F66]">Meet your financial needs.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white rounded-[22px] border border-[#EBE3F5] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[155px]">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-sm font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1E1B2E] mb-1">4. Repay &amp; Unlock</h3>
                <p className="text-[11px] text-[#544F66]">Clear the loan and get your securities back.</p>
              </div>
            </div>

          </div>

        </section>

        {/* 5. 2-COLUMN GRID: ELIGIBILITY CRITERIA & SUPPORTED SECURITIES (Matching Screenshot) */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          {/* Eligibility Criteria */}
          <div className="bg-white rounded-[24px] border border-[#EBE3F5] p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Eligibility Criteria</h3>
            </div>

            <div className="space-y-3">
              {[
                'Demat account with approved securities',
                'Minimum eligible securities value as per lender norms',
                'Stable income source',
                'Good credit history'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#544F66] font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#F5EEFB] text-[#7C1FAB] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Securities */}
          <div className="bg-white rounded-[24px] border border-[#EBE3F5] p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Supported Securities</h3>
            </div>

            <div className="space-y-3">
              {[
                'Equity Shares (NSE / BSE)',
                'Mutual Funds',
                'Government Securities',
                'Other Approved Instruments'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#544F66] font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#F5EEFB] text-[#7C1FAB] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 6. BOTTOM CALLOUT BANNER CARD (Matching Screenshot) */}
        <section className="mt-8 bg-gradient-to-r from-[#FAF5FD] via-[#F6EEFA] to-[#FAF5FD] border border-purple-100 rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm text-left relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* 3D Wallet Graphic */}
            <div className="w-24 sm:w-28 h-20 sm:h-24 shrink-0 flex items-center justify-center">
              <img
                src="/las_wallet_illustration.png"
                alt="Purple Wallet with Rupee Coin"
                className="max-h-20 sm:max-h-24 w-auto object-contain filter drop-shadow-md select-none"
              />
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E]">
                Turn your investments into instant funds.
              </h3>
              <p className="text-xs sm:text-sm text-[#544F66] font-medium">
                Loan Against Securities – Smart borrowing, without selling.
              </p>
            </div>

          </div>

          <button
            onClick={() => setConsultModalOpen(true)}
            className="bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Get Started</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

        </section>

      </main>

      {/* 7. CONSULTATION / LAS APPLICATION MODAL */}
      {consultModalOpen && (
        <div className="fixed inset-0 bg-[#11081F]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setConsultModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-purple-50 text-[#7C1FAB] hover:bg-purple-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-2xl font-bold mb-4">
              💼
            </div>

            <h3 className="text-xl font-bold text-[#1E1B2E] mb-1">Apply for LAS Loan of {formatINR(eligibleLoanAmount)}</h3>
            <p className="text-xs text-[#544F66] mb-5 leading-relaxed">
              Against your portfolio of <strong className="text-[#7C1FAB]">{formatINR(securitiesValue)}</strong> @ {ltv}% LTV. Connect with our dedicated credit manager for paperless Demat pledge &amp; same-day disbursal.
            </p>

            <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); setConsultModalOpen(false); alert('Thank you! Our credit officer will contact you to process your LAS loan application.'); }}>
              <div>
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
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
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Primary Collateral Type</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors bg-white">
                  <option>Equity Shares (NSE / BSE)</option>
                  <option>Mutual Fund Units (CAMS / KFintech)</option>
                  <option>Sovereign Gold Bonds / Govt Securities</option>
                  <option>Corporate Bonds</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                Submit for Instant Sanction
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
