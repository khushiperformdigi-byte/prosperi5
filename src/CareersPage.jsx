import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { fetchPublishedJobs, submitJobApplication } from './api/careers';
import { sendWhatsAppEnquiry } from './utils/whatsapp';
import PhoneInput from './components/PhoneInput';

function JobImage({ url, title = '', department = '' }) {
  const [imgError, setImgError] = useState(false);

  if (url && !imgError) {
    return (
      <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden bg-purple-50 border border-purple-100 shrink-0 shadow-md group-hover:scale-[1.02] transition-transform flex items-center justify-center">
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Department / Category-based 3D style badge fallbacks
  const getBadgeStyle = (dept = '', jobTitle = '') => {
    const text = (dept + ' ' + jobTitle).toLowerCase();
    if (text.includes('tech') || text.includes('software') || text.includes('engineer') || text.includes('developer') || text.includes('full stack')) {
      return { icon: '💻', bg: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600', label: 'Tech & Product' };
    }
    if (text.includes('market') || text.includes('media') || text.includes('creative') || text.includes('social') || text.includes('design')) {
      return { icon: '🎨', bg: 'bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600', label: 'Creative & Media' };
    }
    if (text.includes('wealth') || text.includes('finance') || text.includes('invest') || text.includes('manager')) {
      return { icon: '💼', bg: 'bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900', label: 'Wealth Advisory' };
    }
    if (text.includes('partner') || text.includes('b2b') || text.includes('growth') || text.includes('sales')) {
      return { icon: '🚀', bg: 'bg-gradient-to-br from-amber-500 via-purple-600 to-purple-800', label: 'Growth & Sales' };
    }
    return { icon: '🌟', bg: 'bg-gradient-to-br from-[#7C1FA8] to-[#C81E8C]', label: 'Prosperi5 Team' };
  };

  const badge = getBadgeStyle(department, title);

  return (
    <div className={`w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl ${badge.bg} text-white shrink-0 shadow-md flex flex-col items-center justify-center p-3 group-hover:scale-[1.02] transition-transform text-center`}>
      <span className="text-3xl sm:text-4xl lg:text-5xl drop-shadow-sm">{badge.icon}</span>
      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider mt-1.5 opacity-95 leading-tight">{badge.label}</span>
    </div>
  );
}
const DEFAULT_FALLBACK_JOBS = [
  {
    id: 'job-1',
    title: 'Social Media Executive',
    department: 'Marketing & Creative',
    location: 'Delhi NCR / Hybrid',
    type: 'Full Time',
    experience: '1-3 Years',
    description: 'Lead Prosperi5 brand presence across Instagram, LinkedIn, YouTube, and X. Create engaging financial content, short reels, and performance campaigns.',
    responsibilities: [
      'Develop daily social media calendar and visual posts',
      'Create reels and infographics explaining wealth concepts',
      'Manage audience engagement and brand growth metrics'
    ],
    requirements: [
      '1-3 years experience in fintech or agency social media',
      'Strong graphic design & video editing skills (Canva, Premier Pro)',
      'Deep understanding of Indian financial market trends'
    ]
  },
  {
    id: 'job-2',
    title: 'Wealth Manager',
    department: 'Sales & Wealth Management',
    location: 'Mumbai / Hybrid',
    type: 'Full Time',
    experience: '3-6 Years',
    description: 'Manage high-net-worth client portfolios and deliver personalized financial planning, mutual fund allocation, and wealth solutions.',
    responsibilities: [
      'Advise HNI clients on multi-asset allocation strategies',
      'Onboard new investors and expand portfolio size',
      'Conduct quarterly portfolio review and rebalancing'
    ],
    requirements: [
      '3+ years experience in wealth management or private banking',
      'NISM Series V-A or CFP Certification preferred',
      'Proven track record in HNI client acquisition'
    ]
  },
  {
    id: 'job-3',
    title: 'Sales Executive',
    department: 'Sales & Growth',
    location: 'Bengaluru / On-site',
    type: 'Full Time',
    experience: '1-3 Years',
    description: 'Drive partner acquisition and investor onboarding for Prosperi5 products including LAS, Mutual Funds, and Insurance.',
    responsibilities: [
      'Identify prospective financial distributors and partners',
      'Conduct product walkthroughs and client presentations',
      'Achieve monthly sales targets and partner onboarding goals'
    ],
    requirements: [
      '1-3 years in financial services or SaaS sales',
      'Excellent communication and negotiation skills',
      'Result-driven approach with strong client relationship skills'
    ]
  },
  {
    id: 'job-4',
    title: 'B2B Partner Growth Lead',
    department: 'Partner Ecosystem (B2B)',
    location: 'Delhi NCR / Remote',
    type: 'Full Time',
    experience: '2-5 Years',
    description: 'Expand Prosperi5 partner ecosystem by onboarding mutual fund distributors, insurance advisors, and financial planners.',
    responsibilities: [
      'Identify and onboard B2B partners onto the Prosperi5 platform',
      'Conduct training and webinars on multi-asset financial products',
      'Drive partner engagement and growth'
    ],
    requirements: [
      'Proven track record in financial distribution or B2B sales',
      'Deep understanding of MFD and IFA ecosystem',
      'Excellent presentation and relationship-building skills'
    ]
  },
  {
    id: 'job-5',
    title: 'Full Stack Software Engineer (React / Node)',
    department: 'Technology & Product',
    location: 'Bengaluru / Remote',
    type: 'Full Time',
    experience: '2-4 Years',
    description: 'Build robust, scalable web applications and microservices powering the Prosperi5 financial platform.',
    responsibilities: [
      'Develop modern React frontend components and Node.js APIs',
      'Integrate third-party financial endpoints and calculation engines',
      'Optimize platform performance, security, and scalability'
    ],
    requirements: [
      'Strong proficiency in JavaScript/TypeScript, React, and Node.js',
      'Experience with REST APIs, SQL/NoSQL databases, and cloud deployment',
      'Passion for fintech and building seamless user experiences'
    ]
  }
];

export default function CareersPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // Job object or 'General'
  const [expandedJobId, setExpandedJobId] = useState(null); // ID of currently expanded job
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [talkAdvisorModal, setTalkAdvisorModal] = useState(false);
  const [hrFormData, setHrFormData] = useState({ name: '', phone: '', countryCode: '+91', email: '' });
  const [openPositions, setOpenPositions] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');

  // Filter & Pagination states
  const [searchQueryInput, setSearchQueryInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLoc, setSelectedLoc] = useState('All');
  const [selectedExp, setSelectedExp] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Search Debouncing (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchQueryInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQueryInput]);

  // Reset pagination to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDept, selectedLoc, selectedExp]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const filteredJobs = openPositions.filter((job) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = (job.title || '').toLowerCase().includes(q);
      const matchDept = (job.department || '').toLowerCase().includes(q);
      const matchLoc = (job.location || '').toLowerCase().includes(q);
      const matchDesc = (job.description || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDept && !matchLoc && !matchDesc) return false;
    }

    if (selectedDept !== 'All') {
      if ((job.department || '').toLowerCase() !== selectedDept.toLowerCase()) return false;
    }

    if (selectedLoc !== 'All') {
      if (!(job.location || '').toLowerCase().includes(selectedLoc.toLowerCase())) return false;
    }

    if (selectedExp !== 'All') {
      const jobExp = job.experience || '';
      if (!jobExp.includes(selectedExp)) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchQueryInput('');
    setSearchQuery('');
    setSelectedDept('All');
    setSelectedLoc('All');
    setSelectedExp('All');
    setCurrentPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      setJobsLoading(true);
      setJobsError('');
      try {
        const jobs = await fetchPublishedJobs();
        if (!cancelled) {
          setOpenPositions(Array.isArray(jobs) && jobs.length > 0 ? jobs : DEFAULT_FALLBACK_JOBS);
        }
      } catch (error) {
        if (!cancelled) {
          setOpenPositions(DEFAULT_FALLBACK_JOBS);
          setJobsError('');
        }
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    }

    loadJobs();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || selectedJob || showThankYouModal || talkAdvisorModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, selectedJob, showThankYouModal, talkAdvisorModal]);

  const whyJoinPerks = [
    {
      id: 'growth',
      title: 'Growth',
      desc: 'Learn, grow and build a long-term career with us.',
      icon: (
        <svg className="w-5 h-5 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'impact',
      title: 'Impact',
      desc: "Make a real difference in people's financial lives.",
      icon: (
        <svg className="w-5 h-5 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'culture',
      title: 'Culture',
      desc: 'Work in a collaborative and inclusive environment.',
      icon: (
        <svg className="w-5 h-5 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'rewards',
      title: 'Rewards',
      desc: 'Attractive compensation and performance rewards.',
      icon: (
        <svg className="w-5 h-5 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const handleApplyClick = (job, e) => {
    if (e) e.stopPropagation();
    setSelectedJob(job);
  };

  const toggleJobExpansion = (jobId) => {
    setExpandedJobId(prevId => prevId === jobId ? null : jobId);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      role: selectedJob?.title || 'General Application',
      name: fullName,
      email,
      phone,
      message
    };

    try {
      await submitJobApplication({
        jobId: selectedJob?.id || null,
        fullName,
        email,
        phone,
        message,
        source: 'website',
      });
    } catch {
      // Keep WhatsApp flow even if API save fails
    }

    sendWhatsAppEnquiry({
      formName: `Careers Job Application (${data.role})`,
      name: fullName,
      phone: phone,
      email: email,
      service: data.role,
      message: message
    });
    setSubmittedData(data);
    setSelectedJob(null);
    setShowThankYouModal(true);

    // Reset fields
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="w-full bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8]">

      {/* 3. HERO BANNER SECTION (FULL WIDTH) */}
      <section className="w-full overflow-hidden bg-white border-b border-[#EBE8EF]">
        <img
          src="/careers_hero_banner.png"
          alt="Build Your Career With Prosperi5 - We are always looking for passionate, driven and talented individuals"
          className="w-full h-auto block select-none max-h-[380px] lg:max-h-[420px] object-cover object-center"
        />
      </section>

      {/* 4. MAIN CAREERS CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* 2-COLUMN LAYOUT: FILTER BAR (LEFT) + OPEN POSITIONS (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: UPGRADED STICKY SIDEBAR FILTER */}
          <aside className="lg:col-span-4 bg-white rounded-[24px] border border-[#EBE8EF] shadow-md sticky top-24 z-20 self-start overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#7C1FA8] to-[#5E1083] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center backdrop-blur-xs">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight leading-none">Filter Positions</h3>
                  <p className="text-[11px] text-purple-200 mt-1 font-medium">Refine jobs by team or location</p>
                </div>
              </div>

              {(searchQuery || selectedDept !== 'All' || selectedLoc !== 'All' || selectedExp !== 'All') && (
                <button
                  onClick={clearFilters}
                  className="text-xs bg-white/20 hover:bg-white/30 text-white font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer backdrop-blur-xs"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="p-5 space-y-5">
              {/* 1. Search Input (Debounced) */}
              <div>
                <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1.5">Search Keywords</label>
                <div className="relative">
                  <svg className="w-4 h-4 text-[#8E8A9D] absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="search"
                    value={searchQueryInput}
                    onChange={(e) => setSearchQueryInput(e.target.value)}
                    placeholder="Search title, tech, location..."
                    className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
                  />
                </div>
              </div>

              {/* 2. Department Dropdown */}
              <div>
                <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1.5">Department</label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B2E] font-semibold focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] cursor-pointer transition-all"
                >
                  <option value="All">All Departments</option>
                  <option value="Wealth Management">Wealth Management</option>
                  <option value="Technology & Engineering">Technology & Engineering</option>
                  <option value="Tax & Advisory">Tax & Advisory</option>
                </select>
              </div>

              {/* 3. Location Dropdown */}
              <div>
                <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1.5">Location</label>
                <select
                  value={selectedLoc}
                  onChange={(e) => setSelectedLoc(e.target.value)}
                  className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B2E] font-semibold focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] cursor-pointer transition-all"
                >
                  <option value="All">All Locations</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Hybrid">Hybrid / Remote</option>
                </select>
              </div>

              {/* 4. Experience Level Dropdown */}
              <div>
                <label className="text-xs font-extrabold text-[#1E1B2E] block mb-1.5">Experience Level</label>
                <select
                  value={selectedExp}
                  onChange={(e) => setSelectedExp(e.target.value)}
                  className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B2E] font-semibold focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] cursor-pointer transition-all"
                >
                  <option value="All">All Experience Levels</option>
                  <option value="2 – 4">2 – 4 Years</option>
                  <option value="3 – 6">3 – 6 Years</option>
                  <option value="5 – 8">5 – 8 Years</option>
                </select>
              </div>

              {/* Active Counter Badge */}
              <div className="pt-3 border-t border-[#EBE8EF] flex items-center justify-between text-xs text-[#8E8A9D]">
                <span className="font-medium">Active Positions:</span>
                <span className="font-extrabold text-[#7C1FA8] text-xs bg-[#FAF5FD] px-3 py-1 rounded-full border border-purple-200 shadow-2xs">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'}
                </span>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: OPEN POSITIONS LIST */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* Main Section Heading */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] tracking-tight">
                  Open Positions
                </h1>
                <p className="text-xs text-[#8E8A9D] mt-1">
                  Click on any position card to view full job responsibilities and qualifications.
                </p>
              </div>
            </div>

            {/* List of Job Cards (5 per page) */}
            <div className="space-y-5">
              {jobsLoading && (
                <div className="bg-white rounded-[24px] border border-[#EBE8EF] p-8 text-sm text-[#544F66]">
                  Loading open positions...
                </div>
              )}

              {!jobsLoading && jobsError && (
                <div className="bg-white rounded-[24px] border border-red-100 p-8 text-sm text-red-700">
                  {jobsError}
                </div>
              )}

              {!jobsLoading && !jobsError && filteredJobs.length === 0 && (
                <div className="bg-white rounded-[24px] border border-[#EBE8EF] p-8 text-sm text-[#544F66]">
                  No matching positions found. Try clearing your search filters or send a general application via Talk to HR.
                </div>
              )}

              {!jobsLoading && paginatedJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => toggleJobExpansion(job.id)}
                    className={`bg-white rounded-[24px] border p-6 sm:p-7 shadow-sm transition-all duration-300 cursor-pointer ${
                      isExpanded 
                        ? 'border-[#7C1FA8] ring-2 ring-[#7C1FA8]/20 shadow-[0_20px_50px_rgba(124,31,168,0.12)]' 
                        : 'border-[#EBE8EF] hover:border-purple-300 hover:shadow-[0_15px_35px_rgba(124,31,168,0.08)]'
                    }`}
                  >
                    {/* Card Layout: Large Featured Image on Left + Details on Right */}
                    <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                      
                      {/* PROMINENT FEATURED JOB IMAGE */}
                      <JobImage
                        url={job.imageUrl}
                        title={job.title}
                        department={job.department}
                      />

                      {/* Job Info Container */}
                      <div className="flex-1 min-w-0 w-full">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg sm:text-xl font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-tight">
                              {job.title}
                            </h2>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                              isExpanded ? 'bg-[#7C1FA8] text-white' : 'bg-[#FAF5FD] text-[#7C1FA8]'
                            }`}>
                              {isExpanded ? 'Full Details' : 'Details ▾'}
                            </span>
                          </div>

                          <button
                            onClick={(e) => handleApplyClick(job, e)}
                            className="self-start sm:self-auto px-5 py-2 rounded-xl border border-[#7C1FA8] text-[#7C1FA8] hover:bg-[#7C1FA8] hover:text-white font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-2xs whitespace-nowrap"
                          >
                            Apply Now
                          </button>
                        </div>

                        {/* Metadata Chips (Location, Department, Experience) */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#544F66] mb-3">
                          {/* Location */}
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">{job.location}</span>
                          </div>

                          {/* Department */}
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span className="font-medium">{job.department}</span>
                          </div>

                          {/* Experience */}
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-[#7C1FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{job.experience}</span>
                          </div>
                        </div>

                        {/* Job Summary Description */}
                        <p className="text-xs sm:text-sm text-[#544F66] leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                    </div>

                    {/* EXPANDED FULL JOB DESCRIPTION ACCORDION */}
                    {isExpanded && (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="mt-6 pt-6 border-t border-[#EBE8EF] space-y-6 text-[#1E1B2E] animate-in fade-in slide-in-from-top-2 duration-300"
                      >
                        {/* 1. About the Role */}
                        <div>
                          <h3 className="text-sm font-extrabold text-[#7C1FA8] uppercase tracking-wider mb-2">
                            About the Role
                          </h3>
                          <p className="text-xs sm:text-sm text-[#544F66] leading-relaxed">
                            {job.aboutRole}
                          </p>
                        </div>

                        {/* 2. Key Responsibilities */}
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E1B2E] tracking-tight mb-2.5">
                            Key Responsibilities:
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#544F66]">
                            {(job.responsibilities || []).map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-[#7C1FA8] font-black text-sm mt-0.5">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 3. Requirements & Qualifications */}
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E1B2E] tracking-tight mb-2.5">
                            What We Are Looking For:
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#544F66]">
                            {(job.requirements || []).map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-[#7C1FA8] font-black text-sm mt-0.5">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 4. What We Offer */}
                        <div>
                          <h3 className="text-sm font-extrabold text-[#1E1B2E] tracking-tight mb-2.5">
                            What We Offer:
                          </h3>
                          <ul className="space-y-2 text-xs sm:text-sm text-[#544F66]">
                            {(job.benefits || []).map((ben, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-[#F5A623] font-black text-sm mt-0.5">✦</span>
                                <span>{ben}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bottom Expanded CTA Bar */}
                        <div className="pt-5 border-t border-[#F5F2F8] flex flex-col sm:flex-row items-center justify-between gap-3">
                          <button
                            onClick={() => toggleJobExpansion(job.id)}
                            className="text-xs text-[#8E8A9D] hover:text-[#7C1FA8] font-semibold transition-colors cursor-pointer"
                          >
                            ▲ Hide full description
                          </button>

                          <button
                            onClick={(e) => handleApplyClick(job, e)}
                            className="w-full sm:w-auto bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition-all cursor-pointer"
                          >
                            Apply for {job.title} →
                          </button>
                        </div>

                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* PAGINATION CONTROLS BAR (5 JOBS PER PAGE) */}
            {!jobsLoading && filteredJobs.length > 0 && (
              <div className="pt-6 border-t border-[#EBE8EF] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#8E8A9D] font-medium">
                  Showing <span className="font-extrabold text-[#1E1B2E]">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span>–<span className="font-extrabold text-[#1E1B2E]">{Math.min(currentPage * ITEMS_PER_PAGE, filteredJobs.length)}</span> of <span className="font-extrabold text-[#7C1FA8]">{filteredJobs.length}</span> open positions
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-2 rounded-xl border border-[#EBE8EF] bg-white text-xs font-extrabold text-[#1E1B2E] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAF5FD] hover:text-[#7C1FA8] transition-all cursor-pointer shadow-2xs"
                  >
                    ‹ Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs ${
                        currentPage === pageNum
                          ? 'bg-[#7C1FA8] text-white shadow-md'
                          : 'bg-white border border-[#EBE8EF] text-[#544F66] hover:bg-[#FAF5FD] hover:text-[#7C1FA8]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="px-3.5 py-2 rounded-xl border border-[#EBE8EF] bg-white text-xs font-extrabold text-[#1E1B2E] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAF5FD] hover:text-[#7C1FA8] transition-all cursor-pointer shadow-2xs"
                  >
                    Next ›
                  </button>
                </div>
              </div>
            )}

          </section>

        </div>

      </main>

      {/* 5. APPLY NOW POP-UP MODAL (ENQUIRY FORM) */}
      {selectedJob && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] w-full max-w-md shadow-2xl border border-purple-100 p-5 sm:p-6 relative my-auto animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE8EF] mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B2E] tracking-tight">
                  Apply for this position
                </h3>
                {selectedJob.title && (
                  <p className="text-xs text-[#7C1FA8] font-bold mt-0.5 truncate max-w-[280px]">
                    {selectedJob.title}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-[#FAF5FD] text-[#5E1083] hover:bg-purple-100 flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            {/* Application Enquiry Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-[#EBE8EF] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#EBE8EF] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] mb-1">
                  Phone Number
                </label>
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  countryCode={phoneCountryCode}
                  onCountryCodeChange={setPhoneCountryCode}
                  placeholder="Enter mobile number"
                />
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B2E] mb-1">
                  Message (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Tell us about your background or queries..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-[#EBE8EF] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-1"
              >
                Submit Application
              </button>

            </form>

          </div>
        </div>
      )}

      {/* 6. THANK YOU POP-UP MODAL */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] w-full max-w-md p-6 sm:p-8 shadow-2xl border border-purple-100 text-center relative animate-in zoom-in-95 duration-200">
            
            {/* Close X */}
            <button
              onClick={() => setShowThankYouModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
            >
              ✕
            </button>

            {/* Success Checkmark Animated Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-3xl mx-auto mb-4 font-bold shadow-sm">
              ✓
            </div>

            <h3 className="text-xl font-extrabold text-[#1E1B2E] mb-2">
              Application Submitted Successfully!
            </h3>

            <p className="text-xs sm:text-sm text-[#544F66] leading-relaxed mb-6">
              Thank you for your interest in joining PROSPERi5{submittedData?.role ? ` as a ${submittedData.role}` : ''}. Our talent acquisition team has received your details and will review your profile.
            </p>

            {/* Details Box */}
            {submittedData && (
              <div className="bg-[#FAF8FC] rounded-xl p-4 text-left border border-[#EBE8EF] mb-6 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8E8A9D]">Applicant:</span>
                  <span className="font-bold text-[#1E1B2E]">{submittedData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A9D]">Email:</span>
                  <span className="font-medium text-[#1E1B2E] truncate max-w-[180px]">{submittedData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8A9D]">Phone:</span>
                  <span className="font-medium text-[#1E1B2E]">{submittedData.phone}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowThankYouModal(false)}
              className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Back to Careers
            </button>

          </div>
        </div>
      )}

      {/* 7. TALK TO ADVISOR MODAL */}
      {talkAdvisorModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-[24px] w-full max-w-md p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-in zoom-in-95">
            <button
              onClick={() => setTalkAdvisorModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7C1FA8] flex items-center justify-center text-xl mb-4 font-bold">
              💼
            </div>
            <h3 className="text-xl font-extrabold text-[#1E1B2E] mb-2">Connect with Careers Team</h3>
            <p className="text-xs text-[#6C677E] leading-relaxed mb-6">
              Have questions about open roles, internships, or culture at PROSPERi5? Get in touch with our HR team.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendWhatsAppEnquiry({
                  formName: 'Connect with HR / Careers Team',
                  name: hrFormData.name,
                  phone: hrFormData.phone,
                  email: hrFormData.email
                });
                alert('Thank you! Our HR team will get back to you shortly.');
                setTalkAdvisorModal(false);
                setHrFormData({ name: '', phone: '', email: '' });
              }}
              className="space-y-3"
            >
              <input
                type="text"
                required
                value={hrFormData.name}
                onChange={(e) => setHrFormData({ ...hrFormData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]"
              />
              <PhoneInput
                value={hrFormData.phone}
                countryCode={hrFormData.countryCode}
                onCountryCodeChange={(code) => setHrFormData((f) => ({ ...f, countryCode: code }))}
                onChange={(val) => setHrFormData((f) => ({ ...f, phone: val }))}
                placeholder="Enter phone number"
              />
              <input
                type="email"
                required
                value={hrFormData.email}
                onChange={(e) => setHrFormData({ ...hrFormData, email: e.target.value })}
                placeholder="Enter your email address"
                className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]"
              />
              <button type="submit" className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2">
                Submit Query
              </button>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}
