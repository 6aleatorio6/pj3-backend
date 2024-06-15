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

const app = express();

app.get('/', (req, res) => res.json({ message: 'servidor online!' }));

// cors
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

// services
app.get('/files/:storage/?', getFilesEndpoint);
app.use('/token/refresh', refreshSession);

// controllers
app.use('/funcionario', funcionarioRouter);
app.use('/usuario', usuarioRouter);
app.use('/catalogo', catalogoRouter);
app.use('/geraPdf', pdfRouter);
app.use('/toten', totenRouter);
app.use('/excel', excelRouter);

// ERROS
app.use((req, res, next) => {
  res.status(404).json({
    message: 'esse endpoint não existe',
  });
});
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    message: 'error handler',
    error,
  });
});

export default app;
