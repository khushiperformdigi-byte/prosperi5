import React, { useState, useEffect, useMemo, useRef } from 'react';
import Footer from './Footer';

export default function SipCalculatorPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Calculator inputs
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [duration, setDuration] = useState(15);
  const [durationUnit, setDurationUnit] = useState('years'); // 'years' | 'months'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Formatted duration in years
  const effectiveYears = durationUnit === 'years' ? duration : duration / 12;

  // Handle number input changes
  const handleMonthlyInputChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(rawVal);
    setMonthlyInvestment(Math.min(Math.max(num, 0), 1000000));
  };

  const handleReturnInputChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, '');
    const num = Number(rawVal);
    setExpectedReturn(Math.min(Math.max(num, 0), 50));
  };

  const handleDurationInputChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(rawVal);
    const maxVal = durationUnit === 'years' ? 50 : 600;
    setDuration(Math.min(Math.max(num, 1), maxVal));
  };

  const handleReset = () => {
    setMonthlyInvestment(10000);
    setExpectedReturn(12);
    setDuration(15);
    setDurationUnit('years');
  };

  // Comprehensive calculations
  const { totalInvested, estReturns, totalValue, yearWiseData } = useMemo(() => {
    const P = parseFloat(monthlyInvestment) || 0;
    const annualR = parseFloat(expectedReturn) || 0;
    const i = annualR / 12 / 100;
    const totalMonths = Math.round(effectiveYears * 12);

    if (P <= 0 || totalMonths <= 0 || i <= 0) {
      return {
        totalInvested: P * totalMonths,
        estReturns: 0,
        totalValue: P * totalMonths,
        yearWiseData: []
      };
    }

    const futureVal = Math.round(P * ((Math.pow(1 + i, totalMonths) - 1) / i) * (1 + i));
    const invested = Math.round(P * totalMonths);
    const returns = futureVal - invested;

    // Generate year-by-year curve points
    const yearsCount = Math.max(1, Math.ceil(effectiveYears));
    const data = [];

    // Starting point (Year 0)
    data.push({
      year: 0,
      label: '0',
      invested: 0,
      returns: 0,
      total: 0
    });

    for (let y = 1; y <= yearsCount; y++) {
      const months = Math.min(y * 12, totalMonths);
      const yearInvested = Math.round(P * months);
      const yearTotal = Math.round(P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i));
      const yearReturns = Math.max(0, yearTotal - yearInvested);

      data.push({
        year: y,
        label: `${y}Y`,
        invested: yearInvested,
        returns: yearReturns,
        total: yearTotal
      });
    }

    return {
      totalInvested: invested,
      estReturns: returns,
      totalValue: futureVal,
      yearWiseData: data
    };
  }, [monthlyInvestment, expectedReturn, effectiveYears]);

  // Format currency in Indian standard format (₹ 36,80,611)
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Format for Y-Axis (e.g. 10L, 20L, 1.5Cr)
  const formatAxisAmount = (val) => {
    if (val >= 10000000) {
      const cr = val / 10000000;
      return `${cr % 1 === 0 ? cr : cr.toFixed(1)}Cr`;
    }
    if (val >= 100000) {
      const l = val / 100000;
      return `${l % 1 === 0 ? l : l.toFixed(0)}L`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(0)}k`;
    }
    return `${val}`;
  };

  // SVG Chart Geometry - Compact & Sleek
  const chartWidth = 540;
  const chartHeight = 160;
  const padding = { top: 12, right: 15, bottom: 26, left: 40 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Max value for Y-Axis
  const maxY = useMemo(() => {
    if (!yearWiseData.length) return 100000;
    const maxVal = yearWiseData[yearWiseData.length - 1].total;
    // Round up to clean ceiling
    if (maxVal <= 0) return 100000;
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxVal)));
    return Math.ceil(maxVal / magnitude) * magnitude;
  }, [yearWiseData]);

  // Y-Axis Ticks (4 ticks)
  const yTicks = [0, maxY * 0.25, maxY * 0.5, maxY * 0.75, maxY];

  // X-Axis Ticks (up to 6 ticks)
  const xTicks = useMemo(() => {
    if (!yearWiseData.length) return [];
    const count = yearWiseData.length;
    if (count <= 6) return yearWiseData;
    const step = Math.ceil((count - 1) / 5);
    const ticks = [];
    for (let i = 0; i < count; i += step) {
      ticks.push(yearWiseData[i]);
    }
    if (ticks[ticks.length - 1].year !== yearWiseData[count - 1].year) {
      ticks.push(yearWiseData[count - 1]);
    }
    return ticks;
  }, [yearWiseData]);

  // Generate SVG Polygon / Path for Invested (Purple) and Total (Green over Purple)
  const { investedPath, totalPath, investedArea, totalArea, pointCoords } = useMemo(() => {
    if (!yearWiseData.length) {
      return { investedPath: '', totalPath: '', investedArea: '', totalArea: '', pointCoords: [] };
    }

    const n = yearWiseData.length;
    const coords = yearWiseData.map((d, index) => {
      const x = padding.left + (index / (n - 1)) * graphWidth;
      const yInvested = padding.top + graphHeight - (d.invested / maxY) * graphHeight;
      const yTotal = padding.top + graphHeight - (d.total / maxY) * graphHeight;
      return { x, yInvested, yTotal, data: d };
    });

    // Generate line paths
    const investedLine = coords.map((c, idx) => `${idx === 0 ? 'M' : 'L'} ${c.x} ${c.yInvested}`).join(' ');
    const totalLine = coords.map((c, idx) => `${idx === 0 ? 'M' : 'L'} ${c.x} ${c.yTotal}`).join(' ');

    // Generate area polygons
    const zeroY = padding.top + graphHeight;
    const invArea = `${investedLine} L ${coords[coords.length - 1].x} ${zeroY} L ${coords[0].x} ${zeroY} Z`;

    // Total area goes along total curve then backwards along invested curve to fill just the green top part
    const totalTopArea = `${totalLine} L ${coords[coords.length - 1].x} ${zeroY} L ${coords[0].x} ${zeroY} Z`;

    return {
      investedPath: investedLine,
      totalPath: totalLine,
      investedArea: invArea,
      totalArea: totalTopArea,
      pointCoords: coords
    };
  }, [yearWiseData, maxY, graphWidth, graphHeight, padding]);

  return (
    <div className="min-h-screen bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FAB] overflow-x-hidden">
      
      {/* 1. TOP UTILITY BAR */}
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
              <span className="font-medium text-[#EBE8EF]/80 text-xs">SIP Calculator · Compound Growth Planner</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Accurate Compounding · Real-time Graph
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
              Talk to an Expert
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
              Start This SIP
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
              { num: '04', label: 'SIP Calculator', action: () => setMobileMenuOpen(false), active: true },
              { num: '05', label: 'Investment', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investment'); } },
              { num: '06', label: 'Insurance', action: () => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('insurance'); } },
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

      {/* 3. MAIN PAGE CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-14 relative z-10">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-[#8E8A9D] font-medium py-1.5">
          <button onClick={onNavigateHome} className="hover:text-[#7C1FAB] transition-colors cursor-pointer">Home</button>
          <span>&gt;</span>
          <button onClick={() => onNavigatePage && onNavigatePage('tools')} className="hover:text-[#7C1FAB] transition-colors cursor-pointer">Tools</button>
          <span>&gt;</span>
          <span className="text-[#C81E8C] font-semibold">SIP Calculator</span>
        </div>

        {/* HERO BANNER IMAGE */}
        <div className="w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#EBE8EF] shadow-sm my-3 mb-6 bg-white">
          <img
            src="/sip_calculator_hero_banner.png"
            alt="Plan Smarter. Grow Wealth. Use our SIP Calculator to estimate future value of your investments"
            className="w-full h-auto block select-none max-h-[360px] lg:max-h-[400px] object-cover object-center"
          />
        </div>

        {/* 2-COLUMN CALCULATOR GRID - COMPACT & SLEEK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: YOUR SIP DETAILS */}
          <div className="lg:col-span-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-3.5 text-left">
            
            {/* Card Header */}
            <div className="flex items-center gap-2.5 pb-1.5 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-[#7C1FAB] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Your SIP Details</h2>
            </div>

            {/* INPUT 1: Monthly Investment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E1B2E]">
                Monthly Investment (₹)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={monthlyInvestment.toLocaleString('en-IN')}
                  onChange={handleMonthlyInputChange}
                  className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none"
                />
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="500"
                  max="500000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#8E8A9D] mt-0.5">
                  <span>₹500</span>
                  <span>₹5,00,000</span>
                </div>
              </div>
            </div>

            {/* INPUT 2: Expected Annual Return */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs font-bold text-[#1E1B2E]">
                  Expected Annual Return (%)
                </label>
                <span className="text-[#8E8A9D] cursor-pointer" title="Expected rate of return based on fund type">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={expectedReturn}
                  onChange={handleReturnInputChange}
                  className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none"
                />
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#8E8A9D] mt-0.5">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            {/* INPUT 3: Investment Duration */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E1B2E]">
                Investment Duration
              </label>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-8">
                  <input
                    type="number"
                    value={duration}
                    onChange={handleDurationInputChange}
                    className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value)}
                    className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] rounded-xl px-2.5 py-2 text-xs font-bold text-[#1E1B2E] transition-all outline-none cursor-pointer"
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
                  max={durationUnit === 'years' ? 40 : 480}
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#8E8A9D] mt-0.5">
                  <span>1 {durationUnit === 'years' ? 'Year' : 'Month'}</span>
                  <span>{durationUnit === 'years' ? '40 Years' : '480 Months'}</span>
                </div>
              </div>
            </div>

            {/* SMART TIP BOX */}
            <div className="bg-[#FAF5FD] border border-purple-100 rounded-xl p-2.5 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                💡
              </div>
              <p className="text-[11px] text-[#544F66] leading-relaxed font-medium">
                <strong className="text-[#1E1B2E] font-bold">Tip:</strong> Historically, equity mutual funds have delivered average returns of 10–15% p.a. over the long term.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="w-full bg-[#5E1083] hover:bg-[#7C1FAB] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Calculate &amp; Plan</span>
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

                <span className="text-gray-300">|</span>

                <button
                  onClick={() => setShowTable(!showTable)}
                  className="text-[11px] font-bold text-[#7C1FAB] hover:underline transition-all flex items-center gap-1 py-0.5 cursor-pointer"
                >
                  <span>{showTable ? 'Hide Schedule' : 'View Year-wise Schedule'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: YOUR FUTURE CORPUS + LIVE GRAPH */}
          <div className="lg:col-span-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-3.5 text-left relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Your Future Corpus</h2>
                  <span className="text-[11px] font-medium text-[#8E8A9D]">At the end of {duration} {durationUnit}</span>
                </div>
              </div>
            </div>

            {/* BIG HIGHLIGHTED TOTAL AMOUNT */}
            <div className="py-0">
              <div className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#7C1FAB] tracking-tight">
                {formatINR(totalValue)}
              </div>
            </div>

            {/* 3-STATS SUMMARY ROW */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-0 pb-2 border-b border-gray-100 text-left">
              <div>
                <span className="text-[10px] font-semibold text-[#8E8A9D] block mb-0.5">Total Invested</span>
                <span className="text-xs sm:text-sm font-bold text-[#1E1B2E]">{formatINR(totalInvested)}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#8E8A9D] block mb-0.5">Est. Returns</span>
                <span className="text-xs sm:text-sm font-bold text-[#16A34A]">{formatINR(estReturns)}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#8E8A9D] block mb-0.5">XIRR / Return</span>
                <span className="text-xs sm:text-sm font-bold text-[#0284C7]">{expectedReturn.toFixed(2)}%</span>
              </div>
            </div>

            {/* INTERACTIVE WORKING GROWTH GRAPH */}
            <div className="space-y-2">
              
              {/* Legend Row */}
              <div className="flex items-center justify-end gap-4 text-[11px] font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-[#7C1FAB]"></span>
                  <span className="text-[#544F66]">Invested Amount</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-[#22C55E]"></span>
                  <span className="text-[#544F66]">Estimated Returns</span>
                </div>
              </div>

              {/* Chart Canvas Area */}
              <div className="w-full bg-[#FAF9FC] rounded-xl p-1.5 sm:p-2.5 border border-purple-50 relative select-none">
                
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto overflow-visible"
                >
                  <defs>
                    {/* Gradient for Invested (Purple) */}
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C1FAB" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#7C1FAB" stopOpacity="0.95" />
                    </linearGradient>

                    {/* Gradient for Returns (Green) */}
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#16A34A" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {yTicks.map((tickVal, i) => {
                    const y = padding.top + graphHeight - (tickVal / maxY) * graphHeight;
                    return (
                      <g key={i}>
                        <line
                          x1={padding.left}
                          y1={y}
                          x2={padding.left + graphWidth}
                          y2={y}
                          stroke="#EBE8EF"
                          strokeDasharray={i === 0 ? "none" : "3,3"}
                          strokeWidth="1"
                        />
                        <text
                          x={padding.left - 6}
                          y={y + 3}
                          textAnchor="end"
                          className="text-[9px] fill-[#8E8A9D] font-medium"
                        >
                          {formatAxisAmount(tickVal)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Stacked Area: Green (Total Area) */}
                  <path
                    d={totalArea}
                    fill="url(#greenGrad)"
                    className="transition-all duration-300"
                  />

                  {/* Stacked Area: Purple (Invested Area) */}
                  <path
                    d={investedArea}
                    fill="url(#purpleGrad)"
                    className="transition-all duration-300"
                  />

                  {/* Total Line Top Edge */}
                  <path
                    d={totalPath}
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />

                  {/* Invested Line Edge */}
                  <path
                    d={investedPath}
                    fill="none"
                    stroke="#5E1083"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />

                  {/* X-Axis Ticks */}
                  {xTicks.map((tick, i) => {
                    const x = padding.left + (tick.year / effectiveYears) * graphWidth;
                    return (
                      <g key={i}>
                        <line
                          x1={x}
                          y1={padding.top + graphHeight}
                          x2={x}
                          y2={padding.top + graphHeight + 4}
                          stroke="#8E8A9D"
                          strokeWidth="1"
                        />
                        <text
                          x={x}
                          y={padding.top + graphHeight + 14}
                          textAnchor="middle"
                          className="text-[10px] fill-[#8E8A9D] font-semibold"
                        >
                          {tick.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Interactive Hover Nodes */}
                  {pointCoords.map((pt, idx) => (
                    <g
                      key={idx}
                      className="cursor-pointer group/node"
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      {/* Invisible wider hit area */}
                      <circle cx={pt.x} cy={pt.yTotal} r="12" fill="transparent" />
                      {/* Visible node on total */}
                      <circle
                        cx={pt.x}
                        cy={pt.yTotal}
                        r={hoveredPoint && hoveredPoint.data.year === pt.data.year ? 4.5 : 2.5}
                        fill="#FFFFFF"
                        stroke="#16A34A"
                        strokeWidth="2"
                        className="transition-all duration-150"
                      />
                    </g>
                  ))}
                </svg>

                {/* Interactive Tooltip Overlay */}
                {hoveredPoint && (
                  <div
                    className="absolute bg-[#11081F] text-white p-2.5 rounded-xl shadow-xl text-xs z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-1"
                    style={{
                      left: `${(hoveredPoint.x / chartWidth) * 100}%`,
                      top: `${(hoveredPoint.yTotal / chartHeight) * 100}%`
                    }}
                  >
                    <div className="font-extrabold text-[#F5A623] border-b border-white/20 pb-0.5 mb-1 text-[11px]">
                      Year {hoveredPoint.data.year}
                    </div>
                    <div className="flex justify-between gap-3 text-[10px]">
                      <span className="text-gray-300">Invested:</span>
                      <span className="font-bold">{formatINR(hoveredPoint.data.invested)}</span>
                    </div>
                    <div className="flex justify-between gap-3 text-[10px]">
                      <span className="text-gray-300">Returns:</span>
                      <span className="font-bold text-[#22C55E]">+{formatINR(hoveredPoint.data.returns)}</span>
                    </div>
                    <div className="flex justify-between gap-3 pt-0.5 mt-0.5 border-t border-white/15 text-[10px]">
                      <span className="text-white font-semibold">Total Value:</span>
                      <span className="font-extrabold text-[#F5A623]">{formatINR(hoveredPoint.data.total)}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* DISCLAIMER NOTE */}
            <div className="bg-[#FAF5FD] rounded-xl p-2 px-3 border border-purple-100 text-center">
              <p className="text-[10px] text-[#8E8A9D] font-medium leading-tight">
                The graph represents an estimate based on the returns provided. Actual returns may vary depending on fund performance.
              </p>
            </div>

            {/* Direct Action Button */}
            <button
              onClick={() => setConsultModalOpen(true)}
              className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Invest {formatINR(monthlyInvestment)} / Month</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

          </div>

        </div>

        {/* EXPANDABLE YEAR-WISE SCHEDULE TABLE */}
        {showTable && (
          <div className="mt-10 bg-white rounded-[28px] border border-[#EBE3F5] p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300 text-left">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#1E1B2E]">Year-wise Wealth Accumulation Schedule</h3>
                <p className="text-xs text-[#544F66]">Track how your monthly deposit grows every single year</p>
              </div>
              <button
                onClick={() => setShowTable(false)}
                className="text-xs font-bold text-[#7C1FAB] hover:underline cursor-pointer"
              >
                Close Table
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAF5FD] text-[#1E1B2E] border-b border-purple-100">
                    <th className="py-3 px-4 rounded-l-xl font-bold">Year</th>
                    <th className="py-3 px-4 font-bold">Annual Investment</th>
                    <th className="py-3 px-4 font-bold">Total Invested</th>
                    <th className="py-3 px-4 font-bold">Est. Interest Earned</th>
                    <th className="py-3 px-4 rounded-r-xl font-bold text-[#7C1FAB]">Ending Corpus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {yearWiseData.filter(d => d.year > 0).map((d) => (
                    <tr key={d.year} className="hover:bg-purple-50/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#1E1B2E]">Year {d.year}</td>
                      <td className="py-3 px-4 text-[#544F66]">{formatINR(monthlyInvestment * 12)}</td>
                      <td className="py-3 px-4 text-[#544F66] font-medium">{formatINR(d.invested)}</td>
                      <td className="py-3 px-4 text-[#16A34A] font-semibold">+{formatINR(d.returns)}</td>
                      <td className="py-3 px-4 font-bold text-[#7C1FAB]">{formatINR(d.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. SIP BENEFITS SECTION (Matching Screenshot) */}
        <section className="mt-14 sm:mt-16 text-left">
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight mb-8">
            SIP Benefits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Benefit 1 */}
            <div className="bg-white rounded-[24px] border border-[#EBE3F5] p-6 shadow-sm hover:shadow-md transition-all hover:border-purple-200 flex flex-col justify-between group">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EEFB] text-[#7C1FAB] flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 group-hover:bg-[#7C1FAB] group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1E1B2E] mb-2">
                  Rupee Cost Averaging
                </h3>
                <p className="text-xs text-[#544F66] font-medium leading-relaxed">
                  Invest a fixed amount regularly and reduce the impact of market volatility without timing the market.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-[24px] border border-[#EBE3F5] p-6 shadow-sm hover:shadow-md transition-all hover:border-purple-200 flex flex-col justify-between group">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EEFB] text-[#7C1FAB] flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 group-hover:bg-[#7C1FAB] group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1E1B2E] mb-2">
                  Power of Compounding
                </h3>
                <p className="text-xs text-[#544F66] font-medium leading-relaxed">
                  Earn returns on your returns and accelerate your wealth creation exponential trajectory over time.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-[24px] border border-[#EBE3F5] p-6 shadow-sm hover:shadow-md transition-all hover:border-purple-200 flex flex-col justify-between group">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EEFB] text-[#7C1FAB] flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 group-hover:bg-[#7C1FAB] group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1E1B2E] mb-2">
                  Discipline &amp; Simplicity
                </h3>
                <p className="text-xs text-[#544F66] font-medium leading-relaxed">
                  SIP helps you stay disciplined and build wealth seamlessly through automated monthly debits.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-[24px] border border-[#EBE3F5] p-6 shadow-sm hover:shadow-md transition-all hover:border-purple-200 flex flex-col justify-between group">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EEFB] text-[#7C1FAB] flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 group-hover:bg-[#7C1FAB] group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1E1B2E] mb-2">
                  Wealth Creation
                </h3>
                <p className="text-xs text-[#544F66] font-medium leading-relaxed">
                  Ideal for long-term goals like retirement, buying a dream home, or children's higher education.
                </p>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* 5. CONSULTATION / START SIP MODAL */}
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
              📈
            </div>

            <h3 className="text-xl font-bold text-[#1E1B2E] mb-1">Start Your SIP of {formatINR(monthlyInvestment)}/mo</h3>
            <p className="text-xs text-[#544F66] mb-5 leading-relaxed">
              Target Corpus: <strong className="text-[#7C1FAB]">{formatINR(totalValue)}</strong> in {duration} {durationUnit}. Connect with our certified mutual fund advisors to pick top quartile funds.
            </p>

            <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); setConsultModalOpen(false); alert('Thank you! Our investment advisor will call you to setup your SIP.'); }}>
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
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Preferred Risk Appetite</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors bg-white">
                  <option>Moderate (Balanced Advantage / Flexi Cap Funds)</option>
                  <option>Aggressive (Mid Cap / Small Cap Funds)</option>
                  <option>Conservative (Large Cap / Index Funds)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                Proceed with Advisor
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
