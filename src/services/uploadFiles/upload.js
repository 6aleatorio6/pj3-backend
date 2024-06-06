import busboy from 'busboy';
import endpointBoxSafe from '../secureController/handlerBox.js';
import { uploadFile } from './pontasFiles.js';
import { HttpException } from '../secureController/handlersPaia.js';

export const convertFilesToURLs = endpointBoxSafe((req, res, next) => {
  return new Promise((resolve, reject) => {
    const isMultiPart =
      req.headers['content-type'] &&
      req.headers['content-type'].includes('multipart/form-data');

    if (!isMultiPart) return next();

    const bb = busboy({
      headers: req.headers,
      limits: { fileSize: 10 * 1024 * 1024 },
    });

    bb.on('field', (field, valor) => {
      req.body[field] = valor;
    });

    bb.on('file', async (field, file, info) => {
      const chunks = [];

      file.on('data', (chunk) => chunks.push(chunk));

      file.on('end', async () => {
        try {
          const fileInteiro = Buffer.concat(chunks);

          const url = await uploadFile(fileInteiro, info);
          req.body[field] = url;
        } catch (e) {
          console.log(e);

          reject(e);
        }
      });
    });

    bb.on('finish', () => {
      next();
      console.log(req.body);
      resolve();
    });

    bb.on('error', (e) => {
      console.log(e);

      reject(new HttpException(500, 'dsf', e));
    });

    req.pipe(bb);
  });
});
