import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function BorrowPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Calculator state
  const [selectedCalcTab, setSelectedCalcTab] = useState('personal'); // 'personal' | 'home' | 'business'
  const [loanAmount, setLoanAmount] = useState(300000); // 3 Lakhs default
  const [interestRate, setInterestRate] = useState(12.5); // 12.5% default
  const [tenureMonths, setTenureMonths] = useState(24); // 24 months default

  const calcTabConfigs = {
    personal: {
      key: 'personal',
      label: 'Personal Loan',
      rate: 12.5,
      minAmount: 50000,
      maxAmount: 5000000,
      stepAmount: 25000,
      defaultAmount: 300000,
      minAmountLabel: '₹50,000',
      maxAmountLabel: '₹50 Lakhs',
      minTenure: 6,
      maxTenure: 60,
      stepTenure: 6,
      defaultTenure: 24,
      minTenureLabel: '6 Months',
      maxTenureLabel: '5 Years',
    },
    home: {
      key: 'home',
      label: 'Home Loan',
      rate: 8.5,
      minAmount: 500000,
      maxAmount: 50000000,
      stepAmount: 100000,
      defaultAmount: 3000000,
      minAmountLabel: '₹5 Lakhs',
      maxAmountLabel: '₹5 Crore',
      minTenure: 12,
      maxTenure: 360,
      stepTenure: 12,
      defaultTenure: 240,
      minTenureLabel: '1 Year',
      maxTenureLabel: '30 Years',
    },
    business: {
      key: 'business',
      label: 'Business Loan',
      rate: 14.0,
      minAmount: 100000,
      maxAmount: 10000000,
      stepAmount: 50000,
      defaultAmount: 1000000,
      minAmountLabel: '₹1 Lakh',
      maxAmountLabel: '₹1 Crore',
      minTenure: 12,
      maxTenure: 84,
      stepTenure: 6,
      defaultTenure: 36,
      minTenureLabel: '1 Year',
      maxTenureLabel: '7 Years',
    }
  };

  const handleCalcTabChange = (tabKey) => {
    const config = calcTabConfigs[tabKey];
    if (!config) return;
    setSelectedCalcTab(tabKey);
    setLoanAmount(config.defaultAmount);
    setTenureMonths(config.defaultTenure);
    setInterestRate(config.rate);
  };

  const currentCalcConfig = calcTabConfigs[selectedCalcTab] || calcTabConfigs.personal;

  const formatTenure = (months) => {
    if (months < 12) return `${months} Months`;
    const years = months / 12;
    if (Number.isInteger(years)) {
      return `${years} ${years === 1 ? 'Year' : 'Years'} (${months} Mos)`;
    }
    return `${years.toFixed(1)} Years (${months} Mos)`;
  };

  // Tab state for Eligibility Matrix
  const [activeEmploymentType, setActiveEmploymentType] = useState('salaried');

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Modal State
  const [selectedModal, setSelectedModal] = useState(false);
  const [modalOption, setModalOption] = useState({ title: '', subtitle: '' });
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', loanType: 'Personal Loan', amount: '' });
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

  // EMI Calculation: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateBorrowEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureMonths;

    if (P <= 0 || r <= 0 || n <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };

    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return { emi, totalPayment, totalInterest };
  };

  const { emi, totalPayment, totalInterest } = calculateBorrowEMI();

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleOpenApplyModal = (title = 'Instant Loan Application', subtitle = 'Fill in your details below to receive instant pre-approval terms within 2 minutes.') => {
    setModalOption({ title, subtitle });
    setFormData((prev) => ({ ...prev, amount: loanAmount.toString() }));
    setFormSubmitted(false);
    setSelectedModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const borrowProducts = [
    {
      id: 'personal',
      title: 'Instant Personal Loan',
      badge: 'Fast Disbursal',
      subtitle: 'Collateral-free instant cash loans for travel, medical, or urgent personal needs.',
      amountRange: '₹25,000 - ₹15,00,000',
      tenureRange: '3 - 60 Months',
      rate: 'Starting at 10.99% p.a.',
      iconBg: 'bg-[#7C1FA8]',
      cardBorder: 'border-purple-200',
      gradientBg: 'from-[#FAF4FD] to-white',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'digital',
      title: 'Digital Micro-Credit',
      badge: 'Zero Docs',
      subtitle: 'Paperless micro-loans with 100% online verification and 5-minute direct bank transfer.',
      amountRange: '₹10,000 - ₹2,000,000',
      tenureRange: '1 - 12 Months',
      rate: 'Flexible Monthly Rates',
      iconBg: 'bg-[#EC4899]',
      cardBorder: 'border-pink-200',
      gradientBg: 'from-[#FDF2F8] to-white',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'business',
      title: 'Business & Growth Credit',
      badge: 'Working Capital',
      subtitle: 'Expand business operations, manage inventory, or invest in new equipment effortlessly.',
      amountRange: '₹1,00,000 - ₹50,00,000',
      tenureRange: '12 - 48 Months',
      rate: 'Starting at 13.5% p.a.',
      iconBg: 'bg-[#3B82F6]',
      cardBorder: 'border-blue-200',
      gradientBg: 'from-[#EFF6FF] to-white',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'securities',
      title: 'Loan Against Securities / MF',
      badge: 'Zero Selling',
      subtitle: 'Get instant liquidity without selling your mutual funds, stocks, or insurance policies.',
      amountRange: 'Up to 80% Portfolio Value',
      tenureRange: 'Flexible Overdraft',
      rate: 'Starting at 9.25% p.a.',
      iconBg: 'bg-[#10B981]',
      cardBorder: 'border-emerald-200',
      gradientBg: 'from-[#ECFDF5] to-white',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'property',
      title: 'Loan Against Property (LAP)',
      badge: 'High Value',
      subtitle: 'Unlock maximum capital value against residential or commercial property with low EMIs.',
      amountRange: '₹10,00,000 - ₹5,00,00,000',
      tenureRange: 'Up to 15 Years',
      rate: 'Starting at 8.75% p.a.',
      iconBg: 'bg-[#F59E0B]',
      cardBorder: 'border-amber-200',
      gradientBg: 'from-[#FFFBEB] to-white',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'emergency',
      title: 'Emergency Medical Line',
      badge: 'Pre-Approved',
      subtitle: 'Dedicated high-speed financial buffer for medical emergencies and unexpected bills.',
      amountRange: '₹50,000 - ₹10,00,000',
      tenureRange: '6 - 36 Months',
      rate: 'Low Interest EMI',
      iconBg: 'bg-[#14B8A6]',
      cardBorder: 'border-teal-200',
      gradientBg: 'from-[#F0FDFA] to-white',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  const eligibilityCriteria = {
    salaried: {
      title: 'Salaried Professionals',
      minAge: '21 to 58 Years',
      minIncome: '₹20,000 / month',
      cibil: '650+ Credit Score',
      docs: ['Aadhaar Card & PAN Card', 'Last 3 Months Salary Slips', 'Last 6 Months Bank Statement', 'Company ID / Offer Letter']
    },
    selfEmployed: {
      title: 'Self-Employed Individuals',
      minAge: '23 to 65 Years',
      minIncome: '₹2.5 Lakhs annual turnover',
      cibil: '675+ Credit Score',
      docs: ['Aadhaar & PAN Card', '2 Years ITR with Computation', 'Last 12 Months Bank Statement', 'Business Existence Proof (GST / Trade License)']
    },
    business: {
      title: 'Business Owners & SMEs',
      minAge: 'Business vintage > 2 Years',
      minIncome: 'Min ₹10 Lakhs Annual Revenue',
      cibil: 'Good Commercial / CIBIL Profile',
      docs: ['GST Registration & Returns', 'Audited Financials (2 Years)', 'Bank Statements (12 Months)', 'Entity PAN & Promoters Identity Proof']
    }
  };

  const faqs = [
    {
      q: 'How fast can I get a loan disbursed through Prosperi5?',
      a: 'For digital personal loans and micro-credit, disbursal occurs within 5 minutes to 24 hours of digital KYC completion. Business loans and property loans typically take 2-4 working days.'
    },
    {
      q: 'Will checking my eligibility impact my CIBIL score?',
      a: 'No! Our initial pre-approval check uses a soft credit inquiry that has zero impact on your CIBIL credit score.'
    },
    {
      q: 'Are there any hidden fees or prepayment charges?',
      a: 'We pride ourselves on 100% transparency. All processing fees, interest rates, and foreclosure charges are disclosed upfront before loan agreement execution.'
    },
    {
      q: 'Can I get a loan without selling my existing investments?',
      a: 'Yes! Our Loan Against Securities (LAS) allows you to pledge your mutual funds, equity stocks, or insurance policies as collateral to get cash without liquidating investments.'
    },
    {
      q: 'What is the minimum credit score required to borrow?',
      a: 'While a CIBIL score of 650+ gets you the best interest rates, we work with multiple RBI-regulated lending partners to find customized options even for first-time borrowers.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FD] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">
      
      {/* 1. TOP CONTACT UTILITY BAR */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-7xl mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-white/70">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Borrow Smarter · Quick & Transparent Loans</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-[#F5A623] bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              Zero Hidden Charges · Instant Approval
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => handleOpenApplyModal()}
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
            <button onClick={() => onNavigatePage && onNavigatePage('borrow')} className="text-[#7C1FA8] font-bold cursor-pointer relative after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#7C1FA8] after:rounded-full">Borrow</button>
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenApplyModal('Check Eligibility', 'Check your borrowing limit with zero impact on CIBIL score.')}
              className="hidden lg:flex bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-5 py-2 rounded-full text-xs shadow-md transition-all items-center gap-1.5 cursor-pointer"
            >
              Check Eligibility
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
            <div className="flex flex-col gap-2 pt-4 border-t border-purple-100 font-semibold text-sm">
              <button onClick={() => { setMobileMenuOpen(false); onNavigateHome(); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Home</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('about'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">About Us</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('investment'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Investment</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('insurance'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Insurance</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('financing'); }} className="text-left py-2 px-3 rounded-lg hover:bg-purple-100/50">Financing</button>
              <button onClick={() => { setMobileMenuOpen(false); onNavigatePage && onNavigatePage('borrow'); }} className="text-left py-2 px-3 rounded-lg bg-purple-100 text-[#7C1FA8] font-bold">Borrow</button>
            </div>
            <div className="pt-6">
              <button
                onClick={() => { setMobileMenuOpen(false); handleOpenApplyModal(); }}
                className="w-full bg-[#7C1FA8] text-white font-bold py-3 rounded-full text-sm shadow-md"
              >
                Apply for Loan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO SECTION (YOUR GOALS NEED FUNDING. WE MAKE IT HAPPEN.) */}
      <section className="w-full bg-[#FAF8FC] bg-gradient-to-r from-[#FAF8FC] via-[#F5EEFC] to-[#FAF8FC] relative overflow-hidden border-b border-[#EBE8EF]/60 pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-7 lg:pb-8 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-purple-200/40 rounded-full filter blur-[90px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-7 relative z-10">
          
          {/* TOP HERO GRID (Left text content + Right user 3D image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: Badge, Title, Subtitle & Action Buttons */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              {/* Top Category Badge */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#7C1FA8] inline-block animate-pulse"></span>
                <span className="text-[#7C1FA8] text-xs font-black uppercase tracking-widest font-sans">
                  LOANS
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-sans font-extrabold text-[34px] leading-[42px] sm:text-[44px] sm:leading-[52px] lg:text-[50px] lg:leading-[58px] tracking-[-0.03em] text-[#1E1B2E] mb-3 max-w-[560px]">
                Your goals need funding. <span className="text-[#7C1FA8]">We make it happen.</span>
              </h1>

              {/* Subtitle Paragraph */}
              <p className="font-medium text-[14.5px] sm:text-[15.5px] leading-[22px] sm:leading-[25px] text-[#544F66] mb-6 max-w-[520px]">
                Get access to flexible, secure and hassle-free loans for your personal and professional needs. With competitive rates and a simple process, Prosperi5 helps you move forward with confidence.
              </p>

              {/* CTA Buttons Row */}
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => handleOpenApplyModal('Explore Loan Options', 'Find the best loan offer suited for your financial goals.')}
                  className="h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-xl bg-[#7C1FA8] hover:bg-[#68198f] text-white font-bold text-sm sm:text-base shadow-md shadow-purple-900/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Explore Loan Options</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                <button
                  onClick={() => handleOpenApplyModal('Check Eligibility', 'Check your borrowing limit with zero impact on CIBIL score.')}
                  className="h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-xl bg-white hover:bg-purple-50 text-[#7C1FA8] border border-[#7C1FA8]/40 font-bold text-sm sm:text-base shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                >
                  Check Eligibility
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: User 3D Image & Callout */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full mt-4 lg:mt-0">
              
              {/* Optional Callout text top right */}
              <div className="hidden sm:flex absolute -top-4 right-6 flex-col items-center pointer-events-none z-20">
                <span className="text-[#7C1FA8] font-bold text-xs sm:text-sm -rotate-6 tracking-tight">
                  Big dreams need the right support
                </span>
                <svg className="w-6 h-6 text-[#7C1FA8] -mt-1 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </div>

              {/* 3D Image Container */}
              <div className="relative z-10 w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] flex justify-center items-center">
                <img
                  src="/ChatGPT Image Aug 29, 2026, 03_23_22 PM.png"
                  alt="Your goals need funding. We make it happen - Loans Illustration"
                  className="w-full h-auto max-h-[420px] sm:max-h-[460px] lg:max-h-[480px] object-contain drop-shadow-xl select-none"
                />
              </div>

            </div>

          </div>

          {/* BOTTOM 4 FEATURE CARDS ROW */}
          <div className="bg-white/95 backdrop-blur-md rounded-[22px] p-4 sm:p-5 border border-purple-100/80 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-purple-100/80">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 px-2">
              <div className="w-11 h-11 rounded-2xl bg-purple-100/70 border border-purple-200/60 text-[#7C1FA8] flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-extrabold text-sm text-[#1E1B2E]">Competitive Rates</h4>
                <p className="text-xs font-medium text-[#666077] leading-snug mt-0.5">
                  Get the best rates with complete transparency.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 px-2 sm:pl-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-100/70 border border-purple-200/60 text-[#7C1FA8] flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-extrabold text-sm text-[#1E1B2E]">Quick & Easy Process</h4>
                <p className="text-xs font-medium text-[#666077] leading-snug mt-0.5">
                  Minimal documentation and faster approvals.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 px-2 sm:pl-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-100/70 border border-purple-200/60 text-[#7C1FA8] flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-extrabold text-sm text-[#1E1B2E]">Secure & Trusted</h4>
                <p className="text-xs font-medium text-[#666077] leading-snug mt-0.5">
                  Your data and transactions are always safe with us.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 px-2 sm:pl-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-100/70 border border-purple-200/60 text-[#7C1FA8] flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-extrabold text-sm text-[#1E1B2E]">Personalized Support</h4>
                <p className="text-xs font-medium text-[#666077] leading-snug mt-0.5">
                  Dedicated relationship managers to guide you at every step.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 1: OUR LOAN PRODUCTS */}
      {/* ========================================================================= */}
      <section className="py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans border-b border-purple-100/60">
        {/* Centered Header (View All Loans button removed) */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/80">
            OUR LOAN PRODUCTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E1B2E] mt-3 tracking-tight">
            Loans for every step of your journey.
          </h2>
          <p className="text-xs sm:text-sm text-[#666077] mt-1.5 font-normal">
            Whether it's a dream home, a new business or personal needs — we've got you covered.
          </p>
        </div>

        {/* 4 Cards Grid (max-w-7xl) */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Personal Loan */}
            <div 
              onClick={() => handleOpenApplyModal('Personal Loan', 'For your dreams, big or small. Get funds for your personal needs with ease.')}
              className="group bg-white hover:bg-[#7C1FA8] hover:border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/90 shadow-2xs hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-36 sm:h-40 rounded-xl bg-[#FAF6FC] group-hover:bg-white/10 overflow-hidden mb-3.5 flex items-center justify-center p-2 transition-colors">
                  <img 
                    src="/personal_loan_3d.jpg" 
                    alt="Personal Loan" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] group-hover:text-white transition-colors mb-2 leading-tight">
                  Personal Loan
                </h3>
                <p className="text-xs sm:text-sm text-[#666077] group-hover:text-purple-100/90 leading-relaxed font-medium transition-colors">
                  For your dreams, big or small. Get funds for your personal needs with ease.
                </p>
              </div>
            </div>

            {/* Card 2: Home Loan */}
            <div 
              onClick={() => handleOpenApplyModal('Home Loan', 'Turn your dream home into reality with flexible home loan options and low interest rates.')}
              className="group bg-white hover:bg-[#7C1FA8] hover:border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/90 shadow-2xs hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-36 sm:h-40 rounded-xl bg-[#FAF6FC] group-hover:bg-white/10 overflow-hidden mb-3.5 flex items-center justify-center p-2 transition-colors">
                  <img 
                    src="/home_loan_3d.jpg" 
                    alt="Home Loan" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] group-hover:text-white transition-colors mb-2 leading-tight">
                  Home Loan
                </h3>
                <p className="text-xs sm:text-sm text-[#666077] group-hover:text-purple-100/90 leading-relaxed font-medium transition-colors">
                  Turn your dream home into reality with flexible home loan options and low interest rates.
                </p>
              </div>
            </div>

            {/* Card 3: Business Loan */}
            <div 
              onClick={() => handleOpenApplyModal('Business Loan', 'Fuel your business growth with working capital, expansion or equipment loans.')}
              className="group bg-white hover:bg-[#7C1FA8] hover:border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/90 shadow-2xs hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-36 sm:h-40 rounded-xl bg-[#FAF6FC] group-hover:bg-white/10 overflow-hidden mb-3.5 flex items-center justify-center p-2 transition-colors">
                  <img 
                    src="/business_loan_3d.jpg" 
                    alt="Business Loan" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] group-hover:text-white transition-colors mb-2 leading-tight">
                  Business Loan
                </h3>
                <p className="text-xs sm:text-sm text-[#666077] group-hover:text-purple-100/90 leading-relaxed font-medium transition-colors">
                  Fuel your business growth with working capital, expansion or equipment loans.
                </p>
              </div>
            </div>

            {/* Card 4: Loan Against Securities */}
            <div 
              onClick={() => handleOpenApplyModal('Loan Against Securities', 'Get quick funds by leveraging your investments, without selling them.')}
              className="group bg-white hover:bg-[#7C1FA8] hover:border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/90 shadow-2xs hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-36 sm:h-40 rounded-xl bg-[#FAF6FC] group-hover:bg-white/10 overflow-hidden mb-3.5 flex items-center justify-center p-2 transition-colors">
                  <img 
                    src="/securities_loan_3d.jpg" 
                    alt="Loan Against Securities" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] group-hover:text-white transition-colors mb-2 leading-tight">
                  Loan Against Securities
                </h3>
                <p className="text-xs sm:text-sm text-[#666077] group-hover:text-purple-100/90 leading-relaxed font-medium transition-colors">
                  Get quick funds by leveraging your investments, without selling them.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION 2: WHY CHOOSE PROSPERI5 */}
      {/* ========================================================================= */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans border-b border-purple-100/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex justify-center lg:justify-start">
              <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/80 inline-block text-center">
                WHY CHOOSE PROSPERI5
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E1B2E] tracking-tight leading-tight">
              More than just a loan.<br />
              <span className="text-[#7C1FA8]">A partner in your progress.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#666077] leading-relaxed font-medium max-w-md">
              At Prosperi5, we go beyond standard funding. We empower your growth with tailored loan options, transparent terms, competitive interest rates, and dedicated expert support to help you achieve your financial milestones with confidence.
            </p>
            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                onClick={() => handleOpenApplyModal('Learn More About Prosperi5 Loans', 'Discover how Prosperi5 accelerates your borrowing journey.')}
                className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Learn More</span>
                <span className="text-sm">➔</span>
              </button>
            </div>
          </div>

          {/* Right Visual Column in Rounded White Card Container (Increased Image Height) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="bg-white rounded-[32px] sm:rounded-[36px] p-5 sm:p-7 lg:p-9 shadow-2xl border border-purple-100/80 relative w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden sm:overflow-visible">
              
              {/* Left 3D Illustration (Increased Height) */}
              <div className="w-full sm:w-[60%] flex-shrink-0 flex items-center justify-center">
                <img 
                  src="/climbing_stairs_3d.jpg" 
                  alt="Partner in your progress" 
                  className="w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain mix-blend-multiply"
                />
              </div>
              
              {/* Right Stacked 4 White Feature Pills */}
              <div className="w-full sm:w-[48%] flex flex-col gap-3.5 z-10 sm:-ml-8">
                {/* Feature 1 */}
                <div className="bg-white border border-purple-100 shadow-lg px-4 py-2.5 rounded-full flex items-center gap-3 hover:scale-105 transition-all">
                  <div className="w-7 h-7 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0">
                    01
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#1E1B2E] whitespace-nowrap">Flexible Tenure</span>
                </div>

                {/* Feature 2 */}
                <div className="bg-white border border-purple-100 shadow-lg px-4 py-2.5 rounded-full flex items-center gap-3 hover:scale-105 transition-all">
                  <div className="w-7 h-7 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0">
                    02
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#1E1B2E] whitespace-nowrap">Low Interest Rates</span>
                </div>

                {/* Feature 3 */}
                <div className="bg-white border border-purple-100 shadow-lg px-4 py-2.5 rounded-full flex items-center gap-3 hover:scale-105 transition-all">
                  <div className="w-7 h-7 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0">
                    03
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#1E1B2E] whitespace-nowrap">Minimal Documentation</span>
                </div>

                {/* Feature 4 */}
                <div className="bg-white border border-purple-100 shadow-lg px-4 py-2.5 rounded-full flex items-center gap-3 hover:scale-105 transition-all">
                  <div className="w-7 h-7 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0">
                    04
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#1E1B2E] whitespace-nowrap">Fast Approval</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION 3: HOW IT WORKS */}
      {/* ========================================================================= */}
      <section className="py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans border-b border-purple-100/60">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/80">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] mt-3 tracking-tight">
            Get your loan in 4 simple steps.
          </h2>
        </div>

        {/* 4 Steps Horizontal Row with SVG Arrows (max-w-7xl) */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-10 relative">
            
            {/* Step 1 */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between space-y-4 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                  1
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E]">Apply Online</h3>
                <p className="text-xs sm:text-sm text-[#666077] leading-relaxed font-medium">
                  Fill in a few details and submit your application.
                </p>
              </div>
              {/* Step SVG Arrow Badge (Mathematically centered in gap between cards) */}
              <div className="hidden lg:flex items-center justify-center absolute left-[calc(100%+20px)] -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-purple-200 text-[#7C1FA8] shadow-md pointer-events-none group-hover:scale-110 transition-transform">
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between space-y-4 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                  2
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E]">Verification</h3>
                <p className="text-xs sm:text-sm text-[#666077] leading-relaxed font-medium">
                  We verify your documents and assess your eligibility.
                </p>
              </div>
              {/* Step SVG Arrow Badge */}
              <div className="hidden lg:flex items-center justify-center absolute left-[calc(100%+20px)] -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-purple-200 text-[#7C1FA8] shadow-md pointer-events-none group-hover:scale-110 transition-transform">
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between space-y-4 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  3
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E]">Approval</h3>
                <p className="text-xs sm:text-sm text-[#666077] leading-relaxed font-medium">
                  Get instant approval and loan offer.
                </p>
              </div>
              {/* Step SVG Arrow Badge */}
              <div className="hidden lg:flex items-center justify-center absolute left-[calc(100%+20px)] -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-purple-200 text-[#7C1FA8] shadow-md pointer-events-none group-hover:scale-110 transition-transform">
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group bg-[#FAF6FC] border border-purple-100/90 rounded-2xl p-5 sm:p-6 relative flex flex-col justify-between space-y-4 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#7C1FA8] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                  4
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E]">Disbursal</h3>
                <p className="text-xs sm:text-sm text-[#666077] leading-relaxed font-medium">
                  Receive funds directly in your account.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION 4: LOAN CALCULATOR BANNER (COMPACT HEIGHT & WIDTH) */}
      {/* ========================================================================= */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
        <div 
          className="rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 lg:p-8 shadow-2xl text-white relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/ChatGPT Image Aug 26, 2026, 09_00_05 PM.png')" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            
            {/* Left Content Side */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-white/90 text-xs font-extrabold uppercase tracking-widest bg-white/20 px-3.5 py-1 rounded-full backdrop-blur-sm inline-block">
                LOAN CALCULATOR
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Plan your EMIs. Know your options.
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-normal max-w-xs sm:max-w-sm lg:max-w-[360px]">
                Use our easy loan calculator to estimate your EMIs and choose the plan best for your needs.
              </p>

              <div className="pt-1 flex items-center gap-4 flex-wrap">
                <button 
                  onClick={() => handleOpenApplyModal(`Loan Calculator Apply - ${formatINR(loanAmount)}`, `Calculated EMI: ${formatINR(emi)}/mo`)}
                  className="bg-white text-[#7C1FA8] hover:bg-purple-50 font-extrabold px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-md cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <span>Try Loan Calculator</span>
                  <span className="text-sm">➔</span>
                </button>
              </div>

              {/* 3D Calculator Visual (Increased Image Width) */}
              <div className="pt-2 max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
                <img 
                  src="/calculator_3d.jpg" 
                  alt="3D Loan Calculator" 
                  className="w-full h-auto rounded-2xl drop-shadow-2xl opacity-95 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Interactive EMI Calculator Card (Tall & Spacious Card with Larger Text) */}
            <div className="lg:col-span-6 bg-white text-[#1E1B2E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl flex flex-col justify-between min-h-[520px] sm:min-h-[560px] space-y-6 sm:space-y-7">
              {/* Product Tabs */}
              <div className="flex bg-[#FAF6FC] p-1.5 rounded-xl sm:rounded-2xl border border-purple-100 text-sm sm:text-base font-extrabold gap-1.5">
                {Object.values(calcTabConfigs).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => handleCalcTabChange(tab.key)}
                    className={`flex-1 py-3 sm:py-3.5 rounded-lg sm:rounded-xl cursor-pointer text-center transition-all duration-200 ${
                      selectedCalcTab === tab.key
                        ? 'bg-[#7C1FA8] text-white shadow-sm font-black'
                        : 'text-[#666077] hover:text-[#7C1FA8] hover:bg-purple-50/70 font-bold'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Slider 1: Loan Amount */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-sm sm:text-base font-extrabold">
                  <span className="text-[#666077]">Loan Amount</span>
                  <span className="text-lg sm:text-xl font-black text-[#7C1FA8]">{formatINR(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min={currentCalcConfig.minAmount}
                  max={currentCalcConfig.maxAmount}
                  step={currentCalcConfig.stepAmount}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-[#7C1FA8]"
                />
                <div className="flex justify-between text-xs sm:text-sm text-[#666077] font-semibold">
                  <span>{currentCalcConfig.minAmountLabel}</span>
                  <span>{currentCalcConfig.maxAmountLabel}</span>
                </div>
              </div>

              {/* Slider 2: Tenure */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-sm sm:text-base font-extrabold">
                  <span className="text-[#666077]">Tenure</span>
                  <span className="text-lg sm:text-xl font-black text-[#7C1FA8]">{formatTenure(tenureMonths)}</span>
                </div>
                <input
                  type="range"
                  min={currentCalcConfig.minTenure}
                  max={currentCalcConfig.maxTenure}
                  step={currentCalcConfig.stepTenure}
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-[#7C1FA8]"
                />
                <div className="flex justify-between text-xs sm:text-sm text-[#666077] font-semibold">
                  <span>{currentCalcConfig.minTenureLabel}</span>
                  <span>{currentCalcConfig.maxTenureLabel}</span>
                </div>
              </div>

              {/* Output Display */}
              <div className="bg-[#FAF6FC] border border-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-[#666077] uppercase tracking-wider block">Estimated EMI</span>
                  <div className="text-3xl sm:text-4xl font-black text-[#7C1FA8] mt-1">
                    {formatINR(emi)} <span className="text-sm sm:text-base font-bold text-[#666077]">/month</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-extrabold text-[#7C1FA8] bg-purple-100/90 border border-purple-200/80 px-3.5 py-1.5 rounded-full inline-block shadow-2xs">
                    @{interestRate}% p.a.
                  </span>
                </div>
              </div>

              {/* Apply CTA */}
              <button
                onClick={() => handleOpenApplyModal(`${currentCalcConfig.label} Application - ${formatINR(loanAmount)}`, `Estimated EMI: ${formatINR(emi)}/mo for ${formatTenure(tenureMonths)} @ ${interestRate}% p.a.`)}
                className="w-full py-4 sm:py-4.5 bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-black rounded-xl sm:rounded-2xl transition-all text-center cursor-pointer shadow-lg active:scale-95 text-base sm:text-lg uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Calculate & Apply</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. LEAD INQUIRY & PRE-APPROVAL MODAL */}
      {selectedModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white bg-cover bg-center rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 overflow-hidden border border-purple-100/80"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <button
                onClick={() => setSelectedModal(false)}
                className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gray-100/90 text-gray-500 hover:bg-gray-200 flex items-center justify-center cursor-pointer font-bold transition-colors z-20"
              >
                ✕
              </button>

              {!formSubmitted ? (
                <>
                  <h3 className="text-2xl font-extrabold text-[#1E1B2E] mb-1">
                    {modalOption.title || 'Borrow Application'}
                  </h3>
                  <p className="text-sm text-[#6E6B7B] mb-5 font-medium">
                    {modalOption.subtitle || 'Fill in your details below and our credit expert will reach out within 15 minutes.'}
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
                    <div>
                      <label className="block font-extrabold text-[#1E1B2E] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-200/90 bg-white/95 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block font-extrabold text-[#1E1B2E] mb-1.5">Mobile Number</label>
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
                          placeholder="10-digit mobile number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full p-3 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-extrabold text-[#1E1B2E] mb-1.5">Loan Type</label>
                      <select
                        value={formData.loanType}
                        onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-200/90 bg-white/95 text-sm font-medium text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      >
                        <option value="Instant Personal Loan">Instant Personal Loan</option>
                        <option value="Digital Micro-Credit">Digital Micro-Credit</option>
                        <option value="Business & Growth Credit">Business & Growth Credit</option>
                        <option value="Loan Against Securities">Loan Against Securities / Mutual Funds</option>
                        <option value="Loan Against Property">Loan Against Property</option>
                        <option value="Emergency Medical Line">Emergency Medical Line</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-extrabold text-[#1E1B2E] mb-1.5">Desired Loan Amount (₹)</label>
                      <input
                        type="text"
                        placeholder="e.g. 3,00,000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-200/90 bg-white/95 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold rounded-xl shadow-md text-sm sm:text-base uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Submit Loan Request</span>
                      <span>➔</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1E1B2E] mb-2">Application Received!</h3>
                  <p className="text-xs text-[#6E6B7B] leading-relaxed mb-6">
                    Thank you, <strong className="text-[#1E1B2E]">{formData.name}</strong>. Our loan evaluation specialist has received your request for <strong>{formData.loanType}</strong> and will contact you at <strong>{formData.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSelectedModal(false)}
                    className="px-6 py-2.5 bg-[#7C1FA8] text-white font-bold text-xs rounded-full cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 12. FOOTER COMPONENT INTEGRATION */}
      <Footer onNavigatePage={(p) => onNavigatePage && onNavigatePage(p)} />
    </div>
  );
}
