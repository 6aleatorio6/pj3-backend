/* eslint-disable promise/param-names */
import busboy from 'busboy';
import endpointBoxSafe from '../secureController/handlerBox.js';
import { uploadFile } from './pontasFiles.js';
import { HttpException } from '../secureController/handlersPaia.js';

// TODO: refatorar mais tarde
export const convertFilesToURLs = endpointBoxSafe((req, res) => {
  return new Promise((resolve, reject) => {
    const isMultiPart =
      req.headers['content-type'] &&
      req.headers['content-type'].includes('multipart/form-data');

    if (!isMultiPart) return resolve('nextPaia');

    const bb = busboy({
      headers: req.headers,
      limits: { fileSize: 10 * 1024 * 1024 },
    });

    bb.on('field', (field, value) => {
      req.body[field] = value;
    });

    const paiaFiles = [];
    bb.on('file', (field, file, info) => {
      const arrayBuffer = [];
      file.on('data', (c) => {
        arrayBuffer.push(c);
      });

      const promiseFile = new Promise((res, rej) => {
        file.on('end', async () => {
          try {
            const uriFile = await uploadFile(Buffer.concat(arrayBuffer), info);
            req.body[field] = uriFile;
            res(uriFile);
          } catch (error) {
            rej(error);
          }
        });
      });

      paiaFiles.push(promiseFile);
    });

    bb.on('finish', () => {
      Promise.all(paiaFiles)
        .then(() => resolve('nextPaia'))
        .catch(reject);
    });

    bb.on('error', (e) => {
      if (e instanceof HttpException) return reject(e);
      reject(
        new HttpException(
          500,
          'erro ao processar o formulario MultiPart',
          e.message,
        ),
      );
    });

    req.pipe(bb);
  });
});
