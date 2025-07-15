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
        const result = await cloudinary.api.delete_resources(url_array);
        console.log("Delete result:", result);
    } catch (error) {
        console.error("Delete error:", error);
    }
}
export {uploadImage, deleteImage};