import React, { useState, useMemo } from 'react';
import Footer from './Footer';
import { sendWhatsAppEnquiry } from './utils/whatsapp';
import PhoneInput from './components/PhoneInput';

export default function TermInsuranceCalculatorPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [consultForm, setConsultForm] = useState({ name: '', phone: '', smoker: 'No (Non-Smoker)', gender: 'Male' });

  // Term Insurance Inputs (Defaults matching screenshot)
  const [currentAge, setCurrentAge] = useState(30);
  const [policyTerm, setPolicyTerm] = useState(30);
  const [coverageAmount, setCoverageAmount] = useState(10000000); // 1 Crore
  const [annualIncome, setAnnualIncome] = useState(1200000); // 12 Lakh
  const [dependents, setDependents] = useState(2); // 0, 1, 2, 3, 4+
  const [lifestyle, setLifestyle] = useState('moderate'); // 'simple' | 'moderate' | 'comfortable'

  // Input Handlers
  const handleCoverageChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(rawVal);
    setCoverageAmount(Math.min(Math.max(num, 1000000), 50000000));
  };

  const handleIncomeChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = Number(rawVal);
    setAnnualIncome(Math.min(Math.max(num, 100000), 10000000));
  };

  const handleReset = () => {
    setCurrentAge(30);
    setPolicyTerm(30);
    setCoverageAmount(10000000);
    setAnnualIncome(1200000);
    setDependents(2);
    setLifestyle('moderate');
  };

  // Comprehensive Actuarial Calculations
  const {
    recommendedCoverage,
    annualPremium,
    monthlyPremium,
    breakdown,
    popularPlans
  } = useMemo(() => {
    const age = Number(currentAge) || 30;
    const term = Number(policyTerm) || 30;
    const cov = Number(coverageAmount) || 10000000;
    const inc = Number(annualIncome) || 1200000;
    const dep = Number(dependents) || 0;

    // Recommended Coverage Calculation (Human Life Value Model)
    let ageMultiplier = 15;
    if (age <= 35) ageMultiplier = 7.5;
    else if (age <= 45) ageMultiplier = 6.5;
    else if (age <= 55) ageMultiplier = 5.0;
    else ageMultiplier = 4.0;

    const baseCoverage = inc * ageMultiplier;
    const depAddition = dep * 500000;
    const lifestyleFactor = lifestyle === 'comfortable' ? 1.25 : lifestyle === 'moderate' ? 1.0204166 : 0.9;
    const calcRecommended = Math.round((baseCoverage + depAddition) * lifestyleFactor);

    // Premium Calculation
    // Base rate per 1 Crore coverage at age 30 is approx ₹14,960/yr
    const ageFactor = 1 + (age - 30) * 0.045; // increases with age
    const termFactor = 1 + (term - 30) * 0.015; // slightly higher for longer terms
    const coverageScale = cov / 10000000; // ratio to 1 Cr

    const baseAnnPremium = Math.round(14960 * ageFactor * termFactor * coverageScale);
    const monthlyPrem = Math.round(baseAnnPremium / 12);

    // Premium Breakdown Components
    const purePremium = Math.round(baseAnnPremium * 0.706);
    const gst = Math.round(purePremium * 0.18);
    const adminCharges = Math.round(baseAnnPremium * 0.10);
    const otherCharges = Math.max(0, baseAnnPremium - purePremium - gst - adminCharges);

    const purePct = ((purePremium / baseAnnPremium) * 100).toFixed(1);
    const gstPct = ((gst / baseAnnPremium) * 100).toFixed(1);
    const adminPct = ((adminCharges / baseAnnPremium) * 100).toFixed(1);
    const otherPct = ((otherCharges / baseAnnPremium) * 100).toFixed(1);

    // Popular Plans List
    const plans = [
      {
        insurer: 'SecureLife',
        planName: 'Smart Protect Plus',
        logoText: '🛡️ SecureLife',
        logoColor: 'text-[#7C1FAB]',
        coverage: cov,
        term: `${term} Years`,
        annualPremium: baseAnnPremium,
        csr: '98.1%',
        recommended: true
      },
      {
        insurer: 'LifeShield',
        planName: 'Life Shield Term',
        logoText: '🛡️ LifeShield',
        logoColor: 'text-[#C81E8C]',
        coverage: cov,
        term: `${term} Years`,
        annualPremium: Math.round(baseAnnPremium * 1.062),
        csr: '97.2%',
        recommended: false
      },
      {
        insurer: 'FutureFirst',
        planName: 'Future Term Plan',
        logoText: '🛡️ FutureFirst',
        logoColor: 'text-[#F5A623]',
        coverage: cov,
        term: `${term} Years`,
        annualPremium: Math.round(baseAnnPremium * 1.099),
        csr: '96.5%',
        recommended: false
      }
    ];

    return {
      recommendedCoverage: calcRecommended,
      annualPremium: baseAnnPremium,
      monthlyPremium: monthlyPrem,
      breakdown: {
        purePremium,
        gst,
        adminCharges,
        otherCharges,
        purePct,
        gstPct,
        adminPct,
        otherPct
      },
      popularPlans: plans
    };
  }, [currentAge, policyTerm, coverageAmount, annualIncome, dependents, lifestyle]);

  // Format currency helper
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Multi-Segment Donut Math
  const radius = 60;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  const s1 = (Number(breakdown.purePct) / 100) * circumference;
  const s2 = (Number(breakdown.gstPct) / 100) * circumference;
  const s3 = (Number(breakdown.adminPct) / 100) * circumference;
  const s4 = (Number(breakdown.otherPct) / 100) * circumference;

  const offset1 = 0;
  const offset2 = -s1;
  const offset3 = -(s1 + s2);
  const offset4 = -(s1 + s2 + s3);

  const handleSelectPlan = (plan) => {
    setSelectedPlanModal(plan);
    setConsultModalOpen(true);
  };

  return (
    <div className="w-full bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FAB] overflow-x-hidden">
      
      {/* 3. MAIN PAGE CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-14 relative z-10">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-[#8E8A9D] font-medium py-1.5">
          <button onClick={onNavigateHome} className="hover:text-[#7C1FAB] transition-colors cursor-pointer">Home</button>
          <span>&gt;</span>
          <button onClick={() => onNavigatePage && onNavigatePage('tools')} className="hover:text-[#7C1FAB] transition-colors cursor-pointer">Tools</button>
          <span>&gt;</span>
          <span className="text-[#C81E8C] font-semibold">Term Insurance Calculator</span>
        </div>

        {/* HERO BANNER IMAGE */}
        <div className="w-full overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#EBE8EF] shadow-sm my-3 mb-6 bg-white">
          <img
            src="/term_insurance_calculator_hero_banner.png"
            alt="Calculate. Compare. Secure Your Tomorrow. Use our Term Insurance Calculator to find the right coverage"
            className="w-full h-auto block select-none max-h-[360px] lg:max-h-[400px] object-cover object-center"
          />
        </div>

        {/* 2-COLUMN CALCULATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: YOUR DETAILS */}
          <div className="lg:col-span-6 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-3.5 text-left">
            
            {/* Card Header */}
            <div className="flex items-center gap-2.5 pb-1.5 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-[#7C1FAB] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Your Details</h2>
            </div>

            {/* INPUT 1: Current Age */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E1B2E]">
                Current Age
              </label>
              <select
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none cursor-pointer"
              >
                {Array.from({ length: 48 }, (_, i) => i + 18).map((ageVal) => (
                  <option key={ageVal} value={ageVal}>{ageVal} Years</option>
                ))}
              </select>
            </div>

            {/* INPUT 2: Policy Term */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E1B2E]">
                Policy Term
              </label>
              <select
                value={policyTerm}
                onChange={(e) => setPolicyTerm(Number(e.target.value))}
                className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none cursor-pointer"
              >
                {[10, 15, 20, 25, 30, 35, 40, 45].map((termVal) => (
                  <option key={termVal} value={termVal}>{termVal} Years</option>
                ))}
              </select>
            </div>

            {/* INPUT 3: Coverage Amount */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs font-bold text-[#1E1B2E]">
                  Coverage Amount
                </label>
                <span className="text-[#8E8A9D] cursor-pointer" title="Total life cover sum assured">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={coverageAmount.toLocaleString('en-IN')}
                  onChange={handleCoverageChange}
                  className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none"
                />
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="1000000"
                  max="50000000"
                  step="500000"
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#8E8A9D] mt-0.5">
                  <span>₹ 10 Lakh</span>
                  <span>₹ 5 Crore</span>
                </div>
              </div>
            </div>

            {/* INPUT 4: Annual Income */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs font-bold text-[#1E1B2E]">
                  Annual Income
                </label>
                <span className="text-[#8E8A9D] cursor-pointer" title="Your annual gross earning">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={annualIncome.toLocaleString('en-IN')}
                  onChange={handleIncomeChange}
                  className="w-full bg-[#FAF8FC] border border-[#EBE3F5] focus:border-[#7C1FAB] focus:bg-white rounded-xl px-3.5 py-2 text-sm sm:text-base font-bold text-[#1E1B2E] transition-all outline-none"
                />
              </div>

              {/* Slider */}
              <div className="pt-0.5">
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7C1FAB]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#8E8A9D] mt-0.5">
                  <span>₹ 1 Lakh</span>
                  <span>₹ 1 Crore</span>
                </div>
              </div>
            </div>

            {/* INPUT 5: Existing Financial Dependents */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1E1B2E]">
                Existing Financial Dependents
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[0, 1, 2, 3, 4].map((depVal) => (
                  <button
                    key={depVal}
                    type="button"
                    onClick={() => setDependents(depVal)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      dependents === depVal
                        ? 'bg-[#7C1FAB] text-white border-[#7C1FAB] shadow-sm'
                        : 'bg-[#FAF8FC] text-[#544F66] border-[#EBE3F5] hover:border-purple-200'
                    }`}
                  >
                    {depVal === 4 ? '4+' : depVal}
                  </button>
                ))}
              </div>
            </div>

            {/* INPUT 6: Lifestyle */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs font-bold text-[#1E1B2E]">
                  Lifestyle
                </label>
                <span className="text-[#8E8A9D] cursor-pointer" title="Standard of living impact on future expense estimates">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'simple', label: 'Simple' },
                  { id: 'moderate', label: 'Moderate' },
                  { id: 'comfortable', label: 'Comfortable' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLifestyle(item.id)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      lifestyle === item.id
                        ? 'bg-[#7C1FAB] text-white border-[#7C1FAB] shadow-sm'
                        : 'bg-[#FAF8FC] text-[#544F66] border-[#EBE3F5] hover:border-purple-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="w-full bg-[#5E1083] hover:bg-[#7C1FAB] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Calculate Premium</span>
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

          {/* RIGHT COLUMN: YOUR INSURANCE SUMMARY */}
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
                  <h2 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Your Insurance Summary</h2>
                </div>
              </div>
            </div>

            {/* RECOMMENDED COVERAGE */}
            <div className="py-0">
              <span className="text-xs font-semibold text-[#544F66] block mb-0.5">Recommended Coverage</span>
              <div className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#7C1FAB] tracking-tight">
                {formatINR(recommendedCoverage)}
              </div>
            </div>

            {/* 3-STATS SUMMARY ROW */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-0 pb-2 border-b border-gray-100 text-left">
              <div>
                <span className="text-[10px] font-semibold text-[#8E8A9D] block mb-0.5">Monthly Premium</span>
                <span className="text-xs sm:text-sm font-bold text-[#1E1B2E]">{formatINR(monthlyPremium)}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#8E8A9D] block mb-0.5">Annual Premium</span>
                <span className="text-xs sm:text-sm font-bold text-[#16A34A]">{formatINR(annualPremium)}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#8E8A9D] block mb-0.5">Policy Term</span>
                <span className="text-xs sm:text-sm font-bold text-[#0284C7]">{policyTerm} Years</span>
              </div>
            </div>

            {/* WHY THIS AMOUNT BOX */}
            <div className="bg-[#FAF5FD] rounded-xl p-2.5 px-3 border border-purple-100 flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-purple-100 text-[#7C1FAB] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                💡
              </div>
              <div>
                <span className="text-xs font-bold text-[#1E1B2E] block">Why this amount?</span>
                <p className="text-[11px] text-[#544F66] leading-relaxed font-medium">
                  This coverage is calculated based on your income, expenses, liabilities, and future goals to help secure your family's future.
                </p>
              </div>
            </div>

            {/* MULTI-SEGMENT DONUT: PREMIUM BREAKDOWN (ANNUAL) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1E1B2E] block">Premium Breakdown (Annual)</span>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-[#FAF9FC] rounded-xl p-3 border border-purple-50">
                
                {/* Donut Visual */}
                <div className="sm:col-span-5 flex justify-center items-center relative py-1">
                  <svg width="135" height="135" viewBox="0 0 160 160" className="transform -rotate-90">
                    <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#EBE8EF" strokeWidth={strokeWidth} />
                    
                    {/* Segment 1: Pure Premium (Purple) */}
                    <circle
                      cx="80" cy="80" r={radius} fill="transparent"
                      stroke="#7C1FAB" strokeWidth={strokeWidth}
                      strokeDasharray={`${s1} ${circumference}`}
                      strokeDashoffset={offset1}
                      className="transition-all duration-500"
                    />

                    {/* Segment 2: GST (Pink) */}
                    <circle
                      cx="80" cy="80" r={radius} fill="transparent"
                      stroke="#C81E8C" strokeWidth={strokeWidth}
                      strokeDasharray={`${s2} ${circumference}`}
                      strokeDashoffset={offset2}
                      className="transition-all duration-500"
                    />

                    {/* Segment 3: Admin Charges (Amber) */}
                    <circle
                      cx="80" cy="80" r={radius} fill="transparent"
                      stroke="#F5A623" strokeWidth={strokeWidth}
                      strokeDasharray={`${s3} ${circumference}`}
                      strokeDashoffset={offset3}
                      className="transition-all duration-500"
                    />

                    {/* Segment 4: Other Charges (Green) */}
                    <circle
                      cx="80" cy="80" r={radius} fill="transparent"
                      stroke="#16A34A" strokeWidth={strokeWidth}
                      strokeDasharray={`${s4} ${circumference}`}
                      strokeDashoffset={offset4}
                      className="transition-all duration-500"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-[#8E8A9D]">Total</span>
                    <span className="text-xs font-black text-[#7C1FAB]">{formatINR(annualPremium)}</span>
                  </div>
                </div>

                {/* Breakdown Legend List */}
                <div className="sm:col-span-7 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7C1FAB]"></span>
                      <span className="text-[#544F66] font-medium">Pure Premium</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#1E1B2E]">{formatINR(breakdown.purePremium)}</span>
                      <span className="text-[10px] text-[#8E8A9D] ml-1.5">{breakdown.purePct}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C81E8C]"></span>
                      <span className="text-[#544F66] font-medium">GST (18%)</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#1E1B2E]">{formatINR(breakdown.gst)}</span>
                      <span className="text-[10px] text-[#8E8A9D] ml-1.5">{breakdown.gstPct}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]"></span>
                      <span className="text-[#544F66] font-medium">Policy Admin Charges</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#1E1B2E]">{formatINR(breakdown.adminCharges)}</span>
                      <span className="text-[10px] text-[#8E8A9D] ml-1.5">{breakdown.adminPct}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                      <span className="text-[#544F66] font-medium">Other Charges</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#1E1B2E]">{formatINR(breakdown.otherCharges)}</span>
                      <span className="text-[10px] text-[#8E8A9D] ml-1.5">{breakdown.otherPct}%</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* PROTECTION STATUS BOX */}
            <div className="bg-[#FAF5FD] rounded-xl p-2.5 px-3 border border-purple-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-bold text-[#1E1B2E] block">Your family is financially protected</span>
                <span className="text-[10px] text-[#544F66] font-medium">In case of any unfortunate event, your family will receive {formatINR(recommendedCoverage)} as a lump sum benefit.</span>
              </div>
            </div>

            {/* Direct Action Button */}
            <button
              onClick={() => setConsultModalOpen(true)}
              className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Covered for {formatINR(coverageAmount)}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

          </div>

        </div>

        {/* 4. COMPARE POPULAR PLANS TABLE (Matching Screenshot) */}
        <section className="mt-8 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-7 shadow-[0_8px_30px_rgba(30,27,46,0.04)] text-left">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Compare Popular Plans</h3>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF5FD] text-[#1E1B2E] border-b border-purple-100">
                  <th className="py-3 px-4 rounded-l-xl font-bold">Insurer</th>
                  <th className="py-3 px-4 font-bold">Plan Name</th>
                  <th className="py-3 px-4 font-bold">Coverage</th>
                  <th className="py-3 px-4 font-bold">Policy Term</th>
                  <th className="py-3 px-4 font-bold">Annual Premium</th>
                  <th className="py-3 px-4 font-bold">Claim Settlement Ratio</th>
                  <th className="py-3 px-4 rounded-r-xl font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {popularPlans.map((plan, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#1E1B2E]">
                      <div className="flex items-center gap-2">
                        <span className={plan.logoColor}>{plan.logoText}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#544F66] font-medium">{plan.planName}</td>
                    <td className="py-3.5 px-4 text-[#544F66] font-medium">{formatINR(plan.coverage)}</td>
                    <td className="py-3.5 px-4 text-[#544F66] font-medium">{plan.term}</td>
                    <td className="py-3.5 px-4 font-bold text-[#7C1FAB]">
                      {formatINR(plan.annualPremium)} <span className="text-[10px] font-normal text-[#8E8A9D]">/year</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#16A34A] bg-green-50 px-2.5 py-1 rounded-full text-xs">
                        {plan.csr}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleSelectPlan(plan)}
                        className="border border-[#7C1FAB]/40 text-[#7C1FAB] hover:bg-[#7C1FAB] hover:text-white px-4 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

        {/* 5. WHY TERM INSURANCE MATTERS (Matching Screenshot) */}
        <section className="mt-8 bg-white rounded-[24px] sm:rounded-[28px] border border-[#EBE3F5] p-5 sm:p-7 shadow-[0_8px_30px_rgba(30,27,46,0.04)] text-left">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E1B2E]">Why Term Insurance Matters</h3>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-[#FAF8FC] border border-[#EBE3F5] rounded-2xl p-4 flex items-start gap-3.5 hover:border-purple-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-sm font-bold shrink-0">
                🎯
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#1E1B2E] mb-1">Financial Security</h4>
                <p className="text-[11px] text-[#544F66] leading-relaxed">Provides financial support to your family.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF8FC] border border-[#EBE3F5] rounded-2xl p-4 flex items-start gap-3.5 hover:border-purple-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-sm font-bold shrink-0">
                🛡️
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#1E1B2E] mb-1">Affordable Premiums</h4>
                <p className="text-[11px] text-[#544F66] leading-relaxed">High coverage at a lower cost.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF8FC] border border-[#EBE3F5] rounded-2xl p-4 flex items-start gap-3.5 hover:border-purple-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-sm font-bold shrink-0">
                📊
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#1E1B2E] mb-1">Tax Benefits</h4>
                <p className="text-[11px] text-[#544F66] leading-relaxed">Save tax up to ₹ 46,800 u/s 80C &amp; 10(10D).</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#FAF8FC] border border-[#EBE3F5] rounded-2xl p-4 flex items-start gap-3.5 hover:border-purple-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-sm font-bold shrink-0">
                💜
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#1E1B2E] mb-1">Peace of Mind</h4>
                <p className="text-[11px] text-[#544F66] leading-relaxed">Secure your loved ones' future, always.</p>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* 6. CONSULTATION / SELECT PLAN MODAL */}
      {consultModalOpen && (
        <div className="fixed inset-0 bg-[#11081F]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => { setConsultModalOpen(false); setSelectedPlanModal(null); }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-purple-50 text-[#7C1FAB] hover:bg-purple-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center text-2xl font-bold mb-4">
              🛡️
            </div>

            <h3 className="text-xl font-bold text-[#1E1B2E] mb-1">
              {selectedPlanModal ? `Apply for ${selectedPlanModal.planName}` : `Apply for ${formatINR(coverageAmount)} Term Plan`}
            </h3>
            <p className="text-xs text-[#544F66] mb-5 leading-relaxed">
              Annual Premium: <strong className="text-[#7C1FAB]">{formatINR(selectedPlanModal ? selectedPlanModal.annualPremium : annualPremium)}/yr</strong> for {policyTerm} Years. Connect with our IRDAI-certified insurance advisors for zero-commission policy issuance.
            </p>

            <form
              className="space-y-3.5"
              onSubmit={(e) => {
                e.preventDefault();
                sendWhatsAppEnquiry({
                  formName: `Term Insurance Application (${selectedPlanModal ? selectedPlanModal.planName : 'Term Plan Quote'})`,
                  name: consultForm.name,
                  phone: consultForm.phone,
                  service: selectedPlanModal ? selectedPlanModal.planName : 'Term Insurance Policy',
                  extra: {
                    'Coverage Amount': formatINR(coverageAmount),
                    'Est. Annual Premium': `${formatINR(selectedPlanModal ? selectedPlanModal.annualPremium : annualPremium)}/yr`,
                    'Policy Term': `${policyTerm} Years`,
                    'Smoker Status': consultForm.smoker,
                    'Gender': consultForm.gender
                  }
                });
                alert('Thank you! Our insurance advisor will contact you with pre-approved policy terms.');
                setConsultModalOpen(false);
                setConsultForm({ name: '', phone: '', smoker: 'No (Non-Smoker)', gender: 'Male' });
              }}
            >
              <div>
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Mobile Number</label>
                <PhoneInput
                  value={consultForm.phone}
                  countryCode={consultForm.countryCode || '+91'}
                  onCountryCodeChange={(code) => setConsultForm((f) => ({ ...f, countryCode: code }))}
                  onChange={(val) => setConsultForm((f) => ({ ...f, phone: val }))}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Tobacco / Smoker</label>
                  <select
                    value={consultForm.smoker}
                    onChange={(e) => setConsultForm({ ...consultForm, smoker: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors bg-white"
                  >
                    <option>No (Non-Smoker)</option>
                    <option>Yes (Smoker)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1E1B2E] mb-1">Gender</label>
                  <select
                    value={consultForm.gender}
                    onChange={(e) => setConsultForm({ ...consultForm, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EBE3F5] text-xs focus:outline-none focus:border-[#7C1FAB] transition-colors bg-white"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7C1FAB] hover:bg-[#6b1a91] text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                Proceed with Certified Advisor
              </button>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}
