import app, { corsOptions } from '../app.js';

app.get('/', (req, res) => {
  res.status(200).json({ message: 'servidor online!' });
});

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

const origin = corsOptions.origin.toString();

const corsTexto = origin.includes('*') ? 'all' : origin;

app.listen(PORT, () => {
  console.log(`Porta: ${PORT} | Cors: ${corsTexto}`);
});
