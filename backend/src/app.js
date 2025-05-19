import express from 'express'
import userRouter from "#@/routes/user.route.js"
import { errorHandler } from '#@/middlewares/error.middleware.js';
const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use(errorHandler);
export default app;