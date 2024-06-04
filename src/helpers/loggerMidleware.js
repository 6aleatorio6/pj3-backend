export function loggerMiddleware(req, res, next) {
  const startTime = Date.now();
  const { method, url, headers } = req;
  const userAgent = headers['user-agent'].split(' ').slice(-3, -1).join(' ');

  res.on('finish', () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const statusCode = res.statusCode;
    const contentLength = res.getHeader('content-length');
    const contentLengthStr = contentLength ? `${contentLength} bytes` : 'N/A';

    console.log(
      `${method} ${url} - ${statusCode} - ${contentLengthStr} - ${responseTime}ms - ${userAgent}`,
    );
  });

  next();
}
