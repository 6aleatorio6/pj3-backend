import app, { corsOptions } from '../app.js';

const PORT = process.env.PORT || 3000;

const origin = corsOptions.origin.toString();

const corsTexto = origin.includes('*') ? 'all' : origin;

app.listen(PORT, () => {
  console.log(`Porta: ${PORT} | Cors: ${corsTexto}`);
});
