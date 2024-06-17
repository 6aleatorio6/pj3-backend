/* eslint-disable no-unused-vars */
import { Socket } from 'socket.io';
import { createHash } from 'crypto';

const hashAleatorio = () =>
  createHash('sha256').update(Date.now().toString()).digest('hex');

export const qrCodeMAP = new Map();

/** *  @param {Socket} soc */
export function totemSocket(soc) {
  soc.on('qrcode:get', (cb) => {
    const hash = hashAleatorio();

    qrCodeMAP.set(hash, (apelido) => {
      soc.emit('qrcode:visita', { apelido });
    });

    cb(hash);
  });

 
  soc.on('error', (e) => {
    console.log('erro', e);
  });
}
