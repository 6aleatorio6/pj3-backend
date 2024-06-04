import { jest } from '@jest/globals';

process.env.DATABASE_URL = process.env.DATABASE_TESTE_URL;

global.jest = jest;
