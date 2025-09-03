import express from 'express'
import pool from '#@/config/db.js';
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
    const urls = `
        <url>
            <loc>${process.env.VITE_API_URL}/ve-chung-toi</loc>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
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
    const { banner_title, banner_description } = (await pool.query('SELECT * FROM about_us.about_us_page')).rows[0];

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Về chúng tôi</title>
                <meta name="description" content="${banner_title}\n${banner_description}" />
                <meta property="og:title" content="${banner_title}" />
                <meta property="og:description" content="${banner_description}" />
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}/ve-chung-toi" />
            </head>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `);
});
export default router;