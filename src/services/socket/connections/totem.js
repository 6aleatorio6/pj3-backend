/* eslint-disable no-unused-vars */
import { Socket } from 'socket.io';
import { createHash } from 'crypto';

const hashAleatorio = () =>
  createHash('sha256').update(Date.now().toString()).digest('hex');

export const qrCodeMAP = new Map();

/** *  @param {Socket} soc */
export function totemSocket(soc) {
  let hash;

  soc.on('qrcode:get', (cb) => {
    hash = `PAIA:${hashAleatorio()}`;

    qrCodeMAP.set(hash, (nome) => {
      soc.emit('qrcode:visita', { nome });
    });

    cb(hash);
  });

  soc.on('error', (e) => {
    console.log('erro', e);
  });

  soc.on('disconnect', () => {
    if (hash && qrCodeMAP.has(hash)) {
      qrCodeMAP.delete(hash);
    }
  });
}
