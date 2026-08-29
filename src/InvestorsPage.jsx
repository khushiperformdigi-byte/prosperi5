import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import PhoneInput from './components/PhoneInput';

export default function InvestorsPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

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

  return (
    <div className="w-full bg-white font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">

      {/* 3. HERO SECTION – Full-width banner image with interactive CTA overlay */}
      <section className="w-full overflow-hidden relative">
        <img
          src="/ChatGPT Image Aug 25, 2026, 03_39_42 PM.png"
          alt="Investor Page - Invest in possibilities. Build lasting wealth."
          className="w-full h-auto block"
        />
        {/* Interactive Overlay Click Zones over Hero CTAs */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Start Investing CTA overlay area */}
          <button
            onClick={() => setSelectedModal(true)}
            aria-label="Start Investing"
            className="absolute left-[7%] sm:left-[8%] top-[44%] sm:top-[47%] w-[18%] sm:w-[15%] h-[18%] sm:h-[15%] rounded-full cursor-pointer pointer-events-auto focus:outline-none"
          />
          {/* Explore Opportunities CTA overlay area */}
          <button
            onClick={() => {
              const el = document.getElementById('opportunities');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else if (onNavigatePage) {
                onNavigatePage('investment');
              } else {
                setSelectedModal(true);
              }
            }}
            aria-label="Explore Opportunities"
            className="absolute left-[26%] sm:left-[24%] top-[44%] sm:top-[47%] w-[24%] sm:w-[20%] h-[18%] sm:h-[15%] rounded-full cursor-pointer pointer-events-auto focus:outline-none"
          />
        </div>
      </section>

      {/* 4. INVESTMENT OPPORTUNITIES (COMPACT SECTION) */}
      <section className="w-full bg-[#FAF7FC] py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-6">
            <h2 className="font-sans font-extrabold text-2xl lg:text-3xl text-[#1E1B2E] tracking-tight mb-1.5">
              Investment opportunities
            </h2>
            <p className="text-[#544F66] text-xs sm:text-sm font-medium">
              Choose from a range of asset classes to match your risk profile and financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                img: '/opp_mutual_funds.png',
                title: 'Mutual Funds',
                desc: 'Professionally managed funds that invest in a diversified portfolio of stocks and bonds.',
                return: '7.6%',
                risk: 'Moderate',
                btnText: 'Explore Funds'
              },
              {
                img: '/opp_bonds.png',
                title: 'Bonds',
                desc: 'Fixed income securities that provide regular interest payments and capital preservation.',
                return: '4.2%',
                risk: 'Low',
                btnText: 'Explore Bonds'
              },
              {
                img: '/opp_fixed_income.png',
                title: 'Fixed Income',
                desc: 'Low-risk investments including government and corporate debt securities.',
                return: '3.1%',
                risk: 'Low',
                btnText: 'Explore Options'
              },
              {
                img: '/opp_alt_investments.png',
                title: 'Alternative Investments',
                desc: 'Diversify beyond traditional assets with private equity, real estate and more.',
                return: '11.3%',
                risk: 'High',
                btnText: 'Explore Options'
              }
            ].map((opp, i) => (
              <div key={i} className="bg-white border border-[#EBE3F5] rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-full h-[150px] sm:h-[160px] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <img src={opp.img} alt={opp.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-extrabold text-[#1E1B2E] text-base sm:text-lg mb-1.5">{opp.title}</h3>
                  <p className="text-[#544F66] text-xs leading-relaxed font-medium mb-4 min-h-[48px]">{opp.desc}</p>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-2 py-2.5 border-t border-b border-[#F0E8F8] mb-4 text-left">
                    <div className="pr-2 border-r border-[#F0E8F8]">
                      <p className="text-[10px] text-[#7A748E] font-semibold uppercase tracking-wider mb-0.5">Avg. Return</p>
                      <p className="font-extrabold text-[#7C1FA8] text-sm sm:text-base">{opp.return}</p>
                    </div>
                    <div className="pl-2">
                      <p className="text-[10px] text-[#7A748E] font-semibold uppercase tracking-wider mb-0.5">Risk</p>
                      <p className="font-extrabold text-[#1E1B2E] text-sm sm:text-base">{opp.risk}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedModal(true)}
                    className="w-full bg-[#5D1693] hover:bg-[#4C107B] text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer text-center"
                  >
                    {opp.btnText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY INVESTORS TRUST US (COMPACT SECTION) */}
      <section className="w-full bg-gradient-to-b from-[#FAF7FD] to-[#F5EEFA] py-8 lg:py-10 px-4 sm:px-6 lg:px-8 border-t border-b border-[#EBE3F5]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left Column: Title + 2x2 Compact Feature Grid */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#1E1B2E] tracking-tight mb-2">
                Why investors trust us?
              </h2>
              <p className="text-[#544F66] text-xs sm:text-sm font-medium leading-relaxed">
                We make investing simple, secure and aligned with your goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 sm:gap-5">
              {/* Feature 1 */}
              <div className="bg-white/90 backdrop-blur-sm border border-[#EBE3F5] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#7C1FA8]/30 transition-all flex items-start gap-3.5 sm:gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F2E8FA] flex items-center justify-center shrink-0 text-[#7C1FA8]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base mb-1">Expertly Curated</h3>
                  <p className="text-[#544F66] text-xs sm:text-[13px] leading-relaxed">
                    Opportunities are carefully selected by experienced professionals.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/90 backdrop-blur-sm border border-[#EBE3F5] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#7C1FA8]/30 transition-all flex items-start gap-3.5 sm:gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F2E8FA] flex items-center justify-center shrink-0 text-[#7C1FA8]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base mb-1">Diversified Approach</h3>
                  <p className="text-[#544F66] text-xs sm:text-[13px] leading-relaxed">
                    Spread across asset classes to minimize risk and maximize returns.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/90 backdrop-blur-sm border border-[#EBE3F5] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#7C1FA8]/30 transition-all flex items-start gap-3.5 sm:gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F2E8FA] flex items-center justify-center shrink-0 text-[#7C1FA8]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base mb-1">Transparent Always</h3>
                  <p className="text-[#544F66] text-xs sm:text-[13px] leading-relaxed">
                    Clear information, no hidden fees, complete transparency.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/90 backdrop-blur-sm border border-[#EBE3F5] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#7C1FA8]/30 transition-all flex items-start gap-3.5 sm:gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F2E8FA] flex items-center justify-center shrink-0 text-[#7C1FA8]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base mb-1">Secure by Design</h3>
                  <p className="text-[#544F66] text-xs sm:text-[13px] leading-relaxed">
                    Bank-level security and encryption to protect your investments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tablet Preview Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#EBE3F5] max-w-[460px] lg:max-w-[500px]">
              <img
                src="/investor_tablet_dashboard.png"
                alt="Why investors trust us dashboard"
                className="w-full h-auto block object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. BUILT FOR YOUR JOURNEY (COMPACT SECTION) */}
      <section className="w-full bg-[#FAF7FC] py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-10">

          {/* Left Column: Image of couple working on laptop */}
          <div className="w-full lg:w-[38%] flex justify-center items-center">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#EBE3F5] w-full max-w-[480px]">
              <img
                src="/built_for_journey_couple.png"
                alt="Invest your way. Grow your future."
                className="w-full h-auto block object-cover"
              />
            </div>
          </div>

          {/* Right Column: Title + 4 Horizontal Features with Dividers */}
          <div className="w-full lg:w-[62%] flex flex-col justify-center">
            <div className="mb-6 text-left">
              <p className="text-[#7C1FA8] font-bold text-xs sm:text-sm tracking-wider uppercase mb-1.5">
                BUILT FOR YOUR JOURNEY
              </p>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1E1B2E] tracking-tight">
                Invest your way. Grow your future.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {/* Feature 1 */}
              <div className="lg:border-r border-[#EBE3F5] lg:pr-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F2E8FA] flex items-center justify-center text-[#7C1FA8] mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base mb-1">Goal Based Investing</h3>
                <p className="text-[#544F66] text-xs sm:text-[13px] leading-relaxed">
                  Align investments with your life goals.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="lg:border-r border-[#EBE3F5] lg:pr-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F2E8FA] flex items-center justify-center text-[#7C1FA8] mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base mb-1">Flexible & Easy</h3>
                <p className="text-[#544F66] text-xs sm:text-[13px] leading-relaxed">
                  Invest anytime, with as little as you want.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="lg:border-r border-[#EBE3F5] lg:pr-4">
                <div className="w-11 h-11 rounded-2xl bg-[#F2E8FA] flex items-center justify-center text-[#7C1FA8] mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base mb-1">Track & Manage</h3>
                <p className="text-[#544F66] text-xs sm:text-[13px] leading-relaxed">
                  Real-time tracking and insights at your fingertips.
                </p>
              </div>

              {/* Feature 4 */}
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[#F2E8FA] flex items-center justify-center text-[#7C1FA8] mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3.001M21 18a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2H21" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1E1B2E] text-sm sm:text-base mb-1">Expert Support</h3>
                <p className="text-[#544F66] text-xs sm:text-[13px] leading-relaxed">
                  We're here to help you every step of the way.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 7. HOW INVESTING WORKS (FULL-WIDTH COMPACT SECTION - NO BOX) */}
      <section className="w-full bg-[#FAF7FC] py-8 lg:py-10 px-4 sm:px-6 lg:px-8 border-t border-b border-[#EBE3F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-6 sm:mb-8">
            <h2 className="font-sans font-extrabold text-2xl lg:text-3xl text-[#1E1B2E] tracking-tight">
              How investing works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 relative">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                ),
                title: 'Create Account',
                desc: 'Sign up in minutes and complete your profile.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                ),
                title: 'Set Your Goals',
                desc: 'Tell us your financial goals and risk appetite.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                ),
                title: 'Choose Investments',
                desc: 'Select from curated investment opportunities.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V11M12 11C10 7 6 7 6 7s0 4 4 4c2 0 2 0 2 0zm0 0c2-4 6-4 6-4s0 4-4 4c-2 0-2 0-2 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
                  </svg>
                ),
                title: 'Grow Your Wealth',
                desc: 'Sit back and watch your investments grow over time.'
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative group">
                {/* Right Arrow connecting steps 1-3 on desktop */}
                {index < 3 && (
                  <div className="hidden md:flex absolute top-6 -right-3 lg:-right-4 z-10 text-[#7C1FA8]/50 items-center justify-center">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F2E8FA] text-[#7C1FA8] flex items-center justify-center mb-3.5 shadow-xs group-hover:bg-[#7C1FA8] group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>

                <h3 className="font-extrabold text-[#1E1B2E] text-base sm:text-lg mb-1.5">{step.title}</h3>
                <p className="text-[#544F66] text-xs sm:text-sm leading-relaxed max-w-[240px] mx-auto font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. READY TO START INVESTMENT JOURNEY CTA BANNER (SLIM & NO LEFT FLOWER) */}
      <section className="w-full bg-[#FAF7FC] py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#200A38] via-[#1B0B2E] to-[#160826] border border-[#3D1A5C]/70 rounded-[22px] p-5 sm:px-8 lg:px-10 lg:py-6 relative overflow-hidden shadow-[0_15px_35px_rgba(27,11,46,0.25)]">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <h2 className="font-sans font-extrabold text-xl sm:text-2xl lg:text-[24px] text-white tracking-tight leading-snug">
                  Ready to start your investment journey?
                </h2>
                <p className="text-[#D3C4E5] font-medium text-xs sm:text-sm mt-1 max-w-xl">
                  Join thousands of investors already growing their wealth with PROSPERi5.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedModal(true)}
                  className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#E09418] text-[#1E1B2E] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer text-center"
                >
                  Start Investing
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('opportunities');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else if (onNavigatePage) {
                      onNavigatePage('investment');
                    } else {
                      setSelectedModal(true);
                    }
                  }}
                  className="w-full sm:w-auto border-2 border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623]/10 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer text-center"
                >
                  Explore Opportunities
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RECOGNITIONS & TRUST STRIP */}
      <section className="w-full bg-[#18082D] py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#9B71DF] font-bold text-xs tracking-[0.2em] uppercase mb-1">SAFETY & TRUST</p>
            <h2 className="font-sans font-bold text-2xl lg:text-3xl text-white">Why 24,000+ Investors Trust Us</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'SEBI & AMFI Registered', desc: 'Fully compliant platform operating under strict regulatory standards.' },
              { title: '100% Bank-Grade Security', desc: '256-bit encryption ensuring complete data and transaction privacy.' },
              { title: 'Dedicated Advisor Support', desc: 'Personal financial experts to assist you at every investment milestone.' },
              { title: 'Transparent Portfolio Insights', desc: 'Real-time tracking, zero hidden charges and instant liquidity.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#2A084B] border border-[#481678]/50 rounded-3xl p-5 text-center shadow-lg hover:bg-[#7C1FA8] transition-all">
                <div className="w-10 h-10 rounded-full bg-[#F5A623] text-[#1E1B2E] font-extrabold flex items-center justify-center mx-auto mb-3 text-sm">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                <p className="text-[#C4A8E8] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* EXPERT CALLBACK MODAL */}
      {selectedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={() => setSelectedModal(false)}>
          <div
            className="bg-white bg-cover bg-center rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden border border-purple-100/80"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
            onClick={e => e.stopPropagation()}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-xl text-[#1E1B2E]">Start Your Investment Journey</h2>
                <button onClick={() => setSelectedModal(false)} className="w-9 h-9 rounded-full bg-gray-100/90 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors z-20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-[#544F66] font-medium mb-6 text-sm">Speak to a certified wealth manager to build your custom portfolio.</p>
              <div className="space-y-4">
                <input type="text" placeholder="Enter your name" className="w-full border border-[#EBE8EF] bg-white/95 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7C1FA8] transition-colors shadow-2xs" />
                <PhoneInput
                  placeholder="Enter phone number"
                />
                <button
                  onClick={() => setSelectedModal(false)}
                  className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
