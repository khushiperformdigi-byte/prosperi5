import React, { useState, useEffect } from 'react';
import { sendWhatsAppEnquiry } from './utils/whatsapp';
import PhoneInput from './components/PhoneInput';
import { getPathForPage } from './utils/routing';

export default function Navbar({
  currentPage = 'home',
  onNavigatePage,
  activeTab = 'partners',
  setActiveTab
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [expertModalOpen, setExpertModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', countryCode: '+91', email: '', query: 'General Inquiry' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen || expertModalOpen || loginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, expertModalOpen, loginModalOpen]);

  const handleNav = (pageName, anchor) => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    setToolsDropdownOpen(false);

    if (onNavigatePage) {
      onNavigatePage(pageName);
    } else {
      const path = getPathForPage(pageName);
      if (window.location.pathname + window.location.search !== path || window.location.hash) {
        window.history.pushState({ page: pageName }, '', path);
      }
    }

    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendWhatsAppEnquiry({
      formName: 'Talk to a Wealth Advisor (Navbar Header)',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.query
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setExpertModalOpen(false);
      setLoginModalOpen(false);
      setFormData({ name: '', phone: '', email: '', query: 'General Inquiry' });
    }, 2000);
  };

  return (
    <>
      {/* 1. TOP CONTACT UTILITY BAR - CYLINDER SHAPE (DESKTOP ONLY) */}
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
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Investments - Insurance · Financing</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              All through one trusted relationship
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setExpertModalOpen(true)}
              className="bg-[#F5A623] hover:bg-[#D49300] text-[#1E1B2E] font-bold px-4 py-1.5 rounded-full text-[10px] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M2.25 6.622c0-1.077.873-1.95 1.95-1.95h2.25c.877 0 1.63.585 1.85 1.432l.711 2.766c.2.783-.062 1.615-.67 2.115l-1.56 1.287a15.776 15.776 0 0 0 6.6 6.6l1.287-1.56c.5-.608 1.332-.87 2.115-.67l2.766.711c.847.22 1.432.973 1.432 1.85v2.25c0 1.077-.873 1.95-1.95 1.95h-2.25a16.5 16.5 0 0 1-16.5-16.5v-2.25Z" />
              </svg>
              Talk to an Expert
            </button>

            <div className="flex items-center gap-3 sm:gap-4 text-[#EBE8EF]/80 text-xs">
              <span className="text-[#EBE8EF]/20">|</span>
              <button
                onClick={() => handleNav('partner')}
                className="hover:text-white transition-colors flex items-center gap-1 font-medium cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Partner Login
              </button>
              <span className="text-[#EBE8EF]/20">|</span>
              <button
                onClick={() => handleNav('investors')}
                className="hover:text-white transition-colors flex items-center gap-1 font-medium cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Investor Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FLOATING NAVBAR */}
      <nav className={`sticky top-0 lg:top-3.5 max-w-[1380px] mx-auto px-0 lg:px-4 mt-2 sm:mt-3.5 relative font-sans transition-all ${mobileMenuOpen ? 'z-[9999]' : 'z-50'}`}>
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-[#EBE8EF] shadow-sm lg:shadow-[0_12px_40px_rgba(30,27,46,0.08)] h-[72px] lg:h-[64px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">

          {/* Brand Logo */}
          <div className="flex items-center cursor-pointer group shrink-0 pr-2" onClick={() => handleNav('home')}>
            <img
              src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png"
              className="h-[44px] lg:h-[44px] w-auto max-w-[170px] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              alt="PROSPERi5 Logo"
            />
          </div>

          {/* Links - Desktop */}
          <div className="hidden lg:flex items-center justify-center gap-x-8 xl:gap-x-10 font-medium text-[#1E1B2E] text-sm px-4 flex-1">
            
            {/* Home */}
            <a
              href={getPathForPage('home')}
              onClick={(e) => { e.preventDefault(); handleNav('home'); }}
              className={`whitespace-nowrap transition-colors py-1 font-semibold cursor-pointer relative ${currentPage === 'home' ? 'text-[#1E1B2E] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full' : 'hover:text-[#7C1FA8]'}`}
            >
              Home
            </a>

            {/* About Us */}
            <a
              href={getPathForPage('about')}
              onClick={(e) => { e.preventDefault(); handleNav('about'); }}
              className={`whitespace-nowrap transition-colors py-1 font-semibold cursor-pointer relative ${currentPage === 'about' ? 'text-[#7C1FA8] font-bold after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full' : 'hover:text-[#7C1FA8]'}`}
            >
              About Us
            </a>

            {/* SOLUTIONS DROPDOWN */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button className="whitespace-nowrap hover:text-[#7C1FA8] transition-colors flex items-center gap-1 font-semibold cursor-pointer py-1">
                Solutions
                <svg className="w-3.5 h-3.5 text-[#1E1B2E]/80 group-hover:text-[#7C1FA8] transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col bg-white border border-[#EBE8EF] rounded-xl p-1.5 shadow-[0_10px_25px_rgba(30,27,46,0.08)] w-[200px] space-y-0.5 animate-in fade-in slide-in-from-top-1 z-[9999]">
                <a
                  href={getPathForPage('grow')}
                  onClick={(e) => { e.preventDefault(); handleNav('grow'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Grow
                </a>
                <a
                  href={getPathForPage('protect')}
                  onClick={(e) => { e.preventDefault(); handleNav('protect'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Protect
                </a>
                <a
                  href={getPathForPage('investment')}
                  onClick={(e) => { e.preventDefault(); handleNav('investment'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Investment
                </a>
                <a
                  href={getPathForPage('insurance')}
                  onClick={(e) => { e.preventDefault(); handleNav('insurance'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Insurance
                </a>
                <a
                  href={getPathForPage('financing')}
                  onClick={(e) => { e.preventDefault(); handleNav('financing'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Financing
                </a>
                <a
                  href={getPathForPage('borrow')}
                  onClick={(e) => { e.preventDefault(); handleNav('borrow'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Borrow &amp; Loans
                </a>
                <a
                  href={getPathForPage('personal-finance')}
                  onClick={(e) => { e.preventDefault(); handleNav('personal-finance'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Personal Finance
                </a>
                <a
                  href={getPathForPage('tax')}
                  onClick={(e) => { e.preventDefault(); handleNav('tax'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Tax Solutions
                </a>
              </div>
            </div>

            {/* TOOLS DROPDOWN */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <a
                href={getPathForPage('tools')}
                onClick={(e) => { e.preventDefault(); handleNav('tools'); }}
                className={`whitespace-nowrap hover:text-[#7C1FA8] transition-colors flex items-center gap-1 font-semibold cursor-pointer py-1 relative ${currentPage === 'tools' || currentPage === 'sip-calculator' || currentPage === 'emi-calculator' || currentPage === 'term-insurance-calculator' || currentPage === 'loan-against-securities' ? 'text-[#7C1FA8] font-bold after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full' : ''}`}
              >
                Tools
                <svg className="w-3.5 h-3.5 text-[#1E1B2E]/80 group-hover:text-[#7C1FA8] transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col bg-white border border-[#EBE8EF] rounded-xl p-1.5 shadow-[0_10px_25px_rgba(30,27,46,0.08)] w-[210px] space-y-0.5 animate-in fade-in slide-in-from-top-1 z-[9999]">
                <a
                  href={getPathForPage('tools')}
                  onClick={(e) => { e.preventDefault(); handleNav('tools'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  All Smart Tools Hub
                </a>
                <div className="h-px bg-purple-50/80 my-0.5"></div>
                <a
                  href={getPathForPage('sip-calculator')}
                  onClick={(e) => { e.preventDefault(); handleNav('sip-calculator'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  SIP Calculator
                </a>
                <a
                  href={getPathForPage('emi-calculator')}
                  onClick={(e) => { e.preventDefault(); handleNav('emi-calculator'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  EMI Calculator
                </a>
                <a
                  href={getPathForPage('term-insurance-calculator')}
                  onClick={(e) => { e.preventDefault(); handleNav('term-insurance-calculator'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  Term Insurance Calculator
                </a>
                <a
                  href={getPathForPage('loan-against-securities')}
                  onClick={(e) => { e.preventDefault(); handleNav('loan-against-securities'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#1E1B2E] hover:text-[#7C1FA8] hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  LAS Calculator
                </a>
              </div>
            </div>

            {/* Blog */}
            <a
              href={getPathForPage('blog')}
              onClick={(e) => { e.preventDefault(); handleNav('blog'); }}
              className={`whitespace-nowrap hover:text-[#7C1FA8] transition-colors py-1 font-semibold cursor-pointer relative ${currentPage === 'blog' || currentPage === 'blog-detail' ? 'text-[#7C1FA8] font-bold after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#C81E8C] after:rounded-full' : ''}`}
            >
              Blog
            </a>
          </div>

          {/* Nav Right (Explore as + CTA Buttons) - Desktop */}
          <div className="hidden lg:flex items-center gap-6 shrink-0 ml-8 xl:ml-12 pl-2">
            {/* Explore as Switch */}
            <div className="flex items-center gap-2.5">
              <span className="text-[#8E8A9D] font-semibold text-xs whitespace-nowrap">Explore as</span>
              <div className="bg-purple-50/50 rounded-[14px] p-1 border border-[#EBE8EF] flex items-center text-[11px]">
                <button
                  onClick={() => {
                    if (setActiveTab) setActiveTab('partners');
                    handleNav('partner');
                  }}
                  className={`px-3.5 py-1.5 rounded-[10px] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'partners' ? 'bg-[#FCEBF4] text-[#C81E8C] shadow-sm' : 'text-[#8E8A9D] hover:text-[#1E1B2E]'}`}
                >
                  {activeTab === 'partners' && <span className="w-1.5 h-1.5 rounded-full bg-[#C81E8C]"></span>}
                  For Partners
                </button>
                <button
                  onClick={() => {
                    if (setActiveTab) setActiveTab('investors');
                    handleNav('investors');
                  }}
                  className={`px-3.5 py-1.5 rounded-[10px] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'investors' ? 'bg-purple-100 text-[#7C1FA8] shadow-sm' : 'text-[#8E8A9D] hover:text-[#1E1B2E]'}`}
                >
                  {activeTab === 'investors' && <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FA8]"></span>}
                  For Investors
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="border border-[#EBE8EF] hover:border-[#7C1FA8] text-[#7C1FA8] hover:bg-purple-50 px-5 py-1.5 rounded-[14px] font-bold text-sm transition-all duration-300 flex items-center justify-center h-[38px] whitespace-nowrap cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => setExpertModalOpen(true)}
                className="bg-[#7C1FA8] hover:bg-[#68188C] text-white font-bold text-sm px-5 py-1.5 rounded-[14px] shadow-md transition-all flex items-center gap-1 hover:translate-x-0.5 duration-200 h-[38px] whitespace-nowrap cursor-pointer active:scale-95"
              >
                <span>Signup</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setExpertModalOpen(true)}
              className="bg-[#F5A623] hover:bg-[#D49300] text-[#1E1B2E] font-bold px-3 py-1.5 rounded-full text-xs shadow-sm flex items-center gap-1"
            >
              Expert
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-purple-50 border border-purple-100 text-[#7C1FA8] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-[#FAF6FC] z-[100] p-4 sm:p-6 overflow-y-auto lg:hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="max-w-[360px] mx-auto flex flex-col gap-3 font-sans pb-8">

              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-purple-100/60">
                <img
                  src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png"
                  className="h-[44px] w-auto max-w-[160px] object-contain"
                  alt="PROSPERi5 Logo"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#F5EEFA] text-[#5E1083] flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Explore Mode Switcher */}
              <div className="bg-white rounded-2xl p-2 border border-purple-100 shadow-xs flex gap-2">
                <button
                  onClick={() => {
                    if (setActiveTab) setActiveTab('partners');
                    handleNav('partner');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'partners' ? 'bg-[#FCEBF4] text-[#C81E8C]' : 'text-gray-600'}`}
                >
                  • For Partners
                </button>
                <button
                  onClick={() => {
                    if (setActiveTab) setActiveTab('investors');
                    handleNav('investors');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'investors' ? 'bg-purple-100 text-[#7C1FA8]' : 'text-gray-600'}`}
                >
                  For Investors
                </button>
              </div>

              {/* Numbered Nav List */}
              <div className="flex flex-col gap-2.5 mt-2">
                
                {/* 01 Home */}
                <button
                  onClick={() => handleNav('home')}
                  className={`w-full h-[54px] rounded-[16px] border px-4 flex items-center gap-3.5 shadow-sm transition-all duration-200 cursor-pointer text-left ${currentPage === 'home' ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white'}`}
                >
                  <span className={`font-extrabold text-sm ${currentPage === 'home' ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>01</span>
                  <span className="font-bold text-sm">Home</span>
                </button>

                {/* 02 About Us */}
                <button
                  onClick={() => handleNav('about')}
                  className={`w-full h-[54px] rounded-[16px] border px-4 flex items-center gap-3.5 shadow-sm transition-all duration-200 cursor-pointer text-left ${currentPage === 'about' ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white'}`}
                >
                  <span className={`font-extrabold text-sm ${currentPage === 'about' ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>02</span>
                  <span className="font-bold text-sm">About Us</span>
                </button>

                {/* 03 Solutions (Accordion) */}
                <div className="bg-white rounded-[16px] border border-[#EBE3F5] overflow-hidden shadow-sm">
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="w-full h-[54px] px-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-extrabold text-sm text-[#7C1FA8]">03</span>
                      <span className="font-bold text-sm text-[#1E1B2E]">Solutions</span>
                    </div>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${mobileSolutionsOpen ? 'rotate-180 text-[#7C1FA8]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileSolutionsOpen && (
                    <div className="px-3 pb-3 pt-1 border-t border-purple-50 flex flex-col gap-1 bg-purple-50/30">
                      {[
                        { label: 'Grow', page: 'grow' },
                        { label: 'Protect', page: 'protect' },
                        { label: 'Investment', page: 'investment' },
                        { label: 'Insurance', page: 'insurance' },
                        { label: 'Financing', page: 'financing' },
                        { label: 'Borrow & Loans', page: 'borrow' },
                        { label: 'Personal Finance', page: 'personal-finance' },
                        { label: 'Tax Solutions', page: 'tax' },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNav(item.page)}
                          className="w-full py-2 px-3 rounded-lg hover:bg-white text-left font-semibold text-xs text-[#1E1B2E] flex items-center cursor-pointer transition-all"
                        >
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 04 Tools & Calculators (Accordion) */}
                <div className="bg-white rounded-[16px] border border-[#EBE3F5] overflow-hidden shadow-sm">
                  <button
                    onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                    className="w-full h-[54px] px-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-extrabold text-sm text-[#7C1FA8]">04</span>
                      <span className="font-bold text-sm text-[#1E1B2E]">Smart Tools & Calculators</span>
                    </div>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${mobileToolsOpen ? 'rotate-180 text-[#7C1FA8]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileToolsOpen && (
                    <div className="px-3 pb-3 pt-1 border-t border-purple-50 flex flex-col gap-1 bg-purple-50/30">
                      {[
                        { label: 'Smart Tools Hub', page: 'tools' },
                        { label: 'SIP Calculator', page: 'sip-calculator' },
                        { label: 'EMI Calculator', page: 'emi-calculator' },
                        { label: 'Term Insurance Calculator', page: 'term-insurance-calculator' },
                        { label: 'LAS Calculator', page: 'loan-against-securities' },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNav(item.page)}
                          className="w-full py-2 px-3 rounded-lg hover:bg-white text-left font-semibold text-xs text-[#1E1B2E] flex items-center cursor-pointer transition-all"
                        >
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 05 Blog & Insights */}
                <button
                  onClick={() => handleNav('blog')}
                  className={`w-full h-[54px] rounded-[16px] border px-4 flex items-center gap-3.5 shadow-sm transition-all duration-200 cursor-pointer text-left ${currentPage === 'blog' ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white'}`}
                >
                  <span className={`font-extrabold text-sm ${currentPage === 'blog' ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>05</span>
                  <span className="font-bold text-sm">Blog & Insights</span>
                </button>

                {/* 06 Investors */}
                <button
                  onClick={() => handleNav('investors')}
                  className={`w-full h-[54px] rounded-[16px] border px-4 flex items-center gap-3.5 shadow-sm transition-all duration-200 cursor-pointer text-left ${currentPage === 'investors' ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white'}`}
                >
                  <span className={`font-extrabold text-sm ${currentPage === 'investors' ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>06</span>
                  <span className="font-bold text-sm">For Investors</span>
                </button>

                {/* 07 For Partners */}
                <button
                  onClick={() => handleNav('partner')}
                  className={`w-full h-[54px] rounded-[16px] border px-4 flex items-center gap-3.5 shadow-sm transition-all duration-200 cursor-pointer text-left ${currentPage === 'partner' ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white'}`}
                >
                  <span className={`font-extrabold text-sm ${currentPage === 'partner' ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>07</span>
                  <span className="font-bold text-sm">For Partners (B2B)</span>
                </button>

                {/* 08 Careers */}
                <button
                  onClick={() => handleNav('careers')}
                  className={`w-full h-[54px] rounded-[16px] border px-4 flex items-center gap-3.5 shadow-sm transition-all duration-200 cursor-pointer text-left ${currentPage === 'careers' ? 'bg-[#7C1FA8] border-[#7C1FA8] text-white' : 'bg-white border-[#EBE3F5] text-[#1E1B2E] hover:bg-[#7C1FA8] hover:text-white'}`}
                >
                  <span className={`font-extrabold text-sm ${currentPage === 'careers' ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>08</span>
                  <span className="font-bold text-sm">Careers</span>
                </button>

              </div>

              {/* Bottom Actions */}
              <div className="bg-[#180A29] text-white rounded-[22px] p-5 border border-white/10 shadow-xl mt-4 flex flex-col">
                <span className="text-[#F5A623] text-[10px] font-extrabold uppercase tracking-wider mb-1">
                  READY TO BEGIN?
                </span>
                <h3 className="text-white font-bold text-sm leading-snug">
                  Choose your next financial journey.
                </h3>
                <div className="flex items-center gap-2.5 mt-4">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setExpertModalOpen(true);
                    }}
                    className="bg-[#7C1FA8] hover:bg-[#6b1991] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center justify-center gap-1.5 flex-1 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Talk To an Expert</span>
                    <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLoginModalOpen(true);
                    }}
                    className="bg-white hover:bg-gray-100 text-[#5E1083] text-xs font-bold px-5 py-2.5 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </div>

              {/* Bottom Tagline */}
              <p className="text-[#7C1FA8] text-[10px] font-extrabold tracking-widest text-center mt-2 uppercase">
                INVESTMENTS · INSURANCE · FINANCING
              </p>

            </div>
          </div>
        )}
      </nav>

      {/* 3. TALK TO AN EXPERT / CONSULTATION MODAL */}
      {expertModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white bg-cover bg-center rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-white/20 animate-in fade-in zoom-in duration-200 text-left overflow-hidden"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
          >
            <button
              onClick={() => setExpertModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-sm cursor-pointer z-20 transition-all"
            >
              ✕
            </button>

            <div className="relative z-10">
              <span className="text-[11px] font-extrabold text-[#F5A623] uppercase tracking-wider bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full inline-block mb-2">
                EXPERT CONSULTATION
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Talk to a Wealth Advisor
              </h3>
              <p className="text-xs text-white/80 mt-1 mb-5">
                Leave your details below and our senior wealth manager will call you back within 15 minutes.
              </p>

              {submitted ? (
                <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 rounded-2xl p-5 text-center text-white">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2 text-xl font-black shadow-md">
                    ✓
                  </div>
                  <h4 className="font-bold text-white text-sm">Request Received!</h4>
                  <p className="text-xs text-emerald-200 mt-1">Our advisor will connect with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-white block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-purple-200 rounded-xl text-xs sm:text-sm text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white block mb-1">Phone Number</label>
                    <PhoneInput
                      value={formData.phone}
                      countryCode={formData.countryCode}
                      onCountryCodeChange={(code) => setFormData((f) => ({ ...f, countryCode: code }))}
                      onChange={(val) => setFormData((f) => ({ ...f, phone: val }))}
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-purple-200 rounded-xl text-xs sm:text-sm text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white block mb-1">Area of Interest</label>
                    <select
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-purple-200 rounded-xl text-xs sm:text-sm text-[#1E1B2E] focus:outline-none focus:border-[#F5A623]"
                    >
                      <option value="Mutual Funds & SIP">Mutual Funds & SIP</option>
                      <option value="Health & Life Insurance">Health & Life Insurance</option>
                      <option value="Business & LAP Loans">Business & LAP Loans</option>
                      <option value="Tax Saving Strategies">Tax Saving Strategies</option>
                      <option value="Partner B2B Network">Partner B2B Network</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#7C1FA8] hover:bg-[#68188C] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer mt-2 active:scale-95 border border-white/20"
                  >
                    Submit Request →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. LOGIN / PORTAL SELECTOR MODAL */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full p-6 shadow-2xl relative border border-purple-100 animate-in fade-in zoom-in duration-200 text-left">
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-purple-50 text-gray-700 hover:bg-purple-100 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-[#1E1B2E] tracking-tight mb-1">
              PROSPERi5 Portal Login
            </h3>
            <p className="text-xs text-gray-600 mb-5">
              Choose the portal you would like to sign in to:
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setLoginModalOpen(false);
                  handleNav('partner');
                }}
                className="w-full p-4 rounded-2xl border-2 border-purple-200 hover:border-[#7C1FA8] bg-purple-50/50 hover:bg-purple-50 text-left transition-all cursor-pointer flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7C1FA8] text-white flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-110 transition-all">
                  🤝
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#7C1FA8]">Partner (B2B) Portal</h4>
                  <p className="text-[11px] text-gray-500 font-medium">For IFAs, MFDs, CAs & Wealth Partners</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setLoginModalOpen(false);
                  handleNav('investors');
                }}
                className="w-full p-4 rounded-2xl border-2 border-purple-200 hover:border-[#7C1FA8] bg-purple-50/50 hover:bg-purple-50 text-left transition-all cursor-pointer flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5A623] text-white flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-110 transition-all">
                  📈
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#1E1B2E]">Investor Portal</h4>
                  <p className="text-[11px] text-gray-500 font-medium">Track SIP, Portfolio & Family Wealth</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
