import React, { useMemo, useRef, useState, useEffect } from 'react';
import { getAdminToken } from '../api/careers';
import { API_BASE } from '../config/api.js';

const TINYMCE_API_KEY =
  import.meta.env.VITE_TINYMCE_API_KEY ||
  '29yjvaqhv2mmq2srv7i5ezlegyxheodtr62oc7vj3p9i3mew';

export default function TinyEditor({ value, onChange, height = 520 }) {
  const editorRef = useRef(null);
  const [EditorComp, setEditorComp] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    import('@tinymce/tinymce-react')
      .then((mod) => setEditorComp(() => mod.Editor))
      .catch(() => setLoadError(true));
  }, []);

  const init = useMemo(
    () => ({
      height,
      menubar: 'file edit view insert format tools table help',
      plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'code',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'help',
        'wordcount',
        'emoticons',
        'codesample',
        'directionality',
        'pagebreak',
        'nonbreaking',
        'quickbars',
      ],
      toolbar:
        'undo redo | blocks fontfamily fontsize | ' +
        'bold italic underline strikethrough | forecolor backcolor | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | ' +
        'link image media table | removeformat | code fullscreen preview | help',
      toolbar_mode: 'sliding',
      branding: false,
      promotion: false,
      image_caption: true,
      image_advtab: true,
      image_title: true,
      automatic_uploads: true,
      file_picker_types: 'image',
      paste_data_images: true,
      relative_urls: false,
      remove_script_host: false,
      convert_urls: true,
      content_style:
        'body { font-family:Segoe UI,Helvetica,Arial,sans-serif; font-size:15px; line-height:1.65; color:#1E1B2E; }' +
        'img { max-width:100%; height:auto; }',
      images_upload_handler: async (blobInfo) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        const token = getAdminToken();
        const response = await fetch(`${API_BASE}/admin/media`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.message || 'Image upload failed');
        }

        const url = payload.data?.media?.url;
        if (!url) throw new Error('Upload succeeded but no media URL returned');
        return url;
      },
    }),
    [height]
  );

  if (loadError || !EditorComp) {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ height: `${height}px` }}
        className="w-full p-4 border border-purple-200 rounded-xl font-mono text-sm focus:outline-none focus:border-purple-600 bg-white text-[#1E1B2E]"
        placeholder="HTML Content Editor..."
      />
    );
  }

  return (
    <EditorComp
      apiKey={TINYMCE_API_KEY}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={init}
    />
  );
}
