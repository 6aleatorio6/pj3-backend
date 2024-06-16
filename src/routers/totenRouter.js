import { Router } from 'express';

import create from '../controllers/toten/create.js';
import { useGuard } from '../services/auth/guardJwt.js';

const router = Router();

router.post('/visita', useGuard('TOTEM'), create);

export default router;
