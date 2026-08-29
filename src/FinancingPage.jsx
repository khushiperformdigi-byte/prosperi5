import React, { useState } from 'react';
import Footer from './Footer';
import { sendWhatsAppEnquiry } from './utils/whatsapp';
import PhoneInput from './components/PhoneInput';

export default function FinancingPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenureYears, setTenureYears] = useState(10);
  const [selectedOptionModal, setSelectedOptionModal] = useState(null);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalFormData, setModalFormData] = useState({ name: '', phone: '', countryCode: '+91' });

  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    sendWhatsAppEnquiry({
      formName: `Financing Application (${selectedOptionModal ? selectedOptionModal.title : 'Financing Request'})`,
      name: modalFormData.name,
      phone: `${modalFormData.countryCode} ${modalFormData.phone}`,
      service: selectedOptionModal ? selectedOptionModal.title : 'Financing Solutions',
      extra: selectedOptionModal ? {
        'Required Amount': `₹ ${loanAmount.toLocaleString('en-IN')}`,
        'Tenure': `${tenureYears} Years`,
        'Est. Monthly EMI': selectedOptionModal.emi ? `₹ ${selectedOptionModal.emi.toLocaleString('en-IN')}` : ''
      } : {}
    });
    setModalSubmitted(true);
  };

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (P <= 0 || r <= 0 || n <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };

    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return { emi, totalPayment, totalInterest };
  };

  const { emi, totalPayment, totalInterest } = calculateEMI();

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const financingMilestonePlans = [
    {
      id: 'personal',
      title: 'Personal Loan',
      subtitle: "Handle life's important needs with ease and flexibility.",
      image: '/fin_wallet_clean.png',
      bgGradient: 'bg-[#F6EFFC]',
      cardBorder: 'border-[#E8DAF5]',
      iconBg: 'bg-[#7C1FA8]',
      icon: (
        <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'home',
      title: 'Home Loan',
      subtitle: 'Turn your dream home into reality with best rates and easy EMIs.',
      image: '/fin_home_clean.png',
      bgGradient: 'bg-[#FFF8F0]',
      cardBorder: 'border-[#FFE7D3]',
      iconBg: 'bg-[#F59E0B]',
      icon: (
        <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'car',
      title: 'Car Loan',
      subtitle: 'Drive your dream car with hassle-free loans and great budgets.',
      image: '/fin_car_clean.png',
      bgGradient: 'bg-[#FDF0F6]',
      cardBorder: 'border-[#FAD2E6]',
      iconBg: 'bg-[#EC4899]',
      icon: (
        <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1m-6 0a1 1 0 102 0m-2 0a1 1 0 112 0m6 0a1 1 0 102 0m-2 0a1 1 0 112 0" />
        </svg>
      )
    },
    {
      id: 'education',
      title: 'Education Loan',
      subtitle: 'Invest in education today for a brighter tomorrow.',
      image: '/fin_books_clean.png',
      bgGradient: 'bg-[#F1F9F4]',
      cardBorder: 'border-[#D5ECE0]',
      iconBg: 'bg-[#10B981]',
      icon: (
        <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      id: 'business',
      title: 'Business Loan',
      subtitle: 'Fuel your business growth with quick and flexible loan funding.',
      image: '/fin_chart_clean.png',
      bgGradient: 'bg-[#F0F7FF]',
      cardBorder: 'border-[#D3E6FE]',
      iconBg: 'bg-[#3B82F6]',
      icon: (
        <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'assets',
      title: 'Loan Against Assets',
      subtitle: 'Unlock the value of your assets for your important financial needs.',
      image: '/fin_vault_clean.png',
      bgGradient: 'bg-[#F0FDFA]',
      cardBorder: 'border-[#CCFBF1]',
      iconBg: 'bg-[#14B8A6]',
      icon: (
        <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-white font-sans text-body-text antialiased selection:bg-purple-100 selection:text-primary-purple overflow-x-hidden">

      {/* 2. HERO SECTION (COMPACT ASPECT RATIO BANNER & UNCLIPPED) */}
      <section className="w-full bg-[#FAF8FC] border-b border-[#EBE8EF]/60 relative overflow-hidden">
        <div className="w-full relative">
          <img
            src="/ChatGPT Image Aug 26, 2026, 11_38_20 AM.png"
            alt="Smart Finance. Stronger Future."
            className="w-full h-auto block -mt-3 sm:-mt-5 lg:-mt-7"
          />

          {/* Interactive Click Hotspots for smooth user interaction */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Explore Options Hotspot */}
            <button
              onClick={() => setSelectedOptionModal({ title: 'Explore Financing Solutions', subtitle: 'Select from our wide range of business, home, and personal financing options.' })}
              title="Explore Options"
              aria-label="Explore Options"
              className="pointer-events-auto absolute left-[3.5%] top-[59%] w-[13.2%] h-[15%] rounded-full cursor-pointer focus:outline-none"
            />

            {/* Check Eligibility Hotspot */}
            <button
              onClick={() => setSelectedOptionModal({ title: 'Check Financing Eligibility', subtitle: 'Find out your maximum pre-approved loan amount and interest rates instantly.' })}
              title="Check Eligibility"
              aria-label="Check Eligibility"
              className="pointer-events-auto absolute left-[18.2%] top-[59%] w-[13.2%] h-[15%] rounded-full cursor-pointer focus:outline-none"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">

        {/* 3. FINANCING MILESTONE CARDS SECTION (MATCHING CHATGPT IMAGE) */}
        <section className="py-2 space-y-5">
          {/* Section Header */}
          <div className="text-center space-y-0.5">
            <span className="text-[#7C1FA8] text-[11px] font-extrabold tracking-widest uppercase block">
              SOLUTIONS FOR EVERY STAGE OF YOUR LIFE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E]">
              Financing that fits your every milestone
            </h2>
            {/* Purple dot-dash-dot accent */}
            <div className="flex items-center justify-center gap-1 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FA8]"></span>
              <span className="w-6 h-1 rounded-full bg-[#7C1FA8]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FA8]"></span>
            </div>
          </div>

          {/* 2 Rows x 3 Columns Compact Pastel Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {financingMilestonePlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedOptionModal({ title: plan.title, subtitle: plan.subtitle, isPlan: true })}
                className={`${plan.bgGradient} border ${plan.cardBorder} hover:border-[#7C1FA8] hover:bg-[#F3E5FA]/50 rounded-[24px] p-4.5 sm:p-5 transition-all duration-300 shadow-2xs hover:shadow-xl hover:scale-[1.015] group cursor-pointer relative overflow-hidden flex justify-between min-h-[175px] sm:min-h-[195px]`}
              >
                {/* Left Content Container */}
                <div className="flex flex-col justify-between space-y-2.5 z-10 max-w-[56%] sm:max-w-[58%]">
                  <div className="space-y-2.5">
                    {/* Circle Icon Badge */}
                    <div className={`w-9 h-9 rounded-full ${plan.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                      {plan.icon}
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="font-extrabold text-base sm:text-[17px] text-[#1E1B2E] leading-snug group-hover:text-[#7C1FA8] transition-colors">
                        {plan.title}
                      </h3>
                      <p className="text-xs sm:text-[12.5px] text-[#544F66] font-semibold leading-relaxed mt-1 font-sans">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Learn More Link (Hover Color #7C1FA8) */}
                  <div className="pt-1">
                    <span className="text-xs font-bold text-[#7C1FA8] group-hover:text-[#7C1FA8] group-hover:translate-x-1 transition-all inline-flex items-center gap-1 font-sans">
                      Learn More →
                    </span>
                  </div>
                </div>

                {/* Right Freely Floating 3D Graphic (Zero Box, Seamless Blend) */}
                <div className="absolute right-[-8px] sm:right-[0px] bottom-[0px] w-[50%] h-[85%] flex items-end justify-end pointer-events-none">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    style={{ mixBlendMode: 'multiply' }}
                    className="max-w-full max-h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WHY CHOOSE PROSPERIS FINANCE? SECTION (MATCHING 85446c49-3148-4f5d-892b-7863abe5b44d.png) */}
        <section className="bg-gradient-to-r from-[#4E0C72] via-[#5E1683] to-[#6E1C98] rounded-[22px] py-4.5 px-4 sm:px-6 lg:py-5 lg:px-7 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">

            {/* Left Header Box (Col span 4) */}
            <div className="lg:col-span-4 space-y-1 text-left lg:border-r lg:border-white/20 lg:pr-6">
              <span className="text-purple-200/90 text-[10px] font-extrabold tracking-wider uppercase block">
                WHY CHOOSE PROSPERIS FINANCE?
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                More than just financing.<br />
                We're your growth partner.
              </h2>
            </div>

            {/* Right 5 Horizontal Feature Columns (Col span 8) */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 divide-y-0 sm:divide-x sm:divide-white/20 text-center sm:text-left">

              {/* Feature 1: Best Interest Rates */}
              <div className="sm:pl-3 space-y-1 flex flex-col items-center sm:items-start">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center font-extrabold text-sm shadow-inner shrink-0 mb-1">
                  %
                </div>
                <h4 className="font-extrabold text-xs text-white leading-tight">Best Interest Rates</h4>
                <p className="text-[10.5px] text-purple-100/90 font-medium leading-tight">
                  Competitive and transparent rates
                </p>
              </div>

              {/* Feature 2: Fast & Easy Process */}
              <div className="sm:pl-3 space-y-1 flex flex-col items-center sm:items-start">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center font-extrabold text-sm shadow-inner shrink-0 mb-1">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-xs text-white leading-tight">Fast & Easy Process</h4>
                <p className="text-[10.5px] text-purple-100/90 font-medium leading-tight">
                  Minimal paperwork and quick approvals
                </p>
              </div>

              {/* Feature 3: Trusted & Secure */}
              <div className="sm:pl-3 space-y-1 flex flex-col items-center sm:items-start">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center font-extrabold text-sm shadow-inner shrink-0 mb-1">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-xs text-white leading-tight">Trusted & Secure</h4>
                <p className="text-[10.5px] text-purple-100/90 font-medium leading-tight">
                  100% transparent and proven process
                </p>
              </div>

              {/* Feature 4: Flexible Tenure */}
              <div className="sm:pl-3 space-y-1 flex flex-col items-center sm:items-start">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center font-extrabold text-sm shadow-inner shrink-0 mb-1">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-xs text-white leading-tight">Flexible Tenure</h4>
                <p className="text-[10.5px] text-purple-100/90 font-medium leading-tight">
                  Plans that adapt to your needs
                </p>
              </div>

              {/* Feature 5: Expert Support */}
              <div className="sm:pl-3 space-y-1 flex flex-col items-center sm:items-start">
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center font-extrabold text-sm shadow-inner shrink-0 mb-1">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-xs text-white leading-tight">Expert Support</h4>
                <p className="text-[10.5px] text-purple-100/90 font-medium leading-tight">
                  Guidance at every step of the way
                </p>
              </div>

            </div>

          </div>
        </section>



        {/* 5. COMPACT INTERACTIVE EMI CALCULATOR SECTION (MATCHING CHATGPT IMAGE) */}
        <section className="bg-[#F7F2FB] border border-[#E8DEF3] rounded-[26px] p-5 sm:p-6 lg:p-7 shadow-xs relative overflow-hidden transform-gpu will-change-transform">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* Left Header Box & 3D Calculator Visual (Col span 4) */}
            <div className="lg:col-span-4 flex items-center justify-between gap-4 border-b lg:border-b-0 lg:border-r border-purple-200/60 pb-4 lg:pb-0 lg:pr-6">
              <div className="space-y-1 text-left">
                <span className="text-[#7C1FA8] text-xs font-bold block">
                  Plan better. Borrow smarter.
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E] leading-tight">
                  Calculate your EMI<br />in seconds
                </h3>
              </div>

              {/* 3D Gold Coins Graphic */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center pointer-events-none">
                <img
                  src="/coins.png"
                  alt="Gold Coins"
                  className="max-w-full max-h-full object-contain drop-shadow-sm"
                />
              </div>
            </div>

            {/* Middle 3 Interactive Sliders (Col span 6) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 divide-y sm:divide-y-0 sm:divide-x divide-purple-200/50">

              {/* Slider 1: Loan Amount */}
              <div className="space-y-2 text-left pt-2 sm:pt-0 sm:pl-3">
                <span className="text-xs font-extrabold text-[#5E1683] block">Loan Amount</span>
                <div className="text-base sm:text-lg font-extrabold text-[#1E1B2E] tabular-nums">
                  ₹ {loanAmount.toLocaleString('en-IN')}
                </div>
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                  className="w-full h-1.5 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-[#5E1683] touch-pan-x"
                />
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-2 text-left pt-2 sm:pt-0 sm:pl-3">
                <span className="text-xs font-extrabold text-[#5E1683] block">Interest Rate</span>
                <div className="text-base sm:text-lg font-extrabold text-[#1E1B2E] tabular-nums">
                  {interestRate}%
                </div>
                <input
                  type="range"
                  min="6"
                  max="18"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="w-full h-1.5 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-[#5E1683] touch-pan-x"
                />
              </div>

              {/* Slider 3: Tenure */}
              <div className="space-y-2 text-left pt-2 sm:pt-0 sm:pl-3">
                <span className="text-xs font-extrabold text-[#5E1683] block">Tenure</span>
                <div className="text-base sm:text-lg font-extrabold text-[#1E1B2E] tabular-nums">
                  {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'}
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-[#5E1683] touch-pan-x"
                />
              </div>

            </div>

            {/* Right Column: Estimated EMI Result & Action Button (Col span 2) */}
            <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-purple-200/60 pt-4 lg:pt-0 lg:pl-5 space-y-3 text-center lg:text-left flex flex-col justify-center">
              <div>
                <span className="text-xs font-bold text-[#5E1683] block">Your Estimated EMI</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#5E1683] leading-tight mt-0.5 tabular-nums">
                  ₹ {emi.toLocaleString('en-IN')} <span className="text-xs font-semibold text-[#8E8A9D]">/mo</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOptionModal({
                  title: 'Loan EMI Breakdown',
                  subtitle: 'Detailed breakdown of your calculated monthly repayments and interest.',
                  isEMIBreakdown: true,
                  loanAmount,
                  interestRate,
                  tenureYears,
                  emi,
                  totalInterest,
                  totalPayment
                })}
                className="w-full bg-[#5E1683] hover:bg-[#7C1FA8] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <span>→</span>
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* 6. HOW IT WORKS - SIMPLE STEPS TO GET YOUR LOAN (100% FULL BLEED SCREEN WIDTH) */}
      <section className="w-full bg-gradient-to-r from-[#4E0C72] via-[#5E1683] to-[#6E1C98] py-9 sm:py-12 px-4 sm:px-6 lg:px-8 text-white shadow-xl text-center overflow-hidden my-6 transform-gpu">

        <style>{`
          @keyframes stepFadeIn {
            0% {
              opacity: 0;
              transform: translateY(22px) scale(0.85);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-step-1 { animation: stepFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
          .animate-step-2 { animation: stepFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
          .animate-step-3 { animation: stepFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
          .animate-step-4 { animation: stepFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both; }
          .animate-step-5 { animation: stepFadeIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both; }
        `}</style>

        <div className="max-w-7xl mx-auto">
          {/* Header (Badge shifted upside) */}
          <div className="space-y-1 mb-6 sm:mb-8 -mt-2">
            <span className="bg-white/15 border border-white/20 text-purple-100 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase inline-block shadow-inner -translate-y-1">
              HOW IT WORKS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Simple steps to get your loan
            </h3>
          </div>

          {/* 5-Step Process Timeline Row */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Horizontal Line & Glow Dots */}
            <div className="hidden lg:flex items-center justify-between absolute top-[30px] left-[10%] right-[10%] z-0 pointer-events-none">
              <div className="w-full h-[2px] bg-purple-300/40 relative flex items-center justify-around">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B26CEE] border border-white shadow-xs"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#B26CEE] border border-white shadow-xs"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#B26CEE] border border-white shadow-xs"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#B26CEE] border border-white shadow-xs"></span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-3 relative z-10">

              {/* Step 1: Choose Loan */}
              <div className="flex flex-col items-center text-center group animate-step-1">
                <div className="w-15 h-15 rounded-full bg-white text-[#5E1683] flex items-center justify-center font-extrabold text-lg shadow-xl group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-[#5E1683]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="m16 11 2 2 4-4" />
                  </svg>
                </div>
                <div className="mt-3.5 space-y-1">
                  <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight">Choose Loan</h4>
                  <p className="text-xs text-purple-100/90 font-medium leading-tight max-w-[160px] mx-auto">
                    Select the loan that fits your needs.
                  </p>
                </div>
              </div>

              {/* Step 2: Apply Online */}
              <div className="flex flex-col items-center text-center group animate-step-2">
                <div className="w-15 h-15 rounded-full bg-white text-[#5E1683] flex items-center justify-center font-extrabold text-lg shadow-xl group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-[#5E1683]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <div className="mt-3.5 space-y-1">
                  <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight">Apply Online</h4>
                  <p className="text-xs text-purple-100/90 font-medium leading-tight max-w-[160px] mx-auto">
                    Fill in the simple application form.
                  </p>
                </div>
              </div>

              {/* Step 3: Get Verified */}
              <div className="flex flex-col items-center text-center group animate-step-3">
                <div className="w-15 h-15 rounded-full bg-white text-[#5E1683] flex items-center justify-center font-extrabold text-lg shadow-xl group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-[#5E1683]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="mt-3.5 space-y-1">
                  <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight">Get Verified</h4>
                  <p className="text-xs text-purple-100/90 font-medium leading-tight max-w-[160px] mx-auto">
                    We verify your details quickly and securely.
                  </p>
                </div>
              </div>

              {/* Step 4: Loan Approved */}
              <div className="flex flex-col items-center text-center group animate-step-4">
                <div className="w-15 h-15 rounded-full bg-white text-[#5E1683] flex items-center justify-center font-extrabold text-lg shadow-xl group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-[#5E1683]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="mt-3.5 space-y-1">
                  <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight">Loan Approved</h4>
                  <p className="text-xs text-purple-100/90 font-medium leading-tight max-w-[160px] mx-auto">
                    Get quick approval with minimal paperwork.
                  </p>
                </div>
              </div>

              {/* Step 5: Get Disbursed */}
              <div className="flex flex-col items-center text-center group animate-step-5">
                <div className="w-15 h-15 rounded-full bg-white text-[#5E1683] flex items-center justify-center font-extrabold text-lg shadow-xl group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-[#5E1683]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                  </svg>
                </div>
                <div className="mt-3.5 space-y-1">
                  <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight">Get Disbursed</h4>
                  <p className="text-xs text-purple-100/90 font-medium leading-tight max-w-[160px] mx-auto">
                    Amount is transferred to your account.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        {/* CTA BANNER */}
        <section className="bg-gradient-to-r from-[#461065] via-[#7C1FAB] to-[#5E1083] rounded-[24px] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h2 className="text-xl font-extrabold">Need Capital for Your Next Big Step?</h2>
            <p className="text-xs text-white/80 mt-1">Get custom financing offers curated from 30+ top banks & NBFCs.</p>
          </div>
          <button
            onClick={() => setSelectedModal(true)}
            className="bg-accent-gold hover:bg-[#D49300] text-heading-ink font-extrabold px-6 py-3 rounded-full text-xs cursor-pointer shadow-md transition-all active:scale-95"
          >
            Apply Now →
          </button>
        </section>

      </main>





      {/* PREMIUM PROSPERI5 MODAL DIALOG POPUP */}
      {selectedOptionModal && (
        <div className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-white bg-cover bg-center rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-purple-100/80 animate-in fade-in zoom-in-95 duration-200 text-left overflow-hidden"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Top Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#7C1FAB] via-[#E84C88] to-[#F5A623]"></div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedOptionModal(null);
                  setModalSubmitted(false);
                }}
                className="absolute top-0 right-0 text-gray-400 hover:text-[#7C1FAB] w-8 h-8 rounded-full bg-gray-100/90 hover:bg-purple-100 flex items-center justify-center font-extrabold text-sm cursor-pointer transition-colors z-20"
              >
                ✕
              </button>

              {!modalSubmitted ? (
                <>
                  <div className="space-y-1 pr-6">
                    <span className="bg-purple-100 text-[#7C1FAB] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                      PROSPERI5 FINANCING
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E1B2E]">
                      {selectedOptionModal.title}
                    </h3>
                    {selectedOptionModal.subtitle && (
                      <p className="text-xs text-[#544F66] font-medium leading-relaxed">
                        {selectedOptionModal.subtitle}
                      </p>
                    )}
                  </div>

                  {/* EMI Breakdown Stats if applicable */}
                  {selectedOptionModal.isEMIBreakdown && (
                    <div className="space-y-3 bg-[#FAF5FD]/90 backdrop-blur-xs border border-[#E5D9F2] p-4 rounded-2xl">
                      <div className="bg-white p-3.5 rounded-xl border border-purple-100 flex items-center justify-between shadow-2xs">
                        <div>
                          <span className="text-[11px] font-bold text-[#8E8A9D] uppercase block">Monthly EMI</span>
                          <span className="text-2xl font-extrabold text-[#7C1FAB]">₹ {selectedOptionModal.emi.toLocaleString('en-IN')} <span className="text-xs font-medium text-gray-500">/mo</span></span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-600 block">Rate: <strong className="text-[#1E1B2E]">{selectedOptionModal.interestRate}%</strong></span>
                          <span className="text-xs text-gray-600 block">Tenure: <strong className="text-[#1E1B2E]">{selectedOptionModal.tenureYears} Years</strong></span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                        <div className="bg-white p-3 rounded-xl border border-purple-100">
                          <span className="text-[10.5px] text-[#8E8A9D] block uppercase">Principal Amount</span>
                          <span className="text-sm font-extrabold text-[#1E1B2E]">₹ {selectedOptionModal.loanAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-purple-100">
                          <span className="text-[10.5px] text-[#8E8A9D] block uppercase">Total Interest</span>
                          <span className="text-sm font-extrabold text-[#E84C88]">₹ {selectedOptionModal.totalInterest.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lead Form */}
                  <form
                    onSubmit={handleModalFormSubmit}
                    className="space-y-3.5 pt-1"
                  >
                    <div>
                      <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={modalFormData.name}
                        onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full bg-white/95 border border-[#EBE8EF] focus:border-[#7C1FAB] rounded-xl p-2.5 text-xs font-bold text-[#1E1B2E] outline-none transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1">Phone Number</label>
                      <PhoneInput
                        value={modalFormData.phone}
                        countryCode={modalFormData.countryCode || '+91'}
                        onCountryCodeChange={(code) => setModalFormData((f) => ({ ...f, countryCode: code }))}
                        onChange={(val) => setModalFormData((f) => ({ ...f, phone: val }))}
                        placeholder="Enter phone number"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#7C1FAB] hover:bg-[#63148B] text-white font-extrabold py-3 px-6 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>Request Free Callback & Offer</span>
                      <span>→</span>
                    </button>

                    <p className="text-[10px] text-center text-gray-400 font-medium">
                      🔒 100% confidential. No spam guaranteed.
                    </p>
                  </form>
                </>
              ) : (
                /* Success View */
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-extrabold text-[#1E1B2E]">Request Submitted Successfully!</h4>
                    <p className="text-xs text-[#544F66] font-medium max-w-xs mx-auto leading-relaxed">
                      Thank you! Our senior finance specialist will get in touch with you shortly with pre-approved offers.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOptionModal(null);
                      setModalSubmitted(false);
                    }}
                    className="bg-[#7C1FAB] hover:bg-[#63148B] text-white font-extrabold px-6 py-2.5 rounded-full text-xs transition-all shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
