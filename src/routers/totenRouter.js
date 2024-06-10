import { Router } from 'express';

import create from '../controllers/toten/create.js';
import getToten from '../controllers/toten/getToten.js';

const router = Router();

router.post('/visita', create);
router.get('/visita/:dataToten', getToten);

export default router;
