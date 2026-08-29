import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import PhoneInput from './components/PhoneInput';

export default function PartnerB2BPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null); // 'partner' | 'demo' | null
  const [activeTab, setActiveTab] = useState('advisors');
  const [openFaq, setOpenFaq] = useState(0);

  // Compact Earning Calculator State
  const [clientsCount, setClientsCount] = useState(25);
  const [avgTicketSize, setAvgTicketSize] = useState(500000); // 5 Lakhs avg client AUM / Loan
  const [productType, setProductType] = useState('mutual_funds');

  // Calculate estimated earnings
  const getCommissionRate = () => {
    switch (productType) {
      case 'mutual_funds': return 0.0085; // 0.85% trail p.a.
      case 'loans': return 0.0125; // 1.25% upfront
      case 'insurance': return 0.15; // 15% first year premium
      case 'tax_wealth': return 0.01; // 1.0% portfolio fee
      default: return 0.01;
    }
  };

  const totalVolume = clientsCount * avgTicketSize;
  const estimatedAnnualEarnings = Math.round(totalVolume * getCommissionRate());
  const estimatedMonthlyEarnings = Math.round(estimatedAnnualEarnings / 12);



  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    partnerType: 'Financial Advisor / IFA',
    notes: ''
  });

  useEffect(() => {
    if (mobileMenuOpen || selectedModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, selectedModal]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendWhatsAppEnquiry({
      formName: `B2B Partner Application (${selectedModal === 'demo' ? 'Book Demo' : 'Become a Partner'})`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      service: formData.partnerType,
      message: formData.notes
    });
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSelectedModal(null);
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        partnerType: 'Financial Advisor / IFA',
        notes: ''
      });
    }, 2500);
  };

  const partnerTypes = [
    {
      id: 'advisors',
      title: 'IFAs & Wealth Advisors',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      desc: 'Expand beyond single-product distribution. Offer loans, health/life insurance, PMS, and tax solutions to existing investor clients seamlessly.',
      benefits: [
        'Complete client portfolio consolidation',
        'Transparent trail & upfront commission structure',
        'White-labeled client reports & mobile app access'
      ]
    },
    {
      id: 'cas',
      title: 'CAs & Tax Consultants',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      desc: 'Monetize client tax advisory relationships by offering integrated tax-saving investments (ELSS, NPS), health insurance, and business loan assistance.',
      benefits: [
        'Automated tax-saving investment workflows',
        'Fast business loan approvals for corporate clients',
        'Dedicated compliance-backed product desk'
      ]
    },
    {
      id: 'dsa',
      title: 'Loan Agents & DSAs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      desc: 'Cross-sell investment and protection products to borrowers while gaining access to 40+ top RBI-regulated banks & NBFC lending partners.',
      benefits: [
        'Multi-bank loan placement with highest payout rates',
        'Cross-sell life & general insurance on loan disbursals',
        'Real-time loan application status tracker'
      ]
    },
    {
      id: 'mfd',
      title: 'Mutual Fund Distributors',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      desc: 'Supercharge your AUM growth with digitized SIP onboarding, paperless transfers, structured products, and LAP financing for HNI clients.',
      benefits: [
        'Zero-fee partner onboarding & zero tech maintenance',
        'Instant digital SIP & lumpsum setup via BSE/NSE Star',
        'Direct relationship manager support for HNI tickets'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Do I retain 100% ownership of my clients?',
      a: 'Yes, absolutely. At Prosperi5, client ownership is legally protected under our Partner Agreement. Your clients remain exclusively your clients forever. We never solicit or cross-sell directly to your clients.'
    },
    {
      q: 'How and when are partner commissions paid out?',
      a: 'Commissions and trail revenue payouts are calculated automatically and disbursed on a strict monthly schedule directly to your registered bank account. You can view itemized payout statements anytime inside your Partner Dashboard.'
    },
    {
      q: 'Do I need multiple licenses to offer Loans, Mutual Funds, and Insurance?',
      a: 'Through the Prosperi5 Partner Ecosystem, you leverage our corporate licenses and regulatory infrastructure, allowing you to seamlessly refer or facilitate multi-product financial solutions without needing separate multi-entity registrations.'
    },
    {
      q: 'Is there any joining fee or monthly platform charge?',
      a: 'No. Partnering with Prosperi5 is 100% free with zero joining fees, zero software licensing fees, and no hidden maintenance charges.'
    },
    {
      q: 'What kind of marketing and tech support will I receive?',
      a: 'You get access to custom co-branded landing pages, digital marketing collaterals, client presentation decks, automated SIP reminders, and a dedicated Relationship Manager (RM) for personalized assistance.'
    }
  ];

  return (
    <div className="w-full bg-white font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">

      {/* 3. COMPACT HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-[#FAF6FC] via-white to-[#F5EEFA] pt-2 lg:pt-3 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden relative border-b border-purple-100/60 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">

          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3 text-left pb-2 lg:pb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200/80 text-[#7C1FA8] text-xs font-bold tracking-wider uppercase w-max shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#7C1FA8] animate-pulse"></span>
              PARTNER WITH PROSPERI5
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold text-[#1E1B2E] tracking-tight leading-[1.15]">
              Grow your business. <br className="hidden sm:inline" />
              <span className="text-[#7C1FA8]">
                Empower your clients.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#4A455A] leading-relaxed max-w-xl font-normal">
              Offer your clients a complete suite of financial solutions powered by ProsperFi and build stronger, long-term relationships while unlocking new revenue streams.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <button
                onClick={() => setSelectedModal('partner')}
                className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-6 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Become Our Partner</span>
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <button
                onClick={() => setSelectedModal('demo')}
                className="bg-white hover:bg-purple-50 text-[#7C1FA8] border-2 border-[#7C1FA8]/30 hover:border-[#7C1FA8] font-bold px-5 py-3 rounded-full text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Schedule a Demo</span>
                <svg className="w-4 h-4 text-[#7C1FA8]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
                </svg>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#666077]">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#00B87C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>50,000+ Active Partners</span>
              </div>
              <span className="text-purple-200 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#00B87C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Payout Accuracy</span>
              </div>
              <span className="text-purple-200 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#00B87C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Zero Platform Fee</span>
              </div>
            </div>
          </div>

          {/* Right Image Column (3D B2B Growth Illustration) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative py-1 lg:py-2">
            <div className="relative max-w-full w-full flex justify-center lg:justify-end items-center">
              <img
                src="/ChatGPT Image Aug 26, 2026, 03_11_20 PM.png"
                alt="Prosperi5 B2B 3D Financial Growth Ecosystem Illustration"
                className="w-auto h-[280px] sm:h-[340px] lg:h-[380px] xl:h-[400px] max-w-full object-contain filter drop-shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* WHY PARTNER WITH PROSPERI5? (6 BENEFIT CARDS GRID) */}
      <section className="pt-4 pb-6 lg:pt-5 lg:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans border-b border-purple-100/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Heading, Subtext & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 text-left">
            <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest">
              WHY PARTNER WITH PROSPERFI?
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E1B2E] tracking-tight leading-[1.2]">
              More value for your clients. <br />
              <span className="text-[#7C1FA8]">
                More growth for your business.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#4A455A] leading-relaxed max-w-lg font-normal">
              With our wide range of financial products, advanced technology and dedicated support – you can focus on what you do best. We'll handle the rest.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setSelectedModal('partner')}
                className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Explore Partnership Benefits</span>
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: 6 Grid Cards (3 cols x 2 rows) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

            {/* Card 1: Wide Range of Products */}
            <div className="group bg-white hover:!bg-[#7C1FA8] hover:!border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-3 cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#7C1FA8] group-hover:!bg-white group-hover:!text-[#7C1FA8] flex items-center justify-center shadow-2xs transition-colors">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-[15px] sm:text-base font-extrabold text-[#1E1B2E] group-hover:!text-white transition-colors tracking-tight">Wide Range of Products</h3>
              <p className="text-xs sm:text-[13px] text-[#4A455A] group-hover:!text-purple-100 transition-colors leading-relaxed font-normal">
                Mutual Funds, Loans, Insurance, Tax Solutions & more.
              </p>
            </div>

            {/* Card 2: High Revenue Potential */}
            <div className="group bg-white hover:!bg-[#7C1FA8] hover:!border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-3 cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 group-hover:!bg-white group-hover:!text-[#7C1FA8] flex items-center justify-center shadow-2xs transition-colors">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-[15px] sm:text-base font-extrabold text-[#1E1B2E] group-hover:!text-white transition-colors tracking-tight">High Revenue Potential</h3>
              <p className="text-xs sm:text-[13px] text-[#4A455A] group-hover:!text-purple-100 transition-colors leading-relaxed font-normal">
                Attractive payouts and performance incentives for partners.
              </p>
            </div>

            {/* Card 3: Dedicated Relationship Manager */}
            <div className="group bg-white hover:!bg-[#7C1FA8] hover:!border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-3 cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 group-hover:!bg-white group-hover:!text-[#7C1FA8] flex items-center justify-center shadow-2xs transition-colors">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-[15px] sm:text-base font-extrabold text-[#1E1B2E] group-hover:!text-white transition-colors tracking-tight">Dedicated Relationship Manager</h3>
              <p className="text-xs sm:text-[13px] text-[#4A455A] group-hover:!text-purple-100 transition-colors leading-relaxed font-normal">
                Personalized support to help you succeed at every step.
              </p>
            </div>

            {/* Card 4: Advanced Technology */}
            <div className="group bg-white hover:!bg-[#7C1FA8] hover:!border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-3 cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 group-hover:!bg-white group-hover:!text-[#7C1FA8] flex items-center justify-center shadow-2xs transition-colors">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-[15px] sm:text-base font-extrabold text-[#1E1B2E] group-hover:!text-white transition-colors tracking-tight">Advanced Technology</h3>
              <p className="text-xs sm:text-[13px] text-[#4A455A] group-hover:!text-purple-100 transition-colors leading-relaxed font-normal">
                Seamless APIs, integrations and digital tools for your business.
              </p>
            </div>

            {/* Card 5: Marketing & Growth Support */}
            <div className="group bg-white hover:!bg-[#7C1FA8] hover:!border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-3 cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#7C1FA8] group-hover:!bg-white group-hover:!text-[#7C1FA8] flex items-center justify-center shadow-2xs transition-colors">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-[15px] sm:text-base font-extrabold text-[#1E1B2E] group-hover:!text-white transition-colors tracking-tight">Marketing & Growth Support</h3>
              <p className="text-xs sm:text-[13px] text-[#4A455A] group-hover:!text-purple-100 transition-colors leading-relaxed font-normal">
                Co-branded resources, campaigns and lead support.
              </p>
            </div>

            {/* Card 6: Trusted Brand */}
            <div className="group bg-white hover:!bg-[#7C1FA8] hover:!border-[#7C1FA8] p-5 sm:p-6 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-3 cursor-pointer hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 group-hover:!bg-white group-hover:!text-[#7C1FA8] flex items-center justify-center shadow-2xs transition-colors">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-[15px] sm:text-base font-extrabold text-[#1E1B2E] group-hover:!text-white transition-colors tracking-tight">Trusted Brand</h3>
              <p className="text-xs sm:text-[13px] text-[#4A455A] group-hover:!text-purple-100 transition-colors leading-relaxed font-normal">
                Partner with India's trusted fintech ecosystem.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* BUILT AROUND YOUR BUSINESS SECTION */}
      <section className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans border-b border-purple-100/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Title, Description, CTA & 3D Growth Illustration */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 text-left h-full">
            <div className="space-y-4">
              <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest">
                BUILT AROUND YOUR BUSINESS
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E1B2E] tracking-tight leading-[1.2]">
                Everything you need to <br className="hidden sm:inline" />
                build a stronger <br />
                <span className="text-[#7C1FA8]">financial business.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#4A455A] leading-relaxed max-w-lg font-normal">
                From technology and onboarding to client engagement and growth, ProsperFi gives partners the infrastructure to scale with confidence.
              </p>

              <div className="pt-1">
                <button
                  onClick={() => setSelectedModal('partner')}
                  className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Explore Partner Solutions</span>
                  <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 3D Partner Growth Graphic */}
            <div className="pt-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all border border-purple-100/80 bg-white">
                <img
                  src="/partner_growth_3d_illustration.png"
                  alt="Everything you need to build a stronger financial business illustration"
                  className="w-full h-auto object-cover max-h-[280px] rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 4 Numbered Horizontal Cards (01, 02, 03, 04) */}
          <div className="lg:col-span-7 space-y-4">

            {/* Step 01: Grow Your Revenue */}
            <div className="group bg-white p-4 sm:p-5 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-md hover:border-purple-200 transition-all cursor-pointer flex items-center gap-4 sm:gap-5">
              <span className="text-2xl sm:text-3xl font-black text-[#7C1FA8] w-10 text-center flex-shrink-0">01</span>
              <div className="h-10 w-px bg-purple-100 flex-shrink-0"></div>
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#7C1FA8] flex items-center justify-center flex-shrink-0 shadow-2xs">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-[#7C1FA8] transition-colors">
                  Grow Your Revenue
                </h3>
                <p className="text-xs sm:text-[13px] text-[#666077] leading-relaxed mt-0.5 font-normal">
                  Create new revenue streams by offering a broader range of financial solutions to your existing clients.
                </p>
              </div>
            </div>

            {/* Step 02: Serve More Clients */}
            <div className="group bg-white p-4 sm:p-5 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-md hover:border-purple-200 transition-all cursor-pointer flex items-center gap-4 sm:gap-5">
              <span className="text-2xl sm:text-3xl font-black text-pink-600 w-10 text-center flex-shrink-0">02</span>
              <div className="h-10 w-px bg-purple-100 flex-shrink-0"></div>
              <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-pink-600 transition-colors">
                  Serve More Clients
                </h3>
                <p className="text-xs sm:text-[13px] text-[#666077] leading-relaxed mt-0.5 font-normal">
                  Give clients a seamless experience across investments, loans, insurance and financial planning.
                </p>
              </div>
            </div>

            {/* Step 03: Simplify Your Operations */}
            <div className="group bg-white p-4 sm:p-5 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-md hover:border-purple-200 transition-all cursor-pointer flex items-center gap-4 sm:gap-5">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 w-10 text-center flex-shrink-0">03</span>
              <div className="h-10 w-px bg-purple-100 flex-shrink-0"></div>
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-amber-600 transition-colors">
                  Simplify Your Operations
                </h3>
                <p className="text-xs sm:text-[13px] text-[#666077] leading-relaxed mt-0.5 font-normal">
                  Access technology, integrations, reporting and workflows designed to reduce operational complexity.
                </p>
              </div>
            </div>

            {/* Step 04: Grow With Expert Support */}
            <div className="group bg-white p-4 sm:p-5 rounded-2xl border border-purple-100/80 shadow-xs hover:shadow-md hover:border-purple-200 transition-all cursor-pointer flex items-center gap-4 sm:gap-5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 w-10 text-center flex-shrink-0">04</span>
              <div className="h-10 w-px bg-purple-100 flex-shrink-0"></div>
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold text-[#1E1B2E] tracking-tight group-hover:text-emerald-600 transition-colors">
                  Grow With Expert Support
                </h3>
                <p className="text-xs sm:text-[13px] text-[#666077] leading-relaxed mt-0.5 font-normal">
                  Get dedicated relationship management, training, marketing resources and ongoing partner support.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION (5-STEP TIMELINE & 4 TRUST HIGHLIGHTS) */}
      <section className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans border-b border-purple-100/60">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#7C1FA8] text-xs font-extrabold uppercase tracking-widest bg-purple-100/80 px-3.5 py-1 rounded-full border border-purple-200/80">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E1B2E] mt-3 tracking-tight leading-[1.2]">
            A simple process to build <span className="text-[#7C1FA8]">a powerful partnership</span>
          </h2>
          <p className="text-sm sm:text-base text-[#666077] mt-2 max-w-2xl mx-auto font-normal">
            From onboarding to growth, we make it easy to partner, integrate, and scale your business with ProsperFi.
          </p>
          <div className="w-12 h-1 bg-[#7C1FA8] rounded-full mx-auto mt-4"></div>
        </div>

        {/* 5-Step Horizontal Flow Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative mb-10 items-start">

          {/* Step 01: Apply */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-[#7C1FA8] flex items-center justify-center shadow-xs group-hover:scale-105 transition-all mb-4 relative z-10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>

            {/* Arrow connecting to step 2 (hidden on mobile) */}
            <div className="hidden lg:flex items-center justify-center absolute top-[22px] left-[62%] w-[76%] pointer-events-none z-0">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            <span className="text-base font-black text-[#7C1FA8]">01</span>
            <h3 className="text-lg font-black text-[#1E1B2E] mt-1 tracking-tight">Apply</h3>
            <p className="text-xs sm:text-[13px] text-[#4A455A] leading-relaxed mt-1 font-medium max-w-[210px]">
              Submit your details and tell us about your business.
            </p>
          </div>

          {/* Step 02: Onboard */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all mb-4 relative z-10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            {/* Arrow connecting to step 3 */}
            <div className="hidden lg:flex items-center justify-center absolute top-[22px] left-[62%] w-[76%] pointer-events-none z-0">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            <span className="text-base font-black text-indigo-700">02</span>
            <h3 className="text-lg font-black text-[#1E1B2E] mt-1 tracking-tight">Onboard</h3>
            <p className="text-xs sm:text-[13px] text-[#4A455A] leading-relaxed mt-1 font-medium max-w-[210px]">
              We'll verify your details and onboard you as our partner.
            </p>
          </div>

          {/* Step 03: Integrate */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-[#7C1FA8] flex items-center justify-center shadow-xs group-hover:scale-105 transition-all mb-4 relative z-10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6M9 14h6" />
              </svg>
            </div>

            {/* Arrow connecting to step 4 */}
            <div className="hidden lg:flex items-center justify-center absolute top-[22px] left-[62%] w-[76%] pointer-events-none z-0">
              <svg className="w-5 h-5 text-[#7C1FA8]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            <span className="text-base font-black text-[#7C1FA8]">03</span>
            <h3 className="text-lg font-black text-[#1E1B2E] mt-1 tracking-tight">Integrate</h3>
            <p className="text-xs sm:text-[13px] text-[#4A455A] leading-relaxed mt-1 font-medium max-w-[210px]">
              Get access to our platform, tools and marketing support.
            </p>
          </div>

          {/* Step 04: Refer & Serve */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all mb-4 relative z-10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
              </svg>
            </div>

            {/* Arrow connecting to step 5 */}
            <div className="hidden lg:flex items-center justify-center absolute top-[22px] left-[62%] w-[76%] pointer-events-none z-0">
              <svg className="w-5 h-5 text-[#7C1FA8]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            <span className="text-base font-black text-pink-600">04</span>
            <h3 className="text-lg font-black text-[#1E1B2E] mt-1 tracking-tight">Refer & Serve</h3>
            <p className="text-xs sm:text-[13px] text-[#4A455A] leading-relaxed mt-1 font-medium max-w-[210px]">
              Start referring your clients and help them achieve their goals.
            </p>
          </div>

          {/* Step 05: Earn & Grow */}
          <div className="flex flex-col items-center text-center relative group">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all mb-4 relative z-10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>

            <span className="text-base font-black text-emerald-600">05</span>
            <h3 className="text-lg font-black text-[#1E1B2E] mt-1 tracking-tight">Earn & Grow</h3>
            <p className="text-xs sm:text-[13px] text-[#4A455A] leading-relaxed mt-1 font-medium max-w-[210px]">
              Earn attractive commissions and grow your business.
            </p>
          </div>

        </div>

        {/* Bottom Full-Width Trust Highlights Banner — deep purple with arrows */}
        <div className="bg-[#7C1FA8] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Highlight 1: Quick Onboarding */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-white leading-tight">Quick Onboarding</h4>
              <p className="text-[11px] text-purple-200 mt-0.5 font-medium leading-tight">Get started in less than 48 hours</p>
            </div>
          </div>

          {/* Arrow 1 */}
          <svg className="hidden sm:block w-4 h-4 text-white/50 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Highlight 2: Dedicated Support */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-white leading-tight">Dedicated Support</h4>
              <p className="text-[11px] text-purple-200 mt-0.5 font-medium leading-tight">Your success team is always there for you</p>
            </div>
          </div>

          {/* Arrow 2 */}
          <svg className="hidden sm:block w-4 h-4 text-white/50 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Highlight 3: Secure & Compliant */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-white leading-tight">Secure & Compliant</h4>
              <p className="text-[11px] text-purple-200 mt-0.5 font-medium leading-tight">Bank-grade security and compliance</p>
            </div>
          </div>

          {/* Arrow 3 */}
          <svg className="hidden sm:block w-4 h-4 text-white/50 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>

          {/* Highlight 4: Scalable Growth */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-white leading-tight">Scalable Growth</h4>
              <p className="text-[11px] text-purple-200 mt-0.5 font-medium leading-tight">Unlimited opportunities to expand and grow</p>
            </div>
          </div>

        </div>

      </section>



      {/* 11. LEAD CAPTURE / DEMO MODAL */}
      {selectedModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div
            className="bg-white bg-cover bg-center rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-purple-100/80 my-8 overflow-hidden"
            style={{ backgroundImage: `url("/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png")` }}
          >
            {/* Translucent overlay for clean text & input legibility */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <button
                onClick={() => setSelectedModal(null)}
                className="absolute top-0 right-0 w-8 h-8 rounded-full bg-purple-50/90 text-[#7C1FA8] flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-purple-100 z-20"
              >
                ✕
              </button>

              {formSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-[#1E1B2E]">Thank You!</h3>
                  <p className="text-xs text-[#666077]">
                    Your request has been submitted successfully. A Prosperi5 Partner Specialist will call you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="text-center pb-2">
                    <span className="text-xs font-black text-[#7C1FA8] uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-200 inline-block">
                      {selectedModal === 'demo' ? 'SCHEDULE A LIVE DEMO' : 'PARTNER REGISTRATION'}
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#1E1B2E] mt-2">
                      {selectedModal === 'demo' ? 'Book a Partner Platform Demo' : 'Partner with Prosperi5'}
                    </h3>
                    <p className="text-sm text-[#666077] mt-1 font-medium">
                      Fill out your details to connect with a partner manager.
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-extrabold text-[#1E1B2E] block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-purple-200/90 bg-white/95 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-extrabold text-[#1E1B2E] block mb-1.5">Mobile Number *</label>
                      <PhoneInput
                        value={formData.phone}
                        countryCode={formData.countryCode}
                        onCountryCodeChange={(code) => setFormData((f) => ({ ...f, countryCode: code }))}
                        onChange={(val) => setFormData((f) => ({ ...f, phone: val }))}
                        placeholder="Enter mobile number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-extrabold text-[#1E1B2E] block mb-1.5">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-purple-200/90 bg-white/95 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-extrabold text-[#1E1B2E] block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-purple-200/90 bg-white/95 text-sm font-medium text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-extrabold text-[#1E1B2E] block mb-1.5">Partner Type</label>
                    <select
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-purple-200/90 bg-white/95 text-sm font-medium text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all shadow-2xs"
                    >
                      <option>Financial Advisor / IFA</option>
                      <option>CA / Tax Consultant</option>
                      <option>Mutual Fund Distributor (MFD)</option>
                      <option>DSA / Loan Agent</option>
                      <option>Wealth Manager / PMS Consultant</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer mt-2"
                  >
                    Submit Request
                  </button>

                  <p className="text-[10px] text-center text-[#888] pt-1">
                    🔒 We respect your privacy. Zero spam guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
