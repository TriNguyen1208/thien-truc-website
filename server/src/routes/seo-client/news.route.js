import express from 'express'
import pool from '#@/config/db.js';
const router = express.Router();

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
                <link rel="canonical" href="http://${process.env.VITE_CLIENT_URL}/tin-tuc" />
            </head>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, main_content, is_published } = (await pool.query('SELECT * FROM news.news WHERE id = $1', [id])).rows?.[0];

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
                <link rel="canonical" href="http://${process.env.VITE_CLIENT_URL}/tin-tuc/${id}" />
            </head>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `);
});

export default router;