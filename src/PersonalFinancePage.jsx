import React, { useState } from 'react';
import Footer from './Footer';

export default function PersonalFinancePage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="w-full bg-white font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">

      {/* 3. HERO SECTION - EDGE-TO-EDGE FULL WIDTH BANNER */}
      <section className="w-full font-sans border-b border-purple-100/60">

        {/* Edge-to-Edge Full Width Banner Image */}
        <div className="relative w-full overflow-hidden">
          <img
            src="/ChatGPT Image Aug 26, 2026, 05_30_11 PM.png"
            alt="Personal Finance - Take control of your money. Build a better future."
            className="w-full h-auto object-cover max-h-[580px] w-full"
          />
        </div>


      </section>

      {/* 4. SECTION 2: LEARN AND GROW - PERSONAL FINANCE MADE SIMPLE */}
      <section id="learn-and-grow" className="py-8 lg:py-12 bg-[#E7E2EF] font-sans border-b border-purple-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest bg-white/90 px-3.5 py-1 rounded-full border border-purple-200/80 shadow-2xs">
              LEARN AND GROW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] mt-3 tracking-tight">
              Personal finance made simple
            </h2>
            <p className="text-xs sm:text-sm text-[#4A455A] mt-1.5 font-medium">
              Practical guides and tools to help you make better financial decisions.
            </p>
          </div>

          {/* 6 Cards in Single Compact Row (Filled with homepage brand purple #7C1FA8) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">

            {/* Card 1: Budgeting 101 */}
            <div className="group bg-[#7C1FA8] hover:bg-[#6b1a91] p-3.5 sm:p-4 rounded-2xl border border-purple-400/30 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer space-y-2 flex flex-col justify-between text-white">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                  Budgeting 101
                </h3>
                <p className="text-[11px] text-purple-100/90 leading-normal font-medium">
                  Learn how to create a budget that works for you.
                </p>
              </div>
            </div>

            {/* Card 2: Save Smart */}
            <div className="group bg-[#7C1FA8] hover:bg-[#6b1a91] p-3.5 sm:p-4 rounded-2xl border border-purple-400/30 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer space-y-2 flex flex-col justify-between text-white">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                  Save Smart
                </h3>
                <p className="text-[11px] text-purple-100/90 leading-normal font-medium">
                  Simple ways to save more money & emergency funds.
                </p>
              </div>
            </div>

            {/* Card 3: Invest for Growth */}
            <div className="group bg-[#7C1FA8] hover:bg-[#6b1a91] p-3.5 sm:p-4 rounded-2xl border border-purple-400/30 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer space-y-2 flex flex-col justify-between text-white">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                  Invest for Growth
                </h3>
                <p className="text-[11px] text-purple-100/90 leading-normal font-medium">
                  Choose the right investments to grow wealth.
                </p>
              </div>
            </div>

            {/* Card 4: Protect What Matters */}
            <div className="group bg-[#7C1FA8] hover:bg-[#6b1a91] p-3.5 sm:p-4 rounded-2xl border border-purple-400/30 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer space-y-2 flex flex-col justify-between text-white">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                  Protect What Matters
                </h3>
                <p className="text-[11px] text-purple-100/90 leading-normal font-medium">
                  Explore insurance options for your family.
                </p>
              </div>
            </div>

            {/* Card 5: Manage Debt */}
            <div className="group bg-[#7C1FA8] hover:bg-[#6b1a91] p-3.5 sm:p-4 rounded-2xl border border-purple-400/30 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer space-y-2 flex flex-col justify-between text-white">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                  Manage Debt
                </h3>
                <p className="text-[11px] text-purple-100/90 leading-normal font-medium">
                  Smart tips to improve your financial health.
                </p>
              </div>
            </div>

            {/* Card 6: Plan Your Goals */}
            <div className="group bg-[#7C1FA8] hover:bg-[#6b1a91] p-3.5 sm:p-4 rounded-2xl border border-purple-400/30 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer space-y-2 flex flex-col justify-between text-white">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                  Plan Your Goals
                </h3>
                <p className="text-[11px] text-purple-100/90 leading-normal font-medium">
                  Plan for major life goals & retirement.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SECTION 3: TOOLS TO EMPOWER YOU - CALCULATORS */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF6FC] via-[#F5EEFA] to-white font-sans border-b border-purple-100/60">
        <div className="max-w-7xl mx-auto">

          {/* Centered Header with Increased Size (No Explore All Tools button) */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/80">
              TOOLS TO EMPOWER YOU
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B2E] mt-2.5 tracking-tight">
              Calculate. Plan. Achieve.
            </h2>
            <p className="text-xs sm:text-sm text-[#666077] mt-1.5 font-normal">
              Use our free tools to plan your finances better.
            </p>
          </div>

          {/* 4 Improved Calculator Cards Grid (Brand Purple Fill on Hover) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

            {/* Calculator 1: SIP Calculator */}
            <div
              onClick={() => onNavigatePage && onNavigatePage('knowledge')}
              className="group bg-white hover:bg-[#7C1FA8] hover:border-[#7C1FA8] p-5 rounded-2xl border border-purple-100 shadow-2xs hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#7C1FA8] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center font-bold flex-shrink-0 transition-colors">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E] group-hover:text-white transition-colors leading-tight">
                  SIP Calculator
                </h3>
                <p className="text-xs sm:text-sm text-[#666077] group-hover:text-purple-100/90 leading-relaxed transition-colors font-medium">
                  Calculate returns on your SIP investments.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-[#7C1FA8] group-hover:text-white group-hover:translate-x-1.5 transition-all flex items-center gap-1.5 pt-1">
                <span>Calculate</span>
                <span className="text-sm sm:text-base">➔</span>
              </div>
            </div>

            {/* Calculator 2: EMI Calculator */}
            <div
              onClick={() => onNavigatePage && onNavigatePage('borrow')}
              className="group bg-white hover:bg-[#7C1FA8] hover:border-[#7C1FA8] p-5 rounded-2xl border border-purple-100 shadow-2xs hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#7C1FA8] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center font-bold flex-shrink-0 transition-colors">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E] group-hover:text-white transition-colors leading-tight">
                  EMI Calculator
                </h3>
                <p className="text-xs sm:text-sm text-[#666077] group-hover:text-purple-100/90 leading-relaxed transition-colors font-medium">
                  Plan your loan EMIs and manage your finances.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-[#7C1FA8] group-hover:text-white group-hover:translate-x-1.5 transition-all flex items-center gap-1.5 pt-1">
                <span>Calculate</span>
                <span className="text-sm sm:text-base">➔</span>
              </div>
            </div>

            {/* Calculator 3: Retirement Calculator */}
            <div
              onClick={() => onNavigatePage && onNavigatePage('investment')}
              className="group bg-white hover:bg-[#7C1FA8] hover:border-[#7C1FA8] p-5 rounded-2xl border border-purple-100 shadow-2xs hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#7C1FA8] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center font-bold flex-shrink-0 transition-colors">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E] group-hover:text-white transition-colors leading-tight">
                  Retirement Calculator
                </h3>
                <p className="text-xs sm:text-sm text-[#666077] group-hover:text-purple-100/90 leading-relaxed transition-colors font-medium">
                  Find out how much you need for retirement.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-[#7C1FA8] group-hover:text-white group-hover:translate-x-1.5 transition-all flex items-center gap-1.5 pt-1">
                <span>Calculate</span>
                <span className="text-sm sm:text-base">➔</span>
              </div>
            </div>

            {/* Calculator 4: Savings Goal Calculator */}
            <div
              onClick={() => onNavigatePage && onNavigatePage('investment')}
              className="group bg-white hover:bg-[#7C1FA8] hover:border-[#7C1FA8] p-5 rounded-2xl border border-purple-100 shadow-2xs hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#7C1FA8] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center font-bold flex-shrink-0 transition-colors">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E] group-hover:text-white transition-colors leading-tight">
                  Savings Goal Calculator
                </h3>
                <p className="text-xs sm:text-sm text-[#666077] group-hover:text-purple-100/90 leading-relaxed transition-colors font-medium">
                  Plan and track savings towards your goals.
                </p>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-[#7C1FA8] group-hover:text-white group-hover:translate-x-1.5 transition-all flex items-center gap-1.5 pt-1">
                <span>Calculate</span>
                <span className="text-sm sm:text-base">➔</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SECTION 4: MONEY HABITS THAT MATTER */}
      <section className="py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans border-b border-purple-100/60">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/80">
            MONEY HABITS THAT MATTER
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] mt-3 tracking-tight">
            Build better habits, build a better life
          </h2>
          <p className="text-sm sm:text-base text-[#666077] mt-1.5 font-normal">
            Small changes today can lead to big financial wins tomorrow.
          </p>
        </div>

        {/* 5 Column Cards Row */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

            {/* Habit 1: Set Clear Goals */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 hover:border-purple-300 rounded-2xl p-4 text-center flex flex-col items-center space-y-2.5 shadow-2xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[#7C1FA8] group-hover:bg-[#7C1FA8] group-hover:text-white flex items-center justify-center font-bold transition-all shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors">Set Clear Goals</h3>
              <p className="text-xs text-[#666077] leading-relaxed font-medium">
                Define what you want to achieve.
              </p>
            </div>

            {/* Habit 2: Track Your Money */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 hover:border-purple-300 rounded-2xl p-4 text-center flex flex-col items-center space-y-2.5 shadow-2xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[#7C1FA8] group-hover:bg-[#7C1FA8] group-hover:text-white flex items-center justify-center font-bold transition-all shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors">Track Your Money</h3>
              <p className="text-xs text-[#666077] leading-relaxed font-medium">
                Know where your money goes every month.
              </p>
            </div>

            {/* Habit 3: Live Below Your Means */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 hover:border-purple-300 rounded-2xl p-4 text-center flex flex-col items-center space-y-2.5 shadow-2xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[#7C1FA8] group-hover:bg-[#7C1FA8] group-hover:text-white flex items-center justify-center font-bold transition-all shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors">Live Below Your Means</h3>
              <p className="text-xs text-[#666077] leading-relaxed font-medium">
                Spend less than you earn and save the rest.
              </p>
            </div>

            {/* Habit 4: Invest Consistently */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 hover:border-purple-300 rounded-2xl p-4 text-center flex flex-col items-center space-y-2.5 shadow-2xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[#7C1FA8] group-hover:bg-[#7C1FA8] group-hover:text-white flex items-center justify-center font-bold transition-all shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors">Invest Consistently</h3>
              <p className="text-xs text-[#666077] leading-relaxed font-medium">
                Start small, stay consistent and grow wealth.
              </p>
            </div>

            {/* Habit 5: Review & Improve */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 hover:border-purple-300 rounded-2xl p-4 text-center flex flex-col items-center space-y-2.5 shadow-2xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[#7C1FA8] group-hover:bg-[#7C1FA8] group-hover:text-white flex items-center justify-center font-bold transition-all shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-sm font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors">Review & Improve</h3>
              <p className="text-xs text-[#666077] leading-relaxed font-medium">
                Review regularly and keep improving.
              </p>
            </div>

          </div>
        </div>
      </section>




    </div>
  );
}
