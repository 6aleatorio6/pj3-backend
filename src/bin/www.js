import 'dotenv/config.js';
import app from '../app.js';

const PORT = process.env.PORT || 3000;

let corsTexto = JSON.parse(process.env.CORS_ORIGINS || '["*"]').toString();
corsTexto = corsTexto.includes('*') ? 'all' : corsTexto;

app.listen(PORT, () => {
  console.log(`Porta: ${PORT} | Cors: ${corsTexto}`);
});
