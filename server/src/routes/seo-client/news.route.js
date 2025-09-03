import express from 'express'
import pool from '#@/config/db.js';
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
    const page_url = `
        <url>
            <loc>${process.env.VITE_API_URL}/tin-tuc</loc>
            <changefreq>daily</changefreq>
            <priority>0.85</priority>
        </url>
    `;

    const news = (await pool.query('SELECT id FROM news.news')).rows;

    const news_urls = news.map(item => `
        <url>
            <loc>${process.env.VITE_API_URL}/tin-tuc/${item.id}</loc>
            <changefreq>daily</changefreq>
            <priority>0.85</priority>
        </url>
    `).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${page_url}
        ${news_urls}
    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
});

router.get('/', async (req, res) => {
    const { banner_title, banner_description } = (await pool.query('SELECT * FROM news.news_page')).rows[0];

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Tin tức</title>
                <meta name="description" content="${banner_title}\n${banner_description}" />
                <meta property="og:title" content="${banner_title}" />
                <meta property="og:description" content="${banner_description}" />
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}/tin-tuc" />
            </head>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, main_content, is_published, main_img } = (await pool.query('SELECT * FROM news.news WHERE id = $1', [id])).rows?.[0];

    if (!is_published) {
        // đuổi con bot đi
        return res.status(404).send('Not Found');
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${title}</title>
                <meta name="description" content="${main_content}" />
                <meta property="og:title" content="${title}" />
                <meta property="og:description" content="${main_content}" />
                ${main_img ? `<meta property="og:image" content="${main_img}" />` : ""}
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}/tin-tuc/${id}" />
            </head>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `);
});

export default router;