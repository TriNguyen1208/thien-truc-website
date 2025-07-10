import React, { useRef } from 'react'
import {Editor} from "@tinymce/tinymce-react"
const EditorWord = () => {
  const editorRef = useRef(null);
  return (
    <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        onInit={(_evt, editor) => editorRef.current = editor}
        init={{
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