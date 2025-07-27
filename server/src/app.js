import express from 'express'
import { errorHandler } from '#@/middlewares/error.middleware.js';
import registerRoutes from '#@/routes/index.route.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { cookie } from 'express-validator';

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', // chỉ định domain frontend
    credentials: true               // cho phép gửi cookie
}));

app.use(express.json());
app.use(cookieParser())
registerRoutes(app);
app.use(errorHandler);

export default app;