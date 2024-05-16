import { jest } from '@jest/globals';
import 'dotenv/config.js';


process.env.DATABASE_URL = process.env.DATABASE_TESTE_URL

global.jest = jest;
