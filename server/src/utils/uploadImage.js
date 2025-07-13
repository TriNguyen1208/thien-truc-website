import cloudinary from '#@/config/cloudinary.js';
import fs from 'fs'
const uploadImage = async (image, type) => {
    const imageUpload = await cloudinary.uploader.upload(image.path, { 
        resource_type: "image",
        folder: type
    });
    console.log("hello world")
    fs.unlinkSync(image.path);
    const imageUrl = imageUpload.secure_url;
    console.log(imageUrl)
    return imageUrl;
}
export default uploadImage