/**
 * Helper para capturar a URL base da aplicação (via middleware) e disponibilizar como varivel para o resto do pj
 */
export const baseUrl = {
  url: null,
  capturar(req, res, next) {
    if (!baseUrl.url) baseUrl.url = `${req.protocol}://${req.get('host')}`;
    next();
  },
};
