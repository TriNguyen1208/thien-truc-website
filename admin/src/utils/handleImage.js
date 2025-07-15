const extractBlogImages = async (htmlContent) => {
    const formData = new FormData();
    const {images, doc} = extractAllImages(htmlContent);

    for (const img of images) {
        const src = img.getAttribute('src');
        let blob = null;

        if (src?.startsWith('blob:')) {
            blob = await fetch(src).then(res => res.blob());
        } else if (src?.startsWith('data:image/')) {
            // 👉 Chuyển base64 thành Blob
            const mime = src.match(/data:(image\/.+);base64,/)[1];
            const base64 = src.split(',')[1];
            const byteString = atob(base64);
            const byteArray = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                byteArray[i] = byteString.charCodeAt(i);
            }
            blob = new Blob([byteArray], { type: mime });
        }

        if (blob) {
            const uniqueId = `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
            const fakeFilename = `image_${uniqueId}.png`;
            formData.append('images', blob, fakeFilename);
            img.setAttribute('src', fakeFilename);
        }
    }
    return {formData, doc};
}
const extractAllImages = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = Array.from(doc.querySelectorAll('img'));
    return {images, doc};
}
const addDeleteImage = (oldHtmlContent, newHtmlContent, formData) => {
    const oldImages = extractAllImages(oldHtmlContent).images; //day la hinh cu ban dau. Phai check xem hinh cu va hinh moi
    const newImages = extractAllImages(newHtmlContent).images //day la hinh moi
    //Neu nhu hinh cu co ma hinh moi khong co thi xoa

    const oldSrcs = oldImages.map(img => img.getAttribute('src')).filter(Boolean);
    const newSrcs = new Set(newImages.map(img => img.getAttribute('src')).filter(Boolean));
    
    for (const src of oldSrcs) {
        if (!newSrcs.has(src)) {
            // Hình cũ không còn trong hình mới → cần xóa
            formData.append('delete_images', src);
        }
    }
    return formData;
}
export {extractAllImages, addDeleteImage, extractBlogImages}