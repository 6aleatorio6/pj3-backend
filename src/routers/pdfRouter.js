import { Router } from 'express';

import todasVisitasPDF from '../controllers/pdfPuppeteer/todasVisitasPDF.js';
import { useGuard } from '../services/auth/guardJwt.js';

const router = Router();


router.get('/listar-visitas', useGuard('ADM'), todasVisitasPDF)



export default router;
