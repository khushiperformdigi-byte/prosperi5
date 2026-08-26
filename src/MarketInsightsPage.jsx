import React, { useState, useEffect } from 'react';
import Footer from './Footer';

// Animated Speedometer Gauge Component with Intersection Observer
function AnimatedSpeedometer() {
  const gaugeRef = React.useRef(null);
  const [needleAngle, setNeedleAngle] = useState(-85);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setNeedleAngle(45);
          }, 300);
        }
      },
      { threshold: 0.2 }
    );

    if (gaugeRef.current) {
      observer.observe(gaugeRef.current);
    }

    return () => {
      if (gaugeRef.current) observer.unobserve(gaugeRef.current);
    };
  }, []);

  return (
    <div ref={gaugeRef} className="flex flex-col items-center justify-center pt-2 pb-1 w-full">
      {/* Semi-circle Gauge Container (Increased Height & Scale) */}
      <div className="w-56 sm:w-64 h-32 sm:h-36 flex items-center justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 120 74">
          <defs>
            <linearGradient id="speedoGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          {/* Background Arc Track */}
          <path d="M 16,66 A 44,44 0 0,1 104,66" fill="none" stroke="#F3F4F6" strokeWidth="11" strokeLinecap="round" />
          {/* Vibrant Gradient Arc Track */}
          <path d="M 16,66 A 44,44 0 0,1 104,66" fill="none" stroke="url(#speedoGrad)" strokeWidth="11" strokeLinecap="round" />
          
          {/* Animated Needle Group rotating around (60, 66) */}
          <g 
            style={{ 
              transform: `rotate(${needleAngle}deg)`, 
              transformOrigin: '60px 66px',
              transition: 'transform 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)' 
            }}
          >
            <line x1="60" y1="66" x2="60" y2="26" stroke="#1E1B2E" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="60" cy="66" r="6.5" fill="#1E1B2E" />
            <circle cx="60" cy="66" r="2.5" fill="#ffffff" />
          </g>
        </svg>
      </div>

      <div className="text-2xl font-black text-emerald-600 mt-2 tracking-tight">Positive</div>
      <span className="text-xs sm:text-sm text-[#666077] font-semibold">Market mood is optimistic</span>
    </div>
  );
}

