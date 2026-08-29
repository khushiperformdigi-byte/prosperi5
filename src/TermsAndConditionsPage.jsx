import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function TermsAndConditionsPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('section-1');

  // Scroll spy to dynamically highlight active section in sticky Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'section-1', 'section-2', 'section-3', 'section-4', 'section-5',
        'section-6', 'section-7', 'section-8', 'section-9', 'section-10'
      ];
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
    { id: 'section-1', label: 'Acceptance of Terms', icon: '📄' },
    { id: 'section-2', label: 'Use of Our Services', icon: '🖥️' },
    { id: 'section-3', label: 'Account Registration', icon: '👤' },
    { id: 'section-4', label: 'User Responsibilities', icon: '🛡️' },
    { id: 'section-5', label: 'Intellectual Property', icon: '©️' },
    { id: 'section-6', label: 'Limitation of Liability', icon: '⚠️' },
    { id: 'section-7', label: 'Termination', icon: 'ⓧ' },
    { id: 'section-8', label: 'Changes to Terms', icon: '✏️' },
    { id: 'section-9', label: 'Governing Law', icon: '⚖️' },
    { id: 'section-10', label: 'Contact Us', icon: '✉️' }
  ];

  return (
    <div className="w-full bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FAB]">

      {/* 3. HERO SECTION BANNER - FULL WIDTH (Matching User Upload) */}
      <section className="w-full overflow-hidden bg-[#FAF5FD]">
        <img 
          src="/terms_hero_banner.png" 
          alt="Terms and Conditions - Transparent, Fair, and Compliant Wealth Management by PROSPERi5" 
          className="w-full h-auto block select-none"
        />
      </section>

      {/* 4. MAIN TERMS CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 relative z-10">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-[#8E8A9D] font-medium py-2 mb-4">
          <button onClick={onNavigateHome} className="hover:text-[#7C1FAB] transition-colors cursor-pointer">Home</button>
          <span>&gt;</span>
          <span className="text-[#C81E8C] font-semibold">Terms &amp; Conditions</span>
        </div>

        {/* 2-COLUMN TERMS & CONDITIONS LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* LEFT UNIFIED DOCUMENT CONTAINER (Not separate cards) */}
          <div className="lg:col-span-8 bg-white rounded-[28px] border border-[#EBE3F5] p-6 sm:p-10 shadow-[0_4px_25px_rgba(30,27,46,0.03)] divide-y divide-[#F0EBF7] text-left">
            
            {/* SECTION 1: Acceptance of Terms */}
            <div id="section-1" className="pb-8 pt-0 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">1. Acceptance of Terms</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these Terms, you may not access or use our services.
              </p>
            </div>

            {/* SECTION 2: Use of Our Services */}
            <div id="section-2" className="py-8 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">2. Use of Our Services</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of the platform does not violate any applicable laws or regulations.
              </p>
            </div>

            {/* SECTION 3: Account Registration */}
            <div id="section-3" className="py-8 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">3. Account Registration</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                To access certain features, you may be required to create an account. You agree to provide accurate, complete, and up-to-date information and to maintain the security of your account credentials.
              </p>
            </div>

            {/* SECTION 4: User Responsibilities */}
            <div id="section-4" className="py-8 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">4. User Responsibilities</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                You are responsible for all activities that occur under your account. You agree not to misuse our platform, interfere with its proper functioning, or attempt to gain unauthorized access to our systems.
              </p>
            </div>

            {/* SECTION 5: Intellectual Property */}
            <div id="section-5" className="py-8 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <span className="text-lg font-black leading-none">©</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">5. Intellectual Property</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                All content, trademarks, logos, and materials on our platform are the property of their respective owners and are protected by applicable intellectual property laws. You may not use, copy, or distribute any content without our prior written permission.
              </p>
            </div>

            {/* SECTION 6: Limitation of Liability */}
            <div id="section-6" className="py-8 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">6. Limitation of Liability</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                Our platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not warrant that our services will be uninterrupted or error-free. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages.
              </p>
            </div>

            {/* SECTION 7: Termination */}
            <div id="section-7" className="py-8 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">7. Termination</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                We reserve the right to suspend or terminate your access to our platform at any time, with or without notice, if we believe you have violated these Terms and Conditions or engaged in any unlawful activity.
              </p>
            </div>

            {/* SECTION 8: Changes to Terms */}
            <div id="section-8" className="py-8 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">8. Changes to Terms</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                We may update these Terms and Conditions from time to time. We will notify you of any material changes by posting the updated terms on this page. Your continued use of the platform constitutes acceptance of the updated terms.
              </p>
            </div>

            {/* SECTION 9: Governing Law */}
            <div id="section-9" className="py-8 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">9. Governing Law</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                These Terms and Conditions shall be governed by and construed in accordance with the laws applicable in your jurisdiction, without regard to its conflict of law principles.
              </p>
            </div>

            {/* SECTION 10: Contact Us */}
            <div id="section-10" className="pt-8 pb-0 scroll-mt-28 space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center font-bold text-base shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1E1B2E]">10. Contact Us</h2>
              </div>

              <p className="text-xs sm:text-sm text-[#544F66] font-medium leading-relaxed">
                If you have any questions or concerns about these Terms and Conditions, please reach out to us using the contact details provided:
              </p>

              <div className="bg-[#FAF8FC] rounded-2xl p-4 sm:p-5 border border-[#EBE3F5] space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E1B2E]">Email:</span>
                  <a href="mailto:legal@prosperi5.com" className="text-[#7C1FAB] hover:underline font-semibold">legal@prosperi5.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E1B2E]">Grievance Officer:</span>
                  <span className="text-[#544F66]">grievance@prosperi5.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E1B2E]">Registered Office:</span>
                  <span className="text-[#544F66]">PROSPERi5 Towers, Financial District, India</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT STICKY SIDEBAR (Pinned on scroll) */}
          <div 
            style={{ position: 'sticky', top: '88px' }}
            className="lg:col-span-4 self-start space-y-5 z-20"
          >
            
            {/* SIDEBAR CARD 1: Terms & Conditions At a Glance */}
            <div className="bg-white rounded-[28px] border border-[#EBE3F5] p-6 shadow-[0_8px_30px_rgba(30,27,46,0.04)] space-y-4 text-left">
              
              <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E] tracking-tight">
                Terms &amp; Conditions <br/> At a Glance
              </h3>

              <div className="divide-y divide-gray-100">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full py-2.5 flex items-center justify-between text-xs sm:text-sm font-semibold transition-all cursor-pointer group text-left ${
                      activeSection === item.id 
                        ? 'text-[#7C1FAB] font-bold bg-purple-50/50 -mx-2 px-2 rounded-xl' 
                        : 'text-[#544F66] hover:text-[#7C1FAB] hover:bg-purple-50/30 -mx-2 px-2 rounded-xl'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
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

            {/* SIDEBAR CARD 2: Fair & Transparent Badge */}
            <div className="bg-[#FAF5FD] rounded-[24px] border border-purple-100 p-6 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C1FAB] flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
                🛡️
              </div>
              <h4 className="text-sm font-extrabold text-[#1E1B2E]">Fair &amp; Transparent</h4>
              <p className="text-xs text-[#544F66] leading-relaxed">
                We believe in clarity and fairness. These terms ensure a safe and trustworthy experience for everyone.
              </p>
            </div>

          </div>

        </div>

      </main>


    </div>
  );
}
