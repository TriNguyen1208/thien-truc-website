import express from 'express'
// import userRouter from "#@/routes/user.route.js"
import { errorHandler } from '#@/middlewares/error.middleware.js';
import registerRoutes from '#@/routes/index.route.js';

const app = express();

app.use(express.json());
// app.use('/api/users', userRouter);
registerRoutes(app);
app.use(errorHandler);

export default app;