export default function MarketInsightsPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('1D');

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Modal State
  const [selectedModal, setSelectedModal] = useState(false);
  const [modalOption, setModalOption] = useState({ title: '', subtitle: '' });
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', category: 'Market Insights' });
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

  const handleOpenModal = (title = 'Get Expert Market Reports', subtitle = 'Subscribe to Prosperi5 premium research and institutional market insights.') => {
    setModalOption({ title, subtitle });
    setFormSubmitted(false);
    setSelectedModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSelectedModal(false);
        setFormSubmitted(false);
      }, 1500);
    }, 1000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  // Dynamic Chart Points based on Timeframe
  const chartPoints = {
    '1D': '0,110 40,105 80,115 120,95 160,100 200,90 240,98 280,82 320,88 360,70 400,75 440,55 480,62 520,40 560,45 600,25',
    '1W': '0,130 60,120 120,110 180,95 240,105 300,85 360,75 420,65 480,50 540,40 600,20',
    '1M': '0,140 60,130 120,115 180,125 240,100 300,90 360,80 420,70 480,55 540,35 600,15',
    '6M': '0,150 70,135 140,140 210,110 280,115 350,85 420,70 490,60 560,30 600,10',
    '1Y': '0,160 80,140 160,130 240,105 320,110 400,75 480,50 560,35 600,10',
    '5Y': '0,170 100,150 200,130 300,110 400,80 500,45 600,5'
  };

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-[#1E1B2E] font-sans selection:bg-[#7C1FA8] selection:text-white">
      
      {/* 1. EXACT HOMEPAGE FLOATING NAVBAR & TOP UTILITY STRIP */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-[1500px] mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-muted-text">
              <div className="w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Investments · Insurance · Financing</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-amber-400 bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              All through one trusted relationship
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={() => handleOpenModal('Talk to an Expert', 'Schedule a callback with our wealth advisors.')} className="bg-amber-400 hover:bg-amber-500 text-[#1E1B2E] font-bold px-4 py-1.5 rounded-full text-[10px] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M2.25 6.622c0-1.077.873-1.95 1.95-1.95h2.25c.877 0 1.63.585 1.85 1.432l.711 2.766c.2.783-.062 1.615-.67 2.115l-1.56 1.287a15.776 15.776 0 0 0 6.6 6.6l1.287-1.56c.5-.608 1.332-.87 2.115-.67l2.766.711c.847.22 1.432.973 1.432 1.85v2.25c0 1.077-.873 1.95-1.95 1.95h-2.25a16.5 16.5 0 0 1-16.5-16.5v-2.25Z" />
              </svg>
              Talk to an Expert
            </button>

            <div className="flex items-center gap-3 sm:gap-4 text-[#EBE8EF]/80 text-xs">
              <span className="text-[#EBE8EF]/20">|</span>
              <button onClick={() => onNavigatePage && onNavigatePage('partner')} className="hover:text-white transition-colors flex items-center gap-1 font-medium cursor-pointer">
                Partner Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING NAVBAR WITH BRAND IMAGE LOGO */}
      <nav className={`sticky top-0 lg:top-2 max-w-7xl mx-auto px-0 lg:px-4 relative font-sans transition-all ${mobileMenuOpen ? 'z-[9999]' : 'z-50'}`}>
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-[#EBE8EF] shadow-sm lg:shadow-[0_12px_40px_rgba(30,27,46,0.08)] h-[72px] lg:h-[56px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">

          {/* Top gradient border line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C1FA8] via-[#C81E8C] to-[#F5A623] rounded-t-full"></div>

          {/* Official PROSPERi5 Image Logo */}
          <div className="flex items-center cursor-pointer group" onClick={onNavigateHome}>
            <img
              src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png"
              className="w-[128px] h-[40px] lg:w-auto lg:h-[32px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              alt="PROSPERi5 Logo"
            />
          </div>

          {/* Links - Desktop */}
          <div className="hidden lg:flex items-center justify-center gap-x-6 font-medium text-[#1E1B2E] text-sm px-6 flex-1">
            <button onClick={onNavigateHome} className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer">Home</button>
            <button onClick={() => onNavigatePage && onNavigatePage('about')} className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer">About Us</button>
            <button onClick={() => onNavigatePage && onNavigatePage('investment')} className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer">Invest</button>
            <button onClick={() => onNavigatePage && onNavigatePage('borrow')} className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer">Borrow</button>
            <button onClick={() => onNavigatePage && onNavigatePage('protect')} className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer">Protect</button>
            <button onClick={() => onNavigatePage && onNavigatePage('knowledge')} className="whitespace-nowrap text-[#7C1FA8] relative py-1 font-bold after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full">Market Insights</button>
            <button onClick={() => onNavigatePage && onNavigatePage('partner')} className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer">Partner (B2B)</button>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigatePage && onNavigatePage('partner')}
              className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold px-5 py-2 rounded-full text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer hidden sm:block"
            >
              Partner Login
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#1E1B2E] hover:bg-purple-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] z-40 bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-xl p-5 animate-in slide-in-from-top-4 font-sans">
          <div className="flex flex-col gap-3 font-semibold text-sm text-[#1E1B2E]">
            <button onClick={() => { setMobileMenuOpen(false); onNavigateHome(); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Home</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('about'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">About Us</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investment'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Invest</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('borrow'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Borrow</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('protect'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Protect</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('knowledge'); }} className="text-left py-2 px-3 rounded-lg bg-purple-100 text-[#7C1FA8] font-bold">Market Insights</button>
            <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('partner'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Partner (B2B)</button>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION (REDUCED TOP HEIGHT) */}
      <section 
        className="w-full bg-cover bg-center pt-2 sm:pt-3 lg:pt-4 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-8 lg:px-12 font-sans relative overflow-hidden border-b border-purple-100/50"
        style={{ backgroundImage: `url("/ChatGPT Image Aug 26, 2026, 10_41_03 PM.png")` }}
      >
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-5 text-left font-jakarta">
            <div>
              <span className="text-[#7C1FA8] text-xs font-black uppercase tracking-widest bg-white/95 px-3.5 py-1.5 rounded-full border border-purple-200 inline-block shadow-2xs font-jakarta">
                MARKET INSIGHTS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E1B2E] tracking-tight leading-[1.10] font-jakarta">
              Insights today,<br />
              <span className="text-[#7C1FA8]">better decisions</span><br />
              tomorrow.
            </h1>

            <p className="text-sm sm:text-base text-[#544F66] font-medium leading-relaxed max-w-md font-inter">
              Stay informed with expert analysis, market trends and data that help you invest smarter.
            </p>

            <div className="pt-2">
              <button 
                onClick={() => handleOpenModal('Explore Market Insights', 'Get full access to daily stock reports, Sectoral analysis, and macro-economic research.')}
                className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold px-7 py-3.5 rounded-full text-sm sm:text-base transition-all shadow-xl cursor-pointer active:scale-95 flex items-center gap-2.5 font-jakarta"
              >
                <span>Explore Insights</span>
                <span className="text-base">➔</span>
              </button>
            </div>
          </div>

          {/* Right Hero Graphic: 3D Monitor Graphic */}
          <div className="lg:col-span-7 xl:col-span-7 relative flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[680px] lg:max-w-[780px]">
              <img 
                src="/ChatGPT Image Aug 26, 2026, 10_14_23 PM.png" 
                alt="Market Insights 3D Financial Analytics" 
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. MARKET OVERVIEW (4 STANDALONE INDEX CARDS IN PURPLE THEME) */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
        
        {/* Header Bar (Centered Badge) */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <span className="text-[#7C1FA8] text-xs sm:text-sm font-black uppercase tracking-widest bg-purple-100/90 px-4 py-1.5 rounded-full border border-purple-200 inline-block shadow-2xs">
            MARKET OVERVIEW
          </span>
        </div>

        {/* 4 Separate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: NIFTY 50 */}
          <div className="bg-white border border-purple-100/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-3 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-[#7C1FA8] border border-purple-200/60 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 005.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">+1.25%</span>
            </div>

            <div>
              <span className="text-[11px] font-extrabold text-[#666077] uppercase tracking-wider block">NIFTY 50</span>
              <span className="text-2xl font-black text-[#1E1B2E] tracking-tight">24,834.85</span>
            </div>

            {/* Purple Theme Multi-Zigzag Financial Chart */}
            <div className="pt-1">
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 140 35">
                <defs>
                  <linearGradient id="sparkNiftyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C1FA8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7C1FA8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon points="0,28 8,24 14,26 22,20 30,22 38,16 46,19 54,23 62,17 70,14 78,18 86,15 94,10 102,14 110,11 118,15 126,8 134,12 140,4 140,35 0,35" fill="url(#sparkNiftyGrad)" />
                <polyline points="0,28 8,24 14,26 22,20 30,22 38,16 46,19 54,23 62,17 70,14 78,18 86,15 94,10 102,14 110,11 118,15 126,8 134,12 140,4" fill="none" stroke="#7C1FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: SENSEX */}
          <div className="bg-white border border-purple-100/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-3 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-[#7C1FA8] border border-purple-200/60 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">+1.08%</span>
            </div>

            <div>
              <span className="text-[11px] font-extrabold text-[#666077] uppercase tracking-wider block">SENSEX</span>
              <span className="text-2xl font-black text-[#1E1B2E] tracking-tight">81,186.44</span>
            </div>

            {/* Purple Theme Multi-Zigzag Financial Chart */}
            <div className="pt-1">
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 140 35">
                <defs>
                  <linearGradient id="sparkSensexGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C1FA8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7C1FA8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon points="0,27 10,23 18,25 26,19 34,22 42,15 50,18 58,22 66,16 74,12 82,16 90,13 98,8 106,12 114,9 122,13 130,7 136,10 140,5 140,35 0,35" fill="url(#sparkSensexGrad)" />
                <polyline points="0,27 10,23 18,25 26,19 34,22 42,15 50,18 58,22 66,16 74,12 82,16 90,13 98,8 106,12 114,9 122,13 130,7 136,10 140,5" fill="none" stroke="#7C1FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: NIFTY BANK */}
          <div className="bg-white border border-purple-100/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-3 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-[#7C1FA8] border border-purple-200/60 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5" />
                </svg>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">+0.92%</span>
            </div>

            <div>
              <span className="text-[11px] font-extrabold text-[#666077] uppercase tracking-wider block">NIFTY BANK</span>
              <span className="text-2xl font-black text-[#1E1B2E] tracking-tight">51,234.60</span>
            </div>

            {/* Purple Theme Multi-Zigzag Financial Chart */}
            <div className="pt-1">
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 140 35">
                <defs>
                  <linearGradient id="sparkBankGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C1FA8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#7C1FA8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon points="0,29 9,25 17,27 25,20 33,23 41,16 49,19 57,24 65,18 73,13 81,17 89,14 97,9 105,13 113,10 121,14 129,7 135,11 140,4 140,35 0,35" fill="url(#sparkBankGrad)" />
                <polyline points="0,29 9,25 17,27 25,20 33,23 41,16 49,19 57,24 65,18 73,13 81,17 89,14 97,9 105,13 113,10 121,14 129,7 135,11 140,4" fill="none" stroke="#7C1FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Card 4: INDIA VIX */}
          <div className="bg-white border border-purple-100/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-3 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 border border-rose-200/60 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                </svg>
              </div>
              <span className="text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/60">-2.15%</span>
            </div>

            <div>
              <span className="text-[11px] font-extrabold text-[#666077] uppercase tracking-wider block">INDIA VIX</span>
              <span className="text-2xl font-black text-[#1E1B2E] tracking-tight">13.42</span>
            </div>

            {/* Exact Reference Multi-Zigzag Financial Chart */}
            <div className="pt-1">
              <svg className="w-full h-10 overflow-visible" viewBox="0 0 140 35">
                <defs>
                  <linearGradient id="sparkVixGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon points="0,6 10,10 18,7 26,14 34,11 42,18 50,15 58,11 66,17 74,21 82,17 90,20 98,25 106,21 114,24 122,20 130,26 136,23 140,29 140,35 0,35" fill="url(#sparkVixGrad)" />
                <polyline points="0,6 10,10 18,7 26,14 34,11 42,18 50,15 58,11 66,17 74,21 82,17 90,20 98,25 106,21 114,24 122,20 130,26 136,23 140,29" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

        </div>

      </section>

      {/* 4. MARKET TRENDS & SENTIMENT (FULL WIDTH #FCE9F4 SOFT PINK BACKGROUND) */}
      <section className="w-full bg-[#FCE9F4] py-10 sm:py-12 my-6 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Nifty 50 Performance Chart (Matching Reference Image 1) */}
          <div className="lg:col-span-8 bg-white border border-purple-100/90 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between space-y-5">
            
            {/* Header: Title & Timeframe Selector Tabs */}
            <div className="space-y-3">
              <div>
                <span className="text-[#7C1FA8] text-xs font-black uppercase tracking-widest block">MARKET TRENDS</span>
                <h3 className="text-2xl font-black text-[#1E1B2E] tracking-tight mt-0.5">Nifty 50 Performance</h3>
              </div>

              {/* Timeframe Tabs (Aligned Left directly below title) */}
              <div className="inline-flex items-center gap-1 bg-[#FAF6FC] p-1 rounded-xl border border-purple-100/90">
                {['1D', '1W', '1M', '6M', '1Y', '5Y'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setActiveTimeframe(tf)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      activeTimeframe === tf 
                        ? 'bg-[#7C1FA8] text-white shadow-xs' 
                        : 'text-[#666077] hover:text-[#7C1FA8]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Chart with Y-Axis Price Labels & Horizontal Grid Lines */}
            <div className="relative w-full h-64 pt-2 flex">
              
              {/* Left Y-Axis Price Labels */}
              <div className="w-14 shrink-0 flex flex-col justify-between text-[11px] font-extrabold text-[#8D8A99] pb-6 pr-2 text-right select-none">
                <span>25,200</span>
                <span>24,900</span>
                <span>24,600</span>
                <span>24,300</span>
                <span>24,000</span>
              </div>

              {/* Main SVG Area & Grid Lines */}
              <div className="flex-1 relative h-full flex flex-col justify-between">
                
                {/* Horizontal Background Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                  <div className="border-b border-gray-100 w-full" />
                  <div className="border-b border-gray-100 w-full" />
                  <div className="border-b border-gray-100 w-full" />
                  <div className="border-b border-gray-100 w-full" />
                  <div className="border-b border-gray-100 w-full" />
                </div>

                {/* Floating Tooltip Callout Box over 11:30 AM */}
                <div className="absolute top-[38%] left-[52%] -translate-x-1/2 -translate-y-full bg-white border border-purple-200 rounded-xl px-3 py-1.5 shadow-xl z-20 text-center pointer-events-none">
                  <div className="text-xs font-black text-[#1E1B2E] tracking-tight">24,834.85</div>
                  <div className="text-[10px] font-bold text-[#666077]">11:30 AM</div>
                  {/* Tooltip Down Arrow */}
                  <div className="w-2 h-2 bg-white border-r border-b border-purple-200 rotate-45 mx-auto -mb-2.5 mt-0.5" />
                </div>

                {/* SVG Trendline & Area Gradient */}
                <div className="w-full h-full relative z-10">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartTrendGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C1FA8" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#7C1FA8" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area Polygon */}
                    <polygon points={`0,200 ${chartPoints[activeTimeframe]} 600,200`} fill="url(#chartTrendGlow)" />
                    
                    {/* Multi-Zigzag Stroke */}
                    <polyline points={chartPoints[activeTimeframe]} fill="none" stroke="#7C1FA8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Vertical Dashed Tooltip Line */}
                    <line x1="312" y1="92" x2="312" y2="200" stroke="#7C1FA8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

                    {/* Active Tooltip Dot */}
                    <circle cx="312" cy="92" r="4.5" fill="#7C1FA8" stroke="#ffffff" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* X-Axis Timestamps */}
                <div className="flex justify-between text-[11px] font-extrabold text-[#8D8A99] pt-2 border-t border-purple-100/60 z-20">
                  <span>09:15 AM</span>
                  <span>10:30 AM</span>
                  <span>11:30 AM</span>
                  <span>12:30 PM</span>
                  <span>01:30 PM</span>
                  <span>03:30 PM</span>
                </div>

              </div>

            </div>

          </div>

          {/* Right Column: Market Sentiment Speedometer (Matching Reference Screenshot) */}
          <div className="lg:col-span-4 bg-white border border-purple-100/90 rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between space-y-4">
            
            {/* Header: Title & View Detailed Chart CTA */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#1E1B2E]">Market Sentiment</h3>
              <button 
                onClick={() => handleOpenModal('Market Sentiment Details', 'View live equity advance-decline ratios and sector momentum scores.')}
                className="text-xs font-black text-[#7C1FA8] hover:text-[#6b1a91] flex items-center gap-1 cursor-pointer"
              >
                <span>View Detailed Chart</span>
                <span>➔</span>
              </button>
            </div>

            {/* Animated Speedometer Arc Gauge Graphic */}
            <AnimatedSpeedometer />

            {/* 3 Active Metric Rows (Gainers, Losers, Unchanged) */}
            <div className="space-y-3 pt-3 border-t border-purple-100/60">
              
              {/* Top Gainers */}
              <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-emerald-50/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <svg className="w-4.5 h-4.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 005.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  </div>
                  <span className="text-sm font-extrabold text-[#1E1B2E]">Top Gainers</span>
                </div>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200/60">18</span>
              </div>

              {/* Top Losers */}
              <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-rose-50/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100/90 text-rose-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <svg className="w-4.5 h-4.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                    </svg>
                  </div>
                  <span className="text-sm font-extrabold text-[#1E1B2E]">Top Losers</span>
                </div>
                <span className="text-xs font-black text-rose-700 bg-rose-100/80 px-3 py-1 rounded-full border border-rose-200/60">12</span>
              </div>

              {/* Unchanged */}
              <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-purple-50/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100/90 text-[#7C1FA8] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <svg className="w-4.5 h-4.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-extrabold text-[#1E1B2E]">Unchanged</span>
                </div>
                <span className="text-xs font-black text-[#7C1FA8] bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200/60">20</span>
              </div>

            </div>

          </div>

        </div>
      </section>



      {/* 6. NEWSLETTER SUBSCRIPTION BANNER (ENHANCED TYPOGRAPHY SIZE) */}
      <section className="py-4.5 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
        <div className="bg-gradient-to-r from-[#7C1FA8] via-[#6b1a91] to-[#541275] rounded-2xl sm:rounded-3xl py-4.5 px-6 sm:py-6 sm:px-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
            
            {/* Left 3D Envelope Graphic & Copy */}
            <div className="flex items-center gap-4 sm:gap-5 text-center md:text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 hidden sm:block">
                <img 
                  src="/market_newsletter_3d.jpg" 
                  alt="Market Insights Newsletter 3D Envelope" 
                  className="w-full h-full object-contain mix-blend-screen drop-shadow-md"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">Stay ahead with market insights</h3>
                <p className="text-sm sm:text-base text-purple-100/90 font-medium max-w-lg">
                  Subscribe to get the latest updates and expert analysis delivered to your inbox.
                </p>
              </div>
            </div>

            {/* Right Input Form */}
            <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2.5">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-64 px-5 py-3 rounded-full bg-white text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-white text-[#7C1FA8] hover:bg-purple-50 font-black text-sm rounded-full shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* 7. LEAD INQUIRY & REPORT SUBSCRIPTION MODAL */}
      {selectedModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white bg-cover bg-center rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 overflow-hidden border border-purple-100/80"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <button
                onClick={() => setSelectedModal(false)}
                className="absolute top-0 right-0 w-9 h-9 rounded-full bg-gray-100/90 text-gray-500 hover:bg-gray-200 flex items-center justify-center cursor-pointer font-bold transition-colors z-20"
              >
                ✕
              </button>

              {formSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
                    ✓
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1E1B2E]">Report Sent to Email!</h3>
                  <p className="text-sm text-[#666077] font-medium leading-relaxed max-w-xs mx-auto">
                    Thank you! Our research report has been dispatched to your email address.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <span className="text-[#7C1FA8] text-xs font-black uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full inline-block">
                      PROSPERI5 RESEARCH
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#1E1B2E] mt-2">{modalOption.title}</h3>
                    <p className="text-sm text-[#666077] font-medium mt-1 leading-snug">{modalOption.subtitle}</p>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <div>
                      <label className="text-sm font-extrabold text-[#1E1B2E] block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200/90 bg-white/95 rounded-xl text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-extrabold text-[#1E1B2E] block mb-1.5">Phone Number</label>
                      <div className="flex items-center border border-gray-200/90 bg-white/95 rounded-xl overflow-hidden focus-within:border-[#7C1FA8] focus-within:ring-1 focus-within:ring-[#7C1FA8] transition-all shadow-2xs">
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
                          placeholder="e.g. 9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-3 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-extrabold text-[#1E1B2E] block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200/90 bg-white/95 rounded-xl text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold rounded-xl transition-all text-sm uppercase tracking-wider shadow-md cursor-pointer mt-3 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Get Market Insights</span>
                    <span>➔</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. FOOTER COMPONENT */}
      <Footer onNavigatePage={(p) => onNavigatePage && onNavigatePage(p)} />

    </div>
  );
}
