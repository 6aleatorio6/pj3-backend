import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';

import controllerPaia from './controllers/exemploPaia.js';

const app = express();

// middleware
app.use(
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
);

// controllers
app.use('/paia', indexRouter);

export default app;
