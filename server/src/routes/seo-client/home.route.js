import express from 'express'
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
    const urls = `
        <url>
            <loc>${process.env.VITE_API_URL}</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
    `;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
});

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
                <noscript>
                    <h1>Trang chủ công ty Thiên Trúc</h1>
                    <p> Công ty Thiên Trúc, Cao Lãnh, Đồng Tháp </p>
                </noscript>
            </body>
        </html>
    `);
});

export default router;