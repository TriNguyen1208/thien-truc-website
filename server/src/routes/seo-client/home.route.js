import express from 'express'
import pool from '#@/config/db.js';
const router = express.Router();

router.get('/', async (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Trang chủ</title>
                <meta name="description" content="Trang chủ Công ty cổ phần Thiên Trúc, Đồng Tháp" />
                <meta property="og:title" content="Trang chủ - Thiên Trúc" />
                <meta property="og:description" content="Trang chủ Công ty cổ phần Thiên Trúc, Đồng Tháp" />
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}" />
            </head>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `);
});

export default router;