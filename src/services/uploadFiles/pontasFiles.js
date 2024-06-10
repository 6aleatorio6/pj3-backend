import { prismaApenasPaiado } from '../../prisma.js';
import endpointBoxSafe from '../secureController/handlerBox.js';
import { reqValidy } from '../validacao/reqValidy.js';

// externa
// url: {url-base}/files/:uuid
export const getFilesEndpoint = endpointBoxSafe(async (req, res) => {
  reqValidy(req, {
    params: { uuid: 'required' },
  });

  const { file, mimeType } =
    await prismaApenasPaiado.fileBasePaia.findFirstOrThrow({
      where: { uuid: req.params.uuid },
    });

  res.set('Content-Type', mimeType);
  res.send(file);
});

// interna
export async function uploadFile(file, info) {
  const { uuid } = await prismaApenasPaiado.fileBasePaia.create({
    data: { file, mimeType: info.mimeType },
  });

  return uuid;
}