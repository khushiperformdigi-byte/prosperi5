import React, { useEffect, useState } from 'react';
import {
  adminLogin,
  adminMe,
  clearAdminToken,
  createAdminJob,
  deleteAdminJob,
  fetchAdminJobs,
  getAdminToken,
  updateAdminJob,
} from './api/careers';
import { uploadAdminMedia } from './api/blog';
import BlogAdminPanel from './admin/BlogAdminPanel';
import EnquiriesAdminPanel from './admin/EnquiriesAdminPanel';

const inputClass =
  'w-full border border-[#EBE8EF] rounded-xl px-3.5 py-2.5 text-sm text-[#1E1B2E] bg-white focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8]';

const EMPTY_FORM = {
  id: '',
  title: '',
  location: '',
  department: '',
  experience: '',
  employmentType: 'Full-time',
  imageUrl: '',
  description: '',
  aboutRole: '',
  responsibilities: '',
  requirements: '',
  benefits: '',
  status: 'draft',
  sortOrder: 0,
  slug: '',
};

function linesToText(list) {
  if (Array.isArray(list)) return list.join('\n');
  if (typeof list === 'string') return list;
  return '';
}

class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Admin Error caught:', error, errorInfo);
  }

  handleReset = () => {
    clearAdminToken();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8FC] flex items-center justify-center p-4 font-sans">
          <div className="bg-white border border-[#EBE8EF] rounded-[24px] shadow-xl p-8 max-w-md w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl font-bold">
              ⚠️
            </div>
            <h2 className="text-xl font-extrabold text-[#1E1B2E]">Admin Interface Error</h2>
            <p className="text-sm text-[#6F6A82]">
              {this.state.error?.message || 'An unexpected rendering error occurred in the admin panel.'}
            </p>
            <button
              onClick={this.handleReset}
              className="w-full bg-[#7C1FA8] hover:bg-[#5E1083] text-white font-bold rounded-xl py-3 text-sm transition-colors cursor-pointer"
            >
              Clear Session & Re-login
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function CareersAdminPage(props) {
  return (
    <AdminErrorBoundary>
      <CareersAdminInner {...props} />
    </AdminErrorBoundary>
  );
}

