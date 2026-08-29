import React, { useState, useEffect, useMemo } from 'react';
import Footer from './Footer';
import { sendWhatsAppEnquiry } from './utils/whatsapp';
import { fetchPublishedPosts, resolveMediaUrl } from './api/blog';
import PhoneInput from './components/PhoneInput';

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

function mapPost(post) {
  const rawImg = post.featuredImageUrl || post.featured_image_url || post.imageUrl || post.image_url || post.image;
  return {
    id: post.id,
    slug: post.slug,
    category: (post.category || 'Blog').toUpperCase(),
    categoryFilter: post.category || 'All',
    title: post.title,
    excerpt: post.excerpt || '',
    image: rawImg ? resolveMediaUrl(rawImg) : 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
    date: formatDate(post.publishedAt || post.createdAt),
    readTime: post.readTime || `${post.readTimeMinutes || 5} min read`,
    readTimeMinutes: post.readTimeMinutes || 5,
    author: {
      name: post.authorName || 'Admin',
      role: post.authorRole || '',
      avatar: '👤',
    },
    isPopular: Boolean(post.isPopular),
    content: post.content || '',
  };
}

const DEFAULT_9_BLOGS = [
  {
    id: 1,
    slug: 'mastering-asset-allocation-2026',
    category: 'WEALTH STRATEGY',
    categoryFilter: 'Wealth Strategy',
    title: 'Mastering Asset Allocation in 2026: A Complete Guide to Wealth Preservation',
    excerpt: 'Discover how structured multi-asset planning shields your portfolio from inflation while compounding long-term returns.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 28, 2026',
    readTime: '5 min read',
    readTimeMinutes: 5,
    author: { name: 'Prosperi5 Research', role: 'Wealth Advisory', avatar: '👤' },
    isPopular: true,
    content: 'In volatile global markets, relying on a single asset class increases capital risk. Modern portfolio strategy requires balancing equity, fixed income, and collateralized liquidity options like Loan Against Securities (LAS).'
  },
  {
    id: 2,
    slug: 'loan-against-securities-liquidity-guide',
    category: 'LIQUIDITY & LAS',
    categoryFilter: 'Liquidity & LAS',
    title: 'How Loan Against Securities (LAS) Unlocks Liquidity Without Selling Equity',
    excerpt: 'Learn how to leverage your existing stock and mutual fund investments to access immediate cash without triggering capital gains taxes.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 27, 2026',
    readTime: '6 min read',
    readTimeMinutes: 6,
    author: { name: 'Credit Solutions Team', role: 'LAS Advisory', avatar: '👤' },
    isPopular: false,
    content: 'Selling your equities for emergency funds means losing out on compounding wealth and paying high capital gains tax. A Loan Against Securities (LAS) allows you to pledge your mutual funds or shares at attractive interest rates.'
  },
  {
    id: 3,
    slug: 'sip-vs-lumpsum-investment-strategy',
    category: 'INVESTMENT STRATEGY',
    categoryFilter: 'Investment Strategy',
    title: 'SIP vs Lumpsum Investment: Which Strategy Yields Higher Returns in 2026?',
    excerpt: 'An in-depth comparative analysis of Systematic Investment Plans versus lump sum investing across different market cycles.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 26, 2026',
    readTime: '4 min read',
    readTimeMinutes: 4,
    author: { name: 'Analytics Team', role: 'Quantitative Research', avatar: '👤' },
    isPopular: false,
    content: 'Systematic Investment Plans (SIPs) reduce the impact of market volatility through Rupee Cost Averaging, making them ideal for salaried investors.'
  },
  {
    id: 4,
    slug: 'tax-planning-strategies-hni-india',
    category: 'TAX OPTIMIZATION',
    categoryFilter: 'Tax Optimization',
    title: 'Tax Planning Strategies for High Net Worth Individuals in India',
    excerpt: 'Optimize your tax liability across capital gains, debt instruments, and corporate structures with expert strategies.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 25, 2026',
    readTime: '7 min read',
    readTimeMinutes: 7,
    author: { name: 'Tax Advisory Group', role: 'Tax Structuring', avatar: '👤' },
    isPopular: false,
    content: 'High net worth individuals face up to 39% peak tax brackets. Utilizing Section 80C exemptions, tax-loss harvesting, and holding securities through family trusts can legally optimize annual tax exposure.'
  },
  {
    id: 5,
    slug: 'understanding-term-insurance-coverage-guide',
    category: 'PROTECTION & INSURANCE',
    categoryFilter: 'Protection & Insurance',
    title: 'Understanding Term Insurance: How Much Cover Do You Really Need?',
    excerpt: 'Calculate your financial human life value (HLV) to ensure complete security for your family with adequate term insurance.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 24, 2026',
    readTime: '5 min read',
    readTimeMinutes: 5,
    author: { name: 'Risk Management', role: 'Insurance Desk', avatar: '👤' },
    isPopular: false,
    content: 'A simple thumb rule is 15x to 20x your annual income. We outline how term insurance with critical illness riders guarantees peace of mind.'
  },
  {
    id: 6,
    slug: 'power-of-compounding-10-crore-portfolio',
    category: 'PERSONAL FINANCE',
    categoryFilter: 'Personal Finance',
    title: 'The Power of Compounding: Building a 10 Crore Portfolio Starting Early',
    excerpt: 'See the math behind compounding interest and how starting 5 years earlier cuts required monthly investment in half.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 23, 2026',
    readTime: '4 min read',
    readTimeMinutes: 4,
    author: { name: 'Wealth Insights', role: 'Editorial Team', avatar: '👤' },
    isPopular: false,
    content: 'Compounding transforms small monthly investments into substantial fortunes. Starting a ₹20,000 monthly SIP at age 25 at 12% CAGR yields over ₹10 Crore by age 60.'
  },
  {
    id: 7,
    slug: 'navigating-fixed-income-interest-rates',
    category: 'FIXED INCOME',
    categoryFilter: 'Fixed Income',
    title: 'Navigating Interest Rates & Fixed Income Securities in Market Volatility',
    excerpt: 'Discover how corporate bonds, NCDs, and government securities provide capital stability during stock market drawdowns.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 22, 2026',
    readTime: '5 min read',
    readTimeMinutes: 5,
    author: { name: 'Debt Desk', role: 'Fixed Income Advisory', avatar: '👤' },
    isPopular: false,
    content: 'Fixed income securities offer steady yields during stock market corrections. By diversifying 20-30% of your portfolio into sovereign gold bonds and AAA-rated corporate fixed deposits, you secure consistent passive income.'
  },
  {
    id: 8,
    slug: 'evaluating-mutual-fund-categories-guide',
    category: 'MUTUAL FUNDS',
    categoryFilter: 'Mutual Funds',
    title: 'Evaluating Mutual Fund Categories: Large Cap, Mid Cap, and Flexi Cap',
    excerpt: 'A complete comparison guide to mutual fund categories, risk-reward ratios, and optimal allocation for long-term growth.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 21, 2026',
    readTime: '6 min read',
    readTimeMinutes: 6,
    author: { name: 'Fund Research', role: 'Mutual Fund Analyst', avatar: '👤' },
    isPopular: false,
    content: 'Large-cap funds offer steady growth with lower volatility, mid-cap funds provide aggressive expansion opportunity, and flexi-cap funds allow fund managers dynamic sector rotation.'
  },
  {
    id: 9,
    slug: 'smart-debt-management-emi-optimization',
    category: 'FINANCIAL PLANNING',
    categoryFilter: 'Financial Planning',
    title: 'Smart Debt Management: Optimizing Loans and EMI Payoffs for Financial Freedom',
    excerpt: 'Strategies for prepayment, interest reduction, and consolidating high-cost credit debt into low-interest secured loans.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    date: 'Aug 20, 2026',
    readTime: '5 min read',
    readTimeMinutes: 5,
    author: { name: 'Financial Advisory', role: 'Planning Desk', avatar: '👤' },
    isPopular: false,
    content: 'Not all debt is equal. Replacing high-interest credit card debt or personal loans with low-cost Loan Against Securities (LAS) lowers monthly EMI burdens by up to 50%.'
  }
];

