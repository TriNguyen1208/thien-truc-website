import express from 'express'
import pool from '#@/config/db.js';
const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
    const page_url = `
        <url>
            <loc>${process.env.VITE_API_URL}/du-an</loc>
            <changefreq>daily</changefreq>
            <priority>0.85</priority>
        </url>
    `;

    const projects = (await pool.query('SELECT id FROM project.projects')).rows;

    const projects_urls = projects.map(item => `
        <url>
            <loc>${process.env.VITE_API_URL}/du-an/${item.id}</loc>
            <changefreq>daily</changefreq>
            <priority>0.85</priority>
        </url>
    `).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${page_url}
        ${projects_urls}
    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
});

router.get('/', async (req, res) => {
    const { banner_title, banner_description } = (await pool.query('SELECT * FROM project.project_page')).rows[0];

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Dự án</title>
                <meta name="description" content="${banner_title}\n${banner_description}" />
                <meta property="og:title" content="${banner_title}" />
                <meta property="og:description" content="${banner_description}" />
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}/du-an" />
            </head>
            <body>
                <div id="root"></div>
                <noscript>
                    <h1>Trang Dự án công ty Thiên Trúc</h1>
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
    const { title, main_content, main_img } = (await pool.query('SELECT * FROM project.projects WHERE id = $1', [id])).rows?.[0];

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${title}</title>
                <meta name="description" content="${main_content}" />
                <meta property="og:title" content="${title}" />
                <meta property="og:description" content="${main_content}" />
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}/du-an/${id}" />
            </head>
            <body>
                <div id="root"></div>
                <noscript>
                    <h1>Dự án "${title}" công ty Thiên Trúc</h1>
                    <h2>${main_content}</h2>
                    ${main_img ? `<img src="${main_img}" alt="Dự án ${title} - Công ty Thiên Trúc" />` : ""}
                    <h3>${content}</h3>
                    <p> Công ty Thiên Trúc, Cao Lãnh, Đồng Tháp </p>
                </noscript>
            </body>
        </html>
    `);
});

export default router;