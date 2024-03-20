import { Router } from 'express';
import postPaia from '../controllers/paia/postInfeliz.js';
import getAllPaia from '../controllers/paia/getInfeliz.js';

const rotaPaia = Router();

rotaPaia.post('/', postPaia);

rotaPaia.get('/', getAllPaia);

export default rotaPaia;
