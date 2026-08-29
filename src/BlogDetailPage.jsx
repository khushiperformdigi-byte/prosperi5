import React, { useState, useEffect } from 'react';
import { sendWhatsAppEnquiry } from './utils/whatsapp';
import { fetchPublishedPost, fetchPublishedPosts, resolveMediaUrl } from './api/blog';
import PhoneInput from './components/PhoneInput';

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BlogDetailPage({ onNavigateHome, onNavigatePage, articleId }) {
  const [copiedToast, setCopiedToast] = useState(false);
  const [talkAdvisorModal, setTalkAdvisorModal] = useState(false);
  const [currentId, setCurrentId] = useState(articleId || '');
  const [advisorForm, setAdvisorForm] = useState({
    name: '',
    phone: '',
    countryCode: '+91',
    email: '',
    category: 'Blog enquiry',
  });
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (articleId) setCurrentId(articleId);
  }, [articleId]);

  useEffect(() => {
    if (talkAdvisorModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [talkAdvisorModal]);

  useEffect(() => {
    if (!currentId) return undefined;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const [post, posts] = await Promise.all([
          fetchPublishedPost(currentId),
          fetchPublishedPosts(),
        ]);
        if (cancelled) return;
        setArticle(post);
        setRelatedArticles(
          posts
            .filter((p) => p.id !== post.id)
            .slice(0, 4)
            .map((p) => ({
              id: p.id,
              category: (p.category || 'Blog').toUpperCase(),
              title: p.title,
              readTime: p.readTime,
              image: resolveMediaUrl(p.featuredImageUrl) || '/blog_sip_coins.jpg',
            }))
        );
        document.title = post.metaTitle || post.title;
      } catch (err) {
        if (!cancelled) {
          setArticle(null);
          setError(err.message || 'Post not found');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      cancelled = true;
    };
  }, [currentId]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const handleSelectRelated = (id) => {
    setCurrentId(id);
    if (onNavigatePage) onNavigatePage('blog-detail', id);
  };

  const faqJsonLd =
    article?.faqs?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  if (loading) {
    return (
      <div className="w-full bg-[#FAF8FC] min-h-[50vh] flex items-center justify-center text-sm text-[#544F66]">
        Loading article...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full bg-[#FAF8FC] min-h-[50vh] flex flex-col items-center justify-center gap-4 text-sm text-red-700 px-4">
        <p>{error || 'Post not found'}</p>
        <button
          type="button"
          onClick={() => onNavigatePage && onNavigatePage('blog')}
          className="text-[#7C1FA8] font-bold cursor-pointer"
        >
          ← Back to blog
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF8FC] font-sans text-[#1E1B2E] antialiased selection:bg-purple-100 selection:text-[#7C1FA8]">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav className="flex items-center gap-2 text-xs sm:text-[13px] text-[#8E8A9D] font-medium mb-6 flex-wrap">
          <button onClick={onNavigateHome} className="hover:text-[#7C1FA8] transition-colors cursor-pointer">
            Home
          </button>
          <span className="text-[#8E8A9D]/60">&gt;</span>
          <button
            onClick={() => onNavigatePage && onNavigatePage('blog')}
            className="hover:text-[#7C1FA8] transition-colors cursor-pointer"
          >
            Blog
          </button>
          <span className="text-[#8E8A9D]/60">&gt;</span>
          <span className="text-[#7C1FA8] font-semibold truncate max-w-[280px] sm:max-w-md">
            {article.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <article className="lg:col-span-8 bg-transparent">
            <span className="text-[#7C1FA8] font-black text-xs uppercase tracking-wider block mb-3">
              {article.category || 'Blog'}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#1E1B2E] leading-tight mb-4 tracking-tight">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-[#544F66] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center gap-6 text-xs sm:text-sm text-[#8E8A9D] mb-8 relative">
              <div className="flex items-center gap-1.5">
                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{article.readTime}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-[#544F66] hover:text-[#7C1FA8] transition-colors cursor-pointer font-medium"
              >
                <span>Share</span>
              </button>
              {copiedToast && (
                <span className="absolute left-48 bg-[#1E1B2E] text-white text-[11px] px-3 py-1 rounded-md shadow">
                  Link copied!
                </span>
              )}
            </div>

            {article.featuredImageUrl && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] mb-8 bg-purple-50 shadow-sm">
                <img
                  src={resolveMediaUrl(article.featuredImageUrl)}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-purple max-w-none text-[#3A3549] text-[15px] sm:text-base leading-[1.75] [&_img]:rounded-xl [&_img]:max-w-full [&_h2]:text-[#1E1B2E] [&_h3]:text-[#1E1B2E] [&_a]:text-[#7C1FA8]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {article.faqs?.length > 0 && (
              <section className="mt-10 pt-8 border-t border-[#EBE8EF] space-y-4">
                <h2 className="text-xl font-extrabold text-[#1E1B2E]">FAQs</h2>
                {article.faqs.map((faq) => (
                  <div key={faq.id || faq.question} className="bg-white border border-[#EBE8EF] rounded-2xl p-5">
                    <h3 className="font-bold text-[#1E1B2E] text-sm mb-2">{faq.question}</h3>
                    <p className="text-sm text-[#544F66] leading-relaxed whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                ))}
              </section>
            )}

            <div className="pt-8 mt-10 border-t border-[#EBE8EF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => onNavigatePage && onNavigatePage('blog')}
                className="inline-flex items-center gap-2 text-[#7C1FA8] font-bold text-sm hover:underline cursor-pointer"
              >
                <span>←</span> Back to all articles
              </button>
              <button
                onClick={() => setTalkAdvisorModal(true)}
                className="bg-[#7C1FA8] hover:bg-[#6b1a91] text-white font-bold text-xs px-5 py-2 rounded-full shadow transition-all cursor-pointer"
              >
                Consult an Advisor
              </button>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-[24px] border border-[#EBE8EF] p-6 shadow-sm">
              <h3 className="text-[#1E1B2E] font-extrabold text-base">About the Author</h3>
              <div className="w-9 h-1 bg-[#7C1FA8] rounded-full mt-2 mb-5" />
              <div className="mb-3">
                <h4 className="font-bold text-sm text-[#1E1B2E]">{article.authorName || 'Admin'}</h4>
                {article.authorRole && (
                  <p className="text-xs text-[#8E8A9D] font-medium mt-0.5">{article.authorRole}</p>
                )}
              </div>
              {article.authorBio && (
                <p className="text-xs sm:text-[13px] text-[#544F66] leading-relaxed font-normal">
                  {article.authorBio}
                </p>
              )}
            </div>

            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-[24px] border border-[#EBE8EF] p-6 shadow-sm">
                <h3 className="text-[#1E1B2E] font-extrabold text-base mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectRelated(item.id)}
                      className="w-full text-left flex gap-3 group cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-16 h-14 object-cover rounded-lg border border-[#EBE8EF] shrink-0"
                      />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-[#7C1FA8]">{item.category}</p>
                        <p className="text-xs font-bold text-[#1E1B2E] group-hover:text-[#7C1FA8] line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-[#8E8A9D] mt-0.5">{item.readTime}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {talkAdvisorModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendWhatsAppEnquiry({
                formName: `Blog Advisor (${article.title})`,
                name: advisorForm.name,
                phone: advisorForm.phone,
                email: advisorForm.email,
                service: advisorForm.category,
              });
              setTalkAdvisorModal(false);
              setAdvisorForm({ name: '', phone: '', email: '', category: 'Blog enquiry' });
            }}
            className="bg-white rounded-[24px] w-full max-w-md p-6 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-lg">Talk to an Advisor</h3>
              <button type="button" onClick={() => setTalkAdvisorModal(false)} className="cursor-pointer">
                ✕
              </button>
            </div>
            <input
              required
              placeholder="Name"
              value={advisorForm.name}
              onChange={(e) => setAdvisorForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-sm"
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
              required
              placeholder="Email"
              value={advisorForm.email}
              onChange={(e) => setAdvisorForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-sm"
            />
            <button type="submit" className="w-full bg-[#7C1FA8] text-white font-bold rounded-xl py-3 cursor-pointer">
              Submit
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
