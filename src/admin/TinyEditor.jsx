import React, { useMemo, useRef, useState, useEffect, Component } from 'react';
import { getAdminToken } from '../api/careers';
import { API_BASE } from '../config/api.js';

const TINYMCE_API_KEY =
  import.meta.env.VITE_TINYMCE_API_KEY ||
  '29yjvaqhv2mmq2srv7i5ezlegyxheodtr62oc7vj3p9i3mew';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('TinyEditor Error caught by Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function TinyEditorComponent({ value, onChange, height = 520 }) {
  const [EditorComponent, setEditorComponent] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    let active = true;
    import('@tinymce/tinymce-react')
      .then((mod) => {
        if (active) setEditorComponent(() => mod.Editor);
      })
      .catch((err) => {
        console.warn('Failed to load TinyMCE component:', err);
        if (active) setLoadError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const init = useMemo(
    () => ({
      height,
      menubar: 'file edit view insert format tools table help',
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
        'fullscreen', 'insertdatetime', 'media', 'table', 'help',
        'wordcount', 'emoticons', 'codesample', 'directionality',
        'pagebreak', 'nonbreaking', 'quickbars',
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

  const fallbackTextarea = (
    <div className="space-y-2">
      <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium flex items-center justify-between">
        <span>✏️ Standard HTML Content Editor (TinyMCE Fallback Mode)</span>
      </div>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={16}
        style={{ minHeight: `${height}px` }}
        placeholder="Enter post content (HTML supported)..."
        className="w-full border border-[#EBE8EF] rounded-xl p-4 text-sm font-mono text-[#1E1B2E] bg-white focus:outline-none focus:border-[#7C1FA8] focus:ring-1 focus:ring-[#7C1FA8]"
      />
    </div>
  );

  if (loadError || !EditorComponent) {
    return fallbackTextarea;
  }

  return (
    <ErrorBoundary fallback={fallbackTextarea}>
      <EditorComponent
        apiKey={TINYMCE_API_KEY}
        onInit={(_evt, editor) => {
          editorRef.current = editor;
        }}
        value={value || ''}
        onEditorChange={(content) => onChange(content)}
        init={init}
      />
    </ErrorBoundary>
  );
}

export default function TinyEditor(props) {
  return <TinyEditorComponent {...props} />;
}
