import { Router } from 'express';

import todasVisitasPDF from '../controllers/pdfPuppeteer/todasVisitasPDF.js';

const router = Router();


router.get('/listar-visitas', todasVisitasPDF)



export default router;
