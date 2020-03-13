const ERRORS = {
  VALIDATION: {
    CODE: 403,
  },
  AUTHENTICATION: {
    CODE: 401,
  },
  NOT_FOUND: {
    CODE: 404,
  },
};

class ServerError extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.statusCode = code;

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { ERRORS, ServerError };
