import app from '../app.js';
import { origin } from '../helpers/corsOrigin.js';

const PORT = process.env.PORT || 3000;

const corsTexto = origin.includes('*') ? 'all' : origin;

app.listen(PORT, () => {
  console.log(`Porta: ${PORT} | Cors: ${corsTexto}`);
});
