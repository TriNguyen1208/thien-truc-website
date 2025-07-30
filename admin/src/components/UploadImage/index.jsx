import { useRef, useEffect, useState } from "react";
import { UploadIcon } from '@/components/Icon'

export default function UploadImage({
  form, 
  setForm, 
  initialForm,
  keyImage,
  flexDirection = 'row',
  gap = 8,
  overflow="hidden",
}){
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    setFile(form?.[keyImage] ?? null)
  }, [form, keyImage])

  useEffect(() => {
    setUrlInput(form?.[keyImage] ?? "");
  }, [initialForm]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if(file){
        setFile(file)
        setForm((prev) => ({...prev, [keyImage]: file}))
    }
    e.target.value = null;
  }
  const removeImage = (fieldName) => {
    setForm((prev) => {
        if (prev[fieldName]?.startsWith?.('blob:')) {
            URL.revokeObjectURL(prev[fieldName]);
        }
        return { ...prev, [fieldName]: '' };
    });
  };
  return (
    <>
     <div className="space-y-4">
        {/* URL Input */}
        <div 
            className={`flex gap-2 w-full items-stretch ${flexDirection == 'col' && "flex-col"}`}
            style={{gap: gap}}
        >
            <input
                type="url"
                value={urlInput} //Chỉ có khi nhập tay(nếu như fetch ban đầu thì thay đổi cái này)
                onChange={(e) => {
                    setUrlInput(e.target.value)
                    setForm((prev) => ({
                        ...prev,
                        [keyImage]: e.target.value
                    }));
                }}
                placeholder="Nhập link ảnh"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {/* File Upload */}
            <span className={`text-center ${overflow}`}>Hoặc</span>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleChange}
            />
            <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                disabled={!!file} //Nếu như có giá trị nào trong file thì sẽ disable button
                className="flex h-full px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 disabled:bg-gray-300 cursor-pointer justify-center"
            >
                <div>
                    <UploadIcon />
                </div>
                <div className="ml-[15px]">
                    Upload ảnh
                </div>
            </button>
        </div>
        {file?.name && ( //File mà có name thì nó là upload ảnh
            <div className="text-xs text-gray-700 break-all relative border border-gray-200 rounded-md p-2">
                URL: {file.name}
                <button
                    type="button"
                    onClick={() => removeImage(keyImage)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                    ×
                </button>
            </div>
        )}
    </div>
    </>
  )
}