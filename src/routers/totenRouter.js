import { Router } from 'express';

import create from '../controllers/toten/create.js';

const router = Router()

router.post('/visita', create)

export default router;