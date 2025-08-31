import express from 'express'
import pool from '#@/config/db.js';
const router = express.Router();

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
            </body>
        </html>
    `);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description } = (await pool.query('SELECT * FROM product.products WHERE id = $1', [id])).rows?.[0];

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${name}</title>
                <meta name="description" content="${description}" />
                <meta property="og:title" content="${name}" />
                <meta property="og:description" content="${description}" />
                <link rel="canonical" href="${process.env.VITE_CLIENT_URL}/san-pham/${id}" />
            </head>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `);
});

export default router;