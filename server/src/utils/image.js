import cloudinary from '#@/config/cloudinary.js';
import fs from 'fs'
import { JSDOM } from 'jsdom';
const uploadImage = async (image, type) => {
    await cloudinary.api.delete_resources(['not existed']);
    const imageUpload = await cloudinary.uploader.upload(image.path, { 
        resource_type: "image",
        folder: type,
        transformation: [{
            width: 1200,
            crop: 'limit',
            quality: 'auto:eco',
            fetch_format: 'auto',
            flags: 'progressive',
            format: 'auto',
        }]
    });
    // Tạo URL tối ưu (dùng WebP nếu trình duyệt hỗ trợ)
    const optimizedUrl = imageUpload.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
    // Xoá file tạm trong local
    fs.unlinkSync(image.path);
    return optimizedUrl;
}

const deleteImage = async(image_url_array) => {
    let url_array = [];
    for(let image_url of image_url_array){
        const parts = image_url.split('/upload/');

        if(parts.length < 2) continue;

        let pathWithExtension = parts[1];

        pathWithExtension = pathWithExtension.replace(/^[^/]*\/+/, '');
        // Bỏ version nếu có (v123456789/)
        pathWithExtension = pathWithExtension.replace(/^v\d+\//, '');

        // Bỏ phần mở rộng .jpg, .png, ...
        const public_id = pathWithExtension.replace(/\.[^/.]+$/, '');
        url_array.push(public_id)
    }
    if (url_array.length === 0) return;
    try {
        await cloudinary.api.delete_resources(url_array);
    } catch (error) {
        console.error("Delete error:", error);
    }
}

const isCloudinary = (url) => url?.includes('res.cloudinary.com');

const updateImage = async (old, new_local, new_external, type) => {
    // Ưu tiên ảnh local
    if (new_local) {
        if (old !== new_local.path) {
            if (isCloudinary(old)) await deleteImage([old]);
            return await uploadImage(new_local, type);
        }
        return old;
    }

    // Nếu không có local, xét external
    if (new_external && old !== new_external) {
        if (isCloudinary(old)) await deleteImage([old]);
        return new_external;
    }

    // Không có gì thay đổi
    return old;
};
const extractAllImages = (htmlContent) => {
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    const images = Array.from(document.querySelectorAll('img'));
    const cloudinary_images = [];
    for(const image of images){
        const src = image.getAttribute('src');
        if(isCloudinary(src)){
            cloudinary_images.push(src);
        }
    }
    return cloudinary_images;
}
export {uploadImage, deleteImage, updateImage, isCloudinary, extractAllImages};
