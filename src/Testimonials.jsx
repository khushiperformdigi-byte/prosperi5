import React, { useState, useRef } from 'react';

export default function Testimonials() {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const testimonialCarouselRef = useRef(null);

  const handleTestimonialScroll = (direction) => {
    const newIndex =
      direction === 'next'
        ? Math.min(activeTestimonialIndex + 1, 3)
        : Math.max(activeTestimonialIndex - 1, 0);

    setActiveTestimonialIndex(newIndex);

    if (testimonialCarouselRef.current) {
      testimonialCarouselRef.current.scrollTo({
        left: newIndex * 296,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="testimonials" className="w-full bg-[#FAF8FC] py-10 sm:py-14 border-t border-purple-100/60 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 text-center flex flex-col items-center mx-auto lg:max-w-5xl">
          {/* Top Badge: STRENGTHENED BY RELATIONSHIPS */}
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

          {/* Subheading Paragraph */}
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

          {/* Mobile Carousel Navigation Controls */}
          <div className="w-[342px] max-w-full h-[40px] flex items-center justify-center gap-6 mx-auto mt-4 select-none">
            {/* Left Arrow Button */}
            <button
              onClick={() => handleTestimonialScroll('prev')}
              disabled={activeTestimonialIndex === 0}
              className={`w-[40px] h-[40px] rounded-full border border-purple-200/80 bg-purple-100/60 text-[#7C1FA8] flex items-center justify-center transition-all ${
                activeTestimonialIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-purple-200/80 active:scale-95 cursor-pointer'
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
                  className={`transition-all duration-200 cursor-pointer ${
                    activeTestimonialIndex === idx
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
              className={`w-[40px] h-[40px] rounded-full bg-[#7C1FA8] text-white flex items-center justify-center shadow-md transition-all ${
                activeTestimonialIndex === 3 ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-[#6b1991] active:scale-95 cursor-pointer'
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

        {/* Bottom Dark Pill Dock Bar (Hidden on mobile) */}
        <div className="hidden lg:flex bg-[#1D042B] text-white rounded-full py-2.5 px-5 max-w-4xl mx-auto flex-wrap items-center justify-around gap-3 border border-white/10 shadow-md text-[11px] sm:text-xs font-bold font-sans">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60]"></span>
            <span>Investor guidance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C1FAB]"></span>
            <span>Partner growth</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></span>
            <span>Business financing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>Client ownership</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60]"></span>
            <span>End-to-end support</span>
          </div>
        </div>

      </div>
    </section>
  );
}
