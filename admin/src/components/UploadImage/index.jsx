import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import CustomButton from '../ButtonLayout'
const UploadImage = ({
    form,
    setForm,
}) => {
    const inputRef = useRef();
    const [file, setFile] = useState(false);
    const handleButtonClick = () => {
        inputRef.current.click();
    }
    const handleChange= (e) => {
        const file = e.target.files[0];
        if(file){
            setFile(file)
            setForm((prev) => ({ ...prev, "main_image": file }));
        }
    }
    useEffect(() => {
        if (form.main_image !== "" && form.link_image !== "") {
            setFile(false);
            setForm((prev) => ({ ...prev, main_image: "" }));
        }
    }, [form.link_image]);

    useEffect(() => {
        if(form.main_image == ""){
            setFile(false);
        }
        if (form.main_image !== "" && form.link_image !== "") {
            setForm((prev) => ({ ...prev, link_image: "" }));
        }
    }, [form.main_image]);

    const handleOnBlurLinkImage = async () => {
        // Chuyển đổi link Google Drive nếu cần
        if(form.link_image == "")
            return;
        const convertGoogleDriveLink = (url) => {
            const match = url.match(/\/d\/([^/]+)\//);
            if (!match) return url;
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        };

        // Check link ảnh
        const checkImageUrlValid = (url) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };

        const convertedUrl = convertGoogleDriveLink(form.link_image);
        const isValid = await checkImageUrlValid(convertedUrl);

        if (!isValid) {
            alert("❌ Link ảnh không hợp lệ hoặc không truy cập được!");
            setForm((prev) => ({ ...prev, link_image: "" }));
        }
    }
    return (
        <div>
            <div className='bg-white p-6 flex flex-col gap-6 rounded-lg shadow-sm border border-gray-200 overflow-x-hidden '>
                <h3 className='text-2xl font-semibold text-[#09090B]'>Ảnh đại diện</h3>
                <div className='flex flex-col gap-4'>
                    <input 
                        type="text" 
                        required 
                        className='px-4 h-10 text-sm rounded-md border border-[#e4e4e7] focus:border-gray-300 focus:outline-none'
                        placeholder='Nhập link ảnh'
                        value={form.link_image}
                        onChange={(e) => setForm((prev) => ({ ...prev, ["link_image"]: e.target.value }))}
                        onBlur={handleOnBlurLinkImage}
                    />
                    <span className='text-center'>Hoặc</span>
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={handleChange}
                        hidden
                    />
                    <CustomButton
                        backgroundColor="white"
                        borderColor="#e4e4e7"
                        hoverBackgroundColor="#f3f4f6"
                        textColor="#364153"
                        hoverTextColor="#364153"
                        paddingX={16}
                        height={45}
                        onClick={handleButtonClick}
                    >
                        <span className='font-medium'>Nhập từ thiết bị</span>
                    </CustomButton>
                    <span className={`${file == null ? "hidden": ""}`}>{file != false && file.name.slice(0, 25)}</span>
                </div>
            </div> 
        </div>
    )
}

export default UploadImage