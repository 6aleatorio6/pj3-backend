import funcionarioRouter from './routers/funcionarioRouter.js';
import usuarioRouter from './routers/usuarioRouter.js';
import catalogoRouter from './routers/catalogoRouter.js';
import pdfRouter from './routers/pdfRouter.js';
import excelRouter from './routers/excelRouter.js';
import totenRouter from './routers/totenRouter.js';
import chartRouter from './routers/chartRouter.js';
import { getFilesEndpoint } from './services/uploadFiles/pontasFiles.js';
import refreshSession from './controllers/auth/refreshSession.js';
import { Router } from 'express';

const rotas = Router();

// services
rotas.get('/files/:storage/?', getFilesEndpoint);
rotas.use('/token/refresh', refreshSession);

// controllers
rotas.use('/funcionario', funcionarioRouter);
rotas.use('/usuario', usuarioRouter);
rotas.use('/catalogo', catalogoRouter);
rotas.use('/geraPdf', pdfRouter);
rotas.use('/toten', totenRouter);
rotas.use('/excel', excelRouter);
rotas.use('/chart', chartRouter);

// ERROS
rotas.use((req, res, next) => {
  res.status(404).json({
    message: 'esse endpoint não existe',
  });
});

rotas.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    message: 'error handler',
    error,
  });
});

export default rotas;
