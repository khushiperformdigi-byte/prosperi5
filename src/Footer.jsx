import React from 'react';

export default function Footer({ onNavigatePage }) {
  const handleNav = (page) => {
    if (onNavigatePage) {
      onNavigatePage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* FOOTER - MOBILE VIEW ONLY */}
      <footer id="footer-mobile" className="block lg:hidden bg-[#130B24] text-white py-8 px-4 border-t border-purple-900/40 font-sans select-none">
        <div className="max-w-[360px] mx-auto flex flex-col items-center">

          {/* Logo */}
          <img
            src="/PROPSERI 5 LOGO.png"
            className="h-10 w-auto object-contain mb-4 filter drop-shadow-sm cursor-pointer"
            alt="PROSPERi5 Logo"
            onClick={() => handleNav('home')}
          />

          {/* Tagline */}
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="font-medium text-[18px] leading-[22px] tracking-[-0.5px] text-white text-center w-[350px] max-w-full mb-5"
          >
            Investments, insurance and financing through one trusted relationship.
          </p>

          {/* Pill Badge */}
          <div className="w-[283px] max-w-full h-[44px] rounded-[22px] bg-[#7C1FA8] text-white text-xs sm:text-[13px] font-medium flex items-center justify-center text-center px-4 mb-8 shadow-md">
            One relationship · Complete financial ecosystem
          </div>

          {/* 4 Link Columns Grid (2x2) */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 w-full max-w-[340px] mb-8 text-left px-2">

            {/* Column 1: SOLUTIONS */}
            <div className="flex flex-col gap-2">
              <h4 style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#F5A623] text-[14px] font-medium tracking-[-0.5px] leading-none mb-1">
                SOLUTIONS
              </h4>
              <ul style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-[14px] font-medium tracking-[-0.5px] text-white/90">
                <li><button onClick={() => handleNav('grow')} className="hover:text-white transition-colors cursor-pointer text-left">Grow</button></li>
                <li><button onClick={() => handleNav('protect')} className="hover:text-white transition-colors cursor-pointer text-left">Protect</button></li>
                <li><button onClick={() => handleNav('investment')} className="hover:text-white transition-colors cursor-pointer text-left">Investments</button></li>
                <li><button onClick={() => handleNav('insurance')} className="hover:text-white transition-colors cursor-pointer text-left">Insurance</button></li>
                <li><button onClick={() => handleNav('financing')} className="hover:text-white transition-colors cursor-pointer text-left">Financing</button></li>
                <li><button onClick={() => handleNav('loan')} className="hover:text-white transition-colors cursor-pointer text-left">Loans</button></li>
                <li><button onClick={() => handleNav('borrow')} className="hover:text-white transition-colors cursor-pointer text-left">Borrow</button></li>
                <li><button onClick={() => handleNav('tools')} className="hover:text-white transition-colors cursor-pointer text-left">Financial Tools</button></li>
              </ul>
            </div>

            {/* Column 2: FOR INVESTORS */}
            <div className="flex flex-col gap-2">
              <h4 style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#F5A623] text-[14px] font-medium tracking-[-0.5px] leading-none mb-1">
                FOR INVESTORS
              </h4>
              <ul style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-[14px] font-medium tracking-[-0.5px] text-white/90">
                <li><button onClick={() => handleNav('investors')} className="hover:text-white transition-colors cursor-pointer text-left">Investor Overview</button></li>
                <li><button onClick={() => handleNav('insights')} className="hover:text-white transition-colors cursor-pointer text-left">Market Insights</button></li>
                <li><button onClick={() => handleNav('tax')} className="hover:text-white transition-colors cursor-pointer text-left">Tax Solutions</button></li>
                <li><button onClick={() => handleNav('personal-finance')} className="hover:text-white transition-colors cursor-pointer text-left">Personal Finance</button></li>
                <li><button onClick={() => handleNav('knowledge')} className="hover:text-white transition-colors cursor-pointer text-left">Knowledge Centre</button></li>
                <li><button onClick={() => handleNav('blog')} className="hover:text-white transition-colors cursor-pointer text-left">Blog & Articles</button></li>
                <li><a href="#expert" className="hover:text-white transition-colors">Talk To an Expert</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Column 3: FOR PARTNERS */}
            <div className="flex flex-col gap-2">
              <h4 style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#F5A623] text-[14px] font-medium tracking-[-0.5px] leading-none mb-1">
                FOR PARTNERS
              </h4>
              <ul style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-[14px] font-medium tracking-[-0.5px] text-white/90">
                <li><button onClick={() => onNavigatePage && onNavigatePage('partner')} className="hover:text-white transition-colors cursor-pointer text-left">Partner Overview</button></li>
                <li><button onClick={() => onNavigatePage && onNavigatePage('partner')} className="hover:text-white transition-colors cursor-pointer text-left">Become a Partner</button></li>
                <li><button onClick={() => onNavigatePage && onNavigatePage('partner')} className="hover:text-white transition-colors cursor-pointer text-left">Partner Login</button></li>
                <li><button onClick={() => onNavigatePage && onNavigatePage('partner')} className="hover:text-white transition-colors cursor-pointer text-left">Partner Brochure</button></li>
              </ul>
            </div>

            {/* Column 4: COMPANY */}
            <div className="flex flex-col gap-2">
              <h4 style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#F5A623] text-[14px] font-medium tracking-[-0.5px] leading-none mb-1">
                COMPANY
              </h4>
              <ul style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-[14px] font-medium tracking-[-0.5px] text-white/90">
                <li><button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer text-left">About Us</button></li>
                <li><button onClick={() => handleNav('careers')} className="hover:text-white transition-colors cursor-pointer text-left">Careers</button></li>
                <li><a href="#why-prosperi5" className="hover:text-white transition-colors">Why PROSPERi5</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="w-[350px] max-w-full h-[1px] bg-white/10 my-4"></div>

          {/* Ready to start conversation block */}
          <div className="flex flex-col items-center text-center w-full max-w-[340px] my-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-[1px] bg-[#F5A623]/40"></div>
              <span className="text-[#F5A623] text-[11px] font-extrabold tracking-wider uppercase">
                READY TO START A CONVERSATION?
              </span>
              <div className="w-8 h-[1px] bg-[#F5A623]/40"></div>
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif" }} className="font-medium text-[14px] leading-tight tracking-[-0.5px] text-white/90 mb-4">
              Talk to a financial expert or partner specialist.
            </p>

            <a
              href="#contact"
              className="w-[160px] h-[44px] rounded-full bg-[#7C1FA8] hover:bg-[#9B26D4] text-white font-medium text-[14px] tracking-[-0.5px] flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer mb-6"
            >
              <span>Contact Us</span>
              <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>

            {/* Contact info & Social */}
            <div className="flex flex-col items-start text-left w-full pl-2 mb-6">
              <a href="mailto:hello@prosperi5.com" style={{ fontFamily: "'Inter', sans-serif" }} className="font-medium text-[14px] tracking-[-0.5px] text-white hover:text-[#F5A623] transition-colors block mb-1">
                hello@prosperi5.com
              </a>
              <p style={{ fontFamily: "'Inter', sans-serif" }} className="font-medium text-[14px] tracking-[-0.5px] text-white/80 block mb-5">
                +91 00000 00000
              </p>

              <span className="text-[#F5A623] text-[11px] font-extrabold tracking-wider uppercase mb-2.5 block">FOLLOW</span>
              <div className="flex items-center gap-3">
                <a href="#facebook" className="w-[44px] h-[44px] rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#youtube" className="w-[44px] h-[44px] rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#x" className="w-[44px] h-[44px] rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="w-full flex flex-col items-start text-left pl-2 mt-4 pt-4 border-t border-white/10 relative">
            <p style={{ fontFamily: "'Inter', sans-serif" }} className="font-medium text-[11px] tracking-[0.002em] text-white/70 mb-2">
              © 2026 PROSPERi5. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-2 text-[#F5A623] text-[11px] font-medium mb-3 text-left w-full pr-2">
              <button onClick={() => handleNav('privacy-policy')} className="hover:underline cursor-pointer">Privacy Policy</button>
              <span>·</span>
              <button onClick={() => handleNav('terms-and-conditions')} className="hover:underline cursor-pointer">Terms &amp; Conditions</button>
              <span>·</span>
              <a href="#disclaimer" className="hover:underline">Disclaimer</a>
              <span>·</span>
              <a href="#grievance" className="hover:underline">Grievance Redressal</a>
            </div>

            <p className="text-[10px] text-white/50 leading-tight mb-4 text-left max-w-[340px]">
              Investment products are subject to market risks. Insurance and financing solutions are subject to provider terms, eligibility and applicable regulations.
            </p>

            <div className="w-full flex justify-end pr-2 pt-1">
              <button
                onClick={scrollToTop}
                className="text-[#F5A623] text-xs font-semibold flex items-center justify-end gap-1.5 hover:underline cursor-pointer py-1"
              >
                <span>Back to top</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* FOOTER - DESKTOP VIEW ONLY */}
      <footer
        style={{ backgroundImage: "url('/ChatGPT Image Aug 12, 2026, 09_15_25 PM.png')" }}
        className="hidden lg:block w-full py-4 sm:py-5 lg:py-6 px-3 sm:px-4 lg:px-5 relative overflow-hidden select-none font-sans text-white border-t border-purple-900/40 bg-cover bg-center"
      >
        {/* Main Floating Footer Card Container */}
        <div className="bg-[#180F24]/95 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 lg:p-6 max-w-[1248px] mx-auto border border-white/10 shadow-2xl relative overflow-hidden">

          {/* TOP NAVIGATION GRID (5 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10 mb-5 sm:mb-6">

            {/* Column 1: Brand Info */}
            <div className="lg:col-span-1 flex flex-col justify-between">
              <div>
                <img
                  src="/PROPSERI 5 LOGO.png"
                  className="h-9 sm:h-10 w-auto object-contain mb-2.5 filter drop-shadow-sm cursor-pointer"
                  alt="PROSPERi5 Logo"
                  onClick={() => handleNav('home')}
                />
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-semibold mb-2.5 max-w-[210px]">
                  Investments, insurance and financing through one trusted relationship.
                </p>
              </div>
              <div>
                <div className="border border-[#F5A623]/40 text-[#F5A623] bg-[#F5A623]/10 px-3 py-1 rounded-full text-[11px] font-bold inline-block">
                  One relationship · Complete financial ecosystem
                </div>
              </div>
            </div>

            {/* Column 2: SOLUTIONS */}
            <div>
              <h4 className="text-[#F5A623] text-xs font-extrabold tracking-wider uppercase mb-2">SOLUTIONS</h4>
              <ul className="space-y-1 text-xs sm:text-[13px] text-white/90 font-semibold">
                <li><button onClick={() => handleNav('grow')} className="hover:text-white transition-colors cursor-pointer text-left">Grow</button></li>
                <li><button onClick={() => handleNav('protect')} className="hover:text-white transition-colors cursor-pointer text-left">Protect</button></li>
                <li><button onClick={() => handleNav('investment')} className="hover:text-white transition-colors cursor-pointer text-left">Investments</button></li>
                <li><button onClick={() => handleNav('insurance')} className="hover:text-white transition-colors cursor-pointer text-left">Insurance</button></li>
                <li><button onClick={() => handleNav('financing')} className="hover:text-white transition-colors cursor-pointer text-left">Financing</button></li>
                <li><button onClick={() => handleNav('loan')} className="hover:text-white transition-colors cursor-pointer text-left">Loans</button></li>
                <li><button onClick={() => handleNav('borrow')} className="hover:text-white transition-colors cursor-pointer text-left">Borrow</button></li>
                <li><button onClick={() => handleNav('tools')} className="hover:text-white transition-colors cursor-pointer text-left">Financial Tools</button></li>
              </ul>
            </div>

            {/* Column 3: FOR INVESTORS */}
            <div>
              <h4 className="text-[#F5A623] text-xs font-extrabold tracking-wider uppercase mb-2">FOR INVESTORS</h4>
              <ul className="space-y-1 text-xs sm:text-[13px] text-white/90 font-semibold">
                <li><button onClick={() => handleNav('investors')} className="hover:text-white transition-colors cursor-pointer text-left">Investor Overview</button></li>
                <li><button onClick={() => handleNav('insights')} className="hover:text-white transition-colors cursor-pointer text-left">Market Insights</button></li>
                <li><button onClick={() => handleNav('tax')} className="hover:text-white transition-colors cursor-pointer text-left">Tax Solutions</button></li>
                <li><button onClick={() => handleNav('personal-finance')} className="hover:text-white transition-colors cursor-pointer text-left">Personal Finance</button></li>
                <li><button onClick={() => handleNav('knowledge')} className="hover:text-white transition-colors cursor-pointer text-left">Knowledge Centre</button></li>
                <li><button onClick={() => handleNav('blog')} className="hover:text-white transition-colors cursor-pointer text-left">Blog & Articles</button></li>
                <li><a href="#expert" className="hover:text-white transition-colors">Talk To an Expert</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Column 4: FOR PARTNERS */}
            <div>
              <h4 className="text-[#F5A623] text-xs font-extrabold tracking-wider uppercase mb-2">FOR PARTNERS</h4>
              <ul className="space-y-1 text-xs sm:text-[13px] text-white/90 font-semibold">
                <li><button onClick={() => handleNav('partner')} className="hover:text-white transition-colors cursor-pointer text-left">Partner Overview</button></li>
                <li><button onClick={() => handleNav('partner')} className="hover:text-white transition-colors cursor-pointer text-left">Become a Partner</button></li>
                <li><button onClick={() => handleNav('partner')} className="hover:text-white transition-colors cursor-pointer text-left">Partner Login</button></li>
                <li><button onClick={() => handleNav('partner')} className="hover:text-white transition-colors cursor-pointer text-left">Partner Brochure</button></li>
              </ul>
            </div>

            {/* Column 5: COMPANY */}
            <div>
              <h4 className="text-[#F5A623] text-xs font-extrabold tracking-wider uppercase mb-2">COMPANY</h4>
              <ul className="space-y-1 text-xs sm:text-[13px] text-white/90 font-semibold">
                <li><button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer text-left">About Us</button></li>
                <li><button onClick={() => handleNav('careers')} className="hover:text-white transition-colors cursor-pointer text-left">Careers</button></li>
                <li><a href="#why-prosperi5" className="hover:text-white transition-colors">Why PROSPERi5</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

          </div>

          {/* MIDDLE DIVIDER */}
          <div className="border-t border-white/10 my-3 sm:my-3.5"></div>

          {/* MIDDLE CONTACT & SOCIAL ROW */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-3 sm:mb-3.5">

            {/* Left: CTA */}
            <div className="md:col-span-5">
              <span className="text-[#F5A623] text-[11px] font-extrabold tracking-wider uppercase mb-0.5 block">
                READY TO START A CONVERSATION?
              </span>
              <h4 className="text-xs sm:text-[14px] font-bold text-white mb-2">
                Talk to a financial expert or partner specialist.
              </h4>
              <a
                href="#contact"
                className="bg-[#7C1FAB] hover:bg-[#9B26D4] text-white font-bold text-xs px-5 py-2 rounded-full shadow-md inline-flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>Contact Us</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>

            {/* Center: Contact info */}
            <div className="md:col-span-4">
              <a href="mailto:hello@prosperi5.com" className="text-sm sm:text-[15px] font-extrabold text-white hover:text-[#F5A623] transition-colors block leading-snug">
                hello@prosperi5.com
              </a>
              <p className="text-xs sm:text-[13px] text-white/90 font-semibold mt-0.5">+91 00000 00000</p>
            </div>

            {/* Right: Social Icons */}
            <div className="md:col-span-3 flex flex-col md:items-start lg:items-end">
              <span className="text-[#F5A623] text-[11px] font-extrabold tracking-wider uppercase mb-1.5 block">FOLLOW</span>
              <div className="flex items-center gap-2.5">
                <a href="#facebook" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#youtube" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer shadow-sm">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#x" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* SERVICES PILLARS BOX */}
          <div className="border border-white/10 rounded-[16px] py-3.5 px-5 bg-white/[0.03] mb-4 sm:mb-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
              <div className="flex items-center gap-2.5 md:border-r md:border-white/10 md:pr-3">
                <span className="text-[#E84C88] font-extrabold text-xs sm:text-[13.5px]">01</span>
                <span className="text-xs sm:text-[13.5px] font-bold text-white">Investments</span>
              </div>
              <div className="flex items-center gap-2.5 md:border-r md:border-white/10 md:px-3">
                <span className="text-[#9B26D4] font-extrabold text-xs sm:text-[13.5px]">02</span>
                <span className="text-xs sm:text-[13.5px] font-bold text-white">Insurance</span>
              </div>
              <div className="flex items-center gap-2.5 md:border-r md:border-white/10 md:px-3">
                <span className="text-[#E84C88] font-extrabold text-xs sm:text-[13.5px]">03</span>
                <span className="text-xs sm:text-[13.5px] font-bold text-white">Financing</span>
              </div>
              <div className="flex items-center gap-2.5 md:pl-3">
                <span className="text-white font-extrabold text-xs sm:text-[13.5px]">04</span>
                <span className="text-xs sm:text-[13.5px] font-bold text-white">Partner Platform</span>
              </div>
            </div>
          </div>

          {/* BOTTOM COPYRIGHT & DISCLAIMER & SCROLL TO TOP */}
          <div className="pt-4 mt-3 border-t border-white/10 flex flex-col gap-2 text-xs sm:text-[12.5px] text-white/90 font-semibold">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-x-4 gap-y-2 text-center sm:text-left">
              
              <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-2">
                <span className="font-semibold">© 2026 PROSPERi5. All rights reserved.</span>
                <span className="text-white/30 hidden sm:inline">•</span>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 sm:gap-x-3 gap-y-1 text-white/90 font-semibold">
                  <button onClick={() => handleNav('privacy-policy')} className="hover:text-[#F5A623] transition-colors cursor-pointer">Privacy Policy</button>
                  <span className="text-white/40">·</span>
                  <button onClick={() => handleNav('terms-and-conditions')} className="hover:text-[#F5A623] transition-colors cursor-pointer">Terms &amp; Conditions</button>
                  <span className="text-white/40">·</span>
                  <a href="#disclaimer" className="hover:text-[#F5A623] transition-colors">Disclaimer</a>
                  <span className="text-white/40">·</span>
                  <a href="#grievance" className="hover:text-[#F5A623] transition-colors">Grievance Redressal</a>
                </div>
              </div>

              {/* Scroll to Top Action Button */}
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[#F5A623] hover:text-white transition-all text-xs font-bold shadow-sm cursor-pointer hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                <span>Back to top</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
              </button>

            </div>

            <p className="text-[11px] sm:text-xs text-white/70 text-center sm:text-left leading-normal font-semibold">
              Investment products are subject to market risks. Insurance and financing solutions are subject to provider terms, eligibility and applicable regulations.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
