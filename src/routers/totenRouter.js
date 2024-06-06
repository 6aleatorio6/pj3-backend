import { Router } from 'express';

import create from '../controllers/toten/create.js';
import getToten from '../controllers/toten/getToten.js';

const router = Router();

router.post('/visita/:dataToten', create);
router.get('/visita', getToten)

export default router;
