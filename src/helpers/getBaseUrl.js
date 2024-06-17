/**
 * Helper para capturar a URL base da aplicação (via middleware) e disponibilizar como varivel para o resto do pj
 */
export const baseUrl = {
  url: null,
  capturar(req, res, next) {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    if (!baseUrl.url) baseUrl.url = `${protocol}://${req.get('host')}`;
    next();
  },
};
