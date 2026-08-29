import React, { useMemo, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getAdminToken } from '../api/careers';
import { API_BASE } from '../config/api.js';

const TINYMCE_API_KEY =
  import.meta.env.VITE_TINYMCE_API_KEY ||
  '29yjvaqhv2mmq2srv7i5ezlegyxheodtr62oc7vj3p9i3mew';

export default function TinyEditor({ value, onChange, height = 520 }) {
  const editorRef = useRef(null);

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
      file_picker_callback: (callback, _value, meta) => {
        if (meta.filetype !== 'image') return;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          const formData = new FormData();
          formData.append('file', file);
          const token = getAdminToken();
          const response = await fetch(`${API_BASE}/admin/media`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: formData,
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok) {
            window.alert(payload.message || 'Image upload failed');
            return;
          }
          callback(payload.data.media.url, { title: file.name });
        };
        input.click();
      },
    }),
    [height]
  );

  return (
    <Editor
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
