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

    // criar um array para amazenar as promessas das respostas do uploadFiles com os arquivos
    const paiaFiles = [];

    bb.on('file', (field, file, info) => {
      const arrayBuffer = [];
      file.on('data', (c) => {
        arrayBuffer.push(c);
      });

      // promessa
      const promiseFile = new Promise((res, rej) => {
        file.on('end', async () => {
          try {
            const uriFile = await uploadFile(Buffer.concat(arrayBuffer), info);

            res([field, uriFile]);
          } catch (error) {
            rej(error);
          }
        });
      });

      // dar um push na promessa
      paiaFiles.push(promiseFile);
    });

    bb.on('finish', async () => {
      try {
        // pegar as respostas do uploadFiles com as Uri dos arquivos
        const allFiles = await Promise.all(paiaFiles);

        // mandar as uri das fotos para o req.body
        allFiles.forEach(([field, uri]) => {
          const hasUri = req.body[field];

          if (!hasUri) return (req.body[field] = uri);

          if (!Array.isArray(hasUri)) req.body[field] = [hasUri];

          req.body[field].push(uri);
        });

        resolve('nextPaia');
      } catch (error) {
        reject(error);
      }
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
