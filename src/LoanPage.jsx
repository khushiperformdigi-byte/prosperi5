import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function LoanPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  // EMI Calculator State
  const [loanType, setLoanType] = useState('home');
  const [amount, setAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const loanConfigs = {
    home: { title: 'Home Loan', minAmt: 500000, maxAmt: 50000000, defaultAmt: 3000000, defaultRate: 8.5, maxTenure: 30 },
    personal: { title: 'Personal Loan', minAmt: 50000, maxAmt: 4000000, defaultAmt: 500000, defaultRate: 11.5, maxTenure: 5 },
    business: { title: 'Business Loan', minAmt: 200000, maxAmt: 20000000, defaultAmt: 1500000, defaultRate: 12.0, maxTenure: 7 },
    lap: { title: 'Loan Against Property', minAmt: 1000000, maxAmt: 100000000, defaultAmt: 5000000, defaultRate: 9.2, maxTenure: 15 },
  };

  const handleTypeChange = (type) => {
    setLoanType(type);
    setAmount(loanConfigs[type].defaultAmt);
    setInterestRate(loanConfigs[type].defaultRate);
    setTenureYears(Math.min(tenureYears, loanConfigs[type].maxTenure));
  };

  // Calculate EMI
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  ) || 0;
  const totalPayable = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayable - amount);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  useEffect(() => {
    if (mobileMenuOpen || selectedModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, selectedModal]);

  const loanProducts = [
    {
      id: 'home',
      title: 'Home Loans',
      tag: 'LOWEST INTEREST',
      rate: 'Starts @ 8.40% p.a.',
      desc: 'Purchase new homes, plots, or transfer existing home loans at lower interest rates with up to 30 years tenure.',
      bgGradient: 'bg-[#FAF6FD]',
      cardBorder: 'border-purple-100/90',
      accentColor: 'text-[#7C1FA8]',
      badgeBg: 'bg-[#7C1FA8]',
      icon: (
        <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      id: 'personal',
      title: 'Personal Loans',
      tag: 'INSTANT DISBURSAL',
      rate: 'Starts @ 10.50% p.a.',
      desc: 'Collateral-free instant loans up to ₹40 Lakhs for medical, wedding, travel, or personal liquidity requirements.',
      bgGradient: 'bg-[#FAF6FD]',
      cardBorder: 'border-purple-100/90',
      accentColor: 'text-[#7C1FA8]',
      badgeBg: 'bg-[#7C1FA8]',
      icon: (
        <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      id: 'business',
      title: 'Business Loans',
      tag: 'NO COLLATERAL UP TO ₹50L',
      rate: 'Starts @ 11.25% p.a.',
      desc: 'Fuel your enterprise growth, working capital, inventory purchases, or equipment expansion with fast sanctions.',
      bgGradient: 'bg-[#FAF6FD]',
      cardBorder: 'border-purple-100/90',
      accentColor: 'text-[#7C1FA8]',
      badgeBg: 'bg-[#7C1FA8]',
      icon: (
        <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 14.15m16.5 0v-4.25A2.25 2.25 0 0017.25 7.65h-2.1v-1.5a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5v1.5h-2.1A2.25 2.25 0 003 9.9v4.25" />
        </svg>
      )
    },
    {
      id: 'lap',
      title: 'Loan Against Property (LAP)',
      tag: 'HIGH VALUE LOANS',
      rate: 'Starts @ 9.15% p.a.',
      desc: 'Unlock maximum liquidity up to ₹10 Crores against commercial or residential property with flexible repayments.',
      bgGradient: 'bg-[#FAF6FD]',
      cardBorder: 'border-purple-100/90',
      accentColor: 'text-[#7C1FA8]',
      badgeBg: 'bg-[#7C1FA8]',
      icon: (
        <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5s.75 0 .75.75v1.5c0 .75-.75.75-.75.75H9m0-3h1.5M9 12h1.5s.75 0 .75.75v1.5c0 .75-.75.75-.75.75H9m0-3h1.5M9 17.25h1.5s.75 0 .75.75v1.5c0 .75-.75.75-.75.75H9m0-3h1.5" />
        </svg>
      )
    },
    {
      id: 'education',
      title: 'Education Loans',
      tag: 'GLOBAL & DOMESTIC',
      rate: 'Starts @ 9.50% p.a.',
      desc: 'Fund higher studies in India or abroad with zero collateral options, moratorium period, and tax benefit under Sec 80E.',
      bgGradient: 'bg-[#FAF6FD]',
      cardBorder: 'border-purple-100/90',
      accentColor: 'text-[#7C1FA8]',
      badgeBg: 'bg-[#7C1FA8]',
      icon: (
        <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 14.634l7.74-4.487L12 5.66 4.26 10.147zm0 0v5.823l7.74 4.37 7.74-4.37v-5.823" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FD] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-[1500px] mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-white/70">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Loans · Instant Approval & Transparent Rates</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              30+ Partner Banks · Zero Hidden Fees
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
              Talk to a Loan Specialist
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
            <button onClick={() => onNavigatePage && onNavigatePage('investment')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Investment</button>
            <button onClick={() => onNavigatePage && onNavigatePage('insurance')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Insurance</button>
            <button onClick={() => onNavigatePage && onNavigatePage('financing')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Financing</button>
            <button onClick={() => onNavigatePage && onNavigatePage('loan')} className="text-[#7C1FA8] font-bold cursor-pointer">Loans</button>
            <button onClick={() => onNavigatePage && onNavigatePage('borrow')} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">Borrow</button>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedModal(true)}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
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

      {/* MOBILE MENU DRAWER */}
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
              { num: '03', label: 'Investment', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investment'); } },
              { num: '04', label: 'Insurance', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('insurance'); } },
              { num: '05', label: 'Financing', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('financing'); } },
              { num: '06', label: 'Loans', action: () => setMobileMenuOpen(false), active: true },
              { num: '07', label: 'Borrow', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('borrow'); } },
            ].map((item) => (
              <button key={item.num} onClick={item.action}
                className={`w-full h-[58px] rounded-[16px] border px-5 flex items-center gap-4 shadow-sm transition-all duration-200 cursor-pointer text-left ${item.active ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white hover:border-[#7C1FA8]'}`}>
                <span className={`font-extrabold text-sm ${item.active ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>{item.num}</span>
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. HERO SECTION */}
      <section className="bg-gradient-to-b from-[#FAF5FC] via-white to-[#F7F2FA] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-purple-100/60 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#F3EAFB] border border-purple-200/80 px-4 py-1.5 rounded-full text-xs font-extrabold text-[#7C1FA8] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse"></span>
              <span>LOANS & CREDIT SOLUTIONS</span>
            </div>

            <h1 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-5xl text-[#1E1B2E] tracking-tight leading-[1.15]">
              Fast, Flexible Loans <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C1FA8] via-[#C81E8C] to-[#F5A623]">
                Tailored for Every Life Goal.
              </span>
            </h1>

            <p className="text-[#544F66] text-sm sm:text-base font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
              Compare rates from 30+ leading banks & NBFCs. Get instant digital approval for Home, Business, Personal, and Property Loans with minimal documentation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setSelectedModal(true)}
                className="w-full sm:w-auto bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold px-7 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Apply for a Loan</span>
                <span>→</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto border-2 border-[#7C1FA8] text-[#7C1FA8] hover:bg-purple-50 font-extrabold px-7 py-3.5 rounded-full text-sm transition-all cursor-pointer text-center active:scale-95"
              >
                Calculate EMI
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-purple-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-bold text-[#1E1B2E]">
              <div className="flex items-center gap-2">
                <span className="text-[#16A34A] text-base font-extrabold">✓</span>
                <span>Lowest Interest Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#16A34A] text-base font-extrabold">✓</span>
                <span>100% Digital Process</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#16A34A] text-base font-extrabold">✓</span>
                <span>Zero Hidden Charges</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-xl border border-purple-100/80 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-purple-50">
                <div>
                  <span className="text-[10px] font-bold text-[#7C1FA8] uppercase tracking-wider block">INSTANT LOAN DISBURSAL</span>
                  <h3 className="font-extrabold text-lg text-[#1E1B2E]">Smart Loan Comparison</h3>
                </div>
                <span className="bg-[#16A34A]/10 text-[#16A34A] font-bold text-xs px-3 py-1 rounded-full">30+ Lenders</span>
              </div>

              <div className="space-y-3 my-5">
                {[
                  { type: 'Home Loan', rate: '8.40% p.a.', time: 'Sanction in 48 hrs' },
                  { type: 'Personal Loan', rate: '10.50% p.a.', time: 'Same day disbursal' },
                  { type: 'Business Loan', rate: '11.25% p.a.', time: 'Collateral-free' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF6FD] border border-purple-100/60">
                    <div>
                      <h4 className="font-bold text-sm text-[#1E1B2E]">{item.type}</h4>
                      <span className="text-xs text-[#544F66] font-medium">{item.time}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm text-[#7C1FA8]">{item.rate}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedModal(true)}
                className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer active:scale-95"
              >
                Check Your Loan Eligibility Now
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. LOAN PRODUCTS GRID (WEBSITE THEME CARDS) */}
      <section className="pt-10 lg:pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#F3EAFB] text-[#7C1FA8] font-extrabold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-3">
            LOAN OFFERINGS
          </span>
          <h2 className="font-sans font-extrabold text-3xl lg:text-4xl text-[#1E1B2E] tracking-tight mb-3">
            Plans for every need in life
          </h2>
          <p className="text-[#544F66] font-medium max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Whether buying your dream house or scaling your business, we have the right loan structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedModal(true)}
              className={`${product.bgGradient} border ${product.cardBorder} rounded-[26px] p-6 sm:p-7 shadow-2xs hover:shadow-xl hover:scale-[1.015] transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[240px]`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  {/* Icon Direct Without Box */}
                  <div className={`p-1 ${product.accentColor} shrink-0`}>
                    {product.icon}
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white text-[#1E1B2E] shadow-2xs border border-gray-100/80">
                    {product.tag}
                  </span>
                </div>

                <h3 className="font-extrabold text-2xl sm:text-[22px] text-[#1E1B2E] mb-1.5 group-hover:text-[#7C1FA8] transition-colors">{product.title}</h3>
                <span className={`text-sm font-bold ${product.accentColor} block mb-3`}>{product.rate}</span>
                <p className="text-[#544F66] text-sm font-medium leading-relaxed mb-6">{product.desc}</p>
              </div>

              {/* Website Theme Full Pill Button */}
              <div className="pt-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedModal(true); }}
                  className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3.5 rounded-full text-sm sm:text-base transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Apply Now</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE EMI CALCULATOR (FULL WIDTH SECTION) */}
      <section id="calculator" className="w-full bg-gradient-to-b from-[#FAF5FC] via-[#F6EEFA] to-white pt-8 pb-12 lg:pt-10 lg:pb-14 px-4 sm:px-6 lg:px-8 border-t border-b border-purple-100/80 mt-2 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-white text-[#7C1FA8] font-extrabold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-2.5 border border-purple-100 shadow-2xs">
              FINANCIAL TOOL
            </span>
            <h2 className="font-sans font-extrabold text-3xl lg:text-4xl text-[#1E1B2E] mb-2">Loan EMI Calculator</h2>
            <p className="text-[#544F66] text-sm sm:text-base font-medium">Estimate your monthly outflow and plan your repayments accurately.</p>
          </div>

          {/* Loan Type Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {Object.keys(loanConfigs).map((key) => (
              <button
                key={key}
                onClick={() => handleTypeChange(key)}
                className={`px-6 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                  loanType === key
                    ? 'bg-[#7C1FA8] text-white shadow-md scale-[1.03]'
                    : 'bg-white text-[#544F66] hover:bg-purple-50 border border-purple-100/90 shadow-2xs'
                }`}
              >
                {loanConfigs[key].title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Controls Column (Clean Sliders Container) */}
            <div className="lg:col-span-7 space-y-7 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100/80 shadow-sm">
              {/* Amount Slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-sm font-extrabold text-[#1E1B2E]">Required Loan Amount</label>
                  <span className="text-base sm:text-lg font-black text-[#7C1FA8]">{formatCurrency(amount)}</span>
                </div>
                <input
                  type="range"
                  min={loanConfigs[loanType].minAmt}
                  max={loanConfigs[loanType].maxAmt}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-[#7C1FA8] cursor-pointer h-2.5"
                />
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-sm font-extrabold text-[#1E1B2E]">Interest Rate (p.a.)</label>
                  <span className="text-base sm:text-lg font-black text-[#7C1FA8]">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="7.5"
                  max="24.0"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#7C1FA8] cursor-pointer h-2.5"
                />
              </div>

              {/* Tenure Slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-sm font-extrabold text-[#1E1B2E]">Loan Tenure</label>
                  <span className="text-base sm:text-lg font-black text-[#7C1FA8]">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={loanConfigs[loanType].maxTenure}
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-[#7C1FA8] cursor-pointer h-2.5"
                />
              </div>
            </div>

            {/* Results Summary Box */}
            <div className="lg:col-span-5 bg-[#1E1135] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 text-center lg:text-left flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F5A623]">ESTIMATED MONTHLY PAYABLE</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 mb-6">{formatCurrency(emi)}<span className="text-xs font-normal text-white/70"> / month</span></div>

                <div className="space-y-3.5 border-t border-white/15 pt-5 text-sm font-medium">
                  <div className="flex justify-between text-white/80">
                    <span>Principal Loan Amount:</span>
                    <span className="font-bold text-white">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Total Interest Payable:</span>
                    <span className="font-bold text-[#F5A623]">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-white/80 pt-3 border-t border-white/10">
                    <span>Total Amount Payable:</span>
                    <span className="font-bold text-white">{formatCurrency(totalPayable)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedModal(true)}
                className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold py-4 rounded-full text-sm sm:text-base shadow-md transition-all cursor-pointer mt-6 active:scale-95"
              >
                Apply for {formatCurrency(amount)} Loan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#461065] via-[#7C1FAB] to-[#5E1083] rounded-2xl py-4 sm:py-5 px-6 sm:px-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold">Looking for Tailored Commercial Financing?</h2>
            <p className="text-xs sm:text-[13px] text-white/80 mt-0.5 max-w-xl">Get specialized loan structures for equipment, LAP, or business expansion from expert advisors.</p>
          </div>
          <button
            onClick={() => setSelectedModal(true)}
            className="bg-[#F5A623] hover:bg-[#E09418] text-[#1E1B2E] font-extrabold px-6 py-2.5 rounded-full text-xs sm:text-sm shadow-md cursor-pointer whitespace-nowrap transition-all active:scale-95 shrink-0"
          >
            Get Custom Loan Offer →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer onNavigatePage={onNavigatePage} />

      {/* CONSULTATION MODAL */}
      {selectedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={() => setSelectedModal(false)}>
          <div 
            className="bg-white bg-cover bg-center rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden border border-purple-100/80" 
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl text-[#1E1B2E]">Apply for a Loan</h2>
                <button onClick={() => setSelectedModal(false)} className="w-9 h-9 rounded-full bg-gray-100/90 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors z-20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-[#544F66] font-medium mb-6 text-sm">Enter your details to receive instant rate offers & loan eligibility status.</p>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full border border-[#EBE8EF] bg-white/95 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C1FA8] transition-colors shadow-2xs" />
                
                {/* Phone Input with Country Code */}
                <div className="flex items-center border border-[#EBE8EF] bg-white/95 rounded-xl overflow-hidden focus-within:border-[#7C1FA8] transition-colors shadow-2xs">
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

                <select className="w-full border border-[#EBE8EF] bg-white/95 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C1FA8] transition-colors shadow-2xs font-semibold text-[#1E1B2E] cursor-pointer">
                  <option value="home">Home Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="lap">Loan Against Property (LAP)</option>
                  <option value="education">Education Loan</option>
                </select>

                <button
                  onClick={() => setSelectedModal(false)}
                  className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-full text-sm transition-all shadow-md cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
