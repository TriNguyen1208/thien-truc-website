import express from 'express'
import pool from '#@/config/db.js';
const router = express.Router();

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
            </body>
        </html>
    `);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, main_content } = (await pool.query('SELECT * FROM project.projects WHERE id = $1', [id])).rows?.[0];

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
            </body>
        </html>
    `);
});

export default router;