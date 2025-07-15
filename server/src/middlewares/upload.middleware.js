import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({ //lưu tạm trong thư mục upload
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error("Chỉ cho phép ảnh"), false);
}
const upload = multer({storage, fileFilter})
export default upload