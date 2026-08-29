import React, { useState, useMemo } from 'react';
import Footer from './Footer';

export default function EmiCalculatorPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  // EMI Calculator Inputs (Defaults matching screenshot)
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [tenureUnit, setTenureUnit] = useState('years'); // 'years' | 'months'

  // Input Handlers
  const handleLoanAmountChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(rawVal);
    setLoanAmount(Math.min(Math.max(num, 0), 100000000));
  };

  const handleInterestRateChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, '');
    const num = Number(rawVal);
    setInterestRate(Math.min(Math.max(num, 0), 50));
  };

  const handleTenureChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(rawVal);
    const maxVal = tenureUnit === 'years' ? 30 : 360;
    setTenure(Math.min(Math.max(num, 1), maxVal));
  };

  const handleReset = () => {
    setLoanAmount(1500000);
    setInterestRate(8.5);
    setTenure(5);
    setTenureUnit('years');
  };

  // Effective months
  const totalMonths = tenureUnit === 'years' ? tenure * 12 : tenure;
  const effectiveYears = tenureUnit === 'years' ? tenure : tenure / 12;

  // Math Calculations for EMI & Amortization
  const { emi, totalInterest, totalPayment, principalPct, interestPct, amortizationSchedule } = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const annualR = parseFloat(interestRate) || 0;
    const N = Math.max(1, Math.round(totalMonths));

    if (P <= 0 || annualR <= 0 || N <= 0) {
      return {
        emi: 0,
        totalInterest: 0,
        totalPayment: P,
        principalPct: 100,
        interestPct: 0,
        amortizationSchedule: []
      };
    }

    const r = annualR / 12 / 100;
    const compoundFactor = Math.pow(1 + r, N);
    const calculatedEmi = Math.round((P * r * compoundFactor) / (compoundFactor - 1));
    const calculatedTotalPayment = calculatedEmi * N;
    const calculatedTotalInterest = Math.max(0, calculatedTotalPayment - P);

    const princPct = ((P / calculatedTotalPayment) * 100).toFixed(1);
    const intPct = ((calculatedTotalInterest / calculatedTotalPayment) * 100).toFixed(1);

    // Build Annual Amortization Table
    let currentBalance = P;
    const schedule = [];
    const totalYears = Math.ceil(N / 12);

    for (let y = 1; y <= totalYears; y++) {
      let annualPrincipal = 0;
      let annualInterest = 0;
      const monthsInThisYear = Math.min(12, N - (y - 1) * 12);

      for (let m = 1; m <= monthsInThisYear; m++) {
        const monthlyInt = currentBalance * r;
        let monthlyPrinc = calculatedEmi - monthlyInt;
        if (monthlyPrinc > currentBalance) {
          monthlyPrinc = currentBalance;
        }
        annualInterest += monthlyInt;
        annualPrincipal += monthlyPrinc;
        currentBalance = Math.max(0, currentBalance - monthlyPrinc);
      }

      schedule.push({
        year: `Year ${y}`,
        principalPaid: Math.round(annualPrincipal),
        interestPaid: Math.round(annualInterest),
        totalPayment: Math.round(annualPrincipal + annualInterest),
        outstandingBalance: Math.round(currentBalance)
      });
    }

    return {
      emi: calculatedEmi,
      totalInterest: calculatedTotalInterest,
      totalPayment: calculatedTotalPayment,
      principalPct: princPct,
      interestPct: intPct,
      amortizationSchedule: schedule
    };
  }, [loanAmount, interestRate, totalMonths]);

  // Format currency helper
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Donut SVG circumference calculation
  const radius = 60;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;
  const principalStroke = (Number(principalPct) / 100) * circumference;
  const interestStroke = (Number(interestPct) / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FAB] overflow-x-hidden">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-7xl mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-white/70">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">EMI Calculator · Smart Loan Planning</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Precise Amortization · Visual Donut Breakdown
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
              Talk to Loan Advisor
            </button>
          </div>
        </div>
      </div>

      {/* 2. FLOATING NAVBAR */}
      <nav className={`sticky top-0 lg:top-2 max-w-7xl mx-auto px-0 lg:px-4 relative font-sans transition-all ${mobileMenuOpen ? 'z-[9999]' : 'z-50'}`}>
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-[#EBE3F5] shadow-sm lg:shadow-[0_12px_40px_rgba(30,27,46,0.06)] h-[72px] lg:h-[56px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">
          
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C1FAB] via-[#C81E8C] to-[#F5A623] rounded-t-full"></div>

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
              Apply for Loan
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
              { num: '04', label: 'EMI Calculator', action: () => setMobileMenuOpen(false), active: true },
              { num: '05', label: 'SIP Calculator', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('sip-calculator'); } },
              { num: '06', label: 'Financing', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('financing'); } },
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
          
          {/* LEFT COLUMN: Category Badge, Heading, Expanded Subtitle, and 4 Feature Badges */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-1.5 bg-[#F0E6F8] text-[#7C1FA8] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#7C1FA8] inline-block animate-pulse"></span>
              <span>EMI CALCULATOR</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-sans font-extrabold text-[36px] leading-[44px] sm:text-[46px] sm:leading-[52px] lg:text-[52px] lg:leading-[58px] tracking-[-0.035em] text-[#1E1B2E] mb-3.5 w-full max-w-[520px]">
              Calculate Your EMI. <br /><span className="text-[#7C1FA8]">Plan Your Future.</span>
            </h1>

            {/* Expanded Subtitle Paragraph */}
            <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[23px] sm:leading-[26px] text-[#544F66] mb-6 w-full max-w-[520px]">
              Estimate your exact monthly loan repayments, interest breakdown, and amortization schedule with precision. Make smart borrowing decisions for home, car, or personal loans with zero hassle.
            </p>

            {/* 4 Feature Pill Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-purple-100/80 w-full max-w-[520px]">
              
              {/* Badge 1 */}
              <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-2.5 flex flex-col items-start text-left shadow-2xs">
                <span className="text-base mb-1">🧮</span>
                <span className="font-extrabold text-xs text-[#1E1B2E]">Easy Calculation</span>
                <span className="text-[10px] font-medium text-[#666077] mt-0.5">Simple & fast</span>
              </div>

              {/* Badge 2 */}
              <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-2.5 flex flex-col items-start text-left shadow-2xs">
                <span className="text-base mb-1">%</span>
                <span className="font-extrabold text-xs text-[#1E1B2E]">Interest Split</span>
                <span className="text-[10px] font-medium text-[#666077] mt-0.5">Principal vs int.</span>
              </div>

              {/* Badge 3 */}
              <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-2.5 flex flex-col items-start text-left shadow-2xs">
                <span className="text-base mb-1">📅</span>
                <span className="font-extrabold text-xs text-[#1E1B2E]">Flexible Tenure</span>
                <span className="text-[10px] font-medium text-[#666077] mt-0.5">Years & months</span>
              </div>

              {/* Badge 4 */}
              <div className="bg-white/90 backdrop-blur-sm border border-purple-100/90 rounded-2xl p-2.5 flex flex-col items-start text-left shadow-2xs">
                <span className="text-base mb-1">⚡</span>
                <span className="font-extrabold text-xs text-[#1E1B2E]">Instant Results</span>
                <span className="text-[10px] font-medium text-[#666077] mt-0.5">Real-time graph</span>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Professional Financial Calculator Visual */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full mt-4 lg:mt-0">
            <div className="relative z-10 w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] flex justify-center items-center">
              <img
                src="/ChatGPT Image Aug 29, 2026, 04_10_30 PM.png"
                alt="Calculate Your EMI. Plan Your Future. - Professional EMI Calculator Visual"
                className="w-full h-auto max-h-[380px] sm:max-h-[420px] lg:max-h-[440px] object-contain drop-shadow-xl select-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. MAIN CALCULATOR CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">

        {/* 2-COLUMN CALCULATOR GRID - EQUAL HEIGHT STRETCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: LOAN DETAILS */}
          <div className="lg:col-span-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-7 shadow-[0_8px_30px_rgba(30,27,46,0.04)] text-left h-full flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-[#7C1FAB] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E]">Loan Details</h2>
              </div>

            {/* INPUT 1: Loan Amount */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <label className="block text-sm sm:text-base font-extrabold text-[#1E1B2E]">
                  Loan Amount
                </label>
                <span className="text-[#8E8A9D] cursor-pointer" title="Total principal amount you wish to borrow">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={loanAmount.toLocaleString('en-IN')}
                  onChange={handleLoanAmountChange}
                  className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-4 py-2.5 text-base sm:text-lg font-extrabold text-[#1E1B2E] transition-all outline-none"
                />
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-xs font-bold text-[#666077] mt-1">
                  <span>₹50,000</span>
                  <span>₹1,00,00,000</span>
                </div>
              </div>
            </div>

            {/* INPUT 2: Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <label className="block text-sm sm:text-base font-extrabold text-[#1E1B2E]">
                  Interest Rate (% p.a.)
                </label>
                <span className="text-[#8E8A9D] cursor-pointer" title="Annual interest rate offered by lender">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-4 py-2.5 text-base sm:text-lg font-extrabold text-[#1E1B2E] transition-all outline-none"
                />
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-xs font-bold text-[#666077] mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            {/* INPUT 3: Loan Tenure */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <label className="block text-sm sm:text-base font-extrabold text-[#1E1B2E]">
                  Loan Tenure
                </label>
                <span className="text-[#8E8A9D] cursor-pointer" title="Total loan repayment period">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </span>
              </div>

              <div className="grid grid-cols-12 gap-2.5">
                <div className="col-span-8">
                  <input
                    type="number"
                    value={tenure}
                    onChange={handleTenureChange}
                    className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-4 py-2.5 text-base sm:text-lg font-extrabold text-[#1E1B2E] transition-all outline-none"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={tenureUnit}
                    onChange={(e) => setTenureUnit(e.target.value)}
                    className="w-full h-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-extrabold text-[#1E1B2E] transition-all outline-none cursor-pointer"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="1"
                  max={tenureUnit === 'years' ? 30 : 360}
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-xs font-bold text-[#666077] mt-1">
                  <span>1 {tenureUnit === 'years' ? 'Year' : 'Month'}</span>
                  <span>{tenureUnit === 'years' ? '30 Years' : '360 Months'}</span>
                </div>
              </div>
            </div>

            {/* SMART TIP BOX */}
            <div className="bg-[#FAF5FD] border border-purple-100 rounded-xl p-3 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                💡
              </div>
              <p className="text-xs sm:text-sm text-[#544F66] leading-relaxed font-medium">
                <strong className="text-[#1E1B2E] font-extrabold">Tip:</strong> Lower interest rates or longer tenure reduces EMI but increases total interest paid.
              </p>
            </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="w-full bg-[#5E1083] hover:bg-[#7C1FAB] text-white font-extrabold py-3.5 rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Calculate EMI</span>
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="text-xs font-extrabold text-[#8E8A9D] hover:text-[#7C1FA8] transition-colors flex items-center gap-1 py-0.5 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <span>Reset All</span>
                  </button>
                </div>
              </div>

          </div>

          {/* RIGHT COLUMN: YOUR EMI SUMMARY */}
          <div className="lg:col-span-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-7 shadow-[0_8px_30px_rgba(30,27,46,0.04)] text-left h-full flex flex-col justify-between space-y-4 relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E]">Your EMI Summary</h2>
                </div>
              </div>
            </div>

            {/* BIG MONTHLY EMI */}
            <div className="py-0.5">
              <span className="text-sm font-bold text-[#544F66] block mb-1">Monthly EMI</span>
              <div className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#7C1FAB] tracking-tight leading-none">
                {formatINR(emi)}
              </div>
            </div>

            {/* 3-STATS SUMMARY ROW */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 pb-3 border-b border-gray-100 text-left">
              <div>
                <span className="text-xs font-bold text-[#666077] block mb-1">Total Interest Payable</span>
                <span className="text-sm sm:text-base font-extrabold text-[#1E1B2E]">{formatINR(totalInterest)}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#666077] block mb-1">Total Payment</span>
                <span className="text-sm sm:text-base font-extrabold text-[#16A34A]">{formatINR(totalPayment)}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#666077] block mb-1">Interest Rate (p.a.)</span>
                <span className="text-sm sm:text-base font-extrabold text-[#0284C7]">{interestRate.toFixed(2)}%</span>
              </div>
            </div>

            {/* INTERACTIVE DONUT / PIE CHART + BREAKDOWN LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#FAF9FC] rounded-2xl p-4 border border-purple-50">
              
              {/* Donut Visual */}
              <div className="sm:col-span-5 flex justify-center items-center relative py-1">
                <svg width="150" height="150" viewBox="0 0 160 160" className="transform -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#EBE8EF"
                    strokeWidth={strokeWidth}
                  />

                  {/* Principal Circle Slice (Purple) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#7C1FAB"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${principalStroke} ${circumference}`}
                    strokeDashoffset="0"
                    className="transition-all duration-500"
                  />

                  {/* Interest Circle Slice (Green) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#22C55E"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${interestStroke} ${circumference}`}
                    strokeDashoffset={`-${principalStroke}`}
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Donut Center Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-base font-black text-[#1E1B2E]">₹</span>
                </div>
              </div>

              {/* Breakdown Legend List */}
              <div className="sm:col-span-7 space-y-3 text-xs sm:text-sm">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#7C1FAB]"></span>
                    <span className="text-[#1E1B2E] font-bold">Principal Amount</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#1E1B2E] block text-sm sm:text-base">{formatINR(loanAmount)}</span>
                    <span className="text-xs font-semibold text-[#666077]">{principalPct}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#22C55E]"></span>
                    <span className="text-[#1E1B2E] font-bold">Total Interest</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#1E1B2E] block text-sm sm:text-base">{formatINR(totalInterest)}</span>
                    <span className="text-xs font-semibold text-[#666077]">{interestPct}%</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-purple-100/80 flex items-center justify-between">
                  <span className="font-extrabold text-[#1E1B2E]">Total Payment</span>
                  <span className="font-black text-[#7C1FAB] text-base sm:text-lg">{formatINR(totalPayment)}</span>
                </div>

              </div>

            </div>

            {/* LOAN TENURE REMINDER BOX */}
            <div className="bg-[#FAF5FD] rounded-xl p-3 px-3.5 border border-purple-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center shrink-0">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-[#1E1B2E] block">Loan tenure: {tenure} {tenureUnit}</span>
                <span className="text-xs text-[#544F66] font-medium">Your EMI of {formatINR(emi)} is due on the start of every month.</span>
              </div>
            </div>

            {/* Direct Action Button */}
            <button
              onClick={() => setConsultModalOpen(true)}
              className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-extrabold py-3.5 rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>Apply for {formatINR(loanAmount)} Loan</span>
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

          </div>

        </div>

        {/* 4. FULL-WIDTH AMORTIZATION OVERVIEW CARD (Matching Screenshot) */}
        <section className="mt-8 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-7 shadow-[0_8px_30px_rgba(30,27,46,0.04)] text-left">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Amortization Overview</h3>
              <p className="text-xs text-[#544F66]">This is how your loan will be paid off over time.</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF5FD] text-[#1E1B2E] border-b border-purple-100">
                  <th className="py-3 px-4 rounded-l-xl font-bold">Year</th>
                  <th className="py-3 px-4 font-bold">Principal Paid</th>
                  <th className="py-3 px-4 font-bold">Interest Paid</th>
                  <th className="py-3 px-4 font-bold">Total Payment</th>
                  <th className="py-3 px-4 rounded-r-xl font-bold">Outstanding Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {amortizationSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#1E1B2E]">{row.year}</td>
                    <td className="py-3 px-4 text-[#544F66] font-medium">{formatINR(row.principalPaid)}</td>
                    <td className="py-3 px-4 text-[#544F66] font-medium">{formatINR(row.interestPaid)}</td>
                    <td className="py-3 px-4 text-[#544F66] font-medium">{formatINR(row.totalPayment)}</td>
                    <td className="py-3 px-4 font-bold text-[#7C1FAB]">{formatINR(row.outstandingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Disclaimer Note */}
          <div className="mt-4 flex items-center gap-2 text-[11px] text-[#8E8A9D]">
            <svg className="w-4 h-4 text-[#7C1FAB] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <span>Note: The above calculation is for indicative purpose only. Actual values may vary.</span>
          </div>

        </section>

      </main>

      {/* 5. CONSULTATION / LOAN APPLICATION MODAL */}
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
              🏠
            </div>

            <h3 className="text-xl font-bold text-[#1E1B2E] mb-1">Apply for Loan of {formatINR(loanAmount)}</h3>
            <p className="text-xs text-[#544F66] mb-5 leading-relaxed">
              Calculated Monthly EMI: <strong className="text-[#7C1FAB]">{formatINR(emi)}</strong> for {tenure} {tenureUnit}. Connect with our lending partners for instant paperless loan approval.
            </p>

            <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); setConsultModalOpen(false); alert('Thank you! Our loan specialist will connect with you shortly.'); }}>
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
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Loan Type</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors bg-white">
                  <option>Home Loan</option>
                  <option>Loan Against Securities (LAS)</option>
                  <option>Personal Loan</option>
                  <option>Business Loan</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                Get Best Loan Quotes
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
