import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import funcionarioRouter from './routers/funcionarioRouter.js';
import usuarioRouter from './routers/usuarioRouter.js';
import catalogoRouter from './routers/catalogoRouter.js';
import pdfRouter from './routers/pdfRouter.js';
import excelRouter from './routers/excelRouter.js';
import totenRouter from './routers/totenRouter.js';
import { loggerMiddleware } from './helpers/loggerMidleware.js';
import refreshSession from './controllers/auth/refreshSession.js';
import { convertFilesToURLs } from './services/uploadFiles/upload.js';
import { getFilesEndpoint } from './services/uploadFiles/pontasFiles.js';
import path from 'path';

const app = express();

export const corsOptions = JSON.parse(
  `{"origin": ${process.env.CORS_ORIGIN || '"*"'} }`,
);

// middleware
app.use(
  cors(corsOptions),
  express.json(),
  express.urlencoded({ extended: false }),
  convertFilesToURLs, // mais pra frente tem que mover para dps da autenticacao
  loggerMiddleware,
  cookieParser(),
);

// assets padrão do backend
app.use('/public', express.static(path.join(import.meta.url, '../assets')));

// services
app.get('/files/:storage/:uri', getFilesEndpoint);
app.use('/token/refresh', refreshSession);

// controllers
app.use('/funcionario', funcionarioRouter);
app.use('/usuario', usuarioRouter);
app.use('/catalogo', catalogoRouter);
app.use('/geraPdf', pdfRouter);
app.use('/toten', totenRouter);
app.use('/excel', excelRouter);

export default app;
