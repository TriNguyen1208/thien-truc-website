import express from 'express'
import pool from '#@/config/db.js';
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
    const page_url = `
        <url>
            <loc>${process.env.VITE_CLIENT_URL}/san-pham</loc>
            <changefreq>daily</changefreq>
            <priority>0.85</priority>
        </url>
    `;

    const products = (await pool.query('SELECT id FROM product.products')).rows;

    const products_urls = products.map(item => `
        <url>
            <loc>${process.env.VITE_CLIENT_URL}/san-pham/${item.id}</loc>
            <changefreq>daily</changefreq>
            <priority>0.85</priority>
        </url>
    `).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${page_url}
        ${products_urls}
    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
});

router.get('/', async (req, res) => {
    const { banner_title, banner_description } = (await pool.query('SELECT * FROM product.product_page')).rows[0];

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Sản phẩm</title>
                <meta name="description" content="${banner_title}\n${banner_description}" />
                <meta property="og:title" content="${banner_title}" />
                <meta property="og:description" content="${banner_description}" />
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}/san-pham" />
            </head>
            <body>
                <div id="root"></div>
                <noscript>
                    <h1>Trang sản phẩm công ty Thiên Trúc</h1>
                    <h2>${banner_title}</h2>
                    <h3>${banner_description}</h3>
                    <p> Công ty Thiên Trúc, Cao Lãnh, Đồng Tháp </p>
                </noscript>
            </body>
        </html>
    `);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description, product_img } = (await pool.query('SELECT * FROM product.products WHERE id = $1', [id])).rows?.[0];

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${name}</title>
                <meta name="description" content="${description}" />
                <meta property="og:title" content="${name}" />
                <meta property="og:description" content="${description}" />
                ${product_img ? `<meta property="og:image" content="${product_img}" />` : ""}
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}/san-pham/${id}" />
            </head>
            <body>
                <div id="root"></div>
                <noscript>
                    <h1>Sản phẩm "${name}" công ty Thiên Trúc</h1>
                    <h2>${description}</h2>
                    ${product_img ? `<img src="${product_img}" alt="Sản phẩm ${name} - Công ty Thiên Trúc" />` : ""}
                    <p> Công ty Thiên Trúc, Cao Lãnh, Đồng Tháp </p>
                </noscript>
            </body>
        </html>
    `);
});

export default router;