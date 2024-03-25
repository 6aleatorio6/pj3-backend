import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import funcionarioRouter from './routers/funcionarioRouter.js'
const app = express();

const PORT = process.env.PORT || 3000;
const arrayDeOrigins = JSON.parse(process.env.CORS_ORIGINS || '["*"]');

// middleware
app.use(
  cors({ origin: arrayDeOrigins }),
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
);

// controllers
app.use('/funcionario', funcionarioRouter);

app.listen(PORT, () => {
  console.log(`Porta: ${PORT} | Cors: ${arrayDeOrigins}`);
});
