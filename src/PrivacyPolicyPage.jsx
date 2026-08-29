import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function PrivacyPolicyPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('section-1');

  // Scroll spy to highlight active section in sticky Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7', 'section-8'];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'section-1', label: 'Information We Collect', icon: '👤' },
    { id: 'section-2', label: 'How We Use Your Information', icon: '⚙️' },
    { id: 'section-3', label: 'How We Share Your Information', icon: '🔗' },
    { id: 'section-4', label: 'Data Security', icon: '🛡️' },
    { id: 'section-5', label: 'Your Rights & Choices', icon: '👤' },
    { id: 'section-6', label: 'Cookies Policy', icon: '🍪' },
    { id: 'section-7', label: 'Changes to This Policy', icon: '✏️' },
    { id: 'section-8', label: 'Contact Us', icon: '✉️' }
  ];

  return (
    <div className="w-full bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FAB]">

      {/* 3. HERO SECTION BANNER - FULL WIDTH (Matching User Upload) */}
      <section className="w-full overflow-hidden bg-[#FAF5FD]">
        <img 
          src="/privacy_hero_banner.png" 
          alt="Privacy Policy - Smart, Secure, and Transparent Wealth Management by PROSPERi5" 
          className="w-full h-auto block select-none"
        />
      </section>

      {/* 4. MAIN PRIVACY POLICY CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 relative z-10">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-[#8E8A9D] font-medium py-2 mb-4">
          <button onClick={onNavigateHome} className="hover:text-[#7C1FAB] transition-colors cursor-pointer">Home</button>
          <span>&gt;</span>
          <span className="text-[#C81E8C] font-semibold">Privacy Policy</span>
        </div>

        {/* 2-COLUMN PRIVACY POLICY LAYOUT (Single Unified Document on Left + Sticky Table of Contents on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* LEFT UNIFIED DOCUMENT CONTAINER (Not separate cards) */}
          <div className="lg:col-span-8 bg-white rounded-[28px] border border-[#EBE3F5] p-6 sm:p-10 shadow-[0_4px_25px_rgba(30,27,46,0.03)] divide-y divide-[#F0EBF7] text-left">
            
            {/* SECTION 1: Information We Collect */}
            <div id="section-1" className="pb-8 pt-0 scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">1. Information We Collect</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                We collect information that helps us provide and improve our services to you.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#544F66] pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0 mt-2"></span>
                  <div>
                    <strong className="text-[#1E1B2E] font-bold">Personal Information:</strong> Name, email address, phone number, date of birth, PAN, and KYC details.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0 mt-2"></span>
                  <div>
                    <strong className="text-[#1E1B2E] font-bold">Financial Information:</strong> Bank account details, investment information, and transaction history.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0 mt-2"></span>
                  <div>
                    <strong className="text-[#1E1B2E] font-bold">Technical Information:</strong> IP addresses, device information, browser type, and usage data.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0 mt-2"></span>
                  <div>
                    <strong className="text-[#1E1B2E] font-bold">Cookies &amp; Tracking:</strong> Information collected through cookies and similar technologies.
                  </div>
                </li>
              </ul>
            </div>

            {/* SECTION 2: How We Use Your Information */}
            <div id="section-2" className="py-8 scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">2. How We Use Your Information</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                We use the information we collect for the following purposes:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-[#544F66] pl-1">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>To provide, operate, and maintain our services</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>To process transactions and manage your account</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>To personalize your experience and improve our platform</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>To send important updates, alerts, and promotional communications</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>To comply with legal obligations and prevent fraud</span>
                </li>
              </ul>
            </div>

            {/* SECTION 3: How We Share Your Information */}
            <div id="section-3" className="py-8 scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">3. How We Share Your Information</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                We do not sell your personal information. We may share your information only in these cases:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-[#544F66] pl-1">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>With trusted service providers who assist in our operations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>With regulatory authorities, if required by law</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>To protect our rights, privacy, safety, or property</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>In case of business transfer, merger, or acquisition</span>
                </li>
              </ul>
            </div>

            {/* SECTION 4: Data Security */}
            <div id="section-4" className="py-8 scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">4. Data Security</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                We implement industry-standard security measures to protect your information:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-[#544F66] pl-1">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>Encryption of data in transit and at rest (256-bit SSL / TLS)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>Regular security assessments, audit trails, and continuous monitoring</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>Access to data limited strictly to authorized personnel only</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>Secure enterprise cloud servers and resilient infrastructure</span>
                </li>
              </ul>
            </div>

            {/* SECTION 5: Your Rights & Choices */}
            <div id="section-5" className="py-8 scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">5. Your Rights &amp; Choices</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                You have the following rights regarding your personal information:
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-[#544F66] pl-1">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>Access, update, or correct your personal data</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>Withdraw consent for marketing communications</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>Request deletion of your account and stored data</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB] shrink-0"></span>
                  <span>Opt-out of cookies and tracking technologies</span>
                </li>
              </ul>
            </div>

            {/* SECTION 6: Cookies Policy */}
            <div id="section-6" className="py-8 scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">6. Cookies Policy</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                We use cookies to enhance your browsing experience, analyze traffic, and personalize content. You can manage your cookie preferences from your browser settings.
              </p>
            </div>

            {/* SECTION 7: Changes to This Policy */}
            <div id="section-7" className="py-8 scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">7. Changes to This Policy</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or through a notice on our platform.
              </p>
            </div>

            {/* SECTION 8: Contact Us */}
            <div id="section-8" className="pt-8 pb-0 scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">8. Contact Us</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                If you have any questions or concerns about this Privacy Policy, please reach out to us:
              </p>

              <div className="bg-[#FAF8FC] rounded-2xl p-4 sm:p-5 border border-[#EBE3F5] space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E1B2E]">Email:</span>
                  <a href="mailto:privacy@prosperi5.com" className="text-[#7C1FAB] hover:underline font-semibold">privacy@prosperi5.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E1B2E]">Compliance Officer:</span>
                  <span className="text-[#544F66]">compliance@prosperi5.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E1B2E]">Address:</span>
                  <span className="text-[#544F66]">PROSPERi5 Towers, Financial District, India</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT STICKY SIDEBAR (Smoothly pinned on scroll) */}
          <div 
            style={{ position: 'sticky', top: '88px' }}
            className="lg:col-span-4 self-start space-y-5 z-20"
          >
            
            {/* SIDEBAR CARD 1: Privacy Policy At a Glance (Interactive Table of Contents) */}
            <div className="bg-white rounded-[28px] border border-[#EBE3F5] p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-4 text-left">
              
              <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E] tracking-tight">
                Privacy Policy <br/> At a Glance
              </h3>

              <div className="divide-y divide-gray-100">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full py-3 flex items-center justify-between text-xs sm:text-sm font-semibold transition-all cursor-pointer group text-left ${
                      activeSection === item.id 
                        ? 'text-[#7C1FAB] font-bold bg-purple-50/50 -mx-2 px-2 rounded-xl' 
                        : 'text-[#544F66] hover:text-[#7C1FAB] hover:bg-purple-50/30 -mx-2 px-2 rounded-xl'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm shrink-0">{item.icon}</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                    </div>
                    <svg className={`w-4 h-4 transition-all shrink-0 ${activeSection === item.id ? 'text-[#7C1FAB] translate-x-1' : 'text-[#8E8A9D] group-hover:text-[#7C1FAB] group-hover:translate-x-1'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))}
              </div>

            </div>

            {/* SIDEBAR CARD 2: Trust Priority Badge */}
            <div className="bg-[#FAF5FD] rounded-[24px] border border-purple-100 p-6 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
                🛡️
              </div>
              <h4 className="text-sm font-extrabold text-[#1E1B2E]">Your trust is our priority.</h4>
              <p className="text-xs text-[#544F66] leading-relaxed">
                We are committed to keeping your information safe and transparent at all times.
              </p>
            </div>

          </div>

        </div>

      </main>


    </div>
  );
}
