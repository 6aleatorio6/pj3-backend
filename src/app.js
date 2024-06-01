import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';

import funcionarioRouter from './routers/funcionarioRouter.js';
import usuarioRouter from './routers/usuarioRouter.js';
import catalogoRouter from './routers/catalogoRouter.js';

const app = express();

export const corsOptions = JSON.parse(
  `{"origin": ${process.env.CORS_ORIGIN || '"*"'} }`,
);

// middleware
app.use(
  cors(corsOptions),
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
);

// controllers
app.use('/funcionario', funcionarioRouter);
app.use('/usuario', usuarioRouter);
app.use('/catalogo', catalogoRouter);

export default app;
