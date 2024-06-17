import { z } from 'zod';
import { prismaApenasPaiado } from '../../prisma.js';
import endpointBoxSafe from '../secureController/handlerBox.js';
import { reqValidy } from '../validacao/reqValidy.js';

// externa
// url: {url-base}/files/:uuid
export const getFilesEndpoint = endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    params: { storage: z.enum(['db', 'public']) },
    query: { uri: z.string() },
  });

  const { uri } = req.query;
  const { storage } = req.params;

  if (storage === 'public') return res.sendFile(uri, { root: 'public' });

  const { file, mimeType } =
    await prismaApenasPaiado.fileBasePaia.findFirstOrThrow({
      where: { uuid: uri },
    });

  res.set('Content-Type', mimeType);
  res.send(file);
});

// interna
export async function uploadFile(file, info) {
  const { uuid } = await prismaApenasPaiado.fileBasePaia.create({
    data: { file, mimeType: info.mimeType },
  });

  return `/db/?uri=${uuid}`;
}
