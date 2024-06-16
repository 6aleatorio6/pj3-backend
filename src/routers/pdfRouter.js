import { Router } from 'express';

import todosUsuariosPDF from '../controllers/pdfPuppeteer/todosUsuariosPDF.js';
import { useGuard } from '../services/auth/guardJwt.js';

const router = Router();

router.get('/listar-usuarios', useGuard('ADM'), todosUsuariosPDF);

export default router;
