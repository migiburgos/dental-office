class APIError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

class BadRequestError extends APIError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

class NotFoundError extends APIError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

class InternalServerError extends APIError {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

module.exports = {
  APIError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
};
