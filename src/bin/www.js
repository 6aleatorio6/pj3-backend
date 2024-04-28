import 'dotenv/config.js';
import app from '../app.js';

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

const PORT = process.env.PORT || 3000;

let corsTexto = JSON.parse(process.env.CORS_ORIGINS || '["*"]').toString();
corsTexto = corsTexto.includes('*') ? 'all' : corsTexto;

app.listen(PORT, () => {
  console.log(`Porta: ${PORT} | Cors: ${corsTexto}`);
});
