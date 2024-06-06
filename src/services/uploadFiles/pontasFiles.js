import { prismaApenasPaiado } from '../../prisma.js';

// externa
export async function getFiles(uuid) {
  const { file } = await prismaApenasPaiado.fileBasePaia.findFirstOrThrow({
    where: { uuid },
  });

  return file;
}

// interna
export async function uploadFile(file, info) {
  const { uuid } = await prismaApenasPaiado.fileBasePaia.create({
    data: { file, mimeType: info.mimeType },
  });

  return uuid;
}
