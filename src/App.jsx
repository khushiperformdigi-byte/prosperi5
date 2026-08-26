import React, { useState, useEffect, useRef } from 'react';
import InvestmentPage from './InvestmentPage';
import InsurancePage from './InsurancePage';
import FinancingPage from './FinancingPage';
import AboutPage from './AboutPage';
import InvestorsPage from './InvestorsPage';
import ProtectPage from './ProtectPage';
import BorrowPage from './BorrowPage';
import LoanPage from './LoanPage';
import GrowPage from './GrowPage';
import KnowledgeCenterPage from './KnowledgeCenterPage';
import PartnerB2BPage from './PartnerB2BPage';
import PersonalFinancePage from './PersonalFinancePage';
import TaxSolutionsPage from './TaxSolutionsPage';
import MarketInsightsPage from './MarketInsightsPage';
import ToolsPage from './ToolsPage';
import SipCalculatorPage from './SipCalculatorPage';
import EmiCalculatorPage from './EmiCalculatorPage';
import TermInsuranceCalculatorPage from './TermInsuranceCalculatorPage';
import LoanAgainstSecuritiesPage from './LoanAgainstSecuritiesPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import TermsAndConditionsPage from './TermsAndConditionsPage';
import BlogPage from './BlogPage';
import BlogDetailPage from './BlogDetailPage';
import CareersPage from './CareersPage';
import Footer from './Footer';

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    if (['protect', 'investment', 'insurance', 'financing', 'investors', 'about', 'borrow', 'loan', 'loans', 'grow', 'knowledge', 'partner', 'partner-b2b', 'personal-finance', 'personalfinance', 'finance', 'tax', 'tax-solutions', 'taxsolutions', 'insights', 'market-insights', 'marketinsights', 'market', 'tools', 'blog', 'blogs', 'blog-detail', 'careers', 'career', 'sip-calculator', 'emi-calculator', 'term-insurance-calculator', 'loan-against-securities', 'las-calculator', 'privacy-policy', 'privacy', 'terms-and-conditions', 'terms'].includes(hash)) {
      if (hash === 'las-calculator') return 'loan-against-securities';
      if (hash === 'privacy') return 'privacy-policy';
      if (hash === 'terms') return 'terms-and-conditions';
      if (hash === 'blogs') return 'blog';
      if (hash === 'career') return 'careers';
      if (hash === 'loans') return 'loan';
      if (hash === 'partner-b2b') return 'partner';
      if (hash === 'personalfinance' || hash === 'finance') return 'personal-finance';
      if (hash === 'taxsolutions' || hash === 'tax-solutions') return 'tax';
      if (hash === 'market-insights' || hash === 'marketinsights' || hash === 'market') return 'insights';
      return hash;
    }
    return sessionStorage.getItem('prosperi_page') || 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleNavigatePage = (page, extraId = null) => {
    if (extraId) {
      setSelectedArticleId(extraId);
    }
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['protect', 'investment', 'insurance', 'financing', 'investors', 'about', 'borrow', 'loan', 'loans', 'grow', 'knowledge', 'partner', 'partner-b2b', 'personal-finance', 'personalfinance', 'finance', 'tax', 'tax-solutions', 'taxsolutions', 'insights', 'market-insights', 'marketinsights', 'market', 'tools', 'blog', 'blogs', 'blog-detail', 'careers', 'career', 'sip-calculator', 'emi-calculator', 'term-insurance-calculator', 'loan-against-securities', 'las-calculator', 'privacy-policy', 'privacy', 'terms-and-conditions', 'terms', 'home'].includes(hash)) {
        if (hash === 'las-calculator') {
          setCurrentPage('loan-against-securities');
        } else if (hash === 'privacy') {
          setCurrentPage('privacy-policy');
        } else if (hash === 'terms') {
          setCurrentPage('terms-and-conditions');
        } else if (hash === 'blogs') {
          setCurrentPage('blog');
        } else if (hash === 'career') {
          setCurrentPage('careers');
        } else if (hash === 'loans') {
          setCurrentPage('loan');
        } else if (hash === 'partner-b2b') {
          setCurrentPage('partner');
        } else if (hash === 'personalfinance' || hash === 'finance') {
          setCurrentPage('personal-finance');
        } else if (hash === 'taxsolutions' || hash === 'tax-solutions') {
          setCurrentPage('tax');
        } else if (hash === 'market-insights' || hash === 'marketinsights' || hash === 'market') {
          setCurrentPage('insights');
        } else {
          setCurrentPage(hash);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const [activeTab, setActiveTab] = useState('partners');
  const [hoveredPartnerCard, setHoveredPartnerCard] = useState(null);
  const [hoveredReason, setHoveredReason] = useState(0);
  const [activeStep, setActiveStep] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [howItWorksVisible, setHowItWorksVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [activeMobileStep, setActiveMobileStep] = useState(0);
  const [partnerCtaClicked, setPartnerCtaClicked] = useState(false);
  const testimonialCarouselRef = useRef(null);
  const mobileStepCarouselRef = useRef(null);

  const handleMobileStepClick = (index) => {
    setActiveMobileStep(index);
    if (mobileStepCarouselRef.current) {
      const cardWidth = 254; // 240px + 14px gap
      mobileStepCarouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleMobileStepScroll = () => {
    if (!mobileStepCarouselRef.current) return;
    const scrollLeft = mobileStepCarouselRef.current.scrollLeft;
    const cardWidth = 254;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex <= 4 && newIndex !== activeMobileStep) {
      setActiveMobileStep(newIndex);
    }
  };

  const handleTestimonialScroll = (direction) => {
    if (!testimonialCarouselRef.current) return;
    const cardWidth = 296; // 280px + 16px gap
    const newIndex = direction === 'next'
      ? Math.min(activeTestimonialIndex + 1, 3)
      : Math.max(activeTestimonialIndex - 1, 0);

    setActiveTestimonialIndex(newIndex);
    testimonialCarouselRef.current.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Persist active page across refreshes
  useEffect(() => {
    sessionStorage.setItem('prosperi_page', currentPage);
  }, [currentPage]);
  const reasonsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const ringSectionRef = useRef(null);
  const ringImgRef = useRef(null);
  const mobilePartnerCardsRef = useRef(null);
  const [mobilePartnerCardsVisible, setMobilePartnerCardsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setMobilePartnerCardsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (mobilePartnerCardsRef.current) {
      observer.observe(mobilePartnerCardsRef.current);
    }
    return () => {
      if (mobilePartnerCardsRef.current) {
        observer.unobserve(mobilePartnerCardsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.05 }
    );
    if (reasonsRef.current) {
      observer.observe(reasonsRef.current);
    }
    return () => {
      if (reasonsRef.current) {
        observer.unobserve(reasonsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHowItWorksVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current);
    }
    return () => {
      if (howItWorksRef.current) {
        observer.unobserve(howItWorksRef.current);
      }
    };
  }, []);

  const navigateToPage = (p) => {
    window.location.hash = p;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'protect') {
    return <ProtectPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'investment') {
    return <InvestmentPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'insurance') {
    return <InsurancePage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'financing') {
    return <FinancingPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'investors') {
    return <InvestorsPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'about') {
    return <AboutPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'loan' || currentPage === 'loans') {
    return <LoanPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'borrow') {
    return <BorrowPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'grow') {
    return <GrowPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'knowledge') {
    return <KnowledgeCenterPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'partner' || currentPage === 'partner-b2b') {
    return <PartnerB2BPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'personal-finance' || currentPage === 'personalfinance' || currentPage === 'finance') {
    return <PersonalFinancePage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'tax' || currentPage === 'tax-solutions' || currentPage === 'taxsolutions') {
    return <TaxSolutionsPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'insights' || currentPage === 'market-insights' || currentPage === 'marketinsights' || currentPage === 'market') {
    return <MarketInsightsPage onNavigateHome={() => navigateToPage('home')} onNavigatePage={(p) => navigateToPage(p)} />;
  }

  if (currentPage === 'tools') {
    return <ToolsPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={(p) => setCurrentPage(p)} />;
  }

  if (currentPage === 'sip-calculator') {
    return <SipCalculatorPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={(p) => setCurrentPage(p)} />;
  }

  if (currentPage === 'emi-calculator') {
    return <EmiCalculatorPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={(p) => setCurrentPage(p)} />;
  }

  if (currentPage === 'term-insurance-calculator') {
    return <TermInsuranceCalculatorPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={(p) => setCurrentPage(p)} />;
  }

  if (currentPage === 'loan-against-securities' || currentPage === 'las-calculator') {
    return <LoanAgainstSecuritiesPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={(p) => setCurrentPage(p)} />;
  }

  if (currentPage === 'privacy-policy' || currentPage === 'privacy') {
    return <PrivacyPolicyPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={(p) => setCurrentPage(p)} />;
  }

  if (currentPage === 'terms-and-conditions' || currentPage === 'terms') {
    return <TermsAndConditionsPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={(p) => setCurrentPage(p)} />;
  }

  if (currentPage === 'blog' || currentPage === 'blogs') {
    return <BlogPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={handleNavigatePage} />;
  }

  if (currentPage === 'blog-detail') {
    return <BlogDetailPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={handleNavigatePage} articleId={selectedArticleId} />;
  }

  if (currentPage === 'careers' || currentPage === 'career') {
    return <CareersPage onNavigateHome={() => setCurrentPage('home')} onNavigatePage={handleNavigatePage} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-body-text antialiased selection:bg-purple-100 selection:text-primary-purple overflow-x-hidden">

      {/* 1. RECONSTRUCTED TOP CONTACT UTILITY BAR - CYLINDER SHAPE (DESKTOP ONLY) */}
      <div className="hidden sm:block bg-[#11081F] w-full py-2 px-4 sm:px-6 select-none relative z-20 font-sans">
        <div className="max-w-[1500px] mx-auto bg-[#1A102B]/90 backdrop-blur-md border border-white/15 rounded-full px-5 sm:px-6 py-1.5 flex justify-between items-center text-xs md:text-sm text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center text-muted-text">
              {/* Orange/gold node icon */}
              <div className="w-5 h-5 rounded-full bg-accent-gold/15 flex items-center justify-center text-accent-gold">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                </svg>
              </div>
              <span className="font-medium text-[#EBE8EF]/80 text-xs">Investments - Insurance · Financing</span>
            </div>
            <span className="text-[#EBE8EF]/20 hidden sm:inline">|</span>
            <span className="border border-white/10 text-accent-gold bg-white/5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider hidden sm:inline-block">
              All through one trusted relationship
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="bg-accent-gold hover:bg-[#D49300] text-heading-ink font-bold px-4 py-1.5 rounded-full text-[10px] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M2.25 6.622c0-1.077.873-1.95 1.95-1.95h2.25c.877 0 1.63.585 1.85 1.432l.711 2.766c.2.783-.062 1.615-.67 2.115l-1.56 1.287a15.776 15.776 0 0 0 6.6 6.6l1.287-1.56c.5-.608 1.332-.87 2.115-.67l2.766.711c.847.22 1.432.973 1.432 1.85v2.25c0 1.077-.873 1.95-1.95 1.95h-2.25a16.5 16.5 0 0 1-16.5-16.5v-2.25Z" />
              </svg>
              Talk to an Expert
            </button>

            <div className="flex items-center gap-3 sm:gap-4 text-[#EBE8EF]/80 text-xs">
              <span className="text-[#EBE8EF]/20">|</span>
              <a href="#partner-login" className="hover:text-white transition-colors flex items-center gap-1 font-medium">
                <svg className="w-3.5 h-3.5 text-muted-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Partner Login
              </a>
              <span className="text-[#EBE8EF]/20">|</span>
              <a href="#investor-login" className="hover:text-white transition-colors flex items-center gap-1 font-medium">
                <svg className="w-3.5 h-3.5 text-muted-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Investor Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RECONSTRUCTED FLOATING NAVBAR & MOBILE MENU OVERLAY */}
      <nav className={`sticky top-0 lg:top-2 max-w-7xl mx-auto px-0 lg:px-4 relative font-sans transition-all ${mobileMenuOpen ? 'z-[9999]' : 'z-50'}`}>
        <div className="bg-white/95 backdrop-blur-md rounded-none lg:rounded-[24px] border-b border-purple-100/60 lg:border lg:border-brand-border shadow-sm lg:shadow-[0_12px_40px_rgba(30,27,46,0.08)] h-[72px] lg:h-[56px] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all relative overflow-visible">

          {/* Top gradient border line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-purple via-accent-pink to-accent-gold rounded-t-full"></div>

          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <img
              src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png"
              className="w-[128px] h-[40px] lg:w-auto lg:h-[32px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              alt="PROSPERi5 Logo"
            />
          </div>

          {/* Links - Desktop */}
          <div className="hidden lg:flex items-center justify-center gap-x-6 font-medium text-heading-ink text-sm px-6 flex-1">
            <a href="#home" onClick={() => setCurrentPage('home')} className="whitespace-nowrap text-heading-ink relative py-1 font-semibold after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-accent-pink after:rounded-full">Home</a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('about');
              }}
              className="whitespace-nowrap hover:text-primary-purple transition-colors py-1 font-semibold cursor-pointer"
            >
              About Us
            </a>

            {/* SOLUTIONS DROPDOWN - WHITE WEBSITE THEME */}
            <div className="relative group py-1">
              <button className="whitespace-nowrap hover:text-primary-purple transition-colors flex items-center gap-1 font-semibold cursor-pointer py-1">
                Solutions
                <svg className="w-3.5 h-3.5 text-heading-ink/80 group-hover:text-primary-purple transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:flex flex-col bg-white/98 backdrop-blur-md border border-[#EBE8EF] rounded-[22px] p-3 shadow-[0_15px_40px_rgba(30,27,46,0.12)] w-[285px] space-y-1.5 animate-in fade-in slide-in-from-top-2 z-[9999] overflow-hidden">
                {/* Top accent gradient line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-purple via-accent-pink to-accent-gold"></div>

                {/* Option 0: Grow Page */}
                <button
                  onClick={() => setCurrentPage('grow')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7C1FAB] text-white flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 transition-all">
                    🌱
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#7C1FAB] transition-colors block">Grow</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">SIP, Mutual Funds & Wealth Growth</span>
                  </div>
                </button>

                {/* Option 0.5: Protect Page */}
                <button
                  onClick={() => setCurrentPage('protect')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#7C1FAB] text-white flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 transition-all">
                    🛡️
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#7C1FAB] transition-colors block">Protect</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Health, Life & Property Security</span>
                  </div>
                </button>

                {/* Option 1: Investment Page */}
                <button
                  onClick={() => setCurrentPage('investment')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-surface border border-purple-200 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 group-hover/item:bg-[#7C1FAB] group-hover/item:text-white transition-all">
                    📈
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#7C1FAB] transition-colors block">Investment</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">SIP, Mutual Funds, Stocks</span>
                  </div>
                </button>

                {/* Option 2: Insurance Page */}
                <button
                  onClick={() => setCurrentPage('insurance')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-surface border border-pink-200 text-[#C81E8C] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 group-hover/item:bg-[#C81E8C] group-hover/item:text-white transition-all">
                    🛡️
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#C81E8C] transition-colors block">Insurance</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Health, Life, Motor & Property</span>
                  </div>
                </button>

                {/* Option 3: Financing Page */}
                <button
                  onClick={() => setCurrentPage('financing')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFF4DE] border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 group-hover/item:bg-[#F5A623] group-hover/item:text-white transition-all">
                    💰
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#D49300] transition-colors block">Financing</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Business Loans, LAP & Capital</span>
                  </div>
                </button>

                {/* Option 4: Borrow Page */}
                <button
                  onClick={() => navigateToPage('borrow')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-surface border border-purple-200 text-[#7C1FA8] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 group-hover/item:bg-[#7C1FA8] group-hover/item:text-white transition-all">
                    💸
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#7C1FA8] transition-colors block">Borrow</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Instant Loans, Micro Credit & LAP</span>
                  </div>
                </button>

                {/* Option 5: Tools Page */}
                <button 
                  onClick={() => navigateToPage('tools')}
                  className="flex items-center gap-3.5 p-3 rounded-[16px] hover:bg-purple-surface/80 border border-transparent hover:border-purple-200 text-left transition-all cursor-pointer group/item shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5FD] border border-purple-200 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0 group-hover/item:scale-110 group-hover/item:bg-[#7C1FAB] group-hover/item:text-white transition-all">
                    🧮
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1E1B2E] group-hover/item:text-[#7C1FAB] transition-colors block">Smart Tools</span>
                    <span className="text-[11px] text-[#8E8A9D] block font-medium">Calculators & Future Planning</span>
                  </div>
                </button>
              </div>
            </div>

            <button 
              onClick={() => navigateToPage('tools')} 
              className="whitespace-nowrap hover:text-primary-purple transition-colors py-1 font-semibold cursor-pointer"
            >
              Tools
            </button>

            <button 
              onClick={() => navigateToPage('blog')} 
              className="whitespace-nowrap hover:text-primary-purple transition-colors py-1 font-semibold cursor-pointer"
            >
              Blog
            </button>

            <a href="#why-us" className="whitespace-nowrap hover:text-primary-purple transition-colors py-1">Why Us</a>
            <a href="#how-it-works" className="whitespace-nowrap hover:text-primary-purple transition-colors py-1">How It Works</a>
            <a href="#faqs" className="whitespace-nowrap hover:text-primary-purple transition-colors py-1">FAQs</a>
          </div>

          {/* Nav Right (Toggles & Action Buttons) - Desktop Only */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Explore as Switch */}
            <div className="flex items-center gap-2">
              <span className="text-muted-text font-semibold text-xs whitespace-nowrap">Explore as</span>
              <div className="bg-purple-surface/50 rounded-[14px] p-1 border border-brand-border flex items-center text-[11px]">
                <button
                  onClick={() => {
                    setActiveTab('partners');
                    setCurrentPage('home');
                  }}
                  className={`px-3.5 py-1.5 rounded-[10px] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'partners' ? 'bg-pink-surface text-accent-pink shadow-sm' : 'text-muted-text hover:text-heading-ink'}`}
                >
                  {activeTab === 'partners' && <span className="w-1.5 h-1.5 rounded-full bg-accent-pink"></span>}
                  For Partners
                </button>
                <button
                  onClick={() => {
                    setActiveTab('investors');
                    setCurrentPage('investors');
                  }}
                  className={`px-3.5 py-1.5 rounded-[10px] font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'investors' ? 'bg-purple-surface text-primary-purple shadow-sm' : 'text-muted-text hover:text-heading-ink'}`}
                >
                  {activeTab === 'investors' && <span className="w-1.5 h-1.5 rounded-full bg-primary-purple"></span>}
                  For Investors
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2">
              <a href="#login" className="border border-brand-border hover:border-primary-purple text-primary-purple hover:bg-purple-surface/30 px-5 py-1.5 rounded-[14px] font-bold text-sm transition-all duration-300 flex items-center justify-center h-[38px] whitespace-nowrap">
                Login
              </a>
              <a href="#signup" className="bg-primary-purple hover:bg-deep-purple text-white font-bold text-sm px-5 py-1.5 rounded-[14px] shadow-md shadow-purple-100 transition-all flex items-center gap-1 hover:translate-x-0.5 duration-200 h-[38px] whitespace-nowrap">
                Signup
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        <div className={`fixed inset-0 bg-[#FAF6FC] z-[100] p-4 sm:p-6 overflow-y-auto lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
          <div className="max-w-[350px] mx-auto flex flex-col gap-3 font-sans pb-6">

            {/* Drawer Top Header (Logo + Close X) */}
            <div className="flex items-center justify-between pb-2">
              <img
                src="/1a2e5a0b7dae37d97f8bf79f055a6ca0cf33d8b9.png"
                className="w-[128px] h-[40px] object-contain"
                alt="PROSPERi5 Logo"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-[#F5EEFA] text-[#5E1083] flex items-center justify-center transition-all cursor-pointer hover:bg-purple-100 active:scale-95"
              >
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 7 Numbered Mobile Nav Cards (Hover background: #7C1FA8, hover text: white/gold) */}
            <div className="flex flex-col gap-3.5 mt-1">

              {/* 01 Home (Height: 58px, Rounded: 16px) */}
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-[58px] bg-white hover:bg-[#7C1FA8] text-[#1E1B2E] hover:text-white rounded-[16px] border border-[#EBE3F5] hover:border-[#7C1FA8] px-5 flex items-center gap-4 shadow-sm transition-all duration-200 active:scale-[0.99] shrink-0 group cursor-pointer"
              >
                <span className="text-[#7C1FAB] group-hover:text-[#F5A623] font-extrabold text-sm sm:text-base font-display transition-colors">01</span>
                <span className="font-bold text-sm sm:text-[15px] text-[#1E1B2E] group-hover:text-white transition-colors">Home</span>
              </a>

              {/* 02 About Us */}
              <button
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('about'); }}
                className="w-full h-[58px] bg-white hover:bg-[#7C1FA8] text-[#1E1B2E] hover:text-white rounded-[16px] border border-[#EBE3F5] hover:border-[#7C1FA8] px-5 flex items-center gap-4 shadow-sm transition-all duration-200 active:scale-[0.99] shrink-0 group cursor-pointer"
              >
                <span className="text-[#7C1FAB] group-hover:text-[#F5A623] font-extrabold text-sm sm:text-base font-display transition-colors">02</span>
                <span className="font-bold text-sm sm:text-[15px] text-[#1E1B2E] group-hover:text-white transition-colors">About Us</span>
              </button>

              {/* 03 Tools */}
              <button
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('tools'); }}
                className="w-full h-[58px] bg-white hover:bg-[#7C1FA8] text-[#1E1B2E] hover:text-white rounded-[16px] border border-[#EBE3F5] hover:border-[#7C1FA8] px-5 flex items-center gap-4 shadow-sm transition-all duration-200 active:scale-[0.99] shrink-0 group cursor-pointer"
              >
                <span className="text-[#7C1FAB] group-hover:text-[#F5A623] font-extrabold text-sm sm:text-base font-display transition-colors">03</span>
                <span className="font-bold text-sm sm:text-[15px] text-[#1E1B2E] group-hover:text-white transition-colors">Tools & Calculators</span>
              </button>

              {/* 04 Blog */}
              <button
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('blog'); }}
                className="w-full h-[58px] bg-white hover:bg-[#7C1FA8] text-[#1E1B2E] hover:text-white rounded-[16px] border border-[#EBE3F5] hover:border-[#7C1FA8] px-5 flex items-center gap-4 shadow-sm transition-all duration-200 active:scale-[0.99] shrink-0 group cursor-pointer"
              >
                <span className="text-[#7C1FAB] group-hover:text-[#F5A623] font-extrabold text-sm sm:text-base font-display transition-colors">04</span>
                <span className="font-bold text-sm sm:text-[15px] text-[#1E1B2E] group-hover:text-white transition-colors">Blog & Insights</span>
              </button>

              {/* 05 Investors */}
              <button
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('investors'); }}
                className="w-full h-[58px] bg-white hover:bg-[#7C1FA8] text-[#1E1B2E] hover:text-white rounded-[16px] border border-[#EBE3F5] hover:border-[#7C1FA8] px-5 flex items-center gap-4 shadow-sm transition-all duration-200 active:scale-[0.99] shrink-0 group cursor-pointer"
              >
                <span className="text-[#7C1FAB] group-hover:text-[#F5A623] font-extrabold text-sm sm:text-base font-display transition-colors">05</span>
                <span className="font-bold text-sm sm:text-[15px] text-[#1E1B2E] group-hover:text-white transition-colors">Investors</span>
              </button>

              {/* 03 Who We Serve (Height: 68px, Border: 1px, Rounded: 16px) */}
              <a
                href="#who-we-serve"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-[68px] bg-white hover:bg-[#7C1FA8] text-[#1E1B2E] hover:text-white rounded-[16px] border border-[#EBE3F5] hover:border-[#7C1FA8] px-5 flex items-center gap-4 shadow-sm transition-all duration-200 active:scale-[0.99] shrink-0 group cursor-pointer"
              >
                <span className="text-[#7C1FAB] group-hover:text-[#F5A623] font-extrabold text-sm sm:text-base font-display transition-colors">03</span>
                <div className="flex flex-col">
                  <h4 className="font-bold text-sm text-[#1E1B2E] group-hover:text-white leading-tight transition-colors">Who We Serve</h4>
                  <p className="text-[11px] text-[#8E8A9D] group-hover:text-white/80 font-medium mt-0.5 transition-colors">Investor and partner journeys</p>
                </div>
              </a>

              {/* 04 Solutions (Height: 68px, Border: 1px, Rounded: 16px) */}
              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-[68px] bg-white hover:bg-[#7C1FA8] text-[#1E1B2E] hover:text-white rounded-[16px] border border-[#EBE3F5] hover:border-[#7C1FA8] px-5 flex items-center gap-4 shadow-sm transition-all duration-200 active:scale-[0.99] shrink-0 group cursor-pointer"
              >
                <span className="text-[#7C1FAB] group-hover:text-[#F5A623] font-extrabold text-sm sm:text-base font-display transition-colors">04</span>
                <div className="flex flex-col">
                  <h4 className="font-bold text-sm text-[#1E1B2E] group-hover:text-white leading-tight transition-colors">Solutions</h4>
                  <p className="text-[11px] text-[#8E8A9D] group-hover:text-white/80 font-medium mt-0.5 transition-colors">Investments · Insurance · Financing</p>
                </div>
              </a>



            </div>


            {/* Bottom Dark CTA Card */}
            <div className="bg-[#180A29] text-white rounded-[22px] p-4 sm:p-5 border border-white/10 shadow-xl mt-6 flex flex-col">
              <span className="text-[#F5A623] text-[10px] font-extrabold uppercase tracking-wider font-sans mb-1">
                READY TO BEGIN?
              </span>
              <h3 className="text-white font-bold text-sm sm:text-[15px] leading-snug font-sans">
                Choose your next financial journey.
              </h3>
              <div className="flex items-center gap-2.5 mt-4">
                <a
                  href="#signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#7C1FAB] hover:bg-[#6b1991] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center justify-center gap-1.5 flex-1 shadow-sm transition-all"
                >
                  <span>Talk To an Expert</span>
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  href="#login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-white hover:bg-gray-100 text-[#5E1083] text-xs font-bold px-5 py-2.5 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all"
                >
                  Login
                </a>
              </div>
            </div>

            {/* Bottom Tagline */}
            <p className="text-[#7C1FAB] text-[10px] font-extrabold tracking-widest text-center mt-2 uppercase font-sans">
              INVESTMENTS · INSURANCE · FINANCING
            </p>

          </div>
        </div>
      </nav>

      {/* 3. HERO CONTAINER */}
      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-6 lg:pt-8 pb-4 lg:pb-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start z-10 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Hero Main Heading: Plus Jakarta Sans, 600 SemiBold, 36px / 44px, tracking -5%, text-center */}
            <h1 className="font-sans text-[36px] leading-[44px] lg:text-[48px] lg:leading-[54px] font-semibold text-heading-ink text-center lg:text-left tracking-[-0.05em] max-w-[640px]">
              The Multi-Asset Wealth Management<br className="hidden lg:block" /> Platform for Every Partner
            </h1>

            {/* Underline Split Divider - Mobile Only (Width: 280px, Height: 3px) */}
            <div className="flex items-center justify-center gap-2.5 w-[280px] h-[3px] mt-3.5 mx-auto lg:hidden">
              <div className="w-[210px] h-full bg-[#C81E8C] rounded-full"></div>
              <div className="w-[60px] h-full bg-[#F5A623] rounded-full"></div>
            </div>

            {/* Accent Line - Desktop Only (Width: 284px, Height: 3px, Gap: 4px) */}
            <div className="hidden lg:flex items-center gap-[4px] w-[284px] h-[3px] mt-3.5">
              <div className="w-[213px] h-full bg-[#C81E8C] rounded-full"></div>
              <div className="w-[67px] h-full bg-[#F5A623] rounded-full"></div>
            </div>

            {/* Hero Subtitle: Inter, 500 Medium, 16px, tracking -0.5px, text-center */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[16px] leading-[24px] tracking-[-0.5px] text-[#544F66] mt-3 text-left lg:block hidden max-w-[620px]"
            >
              Join the financial advisors increasing their revenue by offering wealth solution
              <br />through investment, insurance, and financing solutions to their clients.
            </p>

            {/* Hero Subtitle: Mobile Version (centered, Inter 500 Medium 16px -0.5px tracking, mt-2.5) */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[16px] leading-[24px] tracking-[-0.5px] text-[#544F66] mt-2.5 text-center max-w-[560px] lg:hidden block"
            >
              Join the financial advisors increasing their revenue by offering wealth solution through investment, insurance, and financing solutions to their clients.
            </p>

            {/* Desktop CTA BUTTONS ROW */}
            <div className="hidden lg:flex items-center w-[387px] h-[52px] gap-[14px] mt-6 select-none">
              <button onClick={() => setSelectedModal(true)} className="flex-1 h-full bg-primary-purple hover:bg-deep-purple text-white font-semibold rounded-xl shadow-lg shadow-purple-100 hover:shadow-purple-200 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 duration-200 cursor-pointer text-sm">
                Start Growing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button className="flex-1 h-full border border-primary-purple hover:border-deep-purple text-primary-purple hover:bg-purple-surface/30 font-semibold rounded-xl bg-white transition-all cursor-pointer text-sm flex items-center justify-center gap-2">
                Explore PROSPERi5
              </button>
            </div>

            {/* Mobile CTA BUTTONS STACK (Width: 197px, Height: 52px, Rounded: 500px pill) */}
            <div className="flex lg:hidden flex-col items-center gap-3.5 mt-6 select-none mx-auto">
              {/* Button 1: Start Growing ↗ */}
              <button onClick={() => setSelectedModal(true)} className="w-[197px] h-[52px] bg-primary-purple hover:bg-deep-purple text-white font-bold rounded-full shadow-md shadow-purple-100 hover:shadow-purple-200 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 duration-200 cursor-pointer text-sm">
                <span>Start Growing</span>
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>

              {/* Button 2: Explore PROSPERi5 → */}
              <button className="w-[197px] h-[52px] border-[1.5px] border-primary-purple text-primary-purple hover:bg-purple-surface/30 font-bold rounded-full bg-white transition-all cursor-pointer text-sm flex items-center justify-center gap-2">
                <span>Explore PROSPERi5</span>
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Desktop Value bullets (Left-aligned with separating dots) */}
            <div className="hidden lg:flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 text-sm font-semibold text-heading-ink w-full">
              <div className="flex items-center gap-1">
                <span className="text-primary-purple text-base font-bold">✓</span>
                <span>Trusted guidance</span>
              </div>
              <span className="text-[#EBE8EF]">•</span>
              <div className="flex items-center gap-1">
                <span className="text-primary-purple text-base font-bold">✓</span>
                <span>Complete solutions</span>
              </div>
              <span className="text-[#EBE8EF]">•</span>
              <div className="flex items-center gap-1">
                <span className="text-primary-purple text-base font-bold">✓</span>
                <span>Long-term relationships</span>
              </div>
            </div>

            {/* Store badges: Width 250px, Height 40px, Gap 10px on mobile */}
            <div className="flex items-center gap-[10px] mt-4 justify-center lg:justify-start w-full sm:w-auto">
              <img
                src="/app-badges.png"
                className="w-[250px] h-[40px] lg:w-auto lg:h-[42px] object-contain cursor-pointer hover:opacity-90 transition-opacity"
                alt="App Store Badges"
              />
            </div>

          </div>

          {/* RIGHT HERO VISUAL (Width: 383px, Height: 320px on mobile) */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end w-full pt-0 lg:pt-0 select-none overflow-visible z-10">
            <div className="relative w-full flex justify-center lg:justify-end">
              <img
                src="/Right Side.png"
                className="w-[383px] h-[320px] max-w-full lg:w-full lg:h-auto lg:max-w-[680px] object-contain select-none pointer-events-none"
                alt="PROSPERi5 Advisor Growth Ecosystem"
              />
            </div>
          </div>

          {/* Mobile Value bullets (Shifted UP with -mt-3.5 and bottom gap mb-2) */}
          <div
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="flex lg:hidden flex-nowrap items-center justify-center gap-x-2.5 sm:gap-x-3 -mt-3.5 mb-2 text-[10px] sm:text-[11px] font-medium text-[#1E1B2E] tracking-[0.002em] w-full max-w-[360px] mx-auto whitespace-nowrap"
          >
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-primary-purple text-xs font-bold">✓</span>
              <span>Trusted guidance</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-primary-purple text-xs font-bold">✓</span>
              <span>Complete solutions</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-primary-purple text-xs font-bold">✓</span>
              <span>Long-term relationships</span>
            </div>
          </div>

        </div>
      </main>

      {/* 4. PARTNER VALUE AT A GLANCE SECTION - DESKTOP ONLY */}
      <section
        style={{
          backgroundImage: "url('/partner-value-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        className="hidden md:block w-full py-6 lg:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none border-t border-purple-100/50 font-sans"
      >
        <div className="max-w-7xl mx-auto">
          {/* Category heading */}
          <h2 className="text-[#7C1FA8] text-xs font-bold tracking-widest uppercase mb-4 lg:mb-5 font-sans">
            Partner Value at a Glance
          </h2>

          {/* Symmetric Cards Grid (4 equal columns) with Deep Purple default and Hover background transition to #7C1FA8 and text color #F5A623 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">

            {/* Card 01: Up to 30% */}
            <div
              onMouseEnter={() => setHoveredPartnerCard(0)}
              onMouseLeave={() => setHoveredPartnerCard(null)}
              style={{
                background: hoveredPartnerCard === 0
                  ? '#7C1FA8'
                  : 'linear-gradient(135deg, #461065 0%, #2E0A44 100%)'
              }}
              className="col-span-1 rounded-[24px] p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 h-[240px] sm:h-[265px] lg:h-[280px] relative overflow-hidden border border-white/10 text-white shadow-md hover:border-purple-300/50 hover:shadow-[0_15px_35px_rgba(124,31,168,0.6)] hover:-translate-y-1.5"
            >
              <div>
                <h3 className={`font-extrabold text-3xl sm:text-4xl font-display tracking-tight leading-none transition-colors duration-300 ${hoveredPartnerCard === 0 ? 'text-[#F5A623]' : 'text-white'}`}>
                  Up to 30%
                </h3>
                <p className="text-white/90 text-xs sm:text-sm font-medium font-sans mt-1.5">
                  More revenue potential
                </p>
                <div className="w-9 h-1 bg-[#F5A623] rounded-full mt-2.5"></div>
              </div>

              <div className="w-full flex justify-center items-center mt-auto pt-1">
                <img src="/image 10.png" className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] object-contain filter drop-shadow-md" alt="Up to 30% graphic" />
              </div>
            </div>

            {/* Card 02: 50+ Financial products */}
            <div
              onMouseEnter={() => setHoveredPartnerCard(1)}
              onMouseLeave={() => setHoveredPartnerCard(null)}
              style={{
                background: hoveredPartnerCard === 1
                  ? '#7C1FA8'
                  : 'linear-gradient(135deg, #461065 0%, #2E0A44 100%)'
              }}
              className="col-span-1 rounded-[24px] p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 h-[240px] sm:h-[265px] lg:h-[280px] relative overflow-hidden border border-white/10 text-white shadow-md hover:border-purple-300/50 hover:shadow-[0_15px_35px_rgba(124,31,168,0.6)] hover:-translate-y-1.5"
            >
              <div>
                <h3 className={`font-extrabold text-3xl sm:text-4xl font-display tracking-tight leading-none transition-colors duration-300 ${hoveredPartnerCard === 1 ? 'text-[#F5A623]' : 'text-white'}`}>
                  50+
                </h3>
                <p className="text-white/90 text-xs sm:text-sm font-medium font-sans mt-1.5">
                  Financial products
                </p>
              </div>

              <div className="w-full flex justify-center items-center mt-auto pt-1">
                <img src="/image 11.png" className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] object-contain filter drop-shadow-md" alt="50+ Financial products" />
              </div>
            </div>

            {/* Card 03: Timely Reliable partner payouts */}
            <div
              onMouseEnter={() => setHoveredPartnerCard(2)}
              onMouseLeave={() => setHoveredPartnerCard(null)}
              style={{
                background: hoveredPartnerCard === 2
                  ? '#7C1FA8'
                  : 'linear-gradient(135deg, #461065 0%, #2E0A44 100%)'
              }}
              className="col-span-1 rounded-[24px] p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 h-[240px] sm:h-[265px] lg:h-[280px] relative overflow-hidden border border-white/10 text-white shadow-md hover:border-purple-300/50 hover:shadow-[0_15px_35px_rgba(124,31,168,0.6)] hover:-translate-y-1.5"
            >
              <div>
                <h3 className={`font-extrabold text-3xl sm:text-4xl font-display tracking-tight leading-none transition-colors duration-300 ${hoveredPartnerCard === 2 ? 'text-[#F5A623]' : 'text-white'}`}>
                  Timely
                </h3>
                <p className="text-white/90 text-xs sm:text-sm font-medium font-sans mt-1.5">
                  Reliable partner payouts
                </p>
              </div>

              <div className="w-full flex justify-center items-center mt-auto pt-1">
                <img src="/image 13.png" className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] object-contain filter drop-shadow-md" alt="Timely payouts" />
              </div>
            </div>

            {/* Card 04: ₹0 Joining fee */}
            <div
              onMouseEnter={() => setHoveredPartnerCard(3)}
              onMouseLeave={() => setHoveredPartnerCard(null)}
              style={{
                background: hoveredPartnerCard === 3
                  ? '#7C1FA8'
                  : 'linear-gradient(135deg, #461065 0%, #2E0A44 100%)'
              }}
              className="col-span-1 rounded-[24px] p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 h-[240px] sm:h-[265px] lg:h-[280px] relative overflow-hidden border border-white/10 text-white shadow-md hover:border-purple-300/50 hover:shadow-[0_15px_35px_rgba(124,31,168,0.6)] hover:-translate-y-1.5"
            >
              <div>
                <h3 className="text-[#F5A623] font-extrabold text-3xl sm:text-4xl font-display tracking-tight leading-none">
                  ₹0
                </h3>
                <p className="text-white/90 text-xs sm:text-sm font-medium font-sans mt-1.5">
                  Joining fee
                </p>
              </div>

              <div className="w-full flex justify-center items-center mt-auto pt-1">
                <img src="/coins.png" className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] object-contain filter drop-shadow-md" alt="₹0 Joining fee" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PARTNER VALUE AT A GLANCE SECTION - MOBILE ONLY (STACKED DECK - EXACT SPECS) */}
      <section
        style={{
          backgroundImage: "url('/partner-value-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        className="block md:hidden w-full py-4 px-4 font-sans border-t border-gray-100"
      >
        <div className="max-w-[360px] mx-auto flex flex-col items-center">
          {/* Centered category heading */}
          <h2 className="text-[#7C1FA8] text-xs font-black tracking-widest uppercase mb-5 text-center font-sans">
            PARTNER VALUE AT A GLANCE
          </h2>

          {/* Stacked overlapping cards deck (Container: 360px x 376px) */}
          <div ref={mobilePartnerCardsRef} className="w-full max-w-[360px] h-[376px] flex flex-col items-center relative select-none">

            {/* Fourth Card (Back-most): ₹0 (Width: 308px, Height: 112px, Background: #FFF4DE, Radius: 20px) */}
            <div className={`w-[308px] h-[112px] bg-[#FFF4DE] rounded-[20px] p-[14px] px-[18px] flex justify-between items-start border border-black/5 shadow-sm relative z-0 shrink-0 transition-all duration-500 ease-out ${mobilePartnerCardsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-30 scale-95'
              }`}>
              <div>
                <h3 style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#1E1135] font-semibold text-[27px] leading-[32px] tracking-normal">
                  ₹0
                </h3>
              </div>
              <img
                src="/coins.png"
                className="w-[75px] h-[75px] object-contain select-none pointer-events-none -mt-1"
                alt="₹0 Joining fee"
              />
            </div>

            {/* Third Card: Timely (Width: 326px, Height: 100px, Background: #FCE9F4, Radius: 20px) */}
            <div className={`w-[326px] h-[100px] bg-[#FCE9F4] rounded-[20px] p-[14px] px-[18px] flex justify-between items-start border border-black/5 shadow-sm relative z-10 -mt-[58px] shrink-0 transition-all duration-500 ease-out delay-100 ${mobilePartnerCardsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-30 scale-95'
              }`}>
              <div>
                <h3 style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#1E1135] font-semibold text-[27px] leading-[32px] tracking-normal">
                  Timely
                </h3>
              </div>
              <img
                src="/image 13.png"
                className="w-[70px] h-[70px] object-contain select-none pointer-events-none -mt-1"
                alt="Timely payouts"
              />
            </div>

            {/* Second Card: Up to 30% (Width: 344px, Height: 112px, Background: #F5EEFB, Radius: 20px) */}
            <div className={`w-[344px] h-[112px] bg-[#F5EEFB] rounded-[20px] p-[14px] px-[18px] flex justify-between items-start border border-black/5 shadow-sm relative z-20 -mt-[48px] shrink-0 transition-all duration-500 ease-out delay-200 ${mobilePartnerCardsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-14 opacity-30 scale-95'
              }`}>
              <div>
                <h3 style={{ fontFamily: "'Inter', sans-serif" }} className="text-[#1E1135] font-semibold text-[27px] leading-[32px] tracking-normal">
                  Up to 30%
                </h3>
              </div>
              <img
                src="/image 10.png"
                className="w-[75px] h-[75px] object-contain select-none pointer-events-none -mt-1"
                alt="Up to 30% graphic"
              />
            </div>

            {/* First Card (Front-most): 50+ (Width: 360px, Height: 184px, Gradient: #5E1683 to #7C1FA8, Radius: 22px) */}
            <div
              style={{ background: 'linear-gradient(90deg, #5E1683 0%, #7C1FA8 100%)' }}
              className={`w-[360px] max-w-full h-[184px] rounded-[22px] p-5 flex flex-col justify-between border border-white/10 shadow-lg relative z-30 -mt-[52px] shrink-0 text-white transition-all duration-500 ease-out delay-300 ${mobilePartnerCardsVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-18 opacity-30 scale-95'
                }`}
            >
              <div className="pt-8">
                <h3 style={{ fontFamily: "'Inter', sans-serif" }} className="text-white font-semibold text-[27px] leading-[32px] tracking-normal">
                  50+
                </h3>
                <p className="text-white/90 text-xs font-bold font-sans mt-1.5">
                  Financial products
                </p>
              </div>
              <img
                src="/image 11 (2).png"
                className="absolute bottom-2 right-2 w-[125px] h-[125px] object-contain filter drop-shadow-md select-none pointer-events-none"
                alt="50+ Financial products"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 4.6 A COMPLETE FINANCIAL ECOSYSTEM SECTION */}
      <section ref={ringSectionRef} className="bg-white w-full py-6 lg:py-8 relative overflow-hidden select-none font-sans">
        {/* Subtle warm gradient background accents */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#FFF5E5]/60 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#F5EEFB]/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Section Heading: Centered on Mobile & Desktop */}
          <div className="text-center mb-5 lg:mb-5 w-[342px] max-w-full lg:w-full lg:max-w-5xl mx-auto flex flex-col items-center px-4 lg:px-0">
            <h2 className="font-sans font-semibold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] tracking-[-0.5px] text-heading-ink text-center lg:max-w-none max-w-[760px] mx-auto whitespace-normal lg:whitespace-nowrap">
              A Complete Financial Ecosystem For Your Clients
            </h2>
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[14px] leading-[20px] sm:leading-relaxed lg:text-[16px] lg:leading-[24px] tracking-[-0.5px] text-[#544F66] mt-2.5 sm:mt-3 text-center max-w-2xl lg:max-w-[750px] mx-auto"
            >
              <span className="hidden lg:inline">
                PROSPERi5 helps you become the first call for every financial need. Instead of watching clients turn elsewhere for products you do not offer, deepen relationships, increase wallet share and keep more of their financial journey with you.
              </span>
              <span className="inline lg:hidden">
                PROSPERi5 helps you become the first call for every financial need—deepening relationships and keeping more of each client’s financial journey with you.
              </span>
            </p>
          </div>

          {/* Two Column Layout: Arc Visual + Service Cards (Compact desktop spacing) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">

            {/* LEFT: Arc Donut Visual with 360 Continuous Outer Ring Rotation */}
            <div className="lg:col-span-6 flex items-center justify-center px-4 lg:px-4">
              <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] lg:w-[400px] lg:h-[400px] flex items-center justify-center mx-auto">
                {/* 360 Rotating Outer Ring Image */}
                <img
                  src="/Untitled design (6).png"
                  className="w-full h-full object-contain select-none pointer-events-none animate-spin-slow"
                  alt="Financial Ecosystem Donut Ring"
                />

                {/* Stationary Center Text Mask Container */}
                <div className="absolute inset-0 m-auto w-[54%] h-[54%] rounded-full bg-white flex flex-col items-center justify-center text-center p-2 z-10 shadow-sm pointer-events-none">
                  <span className="text-[#F5A623] font-bold text-[10px] sm:text-[11px] lg:text-[12px] tracking-wider uppercase mb-1 font-sans">
                    ONE PLATFORM
                  </span>
                  <h3
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    className="font-bold text-[17px] sm:text-[20px] lg:text-[22px] leading-[22px] sm:leading-[26px] lg:leading-[28px] tracking-[-0.5px] text-[#1E1135] max-w-[190px] sm:max-w-[210px] lg:max-w-[230px] my-0.5"
                  >
                    Every Clients Has Different Requirements
                  </h3>
                  <span
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[9.5px] sm:text-[10.5px] lg:text-[11.5px] tracking-tight text-[#544F66] mt-1"
                  >
                    Investments · Insurance · Financing
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Three numbered service cards (Matching uniform subtext width across all points) */}
            <div className="lg:col-span-6 flex flex-col gap-4 lg:gap-5 px-4 lg:px-4 w-full max-w-xl lg:w-full mx-auto lg:mx-0 mt-6 lg:mt-0">

              {/* 1. Investment Card */}
              <div className="flex items-start gap-4 lg:gap-5 pb-4 lg:pb-4 border-b border-gray-200">
                {/* Circle Badge 1 */}
                <div className="w-[36px] h-[36px] lg:w-[44px] lg:h-[44px] rounded-full border border-purple-400/60 lg:border-2 lg:border-[#7C1FA8] bg-purple-50 lg:bg-white text-[#7C1FA8] flex items-center justify-center font-bold text-sm lg:text-[18px] shrink-0 mt-0.5">
                  1
                </div>

                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <h3
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="ecosystem-card-title-desktop font-medium lg:font-semibold text-[18px] lg:text-[22px] leading-tight lg:leading-tight tracking-[-0.5px] text-[#1E1135]"
                  >
                    Investment
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="ecosystem-card-subtext-desktop font-medium text-[14px] lg:text-[16px] leading-snug lg:leading-[24px] tracking-[-0.5px] text-[#544F66] w-full max-w-[460px]"
                  >
                    Give your clients access to a portfolio of traditional and new-age investments.
                  </p>
                  <button 
                    onClick={() => navigateToPage('investment')}
                    className="w-[245px] max-w-full h-[40px] lg:h-[42px] bg-[#7C1FA8] hover:bg-[#6b1991] text-white font-bold rounded-[12px] lg:rounded-[14px] text-xs lg:text-[13.5px] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 lg:mt-2.5 shadow-sm active:scale-95"
                  >
                    <span>Explore Investment Products</span>
                    <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 2. Insurance Card */}
              <div className="flex items-start gap-4 lg:gap-5 pb-4 lg:pb-4 border-b border-gray-200">
                {/* Circle Badge 2 */}
                <div className="w-[36px] h-[36px] lg:w-[44px] lg:h-[44px] rounded-full border border-pink-400/60 lg:border-2 lg:border-[#C81E8C] bg-pink-50 lg:bg-white text-[#C81E8C] flex items-center justify-center font-bold text-sm lg:text-[18px] shrink-0 mt-0.5">
                  2
                </div>

                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <h3
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="ecosystem-card-title-desktop font-medium lg:font-semibold text-[18px] lg:text-[22px] leading-tight lg:leading-tight tracking-[-0.5px] text-[#1E1135]"
                  >
                    Insurance
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="ecosystem-card-subtext-desktop font-medium text-[14px] lg:text-[16px] leading-snug lg:leading-[24px] tracking-[-0.5px] text-[#544F66] w-full max-w-[460px]"
                  >
                    Help your clients protect what matters with a comprehensive range of insurance solutions.
                  </p>
                  <button 
                    onClick={() => navigateToPage('insurance')}
                    className="w-[245px] max-w-full h-[40px] lg:h-[42px] bg-[#C81E8C] hover:bg-[#b0187a] text-white font-bold rounded-[12px] lg:rounded-[14px] text-xs lg:text-[13.5px] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 lg:mt-2.5 shadow-sm active:scale-95"
                  >
                    <span>Explore Insurance Products</span>
                    <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 3. Financing Card */}
              <div className="flex items-start gap-4 lg:gap-5 pb-1">
                {/* Circle Badge 3 */}
                <div className="w-[36px] h-[36px] lg:w-[44px] lg:h-[44px] rounded-full border border-amber-400/60 lg:border-2 lg:border-[#F5A623] bg-amber-50 lg:bg-white text-[#F5A623] flex items-center justify-center font-bold text-sm lg:text-[18px] shrink-0 mt-0.5">
                  3
                </div>

                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <h3
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="ecosystem-card-title-desktop font-medium lg:font-semibold text-[18px] lg:text-[22px] leading-tight lg:leading-tight tracking-[-0.5px] text-[#1E1135]"
                  >
                    Financing
                  </h3>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="ecosystem-card-subtext-desktop font-medium text-[14px] lg:text-[16px] leading-snug lg:leading-[24px] tracking-[-0.5px] text-[#544F66] w-full max-w-[460px]"
                  >
                    Help your clients access the ideal financing solutions for their personal and business requirements.
                  </p>
                  <button 
                    onClick={() => navigateToPage('financing')}
                    className="w-[245px] max-w-full h-[40px] lg:h-[42px] bg-[#F5A623] hover:bg-[#de9315] text-white font-bold rounded-[12px] lg:rounded-[14px] text-xs lg:text-[13.5px] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 lg:mt-2.5 shadow-sm active:scale-95"
                  >
                    <span>Explore Financing Products</span>
                    <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>


        </div>
      </section>

      {/* 4.5 FIVE REASONS PARTNERS SWITCH TO PROSPERi5 SECTION */}
      <section id="why-us" ref={reasonsRef} className="bg-[#FAF7FC] w-full py-4 sm:py-5 lg:py-5 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none border-t border-purple-100/50 font-sans">
        <div className="max-w-4xl lg:max-w-[840px] mx-auto">

          {/* Centered Header: Exact Mobile & Desktop Specs */}
          <div className="mb-4 sm:mb-5 text-center flex flex-col items-center mx-auto w-[342px] max-w-full lg:w-full lg:max-w-5xl">
            {/* Badge Wrapper: WHY PARTNERS SWITCH */}
            <div className="bg-[#F5A623] text-heading-ink rounded-[15px] px-[14px] py-[6px] h-[29px] w-[191px] flex items-center justify-center mb-3 shadow-sm select-none">
              <span
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-semibold text-[14px] leading-none tracking-[-0.5px] uppercase whitespace-nowrap text-center text-[#1E1135]"
              >
                WHY PARTNERS SWITCH
              </span>
            </div>

            {/* Main Heading: Five Reasons Partners Switch To PROSPERi5 */}
            <h2 className="font-sans font-semibold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] text-heading-ink tracking-[-0.5px] mb-2 text-center w-[342px] max-w-full lg:w-full lg:max-w-none whitespace-normal lg:whitespace-nowrap mx-auto">
              Five Reasons Partners Switch To PROSPERi5
            </h2>

            {/* Subheading Paragraph: Expand your advisory suite... */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[14px] leading-[17px] sm:leading-relaxed lg:text-[16px] lg:leading-[24px] text-[#544F66] tracking-[-0.5px] text-center w-[342px] max-w-full lg:w-full lg:max-w-[700px] mx-auto"
            >
              Expand your advisory suite, retain client ownership and become the trusted expert your clients call first.
            </p>
          </div>

          {/* Compact Timeline & Cards Layout */}
          <div className="relative pl-2 sm:pl-4">

            <div className="space-y-3 sm:space-y-3.5 lg:space-y-2.5 relative z-10">
              {/* Straight Solid Light Purple Connecting Line - Centered through circles 01 to 05 */}
              <div className="absolute left-[15px] sm:left-[18px] lg:left-[19px] top-3.5 sm:top-4.5 lg:top-[18px] bottom-3.5 sm:bottom-4.5 lg:bottom-[18px] w-[2px] bg-purple-200/80 z-0 pointer-events-none"></div>

              {[
                {
                  step: '01',
                  title: 'You Own Your Clients. Always.',
                  description: 'Every relationship you bring to PROSPERi5 stays yours.',
                  defaultBg: 'bg-[#F7F0FB]',
                  defaultBorder: 'border-purple-100/70',
                  isShifted: false,
                  icon: (isHovered) => (
                    <div className={`w-[54px] h-[40px] rounded-full flex items-center justify-center shrink-0 shadow-xs transition-colors ${isHovered ? 'bg-white text-[#7C1FA8]' : 'bg-[#7C1FA8] text-white'
                      }`}>
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )
                },
                {
                  step: '02',
                  title: 'Highest Revenue Share',
                  description: 'Earn up to 30% more from your existing client.',
                  defaultBg: 'bg-white',
                  defaultBorder: 'border-purple-100/90',
                  isShifted: true,
                  icon: (isHovered) => (
                    <svg className={`w-11 h-11 lg:w-[50px] lg:h-[50px] stroke-[2.5] transition-colors ${isHovered ? 'text-white' : 'text-[#7C1FA8]'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0L21.75 8" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h4.75V12.75" />
                    </svg>
                  )
                },
                {
                  step: '03',
                  title: '50+ Products',
                  description: 'Offer multiple products through our platform & earn the additional income.',
                  defaultBg: 'bg-[#F7F0FB]',
                  defaultBorder: 'border-purple-100/70',
                  isShifted: false,
                  icon: (isHovered) => (
                    <svg className={`w-10 h-10 lg:w-[48px] lg:h-[48px] stroke-[2] transition-colors ${isHovered ? 'text-white' : 'text-[#7C1FA8]'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 3L21 6.5L17.5 10L14 6.5Z" />
                    </svg>
                  )
                },
                {
                  step: '04',
                  title: 'Operational Support',
                  description: 'We handle backend processing and admin tasks so you can focus entirely on clients.',
                  defaultBg: 'bg-white',
                  defaultBorder: 'border-purple-100/90',
                  isShifted: true,
                  icon: (isHovered) => (
                    <svg className={`w-10 h-10 lg:w-[48px] lg:h-[48px] stroke-[2] transition-colors ${isHovered ? 'text-white' : 'text-[#7C1FA8]'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="5" y="5" width="14" height="14" rx="2" />
                      <circle cx="5" cy="5" r="2.5" fill={isHovered ? "white" : "#7C1FA8"} />
                      <circle cx="19" cy="5" r="2.5" fill={isHovered ? "white" : "#7C1FA8"} />
                      <circle cx="5" cy="19" r="2.5" fill={isHovered ? "white" : "#7C1FA8"} />
                      <circle cx="19" cy="19" r="2.5" fill={isHovered ? "white" : "#7C1FA8"} />
                    </svg>
                  )
                },
                {
                  step: '05',
                  title: 'Zero Joining Fee',
                  description: 'No joining fees ensure that you start your journey with zero charges/investment.',
                  defaultBg: 'bg-[#F7F0FB]',
                  defaultBorder: 'border-purple-100/70',
                  isShifted: false,
                  icon: (isHovered) => (
                    <svg
                      className={`w-11 h-11 lg:w-[54px] lg:h-[54px] transition-colors shrink-0 ${isHovered ? 'text-white' : 'text-[#7C1FA8]'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {/* Outer stroke circle */}
                      <circle cx="12" cy="12" r="9.5" strokeWidth="1.6" />

                      {/* ₹0 Coin Circle */}
                      <circle cx="14" cy="8" r="4.2" strokeWidth="1.5" />

                      {/* ₹0 Text inside Coin */}
                      <text
                        x="14"
                        y="9.4"
                        fontSize="4.2"
                        fontWeight="900"
                        textAnchor="middle"
                        fill="currentColor"
                        stroke="none"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        ₹0
                      </text>

                      {/* Hand Icon Supporting the Coin */}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M5.5 15.5h3.2c1.4 0 2.5.6 3.4 1.3 1.1 1 2.3 1.2 3.4.6 1-.6 1.8-1.7 2.5-2.6 M5.5 13.8v3.2"
                      />
                    </svg>
                  )
                }
              ].map((reason, index) => {
                const isHovered = hoveredReason === index;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredReason(index)}
                    onMouseLeave={() => setHoveredReason(null)}
                    style={{
                      transitionDelay: sectionVisible ? '0ms' : `${index * 150}ms`
                    }}
                    className={`flex items-center gap-3.5 sm:gap-5 group cursor-pointer transition-all duration-200 ease-out relative z-10 ${sectionVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                      }`}
                  >
                    {/* Step Number Circle */}
                    <div className={`reason-circle-desktop w-7.5 h-7.5 sm:w-9 sm:h-9 lg:w-[40px] lg:h-[40px] rounded-full flex items-center justify-center text-xs sm:text-[13px] lg:text-[15px] font-bold shrink-0 transition-all duration-200 relative z-10 ${isHovered
                      ? 'bg-[#7C1FA8] text-white border-none shadow-md scale-105'
                      : 'bg-white text-[#7C1FA8] border-2 border-[#7C1FA8]'
                      }`}>
                      {reason.step}
                    </div>

                    {/* Reason Card */}
                    <div
                      className={`reason-card-desktop flex-1 rounded-[16px] lg:rounded-[18px] p-3.5 sm:p-4 lg:py-[16px] lg:px-[28px] h-[112px] lg:h-auto lg:min-h-[80px] flex items-center justify-between gap-3 transition-all duration-200 border ${reason.isShifted ? 'ml-0 lg:ml-[72px]' : 'ml-0'
                        } ${isHovered
                          ? 'bg-[#7C1FA8] border-purple-800/40 text-white shadow-lg -translate-y-0.5'
                          : `${reason.defaultBg} ${reason.defaultBorder} text-heading-ink shadow-xs hover:shadow-md`
                        }`}
                    >
                      <div className="flex-1 min-w-0 max-w-[220px] lg:max-w-none">
                        <h3 className={`reason-card-title-desktop font-semibold text-sm sm:text-base leading-snug mb-1 lg:mb-[2px] lg:font-semibold lg:text-[20px] lg:leading-[120%] lg:tracking-[0px] lg:min-h-[24px] transition-colors ${isHovered ? 'text-white' : 'text-[#1E1135]'
                          }`}>
                          {reason.title}
                        </h3>
                        <p
                          className={`reason-card-subtext-desktop font-semibold text-[13px] sm:text-[14px] leading-[17px] sm:leading-[18px] tracking-[-0.5px] lg:font-['Inter',sans-serif] lg:font-semibold lg:text-[15px] lg:leading-[120%] lg:tracking-[-0.5px] lg:min-h-[18px] lg:mt-[2px] transition-colors ${isHovered ? 'text-white/95' : 'text-[#544F66]'
                            }`}
                        >
                          {reason.description}
                        </p>
                      </div>
                      <div className="shrink-0">
                        {reason.icon(isHovered)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Proof Rail Banner Box */}
            <div className="mt-8 sm:mt-10 w-full flex justify-center lg:-mx-16 lg:w-[calc(100%+128px)] lg:max-w-[968px] mx-auto">
              {/* Desktop Version: HTML Interactive Banner */}
              <div className="w-full max-w-[968px] hidden lg:flex items-center justify-between rounded-[22px] bg-[#5E1683] shadow-[0px_12px_28px_rgba(18,8,26,0.15)] px-8 py-5.5 text-white select-none transition-transform duration-300 hover:scale-[1.01]">
                {/* Left Section: 50+ Financial products... */}
                <div className="flex items-center gap-4">
                  <span className="font-sans font-bold text-[38px] leading-none tracking-[-0.5px] text-[#F5A623]">
                    50+
                  </span>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-white w-[260px]"
                  >
                    Financial products across investments, insurance and financing
                  </p>
                </div>

                {/* Divider Line */}
                <div className="w-[1px] h-10 bg-white/20"></div>

                {/* Middle Section: 5 advantages... */}
                <div className="flex flex-col gap-1">
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-semibold text-[15px] leading-none tracking-[-0.5px] text-[#F5A623]"
                  >
                    5 advantages · 1 partner ecosystem
                  </p>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[12px] leading-none tracking-[0.002em] text-white/80"
                  >
                    Zero joining fee · You retain every client relationship
                  </p>
                </div>

                {/* Right Section: Interactive CTA Button */}
                <a
                  href="#signup"
                  onClick={(e) => {
                    setPartnerCtaClicked(!partnerCtaClicked);
                    const el = document.getElementById('signup');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`h-[48px] px-6 rounded-[24px] font-semibold text-[15px] tracking-[-0.5px] flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer active:scale-95 ${partnerCtaClicked
                    ? 'bg-[#7C1FA8] text-white border-2 border-white shadow-purple-900/50 scale-105'
                    : 'bg-white text-[#5E1683] hover:bg-[#7C1FA8] hover:text-white hover:border-white border-2 border-transparent'
                    }`}
                >
                  <span>Become a Partner</span>
                  <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>

              {/* Mobile Version: Custom Card matching Screenshot 2 & exact specs */}
              <div className="w-[380px] max-w-full h-[236px] rounded-[18px] bg-[#5E1683] shadow-[0px_12px_28px_rgba(18,8,26,0.15)] p-4.5 sm:p-6 flex flex-col justify-between text-left text-white lg:hidden block mx-auto relative select-none">
                <div className="flex flex-col gap-1">
                  {/* Title 50+ */}
                  <h3 className="font-sans font-semibold text-[35px] leading-tight tracking-[-0.5px] text-[#F5A623]">
                    50+
                  </h3>
                  {/* Financial products across investments... */}
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[15px] leading-[18px] tracking-[-0.5px] text-white w-[330px] max-w-full"
                  >
                    Financial products across investments, insurance and financing
                  </p>
                </div>

                <div className="flex flex-col gap-1 mt-1">
                  {/* 5 advantages · 1 partner ecosystem */}
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-semibold text-[15px] leading-none tracking-[-0.5px] text-[#F5A623]"
                  >
                    5 advantages · 1 partner ecosystem
                  </p>
                  {/* Zero joining fee · You retain every client relationship */}
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[12px] leading-none tracking-[0.002em] text-white/75"
                  >
                    Zero joining fee · You retain every client relationship
                  </p>
                </div>

                {/* Become a Partner ↗ CTA Button */}
                <a
                  href="#signup"
                  onClick={(e) => {
                    setPartnerCtaClicked(!partnerCtaClicked);
                    const el = document.getElementById('signup');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-[180px] h-[46px] rounded-[23px] font-semibold text-[14px] tracking-[-0.5px] flex items-center justify-center gap-1.5 mx-auto mt-1 shadow-md transition-all duration-300 cursor-pointer active:scale-95 ${partnerCtaClicked
                    ? 'bg-[#7C1FA8] text-white border-2 border-white scale-105'
                    : 'bg-white text-[#5E1683] hover:bg-[#7C1FA8] hover:text-white hover:border-white border-2 border-transparent'
                    }`}
                >
                  <span>Become a Partner</span>
                  <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION - DESKTOP VIEW ONLY */}
      <section id="how-it-works" ref={howItWorksRef} className="hidden lg:block bg-[#F5EEFA] w-full py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none border-t border-purple-100/50 font-sans">

        {/* Soft Ambient Background Glow */}
        <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-purple-200/30 rounded-full filter blur-[90px] pointer-events-none"></div>
        <div className="absolute top-2 right-0 w-[250px] h-[250px] bg-pink-200/20 rounded-full filter blur-[80px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Section Header (Centered & Compact) */}
          <div className="mb-6 sm:mb-8 text-center flex flex-col items-center mx-auto lg:max-w-5xl">
            <span className="text-[#7C1FAB] text-xs font-extrabold tracking-wider uppercase mb-1.5 inline-block font-sans">
              HOW IT WORKS
            </span>
            <h2 className="font-sans font-semibold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] text-heading-ink tracking-[-0.5px] mb-2 text-center whitespace-normal lg:whitespace-nowrap max-w-3xl lg:max-w-none mx-auto">
              You Don’t Need to Master Every Financial Product
            </h2>
            <p className="font-medium text-[14px] leading-[20px] lg:text-[16px] lg:leading-[24px] tracking-[-0.5px] text-[#544F66] text-center max-w-3xl lg:max-w-[700px] mx-auto">
              Identify the need and connect us with the client. Our experts deliver the right solution while you retain the relationship and earn the revenue share.
            </p>
          </div>

          {/* Stepper Timeline Header Row with 5 Numbered Purple Circles */}
          <div className="hidden lg:grid grid-cols-5 gap-3.5 sm:gap-4 mb-5 relative max-w-6xl mx-auto">
            {/* Horizontal Background Line (Simple Solid Line) */}
            <div className="absolute top-1/2 left-[10%] right-[10%] -translate-y-1/2 h-[2px] bg-purple-200 pointer-events-none z-0"></div>

            {[1, 2, 3, 4, 5].map((num, idx) => (
              <div
                key={num}
                style={{
                  transitionDelay: howItWorksVisible ? '0ms' : `${idx * 160}ms`,
                }}
                className={`flex justify-center z-10 transition-all duration-200 ease-out ${howItWorksVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
              >
                <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-200 ${activeStep === idx
                  ? 'bg-[#7C1FA8] text-[#F5A623] scale-125 ring-4 ring-[#F5A623]/50 shadow-md border-2 border-[#F5A623]'
                  : 'bg-[#7C1FAB] text-white shadow-sm border-2 border-white'
                  }`}>
                  {num}
                </div>
              </div>
            ))}
          </div>

          {/* 5 Horizontal Process Cards Grid (White by default, Gold #F5A623 on Hover) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 relative max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Identify the Client Need',
                description: 'Recognise a requirement outside your current area of expertise.',
                icon: (
                  <svg className="w-14 h-14 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    <circle cx="17" cy="17" r="3" strokeWidth="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 19l2 2" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Refer the Opportunity',
                description: 'Introduce the client or share the lead with PROSPERi5.',
                icon: (isHovered) => (
                  <img 
                    src="/hugeicons_direction-left-01.png" 
                    alt="Refer the Opportunity direction icon" 
                    className="w-14 h-14 object-contain transition-all duration-200"
                    style={{
                      filter: isHovered 
                        ? 'brightness(0) saturate(100%) invert(74%) sepia(90%) saturate(1250%) hue-rotate(346deg)'
                        : 'brightness(0) saturate(100%) invert(14%) sepia(95%) saturate(4500%) hue-rotate(272deg)'
                    }}
                  />
                ),
              },
              {
                step: '03',
                title: 'Solutioning by Experts',
                description: 'Our specialists understand the requirement and recommend a suitable solution.',
                icon: (
                  <div className="relative">
                    <svg className="w-14 h-14 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <svg className="w-5 h-5 fill-current absolute -top-1 -right-1" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ),
              },
              {
                step: '04',
                title: 'Client Requirement Fulfilled',
                description: 'The client receives the right product and a seamless service experience.',
                icon: (
                  <svg className="w-14 h-14 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
                  </svg>
                ),
              },
              {
                step: '05',
                title: 'Earn Revenue & Retain the Relationship',
                description: 'You earn your share while continuing to own and strengthen the relationship.',
                icon: (
                  <svg className="w-14 h-14 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0L21.75 8" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h4.75V12.75" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                  </svg>
                ),
              },
            ].map((card, index) => {
              const isHovered = activeStep === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  style={{
                    transitionDelay: howItWorksVisible ? '0ms' : `${index * 160}ms`,
                  }}
                  className={`rounded-[22px] p-5 sm:p-5.5 flex flex-col justify-between transition-all duration-300 ease-out min-h-[220px] cursor-pointer group ${howItWorksVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
                    } ${isHovered
                      ? 'bg-[#7C1FA8] text-[#F5A623] shadow-xl -translate-y-1.5 border border-[#5E1083]'
                      : 'bg-white text-[#1E1B2E] border border-purple-100/60 shadow-sm hover:shadow-md'
                    }`}
                >
                  <div>
                    <span className={`text-xl font-extrabold font-display block mb-2.5 transition-colors duration-200 ${isHovered ? 'text-[#F5A623]' : 'text-[#7C1FAB]'
                      }`}>
                      {card.step}
                    </span>
                    <h3 className={`font-bold text-sm sm:text-[14.5px] leading-snug transition-colors duration-200 ${isHovered ? 'text-[#F5A623]' : 'text-[#1E1B2E]'
                      }`}>
                      {card.title}
                    </h3>
                    <p className={`text-[13px] sm:text-[13.5px] leading-relaxed mt-2 font-medium transition-colors duration-200 ${isHovered ? 'text-[#F5A623]/95' : 'text-[#544F66]'
                      }`}>
                      {card.description}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <div className={`transition-colors duration-200 ${isHovered ? 'text-[#F5A623]' : 'text-[#7C1FAB]'
                      }`}>
                      {typeof card.icon === 'function' ? card.icon(isHovered) : card.icon}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. COMPARISON TABLE SECTION (PROSPERi5 vs. Other National Distributors) */}
      <section className="bg-white w-full py-5 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none border-t border-purple-100/40 font-sans">
        <div className="max-w-7xl mx-auto">

          {/* Section Header (Mobile View Specs) */}
          <div id="about" className="mb-6 sm:mb-8 text-center flex flex-col items-center mx-auto lg:max-w-5xl">
            {/* Top Badge: WHY PARTNERS CHOOSE US (Inter 600 SemiBold 14px -0.5px tracking) */}
            <span
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-[#7C1FA8] font-semibold text-[14px] leading-none tracking-[-0.5px] uppercase mb-2 inline-block text-center"
            >
              WHY PARTNERS CHOOSE US
            </span>

            {/* Main Heading: PROSPERi5 vs. Other National Distributors */}
            <h2 className="font-sans font-semibold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] text-heading-ink tracking-[-0.5px] mb-2 text-center w-[342px] max-w-full lg:w-full lg:max-w-none whitespace-normal lg:whitespace-nowrap mx-auto">
              PROSPERi5 vs. Other National Distributors
            </h2>

            {/* Subheading Paragraph: Understand what you gain... */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[14px] leading-[17px] sm:leading-relaxed lg:text-[16px] lg:leading-[24px] text-[#544F66] tracking-[-0.5px] text-center w-[342px] max-w-full lg:w-full lg:max-w-[700px] mx-auto"
            >
              Understand what you gain when you choose PROSPERi5 over other distribution models.
            </p>
          </div>

          {/* Comparison Table Container (Mobile Scroll Table Specs: 350px width, 18px radius) */}
          <div className="bg-white rounded-[18px] sm:rounded-[24px] border border-purple-200/80 shadow-md overflow-hidden w-[350px] max-w-full lg:w-full lg:max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">

                {/* Header Row (Light lavender columns with solid purple PROSPERi5 column) */}
                <thead>
                  <tr className="bg-[#F5EEFB] text-[#1E1135] font-sans">
                    <th className="py-3 px-3 sm:py-3.5 sm:px-6 text-[12px] sm:text-sm font-semibold tracking-tight uppercase w-[30%] text-left bg-[#F5EEFB]">
                      CAPABILITY
                    </th>
                    <th className="bg-[#7C1FA8] py-2.5 px-2.5 sm:py-3 sm:px-4 text-center text-[13px] sm:text-sm font-bold tracking-wider uppercase w-[28%] text-white border-b border-white/20">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <span className="bg-[#5E1683] text-white text-[7.5px] sm:text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-[9px] whitespace-nowrap inline-block lg:translate-x-2">
                          BEST CHOICE
                        </span>
                        <span className="w-full text-center tracking-normal font-bold">PROSPERi5</span>
                      </div>
                    </th>
                    <th className="py-3 px-2 sm:py-3.5 sm:px-5 text-center text-[12px] sm:text-sm font-bold tracking-wider uppercase w-[21%] bg-[#F5EEFB] text-[#1E1135]">
                      ND1
                    </th>
                    <th className="py-3 px-2 sm:py-3.5 sm:px-5 text-center text-[12px] sm:text-sm font-bold tracking-wider uppercase w-[21%] bg-[#F5EEFB] text-[#1E1135]">
                      ND2
                    </th>
                  </tr>
                </thead>

                {/* Table Body (Rows matching exact mobile specs: Inter 500 Medium 14px -0.5px tracking, 28px badges) */}
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">

                  {/* Row 1: Revenue share */}
                  <tr className="hover:bg-purple-50/20 transition-colors">
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-3 sm:py-3.5 sm:px-6 font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-[#1E1135] align-middle"
                    >
                      Revenue share to partner
                    </td>
                    <td className="bg-[#7C1FA8] py-3 px-2 sm:py-3.5 text-center font-bold text-white text-[14px] tracking-[-0.5px] border-b border-white/20 align-middle">
                      Up to 90%
                    </td>
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-2 sm:py-3.5 text-center text-gray-400 font-medium text-[14px] tracking-[-0.5px] align-middle"
                    >
                      50–75%
                    </td>
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-2 sm:py-3.5 text-center text-gray-400 font-medium text-[14px] tracking-[-0.5px] align-middle"
                    >
                      50–75%
                    </td>
                  </tr>

                  {/* Row 2: Mutual funds */}
                  <tr className="hover:bg-purple-50/20 transition-colors">
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-3 sm:py-3.5 sm:px-6 font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-[#1E1135] align-middle"
                    >
                      Mutual funds
                    </td>
                    <td className="bg-[#7C1FA8] py-3 px-2 sm:py-3.5 text-center border-b border-white/20 align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-white border border-purple-200/60 flex items-center justify-center shadow-xs">
                          <svg className="w-3.5 h-3.5 text-[#1F9D55] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-gray-100/80 border border-gray-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-gray-100/80 border border-gray-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3: Life & Health Insurance */}
                  <tr className="hover:bg-purple-50/20 transition-colors">
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-3 sm:py-3.5 sm:px-6 font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-[#1E1135] align-middle"
                    >
                      Life & Health Insurance
                    </td>
                    <td className="bg-[#7C1FA8] py-3 px-2 sm:py-3.5 text-center border-b border-white/20 align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-white border border-purple-200/60 flex items-center justify-center shadow-xs">
                          <svg className="w-3.5 h-3.5 text-[#1F9D55] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-gray-100/80 border border-gray-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-gray-100/80 border border-gray-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row 4: Other General Insurance */}
                  <tr className="hover:bg-purple-50/20 transition-colors">
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-3 sm:py-3.5 sm:px-6 font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-[#1E1135] align-middle"
                    >
                      Other General Insurance
                    </td>
                    <td className="bg-[#7C1FA8] py-3 px-2 sm:py-3.5 text-center border-b border-white/20 align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-white border border-purple-200/60 flex items-center justify-center shadow-xs">
                          <svg className="w-3.5 h-3.5 text-[#1F9D55] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-rose-50 border border-rose-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-rose-50 border border-rose-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row 5: AIF / PMS */}
                  <tr className="hover:bg-purple-50/20 transition-colors">
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-3 sm:py-3.5 sm:px-6 font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-[#1E1135] align-middle"
                    >
                      AIF / PMS
                    </td>
                    <td className="bg-[#7C1FA8] py-3 px-2 sm:py-3.5 text-center border-b border-white/20 align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-white border border-purple-200/60 flex items-center justify-center shadow-xs">
                          <svg className="w-3.5 h-3.5 text-[#1F9D55] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-rose-50 border border-rose-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-rose-50 border border-rose-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row 6: Loans */}
                  <tr className="hover:bg-purple-50/20 transition-colors">
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-3 sm:py-3.5 sm:px-6 font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-[#1E1135] align-middle"
                    >
                      Loans
                    </td>
                    <td className="bg-[#7C1FA8] py-3 px-2 sm:py-3.5 text-center border-b border-white/20 align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-white border border-purple-200/60 flex items-center justify-center shadow-xs">
                          <svg className="w-3.5 h-3.5 text-[#1F9D55] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-rose-50 border border-rose-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-gray-100/80 border border-gray-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Row 7: Full back-office operations */}
                  <tr className="hover:bg-purple-50/20 transition-colors">
                    <td
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="py-3 px-3 sm:py-3.5 sm:px-6 font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-[#1E1135] align-middle"
                    >
                      Full back-office operations
                    </td>
                    <td className="bg-[#7C1FA8] py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-white border border-purple-200/60 flex items-center justify-center shadow-xs">
                          <svg className="w-3.5 h-3.5 text-[#1F9D55] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-rose-50 border border-rose-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:py-3.5 text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div className="w-[28px] h-[28px] rounded-[14px] bg-rose-50 border border-rose-200/60 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION - MOBILE VIEW ONLY */}
      <section id="how-it-works-mobile" className="block lg:hidden bg-[#F5EEFA] w-full py-6 px-4 relative overflow-hidden select-none border-t border-purple-100/50 font-sans">
        <div className="max-w-[401px] mx-auto flex flex-col items-center">
          {/* Category Header: HOW IT WORKS */}
          <span
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-[#7C1FA8] font-semibold text-[14px] leading-none tracking-[-0.5px] uppercase text-center block w-[342px] max-w-full mb-3"
          >
            HOW IT WORKS
          </span>

          {/* Main Heading: You Don’t Need to Master Every Financial Product */}
          <h2 className="font-sans font-semibold text-[32px] leading-[40px] tracking-[-0.5px] text-[#1E1B2E] text-center w-[350px] max-w-full mb-3">
            You Don’t Need to Master Every Financial Product
          </h2>

          {/* Subtitle Paragraph */}
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="font-medium text-[14px] leading-[17px] tracking-[-0.5px] text-[#544F66] text-center w-[342px] max-w-full mb-6"
          >
            Identify the need and connect us with the client. Our experts deliver the right solution while you retain the relationship and earn the revenue share.
          </p>

          {/* Step Chips (01 to 05) */}
          <div className="flex items-center justify-center gap-[11px] w-[354px] max-w-full mb-6 overflow-x-auto no-scrollbar py-1">
            {['01', '02', '03', '04', '05'].map((chip, idx) => (
              <button
                key={chip}
                onClick={() => handleMobileStepClick(idx)}
                className={`w-[62px] h-[40px] rounded-[20px] font-bold text-sm flex items-center justify-center transition-all cursor-pointer shrink-0 ${activeMobileStep === idx
                  ? 'bg-[#7C1FA8] text-white shadow-md'
                  : 'bg-[#F5EEFB] border border-[#EBE3F5] text-[#7C1FA8] hover:bg-purple-100'
                  }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Horizontal Scroll Cards (Width: 240px, Height: 240px, Radius: 16px) */}
          <div
            ref={mobileStepCarouselRef}
            onScroll={handleMobileStepScroll}
            className="w-full flex items-center gap-3.5 overflow-x-auto snap-x snap-mandatory px-4 pb-4 no-scrollbar scroll-smooth"
          >
            {[
              {
                step: '01',
                title: 'Identify the Client Need',
                description: 'Recognise a requirement outside your current area of expertise.',
                icon: (
                  <svg className="w-[70px] h-[70px] stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    <circle cx="17" cy="17" r="3" strokeWidth="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 19l2 2" />
                  </svg>
                )
              },
              {
                step: '02',
                title: 'Refer the Opportunity',
                description: 'Introduce the client or share the lead with PROSPERi5.',
                icon: (isActive) => (
                  <img 
                    src="/hugeicons_direction-left-01.png" 
                    alt="Refer the Opportunity direction icon" 
                    className="w-[70px] h-[70px] object-contain transition-all duration-200"
                    style={{
                      filter: isActive 
                        ? 'brightness(0) saturate(100%) invert(74%) sepia(90%) saturate(1250%) hue-rotate(346deg)'
                        : 'brightness(0) saturate(100%) invert(14%) sepia(95%) saturate(4500%) hue-rotate(272deg)'
                    }}
                  />
                )
              },
              {
                step: '03',
                title: 'Solutioning by Experts',
                description: 'Our specialists understand the requirement and recommend a suitable solution.',
                icon: (
                  <div className="relative">
                    <svg className="w-[70px] h-[70px] stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <svg className="w-5 h-5 fill-current absolute -top-1 -right-1 text-[#F5A623]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )
              },
              {
                step: '04',
                title: 'Client Requirement Fulfilled',
                description: 'The client receives the right product and a seamless service experience.',
                icon: (
                  <svg className="w-[70px] h-[70px] stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
                  </svg>
                )
              },
              {
                step: '05',
                title: 'Earn Revenue & Retain Relationship',
                description: 'You earn your share while continuing to own and strengthen the relationship.',
                icon: (
                  <svg className="w-[70px] h-[70px] stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0L21.75 8" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h4.75V12.75" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                  </svg>
                )
              }
            ].map((card, idx) => {
              const isActive = activeMobileStep === idx;
              return (
                <div
                  key={card.step}
                  onClick={() => handleMobileStepClick(idx)}
                  className={`w-[240px] h-[240px] rounded-[16px] p-5 shrink-0 snap-center transition-all duration-300 flex flex-col justify-between cursor-pointer ${isActive
                    ? 'bg-[#7C1FA8] text-[#F5A623] shadow-xl scale-[1.02]'
                    : 'bg-white text-[#1E1B2E] border border-purple-100/90 shadow-sm'
                    }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <div className={`mt-1.5 ${isActive ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>
                      {typeof card.icon === 'function' ? card.icon(isActive) : card.icon}
                    </div>
                    <span className={`font-extrabold text-sm ${isActive ? 'text-[#F5A623]' : 'text-[#7C1FA8]'}`}>
                      {card.step}
                    </span>
                  </div>

                  <div className="flex flex-col mt-auto">
                    <h3
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className={`font-semibold text-[16px] leading-tight tracking-[-0.5px] ${isActive ? 'text-[#F5A623]' : 'text-[#1E1B2E]'
                        }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className={`font-medium text-[13px] leading-snug tracking-[-0.5px] mt-1.5 ${isActive ? 'text-[#F5A623]/95' : 'text-[#544F66]'
                        }`}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 6.5 TESTIMONIALS SECTION (Compact Layout) */}
      <section id="testimonials" className="bg-[#FAF6FC] w-full py-5 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none border-t border-purple-100/50 font-sans">

        {/* Soft Ambient Background Glows */}
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-pink-100/30 rounded-full filter blur-[90px] pointer-events-none"></div>
        <div className="absolute -bottom-10 right-10 w-[300px] h-[300px] bg-purple-200/30 rounded-full filter blur-[90px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Section Header (Exact Mobile View Specs) */}
          <div className="mb-6 sm:mb-8 text-center flex flex-col items-center mx-auto lg:max-w-5xl">
            {/* Top Badge: STRENGTHENED BY RELATIONSHIPS (Inter 600 14px -0.5px tracking) */}
            <span
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-[#C81E8C] font-semibold text-[14px] leading-none tracking-[-0.5px] uppercase mb-2 inline-block text-center"
            >
              STRENGTHENED BY RELATIONSHIPS
            </span>

            {/* Main Heading: Hear It from Partners Already Earning More */}
            <h2 className="font-sans font-semibold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] text-heading-ink tracking-[-0.5px] mb-2 text-center w-[342px] max-w-full lg:w-full lg:max-w-none whitespace-normal lg:whitespace-nowrap mx-auto">
              Hear It from Partners Already Earning More
            </h2>

            {/* Subheading Paragraph: Understand what you gain... */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[14px] leading-[17px] sm:leading-relaxed lg:text-[16px] lg:leading-[24px] text-[#544F66] tracking-[-0.5px] text-center w-[342px] max-w-full lg:w-full lg:max-w-[700px] mx-auto"
            >
              Understand what you gain when you choose PROSPERi5 over other distribution models.
            </p>
          </div>

          {/* Mobile Testimonials Horizontal Scroll Carousel (Shown on < lg) */}
          <div className="block lg:hidden w-full max-w-[576px] mx-auto mb-6">
            <div
              ref={testimonialCarouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 scrollbar-none"
              onScroll={(e) => {
                const scrollLeft = e.target.scrollLeft;
                const cardWidth = 296;
                const index = Math.round(scrollLeft / cardWidth);
                if (index !== activeTestimonialIndex && index >= 0 && index <= 3) {
                  setActiveTestimonialIndex(index);
                }
              }}
            >
              {/* Card 1: Featured Deep Purple Card */}
              <div className="w-[280px] min-w-[280px] h-[271px] shrink-0 snap-center rounded-[16px] bg-[#5E1683] text-white border border-purple-900/40 p-5 flex flex-col justify-between shadow-md relative overflow-hidden">
                <div>
                  <div className="w-fit border border-[#C81E8C] text-[#C81E8C] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 font-sans">
                    FEATURED STORY
                  </div>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[16px] leading-snug tracking-[-0.5px] text-white w-[232px] max-w-full"
                  >
                    The guidance was clear, personal and connected across investment, protection and financing needs.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/20 pt-4.5 mt-5 pb-1 w-[232px] max-w-full">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/Portrait 2.png"
                      className="w-[46px] h-[46px] rounded-full object-cover border border-white/20 shadow-sm"
                      alt="Ananya Sen"
                    />
                    <div>
                      <h4 className="font-bold text-[13px] text-white leading-tight">Ananya Sen</h4>
                      <p className="text-white/70 text-[11px] font-medium mt-0.5">Investor · Kolkata</p>
                    </div>
                  </div>
                  <span className="bg-[#C81E8C] text-white text-[9px] font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm font-sans">
                    INVESTOR
                  </span>
                </div>
              </div>

              {/* Card 2: Light Card (Kabir Rai) */}
              <div className="w-[280px] min-w-[280px] h-[271px] shrink-0 snap-center rounded-[16px] bg-white text-heading-ink border border-purple-100/80 p-5 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-fit border border-[#7C1FA8] text-[#7C1FA8] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 font-sans">
                    FEATURED STORY
                  </div>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[16px] leading-snug tracking-[-0.5px] text-[#1E1135] w-[232px] max-w-full"
                  >
                    PROSPERi5 helped me offer more financial solutions without making my advisory process complicated
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4.5 mt-5 pb-1 w-[232px] max-w-full">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/Portrait 2 (3).png"
                      className="w-[46px] h-[46px] rounded-full object-cover shadow-sm"
                      alt="Kabir Rai"
                    />
                    <div>
                      <h4 className="font-bold text-[13px] text-[#1E1135] leading-tight">Kabir Rai</h4>
                      <p className="text-[#7C1FA8] text-[11px] font-medium mt-0.5">Advisor · Pune</p>
                    </div>
                  </div>
                  <span className="bg-[#7C1FA8] text-white text-[9px] font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm font-sans">
                    PARTNER
                  </span>
                </div>
              </div>

              {/* Card 3: Light Card (Vikram Rao) */}
              <div className="w-[280px] min-w-[280px] h-[271px] shrink-0 snap-center rounded-[16px] bg-white text-heading-ink border border-purple-100/80 p-5 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-fit border border-[#F5A623] text-[#F5A623] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 font-sans">
                    FEATURED STORY
                  </div>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[16px] leading-snug tracking-[-0.5px] text-[#1E1135] w-[232px] max-w-full"
                  >
                    I can support clients across investments, insurance, and financing. It has helped me build stronger and more valuable client relationships.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4.5 mt-5 pb-1 w-[232px] max-w-full">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/image 8.png"
                      className="w-[46px] h-[46px] rounded-full object-cover shadow-sm"
                      alt="Vikram Rao"
                    />
                    <div>
                      <h4 className="font-bold text-[13px] text-[#1E1135] leading-tight">Vikram Rao</h4>
                      <p className="text-[#F5A623] text-[11px] font-medium mt-0.5">Business · Delhi</p>
                    </div>
                  </div>
                  <span className="bg-[#F5A623] text-[#1E1B2E] text-[9px] font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm font-sans">
                    BUSINESS
                  </span>
                </div>
              </div>

              {/* Card 4: Light Card (Shreya Gupta) */}
              <div className="w-[280px] min-w-[280px] h-[271px] shrink-0 snap-center rounded-[16px] bg-white text-heading-ink border border-purple-100/80 p-5 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-fit border border-[#7C1FA8] text-[#7C1FA8] px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 font-sans">
                    FEATURED STORY
                  </div>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[16px] leading-snug tracking-[-0.5px] text-[#1E1135] w-[232px] max-w-full"
                  >
                    More client solutions without more complexity. The support and overall process are smooth and reliable.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4.5 mt-5 pb-1 w-[232px] max-w-full">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/Portrait 2 (4).png"
                      className="w-[46px] h-[46px] rounded-full object-cover shadow-sm"
                      alt="Shreya Gupta"
                    />
                    <div>
                      <h4 className="font-bold text-[13px] text-[#1E1135] leading-tight">Shreya Gupta</h4>
                      <p className="text-[#7C1FA8] text-[11px] font-medium mt-0.5">Investor · Kolkata</p>
                    </div>
                  </div>
                  <span className="bg-[#7C1FA8] text-white text-[9px] font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow-sm font-sans">
                    INVESTOR
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Carousel Navigation Controls (Left arrow, dots, right arrow) */}
            <div className="w-[342px] max-w-full h-[40px] flex items-center justify-center gap-6 mx-auto mt-4 select-none">
              {/* Left Arrow Button */}
              <button
                onClick={() => handleTestimonialScroll('prev')}
                disabled={activeTestimonialIndex === 0}
                className={`w-[40px] h-[40px] rounded-full border border-purple-200/80 bg-purple-100/60 text-[#7C1FA8] flex items-center justify-center transition-all ${activeTestimonialIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-purple-200/80 active:scale-95 cursor-pointer'
                  }`}
                aria-label="Previous Testimonial"
              >
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Dots Indicators */}
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTestimonialIndex(idx);
                      if (testimonialCarouselRef.current) {
                        testimonialCarouselRef.current.scrollTo({
                          left: idx * 296,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`transition-all duration-200 cursor-pointer ${activeTestimonialIndex === idx
                      ? 'w-2.5 h-2.5 rounded-full bg-[#F5A623] shadow-xs'
                      : 'w-2 h-2 rounded-full border border-purple-300 bg-transparent'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => handleTestimonialScroll('next')}
                disabled={activeTestimonialIndex === 3}
                className={`w-[40px] h-[40px] rounded-full bg-[#7C1FA8] text-white flex items-center justify-center shadow-md transition-all ${activeTestimonialIndex === 3 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-[#6b1991] active:scale-95 cursor-pointer'
                  }`}
                aria-label="Next Testimonial"
              >
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Testimonial Cards Grid (Desktop View Only: hidden on mobile) */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-5 items-start">

            {/* COLUMN 1 */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
              {/* Card 1: Featured Dark Card (Ananya Sen) */}
              <div className="bg-[#1D042B] text-white rounded-[22px] p-5 sm:p-5.5 flex flex-col justify-between min-h-[245px] shadow-lg border border-white/10 relative overflow-hidden group hover:scale-[1.01] transition-all duration-300">
                <div>
                  <span className="text-[#D81B60] font-extrabold text-[9.5px] uppercase tracking-wider block mb-2.5 font-sans">
                    FEATURED STORY
                  </span>
                  <div className="text-[#D81B60] text-2.5xl font-serif font-bold leading-none mb-1.5">“</div>
                  <p className="font-body-spec text-white text-xs sm:text-sm font-medium leading-relaxed">
                    The guidance was clear, personal and connected across investment, protection and financing needs.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3.5 mt-5 font-sans">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/Portrait 2.png"
                      className="w-8.5 h-8.5 rounded-full object-cover border border-white/20 shadow-sm"
                      alt="Ananya Sen"
                    />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-[13px] text-white leading-tight">Ananya Sen</h4>
                      <p className="text-white/70 text-[10px] font-medium mt-0.5">Investor · Kolkata</p>
                    </div>
                  </div>
                  <span className="bg-[#D81B60] text-white text-[8.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm font-sans">
                    VERIFIED INVESTOR
                  </span>
                </div>
              </div>

              {/* Card 2: Light Card (Kabir Rai) */}
              <div className="bg-white text-heading-ink rounded-[20px] p-4 sm:p-4.5 flex flex-col justify-between border border-purple-100/80 shadow-sm hover:shadow-md transition-all duration-300 font-sans">
                <p className="font-body-spec text-heading-ink text-xs sm:text-[13.5px] font-medium leading-relaxed mb-4">
                  PROSPERi5 helped me offer more financial solutions without making my advisory process complicated
                </p>
                <div className="flex items-center justify-between border-t border-purple-100/60 pt-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/Portrait 2 (3).png"
                      className="w-8 h-8 rounded-full object-cover shadow-sm"
                      alt="Kabir Rai"
                    />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-[13px] text-heading-ink leading-tight">Kabir Rai</h4>
                      <p className="text-[#7C1FAB] text-[10px] font-medium mt-0.5">Advisor · Pune</p>
                    </div>
                  </div>
                  <span className="bg-[#7C1FAB] text-white text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm font-sans">
                    PARTNER
                  </span>
                </div>
              </div>
            </div>

            {/* COLUMN 2 */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
              {/* Card 3: Light Card (Vikram Rao) */}
              <div className="bg-white text-heading-ink rounded-[20px] p-4 sm:p-4.5 flex flex-col justify-between border border-purple-100/80 shadow-sm hover:shadow-md transition-all duration-300 font-sans">
                <p className="font-body-spec text-heading-ink text-xs sm:text-[13.5px] font-medium leading-relaxed mb-4">
                  I can support clients across investments, insurance, and financing. It has helped me build stronger and more valuable client relationships.
                </p>
                <div className="flex items-center justify-between border-t border-purple-100/60 pt-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/image 8.png"
                      className="w-8 h-8 rounded-full object-cover shadow-sm"
                      alt="Vikram Rao"
                    />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-[13px] text-heading-ink leading-tight">Vikram Rao</h4>
                      <p className="text-[#F5A623] text-[10px] font-medium mt-0.5">Business · Delhi</p>
                    </div>
                  </div>
                  <span className="bg-[#F5A623] text-[#1E1B2E] text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm font-sans">
                    BUSINESS
                  </span>
                </div>
              </div>

              {/* Card 4: Light Card (Ananya Sen) */}
              <div className="bg-white text-heading-ink rounded-[20px] p-4 sm:p-4.5 flex flex-col justify-between border border-purple-100/80 shadow-sm hover:shadow-md transition-all duration-300 font-sans">
                <p className="font-body-spec text-heading-ink text-xs sm:text-[13.5px] font-medium leading-relaxed mb-4">
                  The support and overall process are smooth and reliable. It gives me more opportunities to grow my advisory business.
                </p>
                <div className="flex items-center justify-between border-t border-purple-100/60 pt-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/Portrait 2.png"
                      className="w-8 h-8 rounded-full object-cover shadow-sm"
                      alt="Ananya Sen"
                    />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-[13px] text-heading-ink leading-tight">Ananya Sen</h4>
                      <p className="text-[#D81B60] text-[10px] font-medium mt-0.5">Investor · Kolkata</p>
                    </div>
                  </div>
                  <span className="bg-[#D81B60] text-white text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm font-sans">
                    VERIFIED INVESTOR
                  </span>
                </div>
              </div>
            </div>

            {/* COLUMN 3 */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
              {/* Card 5: Light Card (Shreya Gupta Top) */}
              <div className="bg-white text-heading-ink rounded-[20px] p-4 sm:p-4.5 flex flex-col justify-between border border-purple-100/80 shadow-sm hover:shadow-md transition-all duration-300 font-sans">
                <p className="font-body-spec text-heading-ink text-xs sm:text-[13.5px] font-medium leading-relaxed mb-4">
                  More client solutions without more complexity.
                </p>
                <div className="flex items-center justify-between border-t border-purple-100/60 pt-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/Portrait 2 (4).png"
                      className="w-8 h-8 rounded-full object-cover shadow-sm"
                      alt="Shreya Gupta"
                    />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-[13px] text-heading-ink leading-tight">Shreya Gupta</h4>
                      <p className="text-[#7C1FAB] text-[10px] font-medium mt-0.5">Investor · Kolkata</p>
                    </div>
                  </div>
                  <span className="bg-[#7C1FAB] text-white text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm font-sans">
                    VERIFIED INVESTOR
                  </span>
                </div>
              </div>

              {/* Card 6: Featured Dark Card (Shreya Gupta Bottom) */}
              <div className="bg-[#1D042B] text-white rounded-[22px] p-5 sm:p-5.5 flex flex-col justify-between min-h-[245px] shadow-lg border border-white/10 relative overflow-hidden group hover:scale-[1.01] transition-all duration-300">
                <div>
                  <span className="text-[#F5A623] font-extrabold text-[9.5px] uppercase tracking-wider block mb-2.5 font-sans">
                    FEATURED STORY
                  </span>
                  <div className="text-[#F5A623] text-2.5xl font-serif font-bold leading-none mb-1.5">“</div>
                  <p className="font-body-spec text-white text-xs sm:text-sm font-medium leading-relaxed">
                    The guidance was clear, personal and connected across investment, protection and financing needs.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-3.5 mt-5 font-sans">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/Portrait 2 (2).png"
                      className="w-8.5 h-8.5 rounded-full object-cover border border-white/20 shadow-sm"
                      alt="Shreya Gupta"
                    />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-[13px] text-white leading-tight">Shreya Gupta</h4>
                      <p className="text-white/70 text-[10px] font-medium mt-0.5">Investor · Kolkata</p>
                    </div>
                  </div>
                  <span className="bg-[#F5A623] text-[#1E1B2E] text-[8.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm font-sans">
                    VERIFIED INVESTOR
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. FAQ SECTION (Questions Every Serious Advisor Asks Us) */}
      <section className="mesh-bg bg-white w-full py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none border-t border-purple-100/40 font-sans">
        {/* MOBILE VIEW (< lg) */}
        <div className="lg:hidden max-w-6xl mx-auto">
          {/* Centered Header for mobile */}
          <div className="text-center flex flex-col items-center mx-auto mb-6">
            {/* Top Badge: FREQUENTLY ASKED QUESTIONS */}
            <span
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-[#C81E8C] font-semibold text-[14px] leading-none tracking-[-0.5px] uppercase mb-2 inline-block text-center"
            >
              FREQUENTLY ASKED QUESTIONS
            </span>

            {/* Main Heading: Questions Every Serious Advisor Asks Us */}
            <h2 className="font-sans font-semibold text-[32px] leading-[40px] text-heading-ink tracking-[-0.5px] mb-3 text-center w-[366px] max-w-full min-h-[80px] mx-auto flex items-center justify-center whitespace-normal">
              Questions Every Serious Advisor Asks Us
            </h2>

            {/* Subheading Paragraph */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[14px] leading-[17px] text-[#544F66] tracking-[-0.5px] text-center w-[363px] max-w-full mx-auto flex items-center justify-center mt-3 mb-2"
            >
              Everything partners usually want to know about client ownership, fees, product expertise, onboarding & payouts.
            </p>
          </div>

          {/* Mobile Accordion List (Shown on < lg: 342px cards, 124px open card, 64px closed card) */}
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-2.5 my-2">
            {[
              {
                step: '01',
                question: 'Who owns my client relationship?',
                answer: 'Your clients remain yours. PROSPERi5 supports processing and specialist execution in the background.',
              },
              {
                step: '02',
                question: 'Are there hidden fees or platform charges?',
                answer: 'No. Zero joining fees, zero hidden charges, and no minimum AUM requirements.',
              },
              {
                step: '03',
                question: 'Do I need deep expertise in AIF, PMS or insurance?',
                answer: 'Not at all. Our team of product specialists assists you in recommending complex products.',
              },
              {
                step: '04',
                question: 'How long does empanelment take?',
                answer: 'Empanelment is 100% digital and usually completed within 24–48 hours.',
              },
              {
                step: '05',
                question: 'What is the payout schedule?',
                answer: 'Payouts are processed promptly on a transparent monthly schedule.',
              },
              {
                step: '06',
                question: 'Can I join if I already use another aggregator?',
                answer: 'Yes. Working with PROSPERi5 is completely non-exclusive.',
              },
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className={`w-[342px] max-w-full mx-auto rounded-[16px] transition-all duration-300 cursor-pointer select-none ${isOpen
                    ? 'min-h-[124px] bg-[#7C1FA8] text-white p-4 shadow-md border border-purple-800/40'
                    : 'h-[64px] min-h-[64px] bg-white text-[#1E1135] border border-purple-100/80 p-4 flex items-center justify-between shadow-xs hover:border-purple-200'
                    }`}
                >
                  {isOpen ? (
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <span
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            className="w-[30px] font-medium text-[16px] leading-none tracking-[-0.5px] text-white shrink-0 pt-0.5"
                          >
                            {faq.step}
                          </span>
                          <span
                            style={{ fontFamily: "'Inter', sans-serif" }}
                            className="w-[240px] max-w-full font-medium text-[16px] leading-snug tracking-[-0.5px] text-white"
                          >
                            {faq.question}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenFaq(null);
                          }}
                          className="text-white hover:text-white/80 shrink-0 p-1"
                          aria-label="Close FAQ"
                        >
                          <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        className="w-[260px] max-w-full font-medium text-[14px] leading-[18px] tracking-[-0.5px] text-white/90 mt-2 pl-[32px]"
                      >
                        {faq.answer}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2.5">
                        <span
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          className="w-[30px] font-medium text-[16px] leading-none tracking-[-0.5px] text-[#7C1FA8] shrink-0"
                        >
                          {faq.step}
                        </span>
                        <span
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          className="w-[244px] max-w-full font-medium text-[16px] leading-snug tracking-[-0.5px] text-[#1E1135]"
                        >
                          {faq.question}
                        </span>
                      </div>
                      <div className="text-gray-800 font-bold text-lg shrink-0">
                        +
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP VIEW (>= lg: 2-Column Side-by-Side Layout) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Header Content */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left my-auto">
            <span
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-[#D81B60] text-xs font-bold tracking-wider uppercase mb-2 inline-block font-sans"
            >
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] lg:leading-[38px] font-bold text-heading-ink tracking-tight mb-2.5 text-left max-w-md">
              Questions Every Serious Advisor Asks Us
            </h2>
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-sans text-xs sm:text-sm lg:text-[14.5px] text-[#544F66] font-medium leading-relaxed max-w-[350px]"
            >
              Everything partners usually want to know about client ownership, fees, product expertise, onboarding and payouts.
            </p>
          </div>

          {/* Right Accordion List (6 Compact Interactive Items) */}
          <div className="lg:col-span-7 flex flex-col gap-2 sm:gap-2.5">
            {[
              {
                step: '01',
                question: 'Who owns my client relationship?',
                answer: 'Your clients remain yours. PROSPERi5 supports processing and specialist execution in the background, and direct contact happens only with your explicit permission for a specific opportunity.',
              },
              {
                step: '02',
                question: 'Are there hidden fees, platform charges or minimum AUM requirements?',
                answer: 'No. There are zero joining fees, zero hidden platform charges, and no minimum AUM requirements to get started with PROSPERi5.',
              },
              {
                step: '03',
                question: 'Do I need deep expertise in AIF, PMS or insurance?',
                answer: 'Not at all. Our team of product specialists and research analysts assist you in recommending and executing complex products for your clients.',
              },
              {
                step: '04',
                question: 'How long does empanelment take and what documents are needed?',
                answer: 'Empanelment is 100% digital and usually completed within 24–48 hours. You only need standard KYC documents, ARN/EUIN (if applicable), and bank details.',
              },
              {
                step: '05',
                question: 'What is the payout schedule and how can I track commissions?',
                answer: 'Payouts are processed promptly on a monthly schedule. You get full access to a transparent partner dashboard to track revenues, lead statuses, and commissions in real time.',
              },
              {
                step: '06',
                question: 'Can I join if I already distribute through another aggregator?',
                answer: 'Yes. Working with PROSPERi5 is completely non-exclusive. You can freely expand your product range through us while continuing your existing distribution setup.',
              },
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-[16px] border transition-all duration-300 overflow-hidden ${isOpen
                    ? 'border-purple-200 shadow-md ring-1 ring-purple-100'
                    : 'border-gray-200/80 shadow-sm hover:border-purple-200'
                    }`}
                >
                  {/* FAQ Question Bar */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-2.5 px-3.5 sm:p-3 sm:px-4 flex items-center justify-between gap-3 text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      {/* Number Circle */}
                      <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#5E1683] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {faq.step}
                      </div>
                      {/* Question Text */}
                      <span className="font-bold text-sm sm:text-[15px] text-[#1E1B2E] leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    {/* Expand / Collapse Toggle Circle */}
                    <div className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${isOpen
                      ? 'bg-pink-50 text-[#D81B60] border border-pink-200'
                      : 'bg-gray-50 text-gray-400 border border-gray-200/80'
                      }`}>
                      {isOpen ? '−' : '+'}
                    </div>
                  </button>

                  {/* FAQ Answer Content (Animated) */}
                  <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 pb-3 px-3.5 sm:px-4 pl-12 sm:pl-13' : 'max-h-0 opacity-0 pb-0 px-3.5 sm:px-4 pl-12 sm:pl-13 overflow-hidden'
                    }`}>
                    <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-[#544F66] font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. LET'S BEGIN / GET STARTED FORM SECTION (Compact Layout) */}
      <section id="signup" className="bg-[#FAF6FC] w-full py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none border-t border-purple-100/50 font-sans">
        <div className="max-w-6xl mx-auto">

          {/* Section Header (Mobile View Specs + Desktop) */}
          <div className="text-center flex flex-col items-center mx-auto lg:max-w-5xl mb-8 lg:mb-10">
            {/* Top Badge: LET’S BEGIN (Inter 500 Medium 14px -0.5px tracking) */}
            <span
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-[#7C1FA8] font-medium text-[14px] leading-none tracking-[-0.5px] uppercase mb-2 inline-block text-center"
            >
              LET’S BEGIN
            </span>

            {/* Main Heading: Let’s build the next chapter... */}
            <h2 className="font-sans font-semibold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] text-heading-ink tracking-[-0.5px] mb-2 text-center w-[342px] max-w-full lg:w-full min-h-[80px] lg:min-h-0 mx-auto flex items-center justify-center lg:max-w-none whitespace-normal lg:whitespace-nowrap">
              Let’s build the next chapter of your financial journey.
            </h2>

            {/* Subheading Paragraph: Choose the journey that fits you... */}
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[14px] leading-[17px] sm:leading-relaxed lg:text-[16px] lg:leading-[24px] text-[#544F66] tracking-[-0.5px] text-center w-[342px] max-w-full min-h-[34px] lg:min-h-0 lg:w-[780px] lg:max-w-[780px] mx-auto lg:text-center flex items-center justify-center mt-1"
            >
              Choose the journey that fits you. Partners get a broader product ecosystem and operational support.
            </p>
          </div>

          {/* Mobile Specific Form Experience Card (Shown on < lg) */}
          <div
            style={{
              backgroundImage: "url('/ChatGPT Image Aug 21, 2026, 10_49_29 AM.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="block lg:hidden w-[358px] max-w-full h-[524px] min-h-[524px] mx-auto rounded-[24px] bg-[#3A0954] text-white p-5 flex flex-col justify-between shadow-xl relative overflow-hidden border border-purple-900/40"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-purple-600/20 rounded-full filter blur-[60px] pointer-events-none"></div>

            {/* Top Text Content */}
            <div className="relative z-10 pt-5 sm:pt-7">
              <span
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-[#F5A623] font-medium text-[14px] leading-none tracking-[-0.5px] uppercase block mb-1.5"
              >
                GET STARTED — ZERO FEE
              </span>
              <h3
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-semibold text-[24px] leading-[30px] text-white tracking-normal w-[350px] max-w-full mb-1"
              >
                Start your partner journey
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-medium text-[14px] leading-snug tracking-[-0.5px] text-white/80"
              >
                Share a few details. A partner specialist will guide you through the next step.
              </p>
            </div>

            {/* Inner White Form Container Box (Rectangle 328px x 358px) */}
            <div className="w-[328px] max-w-full h-[358px] mx-auto rounded-[24px] bg-white p-4 flex flex-col justify-center shadow-lg relative z-10">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2.5 my-auto">
                {/* Field 1: Your Name */}
                <input
                  type="text"
                  placeholder="Your Name"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="w-[294px] max-w-full h-[54px] mx-auto rounded-[27px] border border-purple-100/90 bg-[#FAF6FD] px-5 text-[14px] font-medium text-[#1E1135] placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                />

                {/* Field 2: Mobile Number */}
                <div className="w-[294px] max-w-full h-[54px] mx-auto rounded-[27px] border border-purple-100/90 bg-[#FAF6FD] px-4 flex items-center focus-within:border-purple-500 transition-all">
                  <select className="bg-transparent pr-1 text-xs font-bold text-[#1E1135] outline-none border-r border-purple-200/80 cursor-pointer">
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
                    placeholder="Mobile Number"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="w-full pl-2 text-[14px] font-medium text-[#1E1135] placeholder-gray-400 focus:outline-none bg-transparent"
                  />
                </div>

                {/* Field 3: Your ARN Number */}
                <input
                  type="text"
                  placeholder="Your ARN Number"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="w-[294px] max-w-full h-[54px] mx-auto rounded-[27px] border border-purple-100/90 bg-[#FAF6FD] px-5 text-[14px] font-medium text-[#1E1135] placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                />

                {/* Submit Button */}
                <div className="flex flex-col items-center gap-1.5 mt-0.5">
                  <button
                    type="submit"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="w-[294px] max-w-full h-[54px] mx-auto rounded-[27px] bg-[#7C1FA8] hover:bg-[#68198f] text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Get Started — Zero Fee</span>
                    <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </button>

                  <span
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="text-[10px] text-gray-400 font-medium text-center tracking-tight"
                  >
                    No joining fee · No platform charge · You remain in control
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Mobile Specific Partner Story Card (Shown on < lg right after Form Card) */}
          <div className="block lg:hidden w-[360px] max-w-full min-h-[525px] mx-auto mt-5 rounded-[24px] border border-purple-100/90 bg-[#FAF6FD] p-[20px] flex flex-col justify-between shadow-sm">
            <div>
              {/* Partner Badge */}
              <div className="w-[130px] h-[34px] rounded-[17px] bg-[#F5A623] text-[#1E1B2E] font-extrabold text-[12px] uppercase tracking-wider flex items-center justify-center mb-3 shadow-xs font-sans">
                FOR PARTNERS
              </div>

              {/* Title */}
              <h3
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-semibold text-[27px] leading-[33px] text-[#1E1135] tracking-normal w-[320px] max-w-full mb-3"
              >
                Your clients need more. <br />
                Your relationship deserves more.
              </h3>

              {/* Description Paragraph */}
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-normal text-[14px] leading-[21px] text-[#544F66] tracking-normal w-[320px] max-w-full mb-4"
              >
                Your clients have financial needs that extend beyond your current offerings, and they are turning to others to fill the gap. The longer you wait, the more revenue opportunities you miss. Step up now to provide complete solutions and monetize the trust you have already built.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Ownership Promise Box */}
              <div className="w-[325px] max-w-full min-h-[92px] mx-auto rounded-[16px] bg-[#4C0B6B] text-white p-4 flex items-center gap-3.5 shadow-md relative overflow-hidden">
                {/* Ellipse Checkmark Circle */}
                <div className="w-[44px] h-[44px] rounded-full bg-[#F5A623] flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-5 h-5 text-[#1E1B2E] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                {/* Text Details */}
                <div>
                  <h4
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[16px] leading-tight tracking-[-0.5px] text-white"
                  >
                    You own your clients. Always.
                  </h4>
                  <p
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[14px] leading-[17px] tracking-[-0.5px] text-white/80 mt-1"
                  >
                    Our team supports execution without taking over the relationship.
                  </p>
                </div>
              </div>

              {/* Proof Strip Box */}
              <div className="w-[320px] max-w-full h-[70px] mx-auto rounded-[16px] border border-purple-100/90 bg-white p-2.5 flex items-center justify-around text-center shadow-xs">
                {/* Stat 1 */}
                <div className="flex-1 border-r border-purple-100/60 pr-2">
                  <span className="font-sans font-semibold text-[24px] leading-[125%] tracking-[-0.5px] text-[#7C1FA8] block">
                    <AnimatedCounter end={50} suffix="+" />
                  </span>
                  <span
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[11px] leading-none tracking-[0.002em] text-[#8E89A0] block mt-0.5"
                  >
                    Products
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex-1 border-r border-purple-100/60 px-2">
                  <span className="font-sans font-semibold text-[24px] leading-[125%] tracking-[-0.5px] text-[#C81E8C] block">
                    <AnimatedCounter end={0} prefix="₹" />
                  </span>
                  <span
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[11px] leading-none tracking-[0.002em] text-[#8E89A0] block mt-0.5"
                  >
                    Joining fee
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex-1 pl-2">
                  <span className="font-sans font-semibold text-[24px] leading-[125%] tracking-[-0.5px] text-[#F5A623] block">
                    <AnimatedCounter end={100} suffix="%" />
                  </span>
                  <span
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    className="font-medium text-[11px] leading-none tracking-[0.002em] text-[#8E89A0] block mt-0.5"
                  >
                    Client ownership
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Specific Journey Switch Card (Shown on < lg) */}
          <div className="block lg:hidden w-[360px] max-w-full h-[168px] min-h-[168px] mx-auto mt-4 rounded-[16px] border border-purple-100/80 bg-white p-4.5 flex flex-col justify-between shadow-xs">
            {/* Block 1: For Investors */}
            <div className="flex flex-col gap-1">
              <span
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-[#7C1FA8] font-semibold text-[14px] leading-none tracking-[-0.5px] block"
              >
                For Investors
              </span>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-medium text-[14px] leading-[17px] tracking-[-0.5px] text-[#544F66] w-[308px] max-w-full"
              >
                Complete financial guidance across investments, insurance and financing.
              </p>
            </div>

            {/* Block 2: For Partners */}
            <div className="flex flex-col gap-1 pt-1.5 border-t border-purple-50/80">
              <span
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-[#C81E8C] font-semibold text-[14px] leading-none tracking-[-0.5px] block"
              >
                For Partners
              </span>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-medium text-[14px] leading-[17px] tracking-[-0.5px] text-[#544F66] w-[308px] max-w-full"
              >
                A broader product ecosystem with operational support.
              </p>
            </div>
          </div>

          {/* Desktop Main Container Card (Shown on lg) */}
          <div className="hidden lg:block bg-white rounded-[26px] p-3 sm:p-4.5 border border-purple-100/80 shadow-xl max-w-[1248px] mx-auto">
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 sm:gap-5">

              {/* Left Box (Compact Light Card Box) */}
              <div className="w-full lg:w-[480px] xl:w-[500px] bg-[#FAF6FD] rounded-[22px] p-5 sm:p-6 pt-6 sm:pt-7 lg:pt-7 flex flex-col justify-between border border-purple-200/80 shadow-sm shrink-0">
                <div>
                  {/* Badge */}
                  <span className="bg-[#F5A623] text-[#1E1B2E] text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-block mb-2 shadow-sm">
                    FOR PARTNERS
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-[21px] font-bold text-[#1E1B2E] leading-tight mb-2">
                    Your clients need more. <br className="hidden sm:block" />
                    Your relationship deserves more.
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-[14.5px] text-[#544F66] font-medium leading-relaxed mb-3">
                    Your clients have financial needs that extend beyond your current offerings, and they are turning to others to fill the gap. The longer you wait, the more revenue opportunities you miss. Step up now to provide complete solutions and monetize the trust you have already built.
                  </p>
                </div>

                <div>
                  {/* Dark Banner Card */}
                  <div className="bg-[#4C0B6B] text-white rounded-[16px] py-3.5 px-4 flex items-center gap-3 shadow-sm mb-3 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-[#F5A623] text-[#1E1B2E] flex items-center justify-center shrink-0 font-extrabold shadow-sm">
                      <svg className="w-4 h-4 text-[#1E1B2E] stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-[13px] leading-snug text-white">
                        You own your clients. Always.
                      </h4>
                      <p className="text-[10.5px] text-white/75 font-normal leading-normal mt-0.5">
                        Our team supports execution without taking over the relationship.
                      </p>
                    </div>
                  </div>

                  {/* 3 Stats Row (Animated Counters) */}
                  <div className="border border-purple-100/90 rounded-[14px] p-2.5 px-3 flex items-center justify-between text-center bg-white shadow-sm">
                    <div className="flex-1 border-r border-purple-100/60 pr-2">
                      <span className="text-[#7C1FAB] text-base sm:text-lg font-extrabold font-display block leading-none mb-0.5">
                        <AnimatedCounter end={50} suffix="+" />
                      </span>
                      <span className="text-[#544F66] text-[10px] font-medium block">
                        Products
                      </span>
                    </div>
                    <div className="flex-1 border-r border-purple-100/60 px-2">
                      <span className="text-[#C2185B] text-base sm:text-lg font-extrabold font-display block leading-none mb-0.5">
                        <AnimatedCounter end={0} prefix="₹" />
                      </span>
                      <span className="text-[#544F66] text-[10px] font-medium block">
                        Joining fee
                      </span>
                    </div>
                    <div className="flex-1 pl-2">
                      <span className="text-[#F5A623] text-base sm:text-lg font-extrabold font-display block leading-none mb-0.5">
                        <AnimatedCounter end={100} suffix="%" />
                      </span>
                      <span className="text-[#544F66] text-[10px] font-medium block">
                        Client ownership
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Box (Dark Purple Form Container with Custom Image Background) */}
              <div
                style={{ backgroundImage: "url('/ChatGPT Image Aug 12, 2026, 09_28_07 PM.png')" }}
                className="w-full lg:flex-1 bg-cover bg-center text-white rounded-[24px] p-5 sm:p-6.5 pt-6 sm:pt-7 lg:pt-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(42,6,61,0.4)] relative overflow-hidden border border-purple-400/30"
              >

                <div className="pt-20 sm:pt-24">
                  {/* White Form Card */}
                  <div className="bg-white rounded-[20px] p-3.5 sm:p-4 text-body-text shadow-xl mb-3">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full bg-[#F8F5FB] border border-[#E7DEEE] rounded-full px-4 py-2.5 text-xs sm:text-[13px] text-[#1E1B2E] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all font-sans"
                        />
                      </div>
                      <div className="flex items-center bg-[#F8F5FB] border border-[#E7DEEE] rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-purple-500/40 transition-all">
                        <select className="bg-transparent pl-1 pr-1 py-1 text-xs font-bold text-[#1E1B2E] outline-none border-r border-[#E7DEEE] cursor-pointer">
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
                          placeholder="Mobile Number"
                          className="w-full bg-transparent px-2 py-1.5 text-xs sm:text-[13px] text-[#1E1B2E] placeholder:text-[#9A8DAA] focus:outline-none font-sans"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Your ARN Number"
                          className="w-full bg-[#F8F5FB] border border-[#E7DEEE] rounded-full px-4 py-2.5 text-xs sm:text-[13px] text-[#1E1B2E] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all font-sans"
                        />
                      </div>

                      {/* Submit Row */}
                      <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
                        <button
                          type="submit"
                          className="bg-[#5E1683] hover:bg-[#7C1FAB] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5 cursor-pointer shrink-0 hover:scale-[1.02]"
                        >
                          <span>Get Started With Zero Fees</span>
                          <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </button>
                        <span className="text-[10.5px] text-[#8E82A3] font-normal leading-tight">
                          No joining fee · No platform charge · You remain in control
                        </span>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Action Dock Bar - Curved Box Shape */}
                <div className="bg-[#3B0754] rounded-[20px] p-2.5 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 border border-white/15 shadow-xl">
                  <span className="text-[#F5A623] font-bold text-xs sm:text-[13px] whitespace-nowrap font-sans tracking-tight">
                    Explore before you begin
                  </span>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {/* Option 1: Watch 2-Min Demo */}
                    <button 
                      onClick={() => setSelectedModal(true)}
                      className="bg-[#5E1683] hover:bg-[#7C1FAB] border border-white/20 text-white px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] shadow-sm whitespace-nowrap"
                    >
                      <span className="font-semibold text-xs">Watch 2-Min Demo</span>
                      <svg className="w-3 h-3 text-white stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </button>

                    {/* Option 2: Partner Brochure */}
                    <button 
                      onClick={() => setSelectedModal(true)}
                      className="bg-white hover:bg-purple-50 text-[#6B1F8C] px-3.5 py-1.5 rounded-full shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] whitespace-nowrap"
                    >
                      <span className="font-bold text-xs">Partner Brochure</span>
                      <svg className="w-3 h-3 text-[#6B1F8C] stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Dual Bar (Hidden on mobile) */}
          <div className="hidden lg:flex bg-white rounded-full p-3 px-6 sm:px-7 border border-purple-100/80 shadow-sm flex-row items-center justify-between gap-2.5 text-xs max-w-[1248px] mx-auto mt-3.5">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="text-[#5E1683] font-bold text-xs sm:text-[13.5px] whitespace-nowrap">For Investors</span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-[#544F66] text-xs sm:text-[13.5px] font-medium">
                Complete financial guidance across investments, insurance and financing.
              </span>
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-gray-200 shrink-0"></div>

            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="text-[#D81B60] font-bold text-xs sm:text-[13.5px] whitespace-nowrap">For Partners</span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-[#544F66] text-xs sm:text-[13.5px] font-medium">
                A broader product ecosystem with operational support.
              </span>
              <a
                href="#signup"
                aria-label="Become a Partner Signup"
                className="w-8 h-8 rounded-full bg-pink-50 hover:bg-[#D81B60] text-[#D81B60] hover:text-white flex items-center justify-center transition-all duration-200 shrink-0 shadow-xs hover:scale-110 active:scale-95 cursor-pointer ml-1"
              >
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 9. FOOTER SECTION - MOBILE VIEW ONLY */}
      <footer id="footer-mobile" className="block lg:hidden bg-[#130B24] text-white py-8 px-4 border-t border-purple-900/40 font-sans select-none">
        <div className="max-w-[360px] mx-auto flex flex-col items-center">

          {/* Logo */}
          <img
            src="/PROPSERI 5 LOGO.png"
            className="h-10 w-auto object-contain mb-4 filter drop-shadow-sm"
            alt="PROSPERi5 Logo"
          />

          {/* Tagline Paragraph */}
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="font-medium text-[18px] leading-[22px] tracking-[-0.5px] text-white text-center w-[350px] max-w-full mb-5"
          >
            Investments, insurance and financing through one trusted relationship.
          </p>

          {/* Pill Badge (Width: 283px, Height: 44px, Radius: 22px) */}
          <div className="w-[283px] max-w-full h-[44px] rounded-[22px] bg-[#7C1FA8] text-white text-xs sm:text-[13px] font-medium flex items-center justify-center text-center px-4 mb-8 shadow-md">
            One relationship · Complete financial ecosystem
          </div>

          {/* 4 Link Columns Grid (2x2) */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 w-full max-w-[340px] mb-8 text-left px-2">

            {/* Column 1: SOLUTIONS */}
            <div className="flex flex-col gap-2">
              <h4
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-[#F5A623] text-[14px] font-medium tracking-[-0.5px] leading-none mb-1"
              >
                SOLUTIONS
              </h4>
              <ul style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-[14px] font-medium tracking-[-0.5px] text-white/90">
                <li><a href="#investments" className="hover:text-white transition-colors">Investments</a></li>
                <li><a href="#insurance" className="hover:text-white transition-colors">Insurance</a></li>
                <li><a href="#financing" className="hover:text-white transition-colors">Financing</a></li>
                <li><a href="#tools" className="hover:text-white transition-colors">Financial Tools</a></li>
              </ul>
            </div>

            {/* Column 2: FOR INVESTORS */}
            <div className="flex flex-col gap-2">
              <h4
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-[#F5A623] text-[14px] font-medium tracking-[-0.5px] leading-none mb-1"
              >
                FOR INVESTORS
              </h4>
              <ul style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-[14px] font-medium tracking-[-0.5px] text-white/90">
                <li><a href="#investor-overview" className="hover:text-white transition-colors">Investor Overview</a></li>
                <li><a href="#expert" className="hover:text-white transition-colors">Talk To an Expert</a></li>
                <li><a href="#knowledge" className="hover:text-white transition-colors">Knowledge Centre</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Column 3: FOR PARTNERS */}
            <div className="flex flex-col gap-2">
              <h4
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-[#F5A623] text-[14px] font-medium tracking-[-0.5px] leading-none mb-1"
              >
                FOR PARTNERS
              </h4>
              <ul style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-[14px] font-medium tracking-[-0.5px] text-white/90">
                <li><a href="#partner-overview" className="hover:text-white transition-colors">Partner Overview</a></li>
                <li><a href="#become-partner" className="hover:text-white transition-colors">Become a Partner</a></li>
                <li><a href="#partner-login" className="hover:text-white transition-colors">Partner Login</a></li>
                <li><a href="#partner-brochure" className="hover:text-white transition-colors">Partner Brochure</a></li>
              </ul>
            </div>

            {/* Column 4: COMPANY */}
            <div className="flex flex-col gap-2">
              <h4
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-[#F5A623] text-[14px] font-medium tracking-[-0.5px] leading-none mb-1"
              >
                COMPANY
              </h4>
              <ul style={{ fontFamily: "'Inter', sans-serif" }} className="space-y-2 text-[14px] font-medium tracking-[-0.5px] text-white/90">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#why-prosperi5" className="hover:text-white transition-colors">Why PROSPERi5</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

          </div>

          {/* Divider Line */}
          <div className="w-[350px] max-w-full h-[1px] bg-white/10 my-4"></div>

          {/* Ready to start conversation block */}
          <div className="flex flex-col items-center text-center w-full max-w-[340px] my-4">
            {/* Dotted decorative node header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-[1px] bg-[#F5A623]/40"></div>
              <span className="text-[#F5A623] text-[11px] font-extrabold tracking-wider uppercase">
                READY TO START A CONVERSATION?
              </span>
              <div className="w-8 h-[1px] bg-[#F5A623]/40"></div>
            </div>

            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[14px] leading-tight tracking-[-0.5px] text-white/90 mb-4"
            >
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

            {/* Direct Contact info & Social Follow Us (Left-Aligned) */}
            <div className="flex flex-col items-start text-left w-full pl-2 mb-6">
              <a
                href="mailto:hello@prosperi5.com"
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-medium text-[14px] tracking-[-0.5px] text-white hover:text-[#F5A623] transition-colors block mb-1"
              >
                hello@prosperi5.com
              </a>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="font-medium text-[14px] tracking-[-0.5px] text-white/80 block mb-5"
              >
                +91 00000 00000
              </p>

              <span className="text-[#F5A623] text-[11px] font-extrabold tracking-wider uppercase mb-2.5 block">
                FOLLOW
              </span>
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

          {/* Copyright & Legal (Left-Aligned on Mobile, Back to Top on Right Corner) */}
          <div className="w-full flex flex-col items-start text-left pl-2 mt-4 pt-4 border-t border-white/10 relative">
            <p
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="font-medium text-[11px] tracking-[0.002em] text-white/70 mb-2"
            >
              © 2026 PROSPERi5. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-start gap-2 text-[#F5A623] text-[11px] font-medium mb-3 text-left w-full pr-2">
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
              <span>·</span>
              <a href="#terms" className="hover:underline">Terms & Conditions</a>
              <span>·</span>
              <a href="#disclaimer" className="hover:underline">Disclaimer</a>
              <span>·</span>
              <a href="#grievance" className="hover:underline">Grievance Redressal</a>
            </div>

            <p className="text-[10px] text-white/50 leading-tight mb-4 text-left max-w-[340px]">
              Investment products are subject to market risks. Insurance and financing solutions are subject to provider terms, eligibility and applicable regulations.
            </p>

            {/* Back to top (Right Corner Side) */}
            <div className="w-full flex justify-end pr-2 pt-1">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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

      {/* 9. HOMEPAGE FLOATING FOOTER */}
      <Footer onNavigatePage={(p) => setCurrentPage(p)} />
    </div>
  );
}

export default App;