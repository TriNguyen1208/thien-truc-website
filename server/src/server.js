import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

import app from '#@/app.js'
const PORT = process.env.PORT || 5000;

import http from 'http'

const server = http.createServer(app);
server.setTimeout(60000);

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
