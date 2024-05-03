/**
 * uma classe de erro para ser usada na função CreateController
 */
export class ErrorController {
  /**
   * @param {number} code
   * @param {string} message
   * @param {string} details
   */
  constructor(code, message, details) {
    this.code = code;
    this.message = message;
    this.details = details;
  }

  static getInfoError(error) {
    const isMyError = error instanceof ErrorController;

    if (!isMyError) return { code: 500, message: 'erro interno no servidor' };

    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }
}
