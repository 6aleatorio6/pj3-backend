import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import funcionarioRouter from './routers/funcionarioRouter.js';
import usuarioRouter from './routers/usuarioRouter.js';
import catalogoRouter from './routers/catalogoRouter.js';
import totenRouter from './routers/totenRouter.js';
import { loggerMiddleware } from './helpers/loggerMidleware.js';
import refreshSession from './controllers/auth/refreshSession.js';
import { convertFilesToURLs } from './services/uploadFiles/upload.js';

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
  convertFilesToURLs,
  cookieParser(),
);

// controllers
app.use('/token/refresh', refreshSession);
app.use('/funcionario', funcionarioRouter);
app.use('/usuario', usuarioRouter);
app.use('/catalogo', catalogoRouter);
app.use('/toten', totenRouter);

export default app;
