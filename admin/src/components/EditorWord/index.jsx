import React, { useRef } from 'react'
import {Editor} from "@tinymce/tinymce-react"
const EditorWord = ({
  form,
  setForm,
}) => {
  const editorRef = useRef(null);
  return (
    <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        onInit={(_evt, editor) => editorRef.current = editor}
        value={form.content}
        onEditorChange={(newContent) => {
          setForm((prevForm) => ({
            ...prevForm,
            content: newContent,
          }));
        }}
        init={{
            license_key: 'gpl',
            height: 500,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
              'pagebreak', 'emoticons'
            ],
            toolbar: 
                'fontsizeselect fontselect blocks | ' +
                'bold italic forecolor backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist | link image table emoticons',
            images_upload_handler: async (blobInfo, success, failure) => {
              try {
                const formData = new FormData();
                formData.append('image', blobInfo.blob(), blobInfo.filename());
                const res = await fetch('http://localhost:3000/upload', {
                  method: 'POST',
                  body: formData,
                });
                const data = await res.json();
                success(data.imageUrl); // TinyMCE sẽ tự chèn ảnh vào
              } catch (err) {
                failure('Upload failed: ' + err.message);
              }
            },
            font_size_formats:
              '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 72pt',
            font_formats:
              'Arial=arial,helvetica,sans-serif;' +
              'Courier New=courier new,courier;' +
              'Georgia=georgia,palatino;' +
              'Tahoma=tahoma,arial,helvetica,sans-serif;' +
              'Verdana=verdana,geneva;',
            content_style: `
              body { 
                font-family:Helvetica,Arial,sans-serif; 
                font-size:14px;
                border: none;
              }
            `
          }}
    />
  )
}

export default EditorWord