export default function BlogPage({ onNavigateHome, onNavigatePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [talkAdvisorModal, setTalkAdvisorModal] = useState(false);
  const [advisorForm, setAdvisorForm] = useState({ name: '', phone: '', countryCode: '+91', category: 'Mutual Funds & SIPs' });
  const [blogPosts, setBlogPosts] = useState(DEFAULT_9_BLOGS);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setPostsLoading(true);
      setPostsError('');
      try {
        const posts = await fetchPublishedPosts();
        if (!cancelled) {
          if (Array.isArray(posts) && posts.length > 0) {
            setBlogPosts(posts.map(mapPost));
          } else {
            setBlogPosts(DEFAULT_9_BLOGS);
          }
        }
      } catch (error) {
        if (!cancelled) {
          setBlogPosts(DEFAULT_9_BLOGS);
          setPostsError(error.message || 'Unable to load live blog posts.');
        }
      } finally {
        if (!cancelled) setPostsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || selectedArticle || talkAdvisorModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, selectedArticle, talkAdvisorModal]);

  const categories = useMemo(() => {
    const fromPosts = [...new Set(blogPosts.map((p) => p.categoryFilter).filter(Boolean))];
    return [{ id: 'All', label: 'All' }, ...fromPosts.map((c) => ({ id: c, label: c }))];
  }, [blogPosts]);

  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.isPopular) || blogPosts[0] || null;
  }, [blogPosts]);

  // Filtering & Sorting
  const filteredPosts = useMemo(() => {
    let list = [...blogPosts];

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.categoryFilter === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'latest') {
      // already latest first by default order
    } else if (sortBy === 'oldest') {
      list.reverse();
    } else if (sortBy === 'read-time-asc') {
      list.sort((a, b) => a.readTimeMinutes - b.readTimeMinutes);
    } else if (sortBy === 'read-time-desc') {
      list.sort((a, b) => b.readTimeMinutes - a.readTimeMinutes);
    }

    return list;
  }, [blogPosts, activeCategory, searchQuery, sortBy]);

  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const displayedPosts = filteredPosts.slice(
    (currentPageNum - 1) * postsPerPage,
    currentPageNum * postsPerPage
  );

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPageNum(pageNum);
      const el = document.getElementById('blog-grid-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className="w-full bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8] overflow-x-hidden">

      {/* 3. HERO SECTION BANNER - FULL WIDTH */}
      <section className="w-full overflow-hidden bg-[#FAF5FD]">
        <img
          src="/blog_hero_banner.png"
          alt="Ideas that help you grow, protect and manage your wealth - Insights & Knowledge by PROSPERi5"
          className="w-full h-auto block select-none"
        />
      </section>

      {/* 4. MAIN BLOG LISTING CONTENT */}
      <main id="blog-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* CATEGORY FILTER TABS & SORT / SEARCH BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10 pb-6 border-b border-[#EBE8EF]">

          {/* Category Filter Pills (Responsive scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setCurrentPageNum(1);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                    ? 'bg-[#5E1083] text-white shadow-md shadow-purple-900/15'
                    : 'bg-white text-[#544F66] border border-[#EBE8EF] hover:border-purple-300 hover:text-[#7C1FA8]'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 self-end lg:self-auto w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPageNum(1);
                }}
                className="w-full bg-white border border-[#EBE8EF] rounded-full pl-9 pr-8 py-2 text-xs text-[#1E1B2E] placeholder-[#8E8A9D] focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8] transition-all"
              />
              <svg className="w-4 h-4 text-[#8E8A9D] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#EBE8EF] text-[#1E1B2E] font-semibold text-xs sm:text-sm rounded-full pl-4 pr-9 py-2 focus:outline-none focus:border-[#7C1FA8] transition-all cursor-pointer shadow-2xs"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="read-time-asc">Quick Reads (Shortest)</option>
                <option value="read-time-desc">In-Depth Reads</option>
              </select>
              <svg className="w-4 h-4 text-[#544F66] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {postsLoading && (
          <div className="mb-8 bg-white rounded-[24px] border border-[#EBE8EF] p-8 text-sm text-[#544F66]">
            Loading articles...
          </div>
        )}

        {!postsLoading && postsError && (
          <div className="mb-8 bg-white rounded-[24px] border border-red-100 p-8 text-sm text-red-700">
            {postsError}
          </div>
        )}

        {/* 5. FEATURED BLOG CARD */}
        {!postsLoading && featuredPost && activeCategory === 'All' && !searchQuery && currentPageNum === 1 && (
          <div
            onClick={() => onNavigatePage ? onNavigatePage('blog-detail', featuredPost.id) : setSelectedArticle(featuredPost)}
            className="mb-12 bg-white rounded-[24px] border border-[#EBE8EF] overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(124,31,168,0.08)] hover:border-purple-200 transition-all duration-300 group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Image Section */}
              <div className="lg:col-span-6 relative overflow-hidden bg-purple-50 min-h-[260px] sm:min-h-[340px] lg:min-h-[380px]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Content Section */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  {/* Category / Featured Tag */}
                  <div className="inline-block mb-3 sm:mb-4">
                    <span className="text-[#7C1FA8] font-black text-xs tracking-wider uppercase bg-[#F5EEFB] px-3 py-1 rounded-md border border-purple-100">
                      FEATURED
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#544F66] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Meta Row */}
                <div className="flex items-center justify-between pt-4 border-t border-[#F5F2F8] text-xs sm:text-sm text-[#8E8A9D]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#8E8A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {featuredPost.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-[#8E8A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <span className="text-[#7C1FA8] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <span className="text-base leading-none">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. BLOG CARDS GRID (3 Columns Responsive) */}
        {displayedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {displayedPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onNavigatePage ? onNavigatePage('blog-detail', post.id) : setSelectedArticle(post)}
                className="bg-white rounded-[24px] border border-[#EBE8EF] overflow-hidden shadow-sm hover:shadow-[0_18px_40px_rgba(124,31,168,0.08)] hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Card Top Image */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-purple-50">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    {/* Category */}
                    <span className="text-[#7C1FA8] text-[11px] sm:text-xs font-black tracking-wider uppercase block mb-2.5">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#1E1B2E] group-hover:text-[#7C1FA8] transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#6C677E] text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer / Meta */}
                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#F5F2F8] flex items-center justify-between text-[11px] sm:text-xs text-[#8E8A9D]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#8E8A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <span className="text-[#7C1FA8] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read article <span className="text-sm">→</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[24px] border border-[#EBE8EF] p-8 mb-14">
            <div className="w-14 h-14 rounded-full bg-purple-50 text-[#7C1FA8] flex items-center justify-center text-2xl mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-[#1E1B2E] mb-2">No articles found</h3>
            <p className="text-sm text-[#8E8A9D] max-w-md mx-auto mb-6">
              We couldn't find any articles matching your search or category filter. Try clearing filters or exploring other topics.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="bg-[#7C1FA8] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#6b1a91] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 7. PAGINATION SECTION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-16 select-none">
            {/* Previous Arrow */}
            <button
              onClick={() => handlePageChange(currentPageNum - 1)}
              disabled={currentPageNum === 1}
              className="w-10 h-10 rounded-xl border border-[#EBE8EF] bg-white flex items-center justify-center text-[#544F66] hover:border-purple-300 hover:text-[#7C1FA8] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
              aria-label="Previous Page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
              const isActive = currentPageNum === num;
              return (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${isActive
                    ? 'bg-[#5E1083] text-white shadow-sm'
                    : 'bg-white border border-[#EBE8EF] text-[#544F66] hover:border-purple-300 hover:text-[#7C1FA8]'
                    }`}
                >
                  {num}
                </button>
              );
            })}

            {/* Next Arrow */}
            <button
              onClick={() => handlePageChange(currentPageNum + 1)}
              disabled={currentPageNum === totalPages}
              className="w-10 h-10 rounded-xl border border-[#EBE8EF] bg-white flex items-center justify-center text-[#544F66] hover:border-purple-300 hover:text-[#7C1FA8] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-2xs"
              aria-label="Next Page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* 8. NEWSLETTER / WEALTH DIGEST CTA */}


      </main>

      {/* 9. ARTICLE DETAIL MODAL / READER */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-100 flex flex-col relative my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-[#EBE8EF] flex items-center justify-between z-20">
              <span className="text-[#7C1FA8] font-black text-xs uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-[#FAF5FD] text-[#5E1083] hover:bg-purple-100 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-purple-50">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-10 space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B2E] leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Author & Meta Row */}
              <div className="flex items-center justify-between py-3 border-y border-[#EBE8EF] text-xs text-[#8E8A9D]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-base">
                    {selectedArticle.author?.avatar || '✍️'}
                  </div>
                  <div>
                    <span className="font-bold text-[#1E1B2E] block">{selectedArticle.author?.name || 'Editorial Team'}</span>
                    <span className="text-[11px] text-[#8E8A9D]">{selectedArticle.author?.role || 'PROSPERi5 Insights'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              {/* Rich Body Content */}
              <div
                className="prose prose-purple max-w-none text-[#544F66] text-sm sm:text-base leading-relaxed space-y-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#1E1B2E] [&>h4]:text-lg [&>h4]:font-bold [&>h4]:text-[#1E1B2E] [&>blockquote]:border-l-4 [&>blockquote]:border-[#7C1FA8] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#7C1FA8]"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Share & Feedback Row */}
              <div className="pt-6 border-t border-[#EBE8EF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#1E1B2E]">Was this article helpful?</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Article link copied to clipboard!');
                      }
                    }}
                    className="bg-[#FAF5FD] hover:bg-purple-100 text-[#7C1FA8] font-bold text-xs px-4 py-2 rounded-full border border-purple-200 transition-all cursor-pointer"
                  >
                    🔗 Share Article
                  </button>
                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      setTalkAdvisorModal(true);
                    }}
                    className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold text-xs px-4 py-2 rounded-full shadow transition-all cursor-pointer"
                  >
                    Consult an Advisor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. TALK TO ADVISOR MODAL */}
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
              💬
            </div>
            <h3 className="text-xl font-extrabold text-[#1E1B2E] mb-2">Speak to a Wealth Advisor</h3>
            <p className="text-xs text-[#6C677E] leading-relaxed mb-6">
              Get personalized financial advice tailored to your goals. Our certified experts are ready to guide you.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendWhatsAppEnquiry({
                  formName: 'Speak to a Wealth Advisor (Blog)',
                  name: advisorForm.name,
                  phone: advisorForm.phone,
                  email: advisorForm.email,
                  service: advisorForm.category
                });
                alert('Thank you! An advisor will call you shortly.');
                setTalkAdvisorModal(false);
                setAdvisorForm({ name: '', phone: '', email: '', category: 'Mutual Funds & SIPs' });
              }}
              className="space-y-3"
            >
              <input
                type="text"
                required
                value={advisorForm.name}
                onChange={(e) => setAdvisorForm({ ...advisorForm, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]"
              />
              <PhoneInput
                value={advisorForm.phone}
                countryCode={advisorForm.countryCode}
                onCountryCodeChange={(code) => setAdvisorForm((f) => ({ ...f, countryCode: code }))}
                onChange={(val) => setAdvisorForm((f) => ({ ...f, phone: val }))}
                placeholder="Phone number"
              />
              <input
                type="email"
                value={advisorForm.email}
                onChange={(e) => setAdvisorForm({ ...advisorForm, email: e.target.value })}
                placeholder="Enter your email address"
                className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]"
              />
              <select
                value={advisorForm.category}
                onChange={(e) => setAdvisorForm({ ...advisorForm, category: e.target.value })}
                className="w-full bg-[#FAF8FC] border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-xs text-[#1E1B2E] focus:outline-none focus:border-[#7C1FA8]"
              >
                <option value="Mutual Funds & SIPs">Mutual Funds & SIPs</option>
                <option value="Term / Health Insurance">Term / Health Insurance</option>
                <option value="Loan Against Securities / LAP">Loan Against Securities / LAP</option>
                <option value="Tax Planning">Tax Planning</option>
              </select>
              <button type="submit" className="w-full bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all cursor-pointer mt-2">
                Request Free Callback
              </button>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}
