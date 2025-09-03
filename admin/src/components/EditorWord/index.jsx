import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorWord = ({ 
    form, 
    setForm 
}) => {
    const editorRef = useRef(null);
    return (
        <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            value={form.content}
            onEditorChange={(newContent, editor) => {
                const wordCount = editor.plugins.wordcount.getCount();
                setForm((prevForm) => ({
                    ...prevForm,
                    content: newContent,
                    countWord: wordCount
                }));
            }}
            init={{
                license_key: 'gpl',
                height: 800,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'table', 'preview', 'help', 'wordcount',
                    'pagebreak', 'emoticons',
                ],
                toolbar:
                    'fontsizeselect fontselect blocks | ' +
                    'bold italic forecolor backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist | link image table emoticons',

                file_picker_types: 'image',

                file_picker_callback: (callback, _value, meta) => {
                    if (meta.filetype === 'image') {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.onchange = function () {
                            const file = this.files[0];
                            if (!file) return;

                            const blobUrl = URL.createObjectURL(file);
                            callback(blobUrl, { title: file.name });
                        };
                        input.click();
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
                        font-size:14pt;
                        line-height: 1;
                        border: none;
                    }
                `,
            }}
        />
    );
};

export default EditorWord;
