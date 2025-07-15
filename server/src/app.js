import express from 'express'
import { errorHandler } from '#@/middlewares/error.middleware.js';
import registerRoutes from '#@/routes/index.route.js';
import cors from 'cors'

const app = express();

// app.use(cors({
//   origin: 'http://localhost:3001',
//   //credentials: true // nếu bạn cần gửi cookie, nếu không thì có thể bỏ
// }));
app.use(cors());
app.use(express.json());
registerRoutes(app);
app.use(errorHandler);

export default app;