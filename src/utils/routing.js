// SEO-Optimized Routing Utility for Prosperi5

export const PAGE_ROUTES = {
  'home': '/',
  'about': '/about',
  'investment': '/investment',
  'insurance': '/insurance',
  'financing': '/financing',
  'investors': '/investors',
  'protect': '/protect',
  'borrow': '/borrow',
  'loan': '/loan',
  'grow': '/grow',
  'knowledge': '/knowledge-center',
  'partner': '/partner-b2b',
  'personal-finance': '/personal-finance',
  'tax': '/tax-solutions',
  'insights': '/market-insights',
  'tools': '/tools',
  'sip-calculator': '/tools/sip-calculator',
  'emi-calculator': '/tools/emi-calculator',
  'term-insurance-calculator': '/tools/term-insurance-calculator',
  'loan-against-securities': '/tools/loan-against-securities',
  'blog': '/blog',
  'blog-detail': '/blog/detail',
  'blog-admin': '/blog-admin',
  'admin': '/admin',
  'careers': '/careers',
  'careers-admin': '/careers-admin',
  'privacy-policy': '/privacy-policy',
  'terms-and-conditions': '/terms-and-conditions'
};

export const PAGE_TITLES = {
  'home': 'Prosperi5 - Integrated Financial Ecosystem | Wealth, Investments & Loans',
  'about': 'About Us - Prosperi5 | Leading Financial Services Platform',
  'investment': 'Investment Solutions - Prosperi5 | Wealth Management & Mutual Funds',
  'insurance': 'Insurance Solutions - Prosperi5 | Health, Life & Term Protection',
  'financing': 'Business Financing - Prosperi5 | Capital & Growth Solutions',
  'investors': 'Investor Relations - Prosperi5',
  'protect': 'Wealth Protection - Prosperi5',
  'borrow': 'Borrow & Credit Solutions - Prosperi5',
  'loan': 'Loans & Credit Facilities - Prosperi5',
  'grow': 'Wealth Growth Solutions - Prosperi5',
  'knowledge': 'Knowledge Center - Prosperi5 | Financial Education & Guides',
  'partner': 'Partner With Us - Prosperi5 B2B Partner Ecosystem',
  'personal-finance': 'Personal Finance Solutions - Prosperi5',
  'tax': 'Tax Solutions & Advisory - Prosperi5',
  'insights': 'Market Insights & Analysis - Prosperi5',
  'tools': 'Financial Calculators & Smart Tools - Prosperi5',
  'sip-calculator': 'SIP Calculator - Calculate Mutual Fund Returns | Prosperi5',
  'emi-calculator': 'EMI Calculator - Loan Monthly Installment Calculator | Prosperi5',
  'term-insurance-calculator': 'Term Insurance Calculator - Coverage Needs | Prosperi5',
  'loan-against-securities': 'Loan Against Securities Calculator - LAS Eligibility | Prosperi5',
  'blog': 'Financial Blog & Industry News - Prosperi5',
  'blog-detail': 'Blog Article - Prosperi5',
  'blog-admin': 'Blog Admin Panel - Prosperi5',
  'admin': 'Admin Portal - Prosperi5',
  'careers': 'Careers & Open Roles - Prosperi5',
  'careers-admin': 'Careers Admin - Prosperi5',
  'privacy-policy': 'Privacy Policy - Prosperi5',
  'terms-and-conditions': 'Terms & Conditions - Prosperi5'
};

export const getPathForPage = (page, articleId = null) => {
  if (page === 'blog-detail' && articleId) {
    return `/blog/detail?id=${articleId}`;
  }
  return PAGE_ROUTES[page] || '/';
};

export const getPageFromUrl = () => {
  const hash = window.location.hash ? window.location.hash.replace('#', '').trim().toLowerCase() : '';
  let pathname = window.location.pathname.toLowerCase().trim();
  const search = window.location.search;

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Prioritize hash if present for migration from legacy hash links
  const rawKey = hash || pathname;
  const cleanKey = rawKey.replace(/^[\/#]+/, '');

  let targetPage = 'home';

  switch (cleanKey) {
    case '':
    case 'home':
      targetPage = 'home';
      break;
    case 'about':
      targetPage = 'about';
      break;
    case 'investment':
      targetPage = 'investment';
      break;
    case 'insurance':
      targetPage = 'insurance';
      break;
    case 'financing':
      targetPage = 'financing';
      break;
    case 'investors':
      targetPage = 'investors';
      break;
    case 'protect':
      targetPage = 'protect';
      break;
    case 'borrow':
      targetPage = 'borrow';
      break;
    case 'loan':
    case 'loans':
      targetPage = 'loan';
      break;
    case 'grow':
      targetPage = 'grow';
      break;
    case 'knowledge':
    case 'knowledge-center':
      targetPage = 'knowledge';
      break;
    case 'partner':
    case 'partner-b2b':
      targetPage = 'partner';
      break;
    case 'personal-finance':
    case 'personalfinance':
    case 'finance':
      targetPage = 'personal-finance';
      break;
    case 'tax':
    case 'tax-solutions':
    case 'taxsolutions':
      targetPage = 'tax';
      break;
    case 'insights':
    case 'market-insights':
    case 'marketinsights':
    case 'market':
      targetPage = 'insights';
      break;
    case 'tools':
      targetPage = 'tools';
      break;
    case 'tools/sip-calculator':
    case 'sip-calculator':
      targetPage = 'sip-calculator';
      break;
    case 'tools/emi-calculator':
    case 'emi-calculator':
      targetPage = 'emi-calculator';
      break;
    case 'tools/term-insurance-calculator':
    case 'term-insurance-calculator':
      targetPage = 'term-insurance-calculator';
      break;
    case 'tools/loan-against-securities':
    case 'loan-against-securities':
    case 'las-calculator':
      targetPage = 'loan-against-securities';
      break;
    case 'blog':
    case 'blogs':
      targetPage = 'blog';
      break;
    case 'blog/detail':
    case 'blog-detail':
      targetPage = 'blog-detail';
      break;
    case 'careers':
    case 'career':
      targetPage = 'careers';
      break;
    case 'careers-admin':
      targetPage = 'careers-admin';
      break;
    case 'privacy-policy':
    case 'privacy':
      targetPage = 'privacy-policy';
      break;
    case 'terms-and-conditions':
    case 'terms':
      targetPage = 'terms-and-conditions';
      break;
    default:
      targetPage = 'home';
  }

  let articleId = null;
  if (targetPage === 'blog-detail' && search) {
    const params = new URLSearchParams(search);
    articleId = params.get('id');
  }

  return { page: targetPage, articleId, hadHash: Boolean(hash) };
};
