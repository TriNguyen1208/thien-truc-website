import cloudinary from '#@/config/cloudinary.js';
import fs from 'fs'

const uploadImage = async (image, type) => {
    const imageUpload = await cloudinary.uploader.upload(image.path, { 
        resource_type: "image",
        folder: type
    });
    fs.unlinkSync(image.path);
    const imageUrl = imageUpload.secure_url;
    return imageUrl;
}

const deleteImage = async(image_url_array) => {
    let url_array = [];
    for(let image_url of image_url_array){
        const parts = image_url.split('/upload/');
        if(parts.length < 2) continue;
        const pathWithExtension = parts[1];
        const withoutVersion = pathWithExtension.replace(/^v\d+\//, '')
        url_array.push(withoutVersion.replace(/\.[^/.]+$/, ''));
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

export {uploadImage, deleteImage, updateImage, isCloudinary};