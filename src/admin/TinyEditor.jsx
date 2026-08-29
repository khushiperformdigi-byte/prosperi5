import React, { useRef } from 'react';

export default function TinyEditor({ value, onChange, height = 520 }) {
  const textareaRef = useRef(null);

  return (
    <div className="w-full border border-purple-200 rounded-xl overflow-hidden bg-white shadow-xs font-sans">
      {/* Mini Formatting Toolbar */}
      <div className="bg-purple-50/80 border-b border-purple-200/80 p-2 flex flex-wrap items-center gap-1.5 text-xs">
        <button
          type="button"
          onClick={() => {
            const el = textareaRef.current;
            if (!el) return;
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const sel = el.value.substring(start, end);
            const replacement = `<strong>${sel || 'Bold Text'}</strong>`;
            const newVal = el.value.substring(0, start) + replacement + el.value.substring(end);
            onChange(newVal);
          }}
          className="px-2.5 py-1 bg-white hover:bg-purple-100 text-[#1E1B2E] font-bold rounded border border-purple-200/60 transition-all cursor-pointer"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => {
            const el = textareaRef.current;
            if (!el) return;
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const sel = el.value.substring(start, end);
            const replacement = `<em>${sel || 'Italic Text'}</em>`;
            const newVal = el.value.substring(0, start) + replacement + el.value.substring(end);
            onChange(newVal);
          }}
          className="px-2.5 py-1 bg-white hover:bg-purple-100 text-[#1E1B2E] italic font-semibold rounded border border-purple-200/60 transition-all cursor-pointer"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => {
            const el = textareaRef.current;
            if (!el) return;
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const sel = el.value.substring(start, end);
            const replacement = `<h2>${sel || 'Heading Title'}</h2>`;
            const newVal = el.value.substring(0, start) + replacement + el.value.substring(end);
            onChange(newVal);
          }}
          className="px-2 py-1 bg-white hover:bg-purple-100 text-[#7C1FA8] font-black rounded border border-purple-200/60 transition-all cursor-pointer"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => {
            const el = textareaRef.current;
            if (!el) return;
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const sel = el.value.substring(start, end);
            const replacement = `<h3>${sel || 'Subheading Title'}</h3>`;
            const newVal = el.value.substring(0, start) + replacement + el.value.substring(end);
            onChange(newVal);
          }}
          className="px-2 py-1 bg-white hover:bg-purple-100 text-[#7C1FA8] font-bold rounded border border-purple-200/60 transition-all cursor-pointer"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => {
            const el = textareaRef.current;
            if (!el) return;
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const sel = el.value.substring(start, end);
            const replacement = `<p>${sel || 'Paragraph text content...'}</p>`;
            const newVal = el.value.substring(0, start) + replacement + el.value.substring(end);
            onChange(newVal);
          }}
          className="px-2 py-1 bg-white hover:bg-purple-100 text-[#1E1B2E] font-medium rounded border border-purple-200/60 transition-all cursor-pointer"
          title="Paragraph"
        >
          P
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter link URL:', 'https://');
            if (!url) return;
            const el = textareaRef.current;
            if (!el) return;
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const sel = el.value.substring(start, end);
            const replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer">${sel || 'Link Text'}</a>`;
            const newVal = el.value.substring(0, start) + replacement + el.value.substring(end);
            onChange(newVal);
          }}
          className="px-2.5 py-1 bg-white hover:bg-purple-100 text-blue-600 font-semibold rounded border border-purple-200/60 transition-all cursor-pointer"
          title="Add Link"
        >
          🔗 Link
        </button>
        <button
          type="button"
          onClick={() => {
            const el = textareaRef.current;
            if (!el) return;
            const start = el.selectionStart;
            const end = el.selectionEnd;
            const sel = el.value.substring(start, end);
            const replacement = `<ul>\n  <li>${sel || 'List item 1'}</li>\n  <li>List item 2</li>\n</ul>`;
            const newVal = el.value.substring(0, start) + replacement + el.value.substring(end);
            onChange(newVal);
          }}
          className="px-2.5 py-1 bg-white hover:bg-purple-100 text-[#1E1B2E] font-semibold rounded border border-purple-200/60 transition-all cursor-pointer"
          title="Bullet List"
        >
          • Bullet List
        </button>
      </div>

      {/* Content Editor Textarea */}
      <textarea
        ref={textareaRef}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ height: height - 42 }}
        className="w-full p-4 focus:outline-none font-mono text-sm text-[#1E1B2E] bg-white resize-y"
        placeholder="Write or paste your article content here (HTML supported)..."
      />
    </div>
  );
}