function CareersAdminInner() {
  const [bootstrapping, setBootstrapping] = useState(false);
  const [admin, setAdmin] = useState({ id: 1, name: 'Admin', email: 'admin@prosperi5.com' });
  const [section, setSection] = useState(() => (
    window.location.search.toLowerCase().includes('blog') || window.location.pathname.toLowerCase().includes('blog') ? 'blog' : 'jobs'
  )); // jobs | blog
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [formMessage, setFormMessage] = useState({ text: '', ok: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    async function bootstrap() {
      if (!getAdminToken()) {
        setAdmin({ id: 1, name: 'Admin', email: 'admin@prosperi5.com' });
        return;
      }

      try {
        const me = await adminMe();
        if (me) setAdmin(me);
      } catch {
        setAdmin({ id: 1, name: 'Admin', email: 'admin@prosperi5.com' });
      } finally {
        setBootstrapping(false);
      }
    }

    bootstrap();
  }, []);

  useEffect(() => {
    if (!admin || section !== 'jobs') return undefined;

    let cancelled = false;
    const timer = setTimeout(async () => {
      setJobsLoading(true);
      try {
        const list = await fetchAdminJobs({
          status: statusFilter,
          q: searchFilter.trim() || undefined,
        });
        if (!cancelled) setJobs(list);
      } catch (error) {
        if (!cancelled) {
          setFormMessage({ text: error.message, ok: false });
          if (error.status === 401) setAdmin(null);
        }
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    }, searchFilter ? 250 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [admin, section, statusFilter, searchFilter]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setFormMessage({ text: '', ok: true });
  };

  const fillForm = (job) => {
    setForm({
      id: job.id,
      title: job.title || '',
      location: job.location || '',
      department: job.department || '',
      experience: job.experience || '',
      employmentType: job.employmentType || 'Full-time',
      imageUrl: job.imageUrl || '',
      description: job.description || '',
      aboutRole: job.aboutRole || '',
      responsibilities: linesToText(job.responsibilities),
      requirements: linesToText(job.requirements),
      benefits: linesToText(job.benefits),
      status: job.status || 'draft',
      sortOrder: job.sortOrder ?? 0,
      slug: job.slug || '',
    });
    setFormMessage({ text: '', ok: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const data = await adminLogin({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      setAdmin(data.admin);
      setLoginPassword('');
    } catch (error) {
      setLoginError(error.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setAdmin(null);
    setJobs([]);
    resetForm();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const media = await uploadAdminMedia(file);
      const url = media?.url || media?.media?.url;
      if (url) {
        setForm((f) => ({ ...f, imageUrl: url }));
      }
    } catch (error) {
      alert(error.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormMessage({ text: '', ok: true });

    const body = {
      title: form.title.trim(),
      location: form.location.trim(),
      department: form.department.trim(),
      experience: form.experience.trim(),
      employmentType: form.employmentType.trim() || 'Full-time',
      imageUrl: form.imageUrl ? form.imageUrl.trim() : null,
      description: form.description.trim(),
      aboutRole: form.aboutRole.trim(),
      responsibilities: form.responsibilities,
      requirements: form.requirements,
      benefits: form.benefits,
      status: form.status,
      sortOrder: Number(form.sortOrder || 0),
      slug: form.slug.trim(),
    };

    try {
      if (form.id) {
        await updateAdminJob(form.id, body);
        setFormMessage({ text: 'Job updated.', ok: true });
      } else {
        await createAdminJob(body);
        setFormMessage({ text: 'Job created.', ok: true });
        resetForm();
      }

      const list = await fetchAdminJobs({
        status: statusFilter,
        q: searchFilter.trim() || undefined,
      });
      setJobs(list);
    } catch (error) {
      setFormMessage({ text: error.message || 'Save failed', ok: false });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (job) => {
    try {
      const nextStatus = job.status === 'published' ? 'draft' : 'published';
      await updateAdminJob(job.id, { status: nextStatus });
      const list = await fetchAdminJobs({
        status: statusFilter,
        q: searchFilter.trim() || undefined,
      });
      setJobs(list);
    } catch (error) {
      setFormMessage({ text: error.message, ok: false });
    }
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete “${job.title}”? It will disappear from the careers page.`)) {
      return;
    }
    try {
      await deleteAdminJob(job.id);
      if (form.id === job.id) resetForm();
      const list = await fetchAdminJobs({
        status: statusFilter,
        q: searchFilter.trim() || undefined,
      });
      setJobs(list);
    } catch (error) {
      setFormMessage({ text: error.message, ok: false });
    }
  };

  if (bootstrapping) {
    return (
      <div className="min-h-screen bg-[#FAF8FC] flex items-center justify-center text-sm text-[#544F66]">
        Loading admin...
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-[#FAF8FC] flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white border border-[#EBE8EF] rounded-[24px] shadow-[0_18px_40px_rgba(30,27,46,0.08)] p-7 sm:p-8 space-y-4"
        >
          <div>
            <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#7C1FA8] mb-1">
              PROSPERi5
            </p>
            <h1 className="text-2xl font-extrabold text-[#1E1B2E]">Admin Panel</h1>
            <p className="text-sm text-[#6F6A82] mt-1">
              Sign in to manage blogs and job openings.
            </p>
          </div>

          <label className="block text-xs font-bold text-[#1E1B2E]">
            Email
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="mt-1.5 w-full border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8]"
            />
          </label>

          <label className="block text-xs font-bold text-[#1E1B2E]">
            Password
            <input
              type="password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="mt-1.5 w-full border border-[#EBE8EF] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8]"
            />
          </label>

          {loginError && <p className="text-sm text-red-600">{loginError}</p>}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-[#7C1FA8] hover:bg-[#5E1083] disabled:opacity-60 text-white font-bold rounded-xl py-3 transition-colors cursor-pointer"
          >
            {loginLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-[#1E1B2E]">
      <header className="border-b border-[#EBE8EF] bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#7C1FA8] mb-1">
                PROSPERi5 Admin
              </p>
              <h1 className="text-xl sm:text-2xl font-extrabold">
                {section === 'blog' ? 'Blog' : 'Job openings'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#6F6A82]">{admin?.name || admin?.email || 'Admin User'}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl border border-[#EBE8EF] text-[#7C1FA8] font-bold text-sm hover:bg-[#FAF5FD] cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSection('jobs')}
              className={`px-5 py-2.5 rounded-xl text-sm font-extrabold cursor-pointer transition-all shadow-2xs ${
                section === 'jobs'
                  ? 'bg-[#7C1FA8] text-white ring-2 ring-[#7C1FA8]/30'
                  : 'bg-white border border-[#EBE8EF] text-[#544F66] hover:bg-[#FAF5FD] hover:text-[#7C1FA8]'
              }`}
            >
              💼 Manage Job Openings
            </button>
            <button
              type="button"
              onClick={() => setSection('blog')}
              className={`px-5 py-2.5 rounded-xl text-sm font-extrabold cursor-pointer transition-all shadow-2xs ${
                section === 'blog'
                  ? 'bg-[#7C1FA8] text-white ring-2 ring-[#7C1FA8]/30'
                  : 'bg-white border border-[#EBE8EF] text-[#544F66] hover:bg-[#FAF5FD] hover:text-[#7C1FA8]'
              }`}
            >
              📝 Manage Blog Posts
            </button>
            <button
              type="button"
              onClick={() => setSection('enquiries')}
              className={`px-5 py-2.5 rounded-xl text-sm font-extrabold cursor-pointer transition-all shadow-2xs ${
                section === 'enquiries'
                  ? 'bg-[#7C1FA8] text-white ring-2 ring-[#7C1FA8]/30'
                  : 'bg-white border border-[#EBE8EF] text-[#544F66] hover:bg-[#FAF5FD] hover:text-[#7C1FA8]'
              }`}
            >
              📋 User Enquiries & Leads
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {section === 'enquiries' ? (
          <EnquiriesAdminPanel onUnauthorized={() => setAdmin(null)} />
        ) : section === 'blog' ? (
          <BlogAdminPanel onUnauthorized={() => setAdmin(null)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5 items-start">
        <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-lg">{form.id ? 'Edit job' : 'Create job'}</h2>
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-1.5 rounded-lg border border-[#EBE8EF] text-[#7C1FA8] text-xs font-bold hover:bg-[#FAF5FD] cursor-pointer"
            >
              New
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-3">
            <Field label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Location">
                <input
                  required
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  className={inputClass}
                />
              </Field>
              <Field label="Department">
                <input
                  required
                  value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Experience">
                <input
                  required
                  placeholder="2 – 4 Years"
                  value={form.experience}
                  onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
                  className={inputClass}
                />
              </Field>
              <Field label="Employment type">
                <input
                  value={form.employmentType}
                  onChange={(e) => setForm((f) => ({ ...f, employmentType: e.target.value }))}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Job Banner / Featured Image (Cloudinary)">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="https://res.cloudinary.com/... or upload image below"
                    value={form.imageUrl}
                    onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="px-3 py-1.5 rounded-lg bg-[#7C1FA8] hover:bg-[#68198f] text-white text-xs font-bold cursor-pointer transition-colors shrink-0">
                    {uploadingImage ? 'Uploading to Cloudinary...' : '☁️ Upload Image (Cloudinary)'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  {form.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, imageUrl: '' }))}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {form.imageUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[#EBE8EF] w-full max-h-36 bg-gray-50 flex items-center justify-center p-1">
                    <img
                      src={form.imageUrl}
                      alt="Job Banner Preview"
                      className="max-h-32 object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
            </Field>

            <Field label="Short description">
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="About the role">
              <textarea
                required
                rows={4}
                value={form.aboutRole}
                onChange={(e) => setForm((f) => ({ ...f, aboutRole: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Responsibilities (one per line)">
              <textarea
                required
                rows={5}
                value={form.responsibilities}
                onChange={(e) => setForm((f) => ({ ...f, responsibilities: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Requirements (one per line)">
              <textarea
                required
                rows={5}
                value={form.requirements}
                onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Benefits (one per line)">
              <textarea
                required
                rows={4}
                value={form.benefits}
                onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="closed">Closed</option>
                </select>
              </Field>
              <Field label="Sort order">
                <input
                  type="number"
                  min="0"
                  value={form.sortOrder}
                  onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Slug (optional)">
              <input
                placeholder="auto-from-title"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#7C1FA8] hover:bg-[#5E1083] disabled:opacity-60 text-white font-bold rounded-xl py-3 transition-colors cursor-pointer"
            >
              {saving ? 'Saving...' : form.id ? 'Update job' : 'Save job'}
            </button>

            {formMessage.text && (
              <p className={`text-sm ${formMessage.ok ? 'text-emerald-700' : 'text-red-600'}`}>
                {formMessage.text}
              </p>
            )}
          </form>
        </section>

        <section className="bg-white border border-[#EBE8EF] rounded-[20px] p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="font-extrabold text-lg">All jobs</h2>
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`${inputClass} min-w-[140px]`}
              >
                <option value="all">All statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
              <input
                type="search"
                placeholder="Search jobs..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className={`${inputClass} min-w-[160px]`}
              />
            </div>
          </div>

          {jobsLoading ? (
            <p className="text-sm text-[#6F6A82]">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-sm text-[#6F6A82]">No jobs found.</p>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="border border-[#EBE8EF] rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {job.imageUrl && (
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-purple-50 border border-purple-100 shrink-0 shadow-2xs">
                          <img
                            src={job.imageUrl}
                            alt={job.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-base">{job.title}</h3>
                        <p className="text-xs text-[#6F6A82] mt-1 flex flex-wrap gap-x-3 gap-y-1">
                          <span>{job.location}</span>
                          <span>{job.department}</span>
                          <span>{job.experience}</span>
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="text-sm text-[#544F66] line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fillForm(job)}
                      className="px-3 py-1.5 rounded-lg bg-[#7C1FA8] text-white text-xs font-bold cursor-pointer hover:bg-[#5E1083]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(job)}
                      className="px-3 py-1.5 rounded-lg border border-[#EBE8EF] text-[#7C1FA8] text-xs font-bold cursor-pointer hover:bg-[#FAF5FD]"
                    >
                      {job.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(job)}
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 text-xs font-bold cursor-pointer hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-xs font-bold text-[#1E1B2E] space-y-1.5">
      <span>{label}</span>
      {children}
    </label>
  );
}

function StatusBadge({ status }) {
  const styles = {
    published: 'bg-emerald-50 text-emerald-700',
    draft: 'bg-[#FAF5FD] text-[#7C1FA8]',
    closed: 'bg-red-50 text-red-700',
  };

  return (
    <span
      className={`shrink-0 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
        styles[status] || styles.draft
      }`}
    >
      {status}
    </span>
  );
}
