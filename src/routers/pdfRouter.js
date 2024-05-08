import { Router } from 'express';

import todosUsuariosPDF from '../controllers/pdfPuppeteer/todosUsuariosPDF.js';
import todosUsuariosPDFTeste from '../controllers/pdfPuppeteer/testePDF.js';

const router = Router();


router.post('/listar-usuarios', todosUsuariosPDF)
router.get('/listar-usuarios', todosUsuariosPDFTeste)



export default router;
