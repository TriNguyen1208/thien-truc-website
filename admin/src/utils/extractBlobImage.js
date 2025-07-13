const extractBlogImages = async (htmlContent) => {
    const formData = new FormData();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = Array.from(doc.querySelectorAll('img'));
    console.log(images.map(img => img.src));

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
export default extractBlogImages