const corsEnv = process.env.CORS_ORIGINS;

if (!corsEnv) throw new Error('CORS_ORIGINS não foi definido');

export const origin =
  corsEnv.split(',').length < 2
    ? corsEnv
    : corsEnv.split(',').map((origin) => origin.trim());
