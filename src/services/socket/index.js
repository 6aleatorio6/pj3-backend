/* eslint-disable no-unused-vars */
import { Socket } from 'socket.io';
import { totemSocket } from './connections/totem.js';
import { useGuardSocket } from './auth.js';

/** *  @param {Socket} soc */
export function indexSocket(soc) {
  //  complicarei isso mais tarde
  soc.use(useGuardSocket('TOTEM'));
  totemSocket(soc);
}
