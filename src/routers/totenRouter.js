import { Router } from 'express';

import create from '../controllers/toten/create.js';
import { useGuard } from '../services/auth/guardJwt.js';
import qrCode from '../controllers/toten/qrCode.js';

const router = Router();

router.post('/visita', useGuard('TOTEM'), create);
router.get('/qrcode/:hash', useGuard('USER'), qrCode);

export default router;
