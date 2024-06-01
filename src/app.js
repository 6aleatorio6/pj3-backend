import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import funcionarioRouter from './routers/funcionarioRouter.js';
import usuarioRouter from './routers/usuarioRouter.js';
import catalogoRouter from './routers/catalogoRouter.js';
import { loggerMiddleware } from './helpers/loggerMidleware.js';

const app = express();

export const corsOptions = JSON.parse(
  `{"origin": ${process.env.CORS_ORIGIN || '"*"'} }`,
);

// middleware
app.use(
  cors(corsOptions),
  loggerMiddleware,
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
);

// controllers
app.use('/funcionario', funcionarioRouter);
app.use('/usuario', usuarioRouter);
app.use('/catalogo', catalogoRouter);

export default app;
