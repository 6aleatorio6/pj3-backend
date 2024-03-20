import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';
import rotaPaia from './routers/rotaPaia.js';

const app = express();

// middleware
app.use(
  morgan('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
);

// controllers
app.use('/paia', rotaPaia);

export default app;
