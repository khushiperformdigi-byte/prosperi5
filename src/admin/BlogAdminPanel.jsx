import React, { useEffect, useState } from 'react';
import TinyEditor from './TinyEditor';
import {
  createAdminPost,
  deleteAdminPost,
  fetchAdminPost,
  fetchAdminPosts,
  resolveMediaUrl,
  updateAdminPost,
  uploadAdminMedia,
  uploadAdminMediaFromUrl,
} from '../api/blog';

const inputClass =
  'w-full border border-[#EBE8EF] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1B2E] bg-white focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8]';

const EMPTY = {
  id: '',
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  metaTitle: '',
  metaDescription: '',
  category: '',
  tags: '',
  authorName: 'Admin',
  authorRole: '',
  authorBio: '',
  readTimeMinutes: '',
  status: 'published',
  publishedAt: '',
  isPopular: false,
  allowComments: true,
  featuredImageId: null,
  featuredImageUrl: '',
  faqs: [{ question: '', answer: '' }],
};

function toDateInput(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

export default function BlogAdminPanel({ onUnauthorized }) {
  const [view, setView] = useState('list'); // list | edit
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', ok: true });

  const loadPosts = async () => {
    setLoading(true);
    try {
      const list = await fetchAdminPosts({
        status: statusFilter,
        q: search.trim() || undefined,
      });
      setPosts(list);
    } catch (error) {
      setMessage({ text: error.message || 'Failed to load posts', ok: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      loadPosts();
    }, search ? 250 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, search]);

  const openCreate = () => {
    setForm({
      ...EMPTY,
      publishedAt: toDateInput(new Date()),
    });
    setImageFile(null);
    setImageUrlInput('');
    setMessage({ text: '', ok: true });
    setView('edit');
  };

  const openEdit = async (id) => {
    try {
      const post = await fetchAdminPost(id);
      setForm({
        id: post.id,
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
        category: post.category || '',
        tags: (post.tags || []).join(', '),
        authorName: post.authorName || 'Admin',
        authorRole: post.authorRole || '',
        authorBio: post.authorBio || '',
        readTimeMinutes: post.readTimeMinutes || '',
        status: post.status || 'draft',
        publishedAt: toDateInput(post.publishedAt),
        isPopular: Boolean(post.isPopular),
        allowComments: post.allowComments !== false,
        featuredImageId: post.featuredImageId,
        featuredImageUrl: post.featuredImageUrl || post.featured_image_url || post.imageUrl || post.image_url || '',
        faqs:
          post.faqs?.length > 0
            ? post.faqs.map((f) => ({ question: f.question, answer: f.answer }))
            : [{ question: '', answer: '' }],
      });
      setImageFile(null);
      setImageUrlInput('');
      setMessage({ text: '', ok: true });
      setView('edit');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      if (error.status === 401) onUnauthorized?.();
      setMessage({ text: error.message, ok: false });
    }
  };

  const updateFaq = (index, key, value) => {
    setForm((prev) => {
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [key]: value };
      return { ...prev, faqs };
    });
  };

  const addFaq = () => {
    setForm((prev) => ({ ...prev, faqs: [...prev.faqs, { question: '', answer: '' }] }));
  };

  const removeFaq = (index) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage({ text: '', ok: true });

    try {
      let featuredImageId = form.featuredImageId || null;
      let featuredImageUrl = form.featuredImageUrl || '';

      if (imageFile) {
        try {
          const media = await uploadAdminMedia(imageFile);
          if (media) {
            featuredImageId = media.id || featuredImageId;
            featuredImageUrl = media.url || media.media?.url || featuredImageUrl;
          }
        } catch (err) {
          console.warn('Media file upload fallback:', err);
        }
      } else if (imageUrlInput.trim()) {
        featuredImageUrl = imageUrlInput.trim();
        try {
          const media = await uploadAdminMediaFromUrl(imageUrlInput.trim());
          if (media) {
            featuredImageId = media.id || featuredImageId;
            featuredImageUrl = media.url || media.media?.url || featuredImageUrl;
          }
        } catch (err) {
          console.warn('Media URL upload fallback:', err);
        }
      }

      const body = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        content: form.content,
        excerpt: form.excerpt.trim(),
        metaTitle: form.metaTitle.trim(),
        metaDescription: form.metaDescription.trim(),
        category: form.category.trim(),
        tags: form.tags,
        authorName: form.authorName.trim() || 'Admin',
        authorRole: form.authorRole.trim(),
        authorBio: form.authorBio.trim(),
        readTimeMinutes: form.readTimeMinutes === '' ? null : Number(form.readTimeMinutes),
        status: form.status,
        publishedAt: form.publishedAt || null,
        isPopular: form.isPopular,
        allowComments: form.allowComments,
        featuredImageId,
        featuredImageUrl,
        faqs: form.faqs.filter((f) => f.question.trim() && f.answer.trim()),
      };

      if (form.id) {
        await updateAdminPost(form.id, body);
        setMessage({ text: 'Post saved.', ok: true });
      } else {
        await createAdminPost(body);
        setMessage({ text: 'Post created.', ok: true });
      }

      await loadPosts();
      setView('list');
    } catch (error) {
      if (error.status === 401) onUnauthorized?.();
      setMessage({ text: error.message || 'Save failed', ok: false });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete “${post.title}”?`)) return;
    try {
      await deleteAdminPost(post.id);
      await loadPosts();
    } catch (error) {
      if (error.status === 401) onUnauthorized?.();
      setMessage({ text: error.message, ok: false });
    }
  };

  if (view === 'list') {
    return (
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-[#1E1B2E]">All Posts</h2>
            <p className="text-sm text-[#6F6A82]">Create, edit and publish blog articles.</p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="px-5 py-2.5 rounded-xl bg-[#C81E1E] hover:bg-[#A51818] text-white font-bold text-sm cursor-pointer"
          >
            Add New Post
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={inputClass}
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <input
            type="search"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} min-w-[200px]`}
          />
        </div>

        {message.text && view === 'list' && (
          <p className={`text-sm ${message.ok ? 'text-emerald-700' : 'text-red-600'}`}>{message.text}</p>
        )}

        <div className="bg-white border border-[#EBE8EF] rounded-[20px] overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-[#6F6A82]">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="p-6 text-sm text-[#6F6A82]">No posts yet. Click Add New Post.</p>
          ) : (
            <div className="divide-y divide-[#EBE8EF]">
              {posts.map((post) => (
                <div key={post.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <div className="flex gap-4 min-w-0">
                    {(post.featuredImageUrl || post.featured_image_url || post.imageUrl) ? (
                      <img
                        src={resolveMediaUrl(post.featuredImageUrl || post.featured_image_url || post.imageUrl)}
                        alt=""
                        className="w-20 h-14 object-cover rounded-lg border border-[#EBE8EF] shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-14 rounded-lg bg-[#FAF5FD] border border-[#EBE8EF] shrink-0" />
                    )}
                    <div className="min-w-0">
                      <h3 className="font-bold text-[#1E1B2E] truncate">{post.title}</h3>
                      <p className="text-xs text-[#6F6A82] mt-1">
                        {post.category || 'Uncategorized'} · {post.status} · {post.readTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(post.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#7C1FA8] text-white text-xs font-bold cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post)}
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 text-xs font-bold cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const previewUrl = imageFile
    ? URL.createObjectURL(imageFile)
    : form.featuredImageUrl
      ? resolveMediaUrl(form.featuredImageUrl)
      : '';

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-[#1E1B2E]">
          {form.id ? 'Edit Post' : 'Add New Post'}
        </h2>
        <button
          type="button"
          onClick={() => setView('list')}
          className="px-4 py-2 rounded-xl border border-[#EBE8EF] text-[#1E1B2E] font-bold text-sm hover:bg-white cursor-pointer"
        >
          All Posts
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
        <div className="space-y-5">
          <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 space-y-4">
            <label className="block">
              <span className="text-[11px] font-bold tracking-wide uppercase text-[#8E8A9D]">Title</span>
              <input
                required
                placeholder="Enter post title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={`${inputClass} mt-1.5 text-lg font-semibold`}
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-bold tracking-wide uppercase text-[#8E8A9D]">Permalink slug</span>
              <input
                placeholder="auto-from-title"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className={`${inputClass} mt-1.5`}
              />
            </label>
          </section>

          <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 space-y-3">
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#8E8A9D]">Content</span>
            <TinyEditor
              value={form.content}
              onChange={(content) => setForm((f) => ({ ...f, content }))}
            />
          </section>

          <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 space-y-3">
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#8E8A9D]">Excerpt</span>
            <textarea
              rows={3}
              placeholder="Short summary shown in blog cards..."
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className={inputClass}
            />
          </section>

          <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 space-y-3">
            <span className="text-[11px] font-bold tracking-wide uppercase text-[#8E8A9D]">SEO</span>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Meta Title
              <input
                placeholder="Optional SEO title"
                value={form.metaTitle}
                onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              />
            </label>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Meta Description
              <textarea
                rows={3}
                placeholder="Optional SEO description"
                value={form.metaDescription}
                onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              />
            </label>
          </section>

          <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-[#1E1B2E]">FAQs Schema</h3>
                <p className="text-xs text-[#6F6A82] mt-1">
                  These FAQs appear on the blog detail page and generate Google FAQPage structured data.
                </p>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="px-3 py-1.5 rounded-lg border border-[#EBE8EF] text-[#7C1FA8] text-xs font-bold cursor-pointer hover:bg-[#FAF5FD]"
              >
                + Add FAQ
              </button>
            </div>

            {form.faqs.map((faq, index) => (
              <div key={index} className="border border-[#EBE8EF] rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E1B2E]">FAQ #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-xs font-bold text-red-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <label className="block text-[11px] font-bold tracking-wide uppercase text-[#8E8A9D]">
                  Question
                  <input
                    value={faq.question}
                    onChange={(e) => updateFaq(index, 'question', e.target.value)}
                    className={`${inputClass} mt-1.5 normal-case font-normal`}
                  />
                </label>
                <label className="block text-[11px] font-bold tracking-wide uppercase text-[#8E8A9D]">
                  Answer
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                    className={`${inputClass} mt-1.5 normal-case font-normal`}
                  />
                </label>
              </div>
            ))}
          </section>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-24">
          <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 space-y-3">
            <h3 className="font-extrabold text-[#1E1B2E]">Publish</h3>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Status
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Publish Date
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-[#C81E1E] hover:bg-[#A51818] disabled:opacity-60 text-white font-extrabold cursor-pointer"
            >
              {saving ? 'Saving...' : 'Save Post'}
            </button>
            {message.text && (
              <p className={`text-sm ${message.ok ? 'text-emerald-700' : 'text-red-600'}`}>{message.text}</p>
            )}
          </section>

          <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 space-y-3">
            <h3 className="font-extrabold text-[#1E1B2E]">Featured Image</h3>
            <p className="text-xs text-[#6F6A82]">Stored permanently in the database (max 5MB).</p>
            {previewUrl && (
              <img src={previewUrl} alt="" className="w-full h-36 object-cover rounded-xl border border-[#EBE8EF]" />
            )}
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-1.5 block w-full text-xs"
              />
            </label>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Or Image URL
              <input
                placeholder="https://..."
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className={`${inputClass} mt-1.5 font-normal`}
              />
            </label>
            <p className="text-[11px] text-[#8E8A9D]">
              URL images are downloaded and saved into the database.
            </p>
          </section>

          <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 space-y-3">
            <h3 className="font-extrabold text-[#1E1B2E]">Post Details</h3>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Category
              <input
                placeholder="FOOD & RECIPES"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              />
            </label>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Tags
              <input
                placeholder="indian food, spices, recipes"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              />
              <span className="text-[11px] text-[#8E8A9D] font-normal">Comma-separated</span>
            </label>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Author
              <input
                value={form.authorName}
                onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              />
            </label>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Author role
              <input
                value={form.authorRole}
                onChange={(e) => setForm((f) => ({ ...f, authorRole: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              />
            </label>
            <label className="block text-xs font-bold text-[#1E1B2E]">
              Read Time
              <input
                placeholder="Auto if empty"
                value={form.readTimeMinutes}
                onChange={(e) => setForm((f) => ({ ...f, readTimeMinutes: e.target.value }))}
                className={`${inputClass} mt-1.5 font-normal`}
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1E1B2E]">
              <input
                type="checkbox"
                checked={form.isPopular}
                onChange={(e) => setForm((f) => ({ ...f, isPopular: e.target.checked }))}
              />
              Mark as popular
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1E1B2E]">
              <input
                type="checkbox"
                checked={form.allowComments}
                onChange={(e) => setForm((f) => ({ ...f, allowComments: e.target.checked }))}
              />
              Allow comments
            </label>
          </section>
        </aside>
      </div>
    </form>
  );
}
