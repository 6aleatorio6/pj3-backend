import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import funcionarioRouter from './routers/funcionarioRouter.js'
const app = express();

const arrayDeOrigins = JSON.parse(process.env.CORS_ORIGINS);

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

export default app;
