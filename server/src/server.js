import app from '#@/app.js'
const PORT = process.env.PORT || 5000;

import dotenv from 'dotenv'
dotenv.config();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
