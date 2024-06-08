function formatBytes(bytes) {
  const sizes = ['bytes', 'KB', 'MB'];
  if (bytes === 0) return '0 bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export function loggerMiddleware(req, res, next) {
  const startTime = Date.now();
  const { method, url, headers } = req;
  const userAgent = headers['user-agent'].split(' ').slice(-3, -1).join(' ');

  const requestContentLength = req.headers['content-length'];
  const requestContentLengthStr = requestContentLength
    ? formatBytes(parseInt(requestContentLength, 10))
    : 'N/A';

  res.on('finish', () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const statusCode = res.statusCode;
    const responseContentLength = res.getHeader('content-length');
    const responseContentLengthStr = responseContentLength
      ? formatBytes(parseInt(responseContentLength, 10))
      : 'N/A';

    console.log(
      `${method} ${url} - ${statusCode} - Req: ${requestContentLengthStr} - Res: ${responseContentLengthStr} - ${responseTime}ms - ${userAgent}`,
    );
  });

  next();
}
