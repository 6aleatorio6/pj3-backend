/* eslint-disable no-unused-vars */
import { Socket } from 'socket.io';

const hashAleatorio = () =>
  crypto.createHash('sha256').update(Date.now().toString()).digest('hex');

export const qrCodeMAP = new Set();

/** *  @param {Socket} soc */
export function totemSocket(soc) {
  soc.on('qrcode:get', (cb) => {
    const hash = hashAleatorio();

    qrCodeMAP.set(hash, (apelido) => {
      soc.emit('qrcode:visita', { apelido: 'paia' });
    });

    cb(hash);
  });
}
