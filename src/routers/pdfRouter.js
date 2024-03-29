import { Router } from 'express';

import todosUsuariosPDF from '../controllers/pdfPuppeteer/todosUsuariosPDF.js';

const router = Router();


router.post('/listar-usuarios', todosUsuariosPDF)



export default router;
